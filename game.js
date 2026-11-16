// game.js - નવો વ્યાપાર મુખ્ય એન્જિન (Custom Tokens, Shapes, Colors & Rent Collection System)

import { BOARD_TILES, COLOR_GROUPS, BHAGYA_RULES, VYAVAHAR_RULES, DEFAULT_PLAYERS } from './data.js';
import { getTileIcon, getPlayerTokenSVG } from './icons.js';
import { sound } from './audio.js';

class NavoVyaparGame {
  constructor() {
    this.tiles = BOARD_TILES;
    this.players = [];
    this.currentPlayerIndex = 0;
    this.bank = {
      cash: 250000,
      totalLoans: 0
    };
    this.dice = [1, 1];
    this.diceSum = 2;
    this.isRolling = false;
    this.isMoving = false;
    this.isTurnProcessing = false;
    this._turnCounter = 0;
    this.turnPhase = 'ROLL';
    this.logs = [];
    this.selectedLoanAmount = 2000;
    this.seniorMode = false;
    this.selectedTileId = 0;

    // Ludo King Mode Setup State
    this.selectedGameMode = 'VS_COMPUTER'; // 'VS_COMPUTER' | 'FRIENDS_FAMILY' | 'CUSTOM_MIX'
    this.selectedPlayerCount = 4;
    this.player1CustomShape = 'pawn';
    this.player1CustomColor = '#e53935';
    this.propertyStats = {};
    this.selectedP2PLenderId = null;
    this.selectedP2PAmount = 1000;
    this.notificationTimer = null;
    this.isGameActive = false;
  }

  init() {
    this.renderBoard();
    this.updateActiveTileCard(0);
    this.setupEventListeners();
    
    // Check if there is an existing saved game to resume on refresh!
    const resumed = this.loadGameState();
    if (!resumed) {
      // Show Ludo King style Welcome Mode Modal on launch!
      this.openModal('modal-ludo-launch');
      this.updateLudoLaunchUI();
    }
  }

  // =========================================================================
  // LOCALSTORAGE PERSISTENCE (રીફ્રેશ પર રમત ચાલુ રહેવી - AUTO SAVE & RESUME)
  // =========================================================================
  saveGameState() {
    if (!this.isGameActive || !this.players || this.players.length === 0) return;
    try {
      const state = {
        version: 1,
        savedAt: Date.now(),
        isGameActive: this.isGameActive,
        players: this.players,
        currentPlayerIndex: this.currentPlayerIndex,
        turnPhase: this.turnPhase,
        bank: this.bank,
        dice: this.dice,
        diceSum: this.diceSum,
        logs: this.logs.slice(0, 50),
        propertyStats: this.propertyStats,
        selectedGameMode: this.selectedGameMode,
        selectedPlayerCount: this.selectedPlayerCount,
        player1CustomShape: this.player1CustomShape,
        player1CustomColor: this.player1CustomColor,
        seniorMode: this.seniorMode
      };
      localStorage.setItem('navo_vyapar_game_save_v1', JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  loadGameState() {
    try {
      const raw = localStorage.getItem('navo_vyapar_game_save_v1');
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state || !state.isGameActive || !Array.isArray(state.players) || state.players.length === 0) {
        return false;
      }

      this.isGameActive = true;
      this.players = state.players;
      this.players.forEach(p => {
        if (p.isUnlocked === undefined) p.isUnlocked = true;
      });
      this.currentPlayerIndex = state.currentPlayerIndex || 0;
      this.turnPhase = state.turnPhase || 'ROLL';
      this.bank = state.bank || { cash: 350000, totalLoans: 0 };
      this.dice = state.dice || [1, 1];
      this.diceSum = state.diceSum || 2;
      this.logs = Array.isArray(state.logs) ? state.logs : [];
      this.propertyStats = state.propertyStats || {};
      this.selectedGameMode = state.selectedGameMode || 'VS_COMPUTER';
      this.selectedPlayerCount = state.selectedPlayerCount || state.players.length;
      this.player1CustomShape = state.player1CustomShape || state.players[0]?.shape || 'pawn';
      this.player1CustomColor = state.player1CustomColor || state.players[0]?.color || '#e53935';
      this.seniorMode = !!state.seniorMode;

      if (this.seniorMode) {
        document.body.classList.toggle('senior-mode', true);
        const sBtn = document.getElementById('btn-toggle-senior');
        if (sBtn) sBtn.innerHTML = '👓 સામાન્ય મોડ';
      }

      // Re-render entire game board & tokens
      this.renderBoard();
      this.renderBuildings();
      this.renderTokens();
      this.updateDiceUI(this.dice[0], this.dice[1]);
      this.updateUI();

      const curPlayer = this.getCurrentPlayer();
      if (curPlayer) {
        this.updateActiveTileCard(curPlayer.position);
      }

      // Restore logs box
      const logsBox = document.getElementById('game-logs-box');
      if (logsBox && this.logs.length > 0) {
        logsBox.innerHTML = this.logs.map(log => `
          <div class="log-entry ${log.type || ''}">
            <span style="font-size:11px; opacity:0.8;">[${log.time || ''}]</span> ${log.msg}
          </div>
        `).join('');
      }

      // Handle case where refreshed during ACTION phase (e.g. prompt was open)
      if (this.turnPhase === 'ACTION') {
        if (curPlayer && !curPlayer.isBot) {
          const tile = this.tiles[curPlayer.position];
          const owner = this.players.find(p => p.properties.includes(tile.id));
          if (!owner && ['property', 'transport', 'utility'].includes(tile.type)) {
            setTimeout(() => this.showBuyPropertyModal(curPlayer, tile), 400);
          } else {
            this.turnPhase = 'END';
            this.updateUI();
          }
        } else {
          this.turnPhase = 'END';
          this.updateUI();
        }
      }

      // Close launch modal
      this.closeModal('modal-ludo-launch');

      this.showScreenNotification('🔄', 'રમત પુનઃસ્થાપિત!', `પાછલી રમત સફળતાપૂર્વક લોડ થઈ ગઈ છે (${curPlayer ? curPlayer.name : 'ખેલાડી'} નો દાવ).`, '#43a047', 4000);
      this.addLog(`🔄 પાછલી રમત પુનઃસ્થાપિત કરાઈ! (${curPlayer ? curPlayer.name : 'ખેલાડી'} નો દાવ ચાલુ છે)`, 'log-money');

      this.startBotWatchdog();

      if (curPlayer && curPlayer.isBot) {
        if (this.turnPhase === 'ROLL') {
          setTimeout(() => this.rollDice(), 1000);
        } else if (this.turnPhase === 'END') {
          setTimeout(() => this.endTurn(), 800);
        }
      }

      return true;
    } catch (err) {
      console.warn('Game load error:', err);
      return false;
    }
  }

  clearSavedGameState() {
    this.isGameActive = false;
    try {
      localStorage.removeItem('navo_vyapar_game_save_v1');
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  }

  // =========================================================================
  // LUDO KING STYLE GAME MODE INITIALIZATION WITH CUSTOM SHAPES & COLORS
  // =========================================================================
  startCustomGame(mode, count) {
    const defaultColors = ['#e53935', '#43a047', '#fbc02d', '#1e88e5', '#8e24aa', '#fb8c00', '#00acc1', '#e91e63'];
    const defaultShapes = ['pawn', 'car', 'ship', 'plane', 'hat', 'crown', 'horse', 'diamond'];
    const defaultBotNames = ['રમેશ (AI)', 'સુરેશ (AI)', 'મહેશ (AI)', 'પરેશ (AI)', 'કલ્પેશ (AI)'];
    const defaultHumanNames = ['પ્લેયર ૧', 'પ્લેયર ૨', 'પ્લેયર ૩', 'પ્લેયર ૪', 'પ્લેયર ૫', 'પ્લેયર ૬'];

    this.players = [];

    const userColor = this.player1CustomColor || '#e53935';
    const userShape = this.player1CustomShape || 'pawn';
    const otherColors = defaultColors.filter(c => c !== userColor);
    const otherShapes = defaultShapes.filter(s => s !== userShape);

    for (let i = 0; i < count; i++) {
      let name = '';
      let isBot = false;
      let color = userColor;
      let shape = userShape;

      if (i === 0) {
        // Player 1 customizable
        const nameInput = document.getElementById('player1-name-input');
        name = (nameInput && nameInput.value && nameInput.value.trim()) || (mode === 'VS_COMPUTER' ? 'તમે' : 'પ્લેયર ૧');
        color = userColor;
        shape = userShape;
        isBot = false;
      } else {
        color = otherColors[(i - 1) % otherColors.length];
        shape = otherShapes[(i - 1) % otherShapes.length];

        if (mode === 'VS_COMPUTER') {
          name = defaultBotNames[i - 1];
          isBot = true;
        } else if (mode === 'FRIENDS_FAMILY') {
          const inputEl = document.getElementById(`friend-name-${i}`);
          name = (inputEl && inputEl.value.trim()) || defaultHumanNames[i];
          isBot = false;
        } else {
          const isBotSelect = document.getElementById(`custom-isbot-${i}`);
          isBot = isBotSelect ? (isBotSelect.value === 'bot') : (i > 0);
          name = isBot ? defaultBotNames[Math.max(0, i - 1)] : defaultHumanNames[i];
        }
      }

      this.players.push({
        id: i,
        name: name,
        color: color,
        shape: shape,
        isBot: isBot,
        cash: 25000,
        position: 0,
        properties: [],
        houses: {},
        mortgaged: {},
        loan: 0,
        bankLoans: [],
        p2pLoans: [],
        p2pLent: [],
        inJail: false,
        jailTurns: 0,
        missNextTurn: false,
        isBankrupt: false,
        isUnlocked: false
      });
    }

    this.currentPlayerIndex = 0;
    this.turnPhase = 'ROLL';
    this.bank.cash = 350000;
    this.bank.totalLoans = 0;
    this.propertyStats = {};
    this.logs = [];

    this.renderBoard();
    this.renderBuildings();
    this.renderTokens();
    this.updateUI();
    this.updateActiveTileCard(0);

    const modeNames = {
      'VS_COMPUTER': `કોમ્પ્યુટર સામે (૧ માણસ + ${count - 1} AI બોટ્સ)`,
      'FRIENDS_FAMILY': `પરિવાર અને મિત્રો (${count} માણસો - નો બોટ્સ!)`,
      'CUSTOM_MIX': `કસ્ટમ મિક્સ રમત (${count} ખેલાડીઓ)`
    };

    sound.playBuy();
    this.addLog(`નવી રમત શરૂ થઈ! મોડ: ${modeNames[mode] || 'સ્ટાન્ડર્ડ'}`, 'log-money');
    this.closeModal('modal-ludo-launch');

    this.isGameActive = true;
    this.saveGameState();
    this.startBotWatchdog();
    this.checkBotTurn();
  }

  // =========================================================================
  // BOARD RENDERING (10x10 Perimeter Grid)
  // =========================================================================
  renderBoard() {
    const boardEl = document.getElementById('game-board');
    if (!boardEl) return;

    const centerArea = boardEl.querySelector('.board-center-area');
    boardEl.innerHTML = '';
    if (centerArea) boardEl.appendChild(centerArea);

    this.tiles.forEach(tile => {
      const tileEl = document.createElement('div');
      tileEl.className = 'board-tile';
      tileEl.id = `tile-${tile.id}`;
      tileEl.dataset.tileId = tile.id;

      const { row, col } = this.getGridCoords(tile.id);
      tileEl.style.gridRow = row;
      tileEl.style.gridColumn = col;

      if ([0, 9, 18, 27].includes(tile.id)) {
        tileEl.classList.add('corner-tile');
      }

      const groupData = COLOR_GROUPS[tile.group] || { color: '#90a4ae' };
      const colorBar = document.createElement('div');
      colorBar.className = 'tile-color-bar';
      colorBar.style.backgroundColor = groupData.color;

      const buildingsEl = document.createElement('div');
      buildingsEl.className = 'tile-buildings';
      buildingsEl.id = `buildings-${tile.id}`;

      // CENTER TOKENS TRAY (Box na center ma aavshe!)
      const tokensEl = document.createElement('div');
      tokensEl.className = 'tile-tokens-container';
      tokensEl.id = `tokens-${tile.id}`;

      const contentEl = document.createElement('div');
      contentEl.className = 'tile-content';

      const titleEl = document.createElement('div');
      titleEl.className = 'tile-title';
      titleEl.innerText = tile.name;

      const iconBox = document.createElement('div');
      iconBox.className = 'tile-icon-box';
      iconBox.innerHTML = getTileIcon(tile.icon);

      contentEl.appendChild(titleEl);
      contentEl.appendChild(iconBox);

      if (tile.price > 0) {
        const priceEl = document.createElement('div');
        priceEl.className = 'tile-price';
        priceEl.innerText = `રૂ. ${tile.price.toLocaleString('gu-IN')}`;
        contentEl.appendChild(priceEl);
      } else if (tile.amount) {
        const priceEl = document.createElement('div');
        priceEl.className = 'tile-price';
        priceEl.innerText = `રૂ. ${tile.amount}`;
        contentEl.appendChild(priceEl);
      } else if (tile.type === 'start') {
        const priceEl = document.createElement('div');
        priceEl.className = 'tile-price';
        priceEl.innerText = `+ રૂ. ૧૫૦૦`;
        contentEl.appendChild(priceEl);
      }

      tileEl.appendChild(colorBar);
      tileEl.appendChild(buildingsEl);
      tileEl.appendChild(contentEl);
      tileEl.appendChild(tokensEl); // Center token tray

      tileEl.addEventListener('click', () => {
        if (window._isBoardPanning) return; // Prevent accidental clicks during pan
        sound.playClick();
        this.selectedTileId = tile.id;
        this.updateActiveTileCard(tile.id, true);
        this.showTileDetails(tile);
      });

      boardEl.appendChild(tileEl);
    });

    this.renderTokens();
  }

  getGridCoords(tileId) {
    if (tileId >= 0 && tileId <= 9) {
      return { row: 1, col: tileId + 1 };
    } else if (tileId > 9 && tileId <= 18) {
      return { row: (tileId - 9) + 1, col: 10 };
    } else if (tileId > 18 && tileId <= 27) {
      return { row: 10, col: 10 - (tileId - 18) };
    } else {
      return { row: 10 - (tileId - 27), col: 1 };
    }
  }

  // =========================================================================
  // HELPER: ACTIVE LOANS TRACKER (મહત્તમ ૩ લોન મર્યાદા)
  // =========================================================================
  getActiveLoansCount(player) {
    const bLoans = player.bankLoans ? player.bankLoans.length : (player.loan > 0 ? 1 : 0);
    const pLoans = player.p2pLoans ? player.p2pLoans.length : 0;
    return bLoans + pLoans;
  }

  // =========================================================================
  // 3D CUSTOM PAWN TOKENS RENDERING (CACHE-ACCELERATED 60-120FPS ZERO DOM REPARSE)
  // =========================================================================
  getPawnElement(player) {
    if (!this._pawnElements) this._pawnElements = {};
    const key = `${player.id}_${player.shape || 'pawn'}_${player.color}`;
    let el = this._pawnElements[player.id];
    if (!el || el.dataset.key !== key) {
      el = document.createElement('div');
      el.className = 'player-pawn-wrapper';
      el.id = `pawn-player-${player.id}`;
      el.dataset.key = key;
      el.innerHTML = getPlayerTokenSVG(player.shape || 'pawn', player.color, player.id);
      this._pawnElements[player.id] = el;
    }
    return el;
  }

  renderTokens(movingPlayerId = null) {
    if (!this._occupiedTiles) this._occupiedTiles = new Set();

    // Clear only previously occupied containers
    this._occupiedTiles.forEach(tileId => {
      const container = document.getElementById(`tokens-${tileId}`);
      if (container) container.innerHTML = '';
    });
    this._occupiedTiles.clear();

    // Determine current occupied tiles
    for (let i = 0; i < this.players.length; i++) {
      const p = this.players[i];
      if (!p.isBankrupt) {
        this._occupiedTiles.add(p.position);
      }
    }

    // Attach cached pawn elements into occupied tiles (0.01ms vs 15ms string re-parse!)
    this._occupiedTiles.forEach(tileId => {
      const container = document.getElementById(`tokens-${tileId}`);
      if (!container) return;

      const playersOnTile = this.players.filter(p => !p.isBankrupt && p.position === tileId);
      const count = playersOnTile.length;
      let scaleClass = 'token-single';
      if (count >= 4) scaleClass = 'token-many';
      else if (count >= 2) scaleClass = 'token-few';

      for (let i = 0; i < count; i++) {
        const player = playersOnTile[i];
        const isMoving = (movingPlayerId !== null && player.id === movingPlayerId);
        const pawnEl = this.getPawnElement(player);
        pawnEl.className = `player-pawn-wrapper ${scaleClass} ${isMoving ? 'pawn-hopping' : ''}`;
        pawnEl.title = `${player.name} (રૂ. ${player.cash})`;
        container.appendChild(pawnEl);
      }
    });
  }

  renderBuildings() {
    this.tiles.forEach(tile => {
      const bContainer = document.getElementById(`buildings-${tile.id}`);
      if (!bContainer) return;
      bContainer.innerHTML = '';

      const owner = this.players.find(p => p.properties.includes(tile.id));
      if (!owner) return;

      const existingOwnerDot = document.getElementById(`owner-dot-${tile.id}`);
      if (existingOwnerDot) {
        if (typeof existingOwnerDot.remove === 'function') existingOwnerDot.remove();
        else if (existingOwnerDot.parentNode) existingOwnerDot.parentNode.removeChild(existingOwnerDot);
      }
      
      const tileEl = document.getElementById(`tile-${tile.id}`);
      if (tileEl) {
        const dot = document.createElement('div');
        dot.id = `owner-dot-${tile.id}`;
        dot.className = 'tile-owner-indicator';
        dot.style.backgroundColor = owner.color;
        tileEl.appendChild(dot);

        const existingMortgage = tileEl.querySelector('.tile-mortgage-overlay');
        if (owner.mortgaged[tile.id]) {
          if (!existingMortgage) {
            const mOverlay = document.createElement('div');
            mOverlay.className = 'tile-mortgage-overlay';
            mOverlay.innerText = 'ગીરો';
            tileEl.appendChild(mOverlay);
          }
        } else if (existingMortgage) {
          existingMortgage.remove();
        }
      }

      const houseCount = owner.houses[tile.id] || 0;
      if (houseCount >= 4) {
        const hotel = document.createElement('div');
        hotel.className = 'building-hotel';
        hotel.title = 'હોટેલ';
        bContainer.appendChild(hotel);
      } else {
        for (let i = 0; i < houseCount; i++) {
          const house = document.createElement('div');
          house.className = 'building-house';
          house.title = 'ઘર';
          bContainer.appendChild(house);
        }
      }
    });
  }

  // =========================================================================
  // ACTIVE TILE FOCUS CARD & FLOATING TOAST
  // =========================================================================
  updateActiveTileCard(tileId, showToast = false) {
    const tile = this.tiles[tileId];
    if (!tile) return;

    const owner = this.players.find(p => p.properties.includes(tile.id));
    const groupData = COLOR_GROUPS[tile.group] || { color: '#0288d1' };

    let statusHtml = '';
    let rentInfoHtml = '';

    if (tile.type === 'property' || tile.type === 'transport' || tile.type === 'utility') {
      if (!owner) {
        statusHtml = `<span class="badge-unowned">🏛️ ખરીદી શકાય: રૂ. ${tile.price.toLocaleString('gu-IN')}</span>`;
      } else {
        const isM = owner.mortgaged[tile.id];
        statusHtml = `<span class="badge-owned" style="background:${owner.color}; color:#fff;">માલિક: ${owner.name} ${isM ? '(ગીરો)' : ''}</span>`;
      }

      if (tile.rent) {
        const houses = owner ? (owner.houses[tile.id] || 0) : 0;
        const currentRent = owner ? this.calculateRent(tile, owner) : tile.rent[0];
        rentInfoHtml = `
          <div class="active-card-rent-row">
            <span>વર્તમાન ભાડું: <b>રૂ. ${currentRent.toLocaleString('gu-IN')}</b></span>
            <span>બાંધકામ: ${houses >= 4 ? '૧ હોટેલ' : houses + ' ઘરો'}</span>
          </div>
        `;
      }
    } else {
      statusHtml = `<span class="badge-special">${tile.desc}</span>`;
    }

    const cardContainer = document.getElementById('active-tile-focus-card');
    if (cardContainer) {
      cardContainer.innerHTML = `
        <div class="active-card-header" style="border-left: 8px solid ${groupData.color};">
          <div class="active-card-icon">${getTileIcon(tile.icon)}</div>
          <div class="active-card-meta">
            <div class="active-card-title">${tile.name} <span class="active-card-sub">(${tile.subName})</span></div>
            <div class="active-card-status">${statusHtml}</div>
          </div>
        </div>
        ${rentInfoHtml}
      `;
    }

    // Live Floating Toast (#tile-tap-toast) - Only when explicitly tapped by user!
    if (showToast) {
      const toast = document.getElementById('tile-tap-toast');
      const toastContent = document.getElementById('tile-tap-content');
      if (toast && toastContent) {
        let toastText = `<b>${tile.name}</b> (${tile.subName || ''}) • `;
        if (tile.type === 'property' || tile.type === 'transport' || tile.type === 'utility') {
          if (!owner) {
            toastText += `<span style="color:#69f0ae; font-weight:700;">ખરીદી: રૂ. ${tile.price.toLocaleString('gu-IN')}</span>`;
          } else {
            const rentVal = this.calculateRent(tile, owner);
            toastText += `<span style="color:${owner.color}; font-weight:bold;">${owner.name}</span> • ભાડું: રૂ. ${rentVal.toLocaleString('gu-IN')}`;
          }
        } else {
          toastText += `<span style="color:#ffd54f;">${tile.desc}</span>`;
        }
        toastContent.innerHTML = toastText;
        toast.style.display = 'flex';
        if (this._toastTimer) clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
          if (toast) toast.style.display = 'none';
        }, 4000);
      }
    }
  }

  // =========================================================================
  // DICE ROLL & STEP MOVEMENT (ONLY moving player hops!)
  // =========================================================================
  rollDice() {
    if (this.isAnyModalOpen()) return;

    if (this.isRolling || this.isMoving || this.isTurnProcessing) {
      if (Date.now() - (this._rollStartTime || 0) > 4000) {
        this.isRolling = false;
        this.isMoving = false;
        this.isTurnProcessing = false;
      } else {
        return;
      }
    }
    if (this.turnPhase !== 'ROLL') return;

    const player = this.getCurrentPlayer();
    if (!player) return;

    if (player.isBankrupt) {
      this.endTurn();
      return;
    }

    if (player.missNextTurn) {
      player.missNextTurn = false;
      this.addLog(`${player.name} નો આ દાવ રદ થયેલ હોવાથી દાવ પૂરો થયો.`, 'log-jail');
      this.endTurn();
      return;
    }

    if (player.inJail) {
      this.handleJailTurn(player);
      return;
    }

    this.isRolling = true;
    this.isTurnProcessing = true;
    this._rollStartTime = Date.now();
    try { sound.playDice(); } catch(e) {}

    const dice1El = document.getElementById('dice-1');
    const dice2El = document.getElementById('dice-2');
    const rollBtn = document.getElementById('btn-roll-dice');
    const rollBtnMobile = document.getElementById('btn-roll-mobile');
    if (rollBtn) rollBtn.disabled = true;
    if (rollBtnMobile) rollBtnMobile.disabled = true;

    if (dice1El) dice1El.classList.add('rolling');
    if (dice2El) dice2El.classList.add('rolling');

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      this.dice = [d1, d2];
      this.diceSum = d1 + d2;

      this.updateDiceUI(d1, d2);
      if (dice1El) dice1El.classList.remove('rolling');
      if (dice2El) dice2El.classList.remove('rolling');

      this.isRolling = false;
      this.addLog(`${player.name} એ પાસા ફેંક્યા: ${d1} + ${d2} = ${this.diceSum} (${this.diceSum % 2 === 0 ? 'બેકી' : 'એકી'})`);

      // Ludo-Style Opening Rule: Must roll 6 (either die is 6 or sum is 6) to unlock goti!
      if (!player.isUnlocked) {
        if (d1 === 6 || d2 === 6 || this.diceSum === 6) {
          player.isUnlocked = true;
          try { sound.playCash(); } catch(e) {}
          this.addLog(`🎉 ૬ આવ્યો! ${player.name} ની ગોટી બોર્ડ પર રમવા માટે બહાર નીકળી!`, 'log-money');
          this.showScreenNotification('🎉', '૬ આવ્યો! ગોટી બહાર નીકળી', `${player.name} ની ગોટી અનલૉક થઈ અને ${this.diceSum} ડગલાં આગળ વધશે!`, '#69f0ae', 3500);
          this.movePlayerStepByStep(player, this.diceSum);
        } else {
          this.addLog(`🔒 ${player.name} ને ૬ ન આવ્યો (પાસા: ${d1} + ${d2} = ${this.diceSum}). ગોટી શરૂ કરવા ૬ જરૂરી છે.`);
          this.showScreenNotification('🔒', '૬ ની જરૂર છે!', `ગોટી બહાર લાવવા માટે પાસામાં ૬ આવવો જરૂરી છે.`, '#ffd54f', 2200);
          setTimeout(() => {
            this.finishAction();
          }, 1100);
        }
        return;
      }

      this.movePlayerStepByStep(player, this.diceSum);
    }, 450);
  }

  updateDiceUI(d1, d2) {
    const dice1El = document.getElementById('dice-1');
    const dice2El = document.getElementById('dice-2');
    const sumEl = document.getElementById('dice-sum-val');
    const parityEl = document.getElementById('dice-parity-text');

    if (dice1El) dice1El.innerHTML = this.getDicePipsHTML(d1);
    if (dice2El) dice2El.innerHTML = this.getDicePipsHTML(d2);
    if (sumEl) sumEl.innerText = this.diceSum;
    if (parityEl) {
      parityEl.innerText = this.diceSum % 2 === 0 ? 'બેકી સંખ્યા' : 'એકી સંખ્યા';
    }
  }

  getDicePipsHTML(val) {
    const pipsLayout = {
      1: '<div class="dice-pip" style="grid-column: 2; grid-row: 2;"></div>',
      2: '<div class="dice-pip" style="grid-column: 1; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 3;"></div>',
      3: '<div class="dice-pip" style="grid-column: 1; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 2; grid-row: 2;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 3;"></div>',
      4: '<div class="dice-pip" style="grid-column: 1; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 1; grid-row: 3;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 3;"></div>',
      5: '<div class="dice-pip" style="grid-column: 1; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 2; grid-row: 2;"></div><div class="dice-pip" style="grid-column: 1; grid-row: 3;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 3;"></div>',
      6: '<div class="dice-pip" style="grid-column: 1; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 1; grid-row: 2;"></div><div class="dice-pip" style="grid-column: 1; grid-row: 3;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 1;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 2;"></div><div class="dice-pip" style="grid-column: 3; grid-row: 3;"></div>'
    };
    return `<div style="display:grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); width:100%; height:100%;">${pipsLayout[val] || ''}</div>`;
  }

  movePlayerStepByStep(player, steps) {
    this.isMoving = true;
    let stepsLeft = steps;
    const stepDuration = 280; // Slowed down from 125ms for smooth, audible, satisfying hops
    const interval = setInterval(() => {
      if (stepsLeft <= 0) {
        clearInterval(interval);
        this.isMoving = false;
        this.renderTokens(player.id);
        setTimeout(() => this.renderTokens(null), 250);
        this.updateActiveTileCard(player.position, false);
        setTimeout(() => {
          this.handleTileLanding(player);
        }, 650); // Clear, satisfying pause upon arrival so token is visibly settled before modal opens!
        return;
      }

      player.position = (player.position + 1) % 36;
      try { sound.playStep(); } catch(e) {}
      this.renderTokens(player.id);

      if (player.position === 0) {
        this.addBankSalary(player);
      }

      stepsLeft--;
    }, stepDuration);
  }

  addBankSalary(player) {
    const salary = 2500;
    player.cash += salary;
    sound.playCash();
    this.addLog(`${player.name} સ્ટાર્ટીંગ પોઈન્ટ ઓળંગ્યો! બેંક પાસેથી રૂ. ૨,૫૦૦ બોનસ મેળવ્યા.`, 'log-money');

    if (player.loan > 0) {
      const interest = Math.round(player.loan * 0.1);
      this.addLog(`બેંક નોટિસ: ${player.name} પર રૂ. ${player.loan} ની લોન સક્રિય છે (વ્યાજ ૧૦% = રૂ. ${interest}).`, 'log-loan');
    }
    this.updateUI();
  }

  // =========================================================================
  // TILE LANDING LOGIC
  // =========================================================================
  handleTileLanding(player) {
    const tile = this.tiles[player.position];
    this.turnPhase = 'ACTION';
    this.updateUI();
    this.updateActiveTileCard(tile.id);

    switch (tile.type) {
      case 'start':
        player.cash += 500;
        sound.playCash();
        this.addLog(`${player.name} સ્ટાર્ટીંગ પોઈન્ટ પર પહોંચ્યા! વધારાના રૂ. ૫૦૦ (કુલ રૂ. ૩,૦૦૦) બોનસ મેળવ્યા.`, 'log-money');
        this.showScreenNotification('🏁', 'સ્ટાર્ટીંગ પોઈન્ટ બોનસ!', `${player.name} ને રૂ. ૩,૦૦૦ રોકડ બોનસ મળ્યું!`, '#43a047', 4000);
        this.finishAction();
        break;

      case 'property':
      case 'transport':
      case 'utility':
        this.handlePropertyLanding(player, tile);
        break;

      case 'tax':
        this.handleTaxLanding(player, tile);
        break;

      case 'club':
        this.handleClubLanding(player, tile);
        break;

      case 'jail':
        this.addLog(`${player.name} જેલની મુલાકાતે છે (કોઈ દંડ નથી).`);
        this.finishAction();
        break;

      case 'rest':
        this.addLog(`${player.name} આરામગૃહમાં આરામ કરી રહ્યા છે.`);
        this.finishAction();
        break;

      case 'bhagya':
        this.handleBhagyaLanding(player);
        break;

      case 'vyavahar':
        this.handleVyavaharLanding(player);
        break;

      default:
        this.finishAction();
    }
  }

  // =========================================================================
  // INTERACTIVE RENT COLLECTION SYSTEM (ભાડું વસૂલવાની સિસ્ટમ)
  // =========================================================================
  handlePropertyLanding(player, tile) {
    const owner = this.players.find(p => p.properties.includes(tile.id));

    if (!owner) {
      // Unowned property - can buy!
      if (player.isBot) {
        const shouldBuy = this.botEvaluatePropertyPurchase(player, tile);
        if (shouldBuy) {
          setTimeout(() => this.buyProperty(player, tile), 600);
        } else {
          this.addLog(`📢 ${player.name} એ ${tile.name} સીધી ખરીદી નહીં, તેથી તેને બધા ખેલાડીઓ માટે 'જાહેર હરાજી' (Public Auction) માં મૂકી!`, 'log-money');
          this.showScreenNotification('🔨', 'બોટ દ્વારા જાહેર હરાજી!', `${player.name} એ ${tile.name} ની હરાજી શરૂ કરી! બોલી લગાવો.`, '#ff9800', 3500);
          setTimeout(() => this.startPropertyAuction(tile), 1200);
        }
      } else {
        this.showBuyPropertyModal(player, tile);
      }
    } else if (owner.id === player.id) {
      this.addLog(`${player.name} પોતાની જ મિલ્કત ${tile.name} પર આવ્યા.`);
      this.finishAction();
    } else {
      // VISITOR LANDED ON OWNER'S PROPERTY - RENT COLLECTION SYSTEM!
      if (owner.mortgaged[tile.id]) {
        this.addLog(`${tile.name} બેંકમાં ગીરો હોવાથી કોઈ ભાડું ચૂકવવાનું નથી.`);
        this.showScreenNotification('🏦', 'ગીરો મિલ્કત', `${tile.name} ગીરો હોવાથી ${player.name} ને ભાડું માફ છે.`);
        this.finishAction();
        return;
      }

      // Track visit history and rent revenue!
      if (!this.propertyStats[tile.id]) {
        this.propertyStats[tile.id] = { totalVisits: 0, totalRevenue: 0, visitsByPlayer: {}, rentByPlayer: {} };
      }
      const stats = this.propertyStats[tile.id];
      const vCount = (stats.visitsByPlayer[player.id] || 0) + 1;
      stats.visitsByPlayer[player.id] = vCount;
      stats.totalVisits++;

      const rent = this.calculateRent(tile, owner);
      const totalPaidSoFar = (stats.rentByPlayer[player.id] || 0) + rent;
      stats.rentByPlayer[player.id] = totalPaidSoFar;
      stats.totalRevenue += rent;

      this.showRentCollectionModal(player, owner, tile, rent, vCount, totalPaidSoFar, stats.totalRevenue);
    }
  }

  showRentCollectionModal(visitor, owner, tile, rent, visitCount = 1, totalPaidByVisitor = 0, totalPropRevenue = 0) {
    const modal = document.getElementById('modal-rent-collection');
    const titleEl = document.getElementById('rent-modal-tile-name');
    const ownerEl = document.getElementById('rent-modal-owner-name');
    const visitorEl = document.getElementById('rent-modal-visitor-name');
    const rentAmtEl = document.getElementById('rent-modal-amount');
    const actionBtn = document.getElementById('btn-rent-collect-action');
    const closeBtn = modal?.querySelector('.modal-close');

    const visitCountEl = document.getElementById('rent-modal-visit-count');
    const totalPaidEl = document.getElementById('rent-modal-total-paid-by-visitor');
    const propRevenueEl = document.getElementById('rent-modal-property-total-revenue');

    if (titleEl) titleEl.innerText = tile.name;
    if (ownerEl) {
      ownerEl.innerHTML = `<b style="color:${owner.color};">${owner.name}</b>`;
    }
    if (visitorEl) {
      visitorEl.innerHTML = `<b style="color:${visitor.color};">${visitor.name}</b>`;
    }
    if (rentAmtEl) rentAmtEl.innerText = `રૂ. ${rent.toLocaleString('gu-IN')}`;

    if (visitCountEl) visitCountEl.innerText = `આ મિલ્કત પર ${visitor.name} ની ${visitCount}મી મુલાકાત છે!`;
    if (totalPaidEl) totalPaidEl.innerText = `રૂ. ${totalPaidByVisitor.toLocaleString('gu-IN')}`;
    if (propRevenueEl) propRevenueEl.innerText = `રૂ. ${totalPropRevenue.toLocaleString('gu-IN')} (${visitCount} મુલાકાતો)`;

    const isOwnerHuman = !owner.isBot;
    const isVisitorHuman = !visitor.isBot;

    let handled = false;
    const handleRentDismiss = () => {
      if (handled) return;
      handled = true;
      this.closeModal('modal-rent-collection');
      sound.playCash();
      this.addLog(`💰 ભાડું વસૂલાત: ${visitor.name} એ ${owner.name} ને ${tile.name} નું ભાડું રૂ. ${rent.toLocaleString('gu-IN')} ચૂકવ્યું!`, 'log-money');
      this.showScreenNotification('💰', 'ભાડું ચૂકવાયું!', `${visitor.name} એ ${owner.name} ને ${tile.name} નું ભાડું રૂ. ${rent.toLocaleString('gu-IN')} ચૂકવ્યું! (${visitCount}મી વાર મુલાકાત)`, owner.color, 4000);
      this.payMoney(visitor, owner, rent);
      this.finishAction();
    };

    if (actionBtn) {
      if (isOwnerHuman) {
        actionBtn.innerHTML = `💰 ભાડું વસૂલ કરો (Collect: રૂ. ${rent.toLocaleString('gu-IN')})`;
        actionBtn.style.background = 'linear-gradient(135deg, #43a047, #2e7d32)';
      } else if (isVisitorHuman) {
        actionBtn.innerHTML = `💸 ભાડું ચૂકવો (Pay Rent: રૂ. ${rent.toLocaleString('gu-IN')})`;
        actionBtn.style.background = 'linear-gradient(135deg, #e53935, #c62828)';
      } else {
        // Bot to Bot: Playing user reads the transaction and taps to proceed
        actionBtn.innerHTML = `✅ આગળ વધો (Proceed: રૂ. ${rent.toLocaleString('gu-IN')})`;
        actionBtn.style.background = 'linear-gradient(135deg, #1976d2, #0d47a1)';
      }

      actionBtn.onclick = handleRentDismiss;
    }

    if (closeBtn) {
      closeBtn.onclick = handleRentDismiss;
    }

    this.openModal('modal-rent-collection');
    // NOTE: Stays open until the player manually clicks actionBtn or closeBtn!
  }

  // =========================================================================
  // SMART AI BRAIN
  // =========================================================================
  botEvaluatePropertyPurchase(bot, tile) {
    let strategicScore = 20;

    const groupTiles = this.tiles.filter(t => t.group === tile.group);
    const ownedInGroup = groupTiles.filter(t => bot.properties.includes(t.id)).length;
    if (ownedInGroup > 0) strategicScore += 45;

    const opponents = this.players.filter(p => p.id !== bot.id && !p.isBankrupt);
    for (const opp of opponents) {
      const oppOwned = groupTiles.filter(t => opp.properties.includes(t.id)).length;
      if (oppOwned >= groupTiles.length - 1) {
        strategicScore += 40;
        break;
      }
    }

    if (tile.type === 'transport') strategicScore += 30;
    if (tile.price >= 6000) strategicScore += 25;

    if (bot.cash >= tile.price) {
      if (strategicScore >= 40) return true;
      return (bot.cash - tile.price) >= 800;
    } else {
      if (strategicScore >= 60 && (tile.price - bot.cash) <= 5000 && (bot.loan + 5000 <= 20000)) {
        const neededLoan = Math.min(5000, Math.ceil((tile.price - bot.cash) / 1000) * 1000);
        this.addLog(`💡 સ્માર્ટ નિર્ણય: ${bot.name} એ ${tile.name} ખરીદવા બેંક લોન લેવાનું નક્કી કર્યું!`, 'log-loan');
        this.takeBankLoan(bot, neededLoan);
        return true;
      }
      return false;
    }
  }

  botManageTurn(bot) {
    if (!bot.isBot || bot.isBankrupt) return;

    if (bot.loan > 0 && bot.cash > bot.loan + 4000) {
      this.repayBankLoan(bot);
    }

    const uniqueGroups = [...new Set(bot.properties.map(id => this.tiles[id].group))];
    uniqueGroups.forEach(grpKey => {
      const groupTiles = this.tiles.filter(t => t.group === grpKey && t.type === 'property');
      if (groupTiles.length === 0) return;

      const ownsAll = groupTiles.every(t => bot.properties.includes(t.id) && !bot.mortgaged[t.id]);
      if (ownsAll) {
        groupTiles.forEach(tile => {
          const curHouses = bot.houses[tile.id] || 0;
          if (curHouses < 4 && bot.cash >= (tile.houseCost || 1500) + 2000) {
            bot.cash -= (tile.houseCost || 1500);
            bot.houses[tile.id] = curHouses + 1;
            sound.playBuy();
            this.addLog(`🏗️ રોકાણ: ${bot.name} એ ${tile.name} પર ${curHouses >= 3 ? 'હોટેલ' : 'ઘર'} બાંધ્યું!`, 'log-money');
          }
        });
      }
    });
  }

  calculateRent(tile, owner) {
    if (tile.type === 'transport') {
      const count = owner.properties.filter(id => this.tiles[id].type === 'transport').length;
      const rents = [500, 1000, 2000, 4000];
      return rents[Math.min(count - 1, 3)] || 500;
    } else if (tile.type === 'utility') {
      return this.diceSum * 50;
    } else {
      const houses = owner.houses[tile.id] || 0;
      if (houses > 0 && tile.rent && tile.rent[houses]) {
        return tile.rent[houses];
      }
      const groupTiles = this.tiles.filter(t => t.group === tile.group);
      const ownsFullGroup = groupTiles.every(t => owner.properties.includes(t.id));
      const baseRent = (tile.rent && tile.rent[0]) || Math.round(tile.price * 0.1);
      return ownsFullGroup ? baseRent * 2 : baseRent;
    }
  }

  buyProperty(player, tile) {
    if (player.cash < tile.price) {
      this.addLog(`${player.name} પાસે ${tile.name} ખરીદવા પૂરતા પૈસા નથી!`);
      this.finishAction();
      return;
    }

    player.cash -= tile.price;
    player.properties.push(tile.id);
    this.bank.cash += tile.price;

    sound.playBuy();
    this.addLog(`${player.name} એ રૂ. ${tile.price.toLocaleString('gu-IN')} માં ${tile.name} ખરીદ્યું! 🎉`, 'log-money');

    this.renderBuildings();
    this.updateActiveTileCard(tile.id);
    this.updateUI();
    this.finishAction();
  }

  showBuyPropertyModal(player, tile) {
    this.showPropertyDeedCard(tile, false, player);
  }

  // =========================================================================
  // AUTHENTIC PHYSICAL TITLE DEED CARD (અસલ મિલકત પત્રિકા કાર્ડ)
  // =========================================================================
  showPropertyDeedCard(tileOrId, isInspect = true, landingPlayer = null) {
    const tile = typeof tileOrId === 'object' ? tileOrId : this.tiles[tileOrId];
    if (!tile) return;

    const modal = document.getElementById('modal-property');
    const header = document.getElementById('prop-modal-header');
    const title = document.getElementById('prop-modal-title');
    const subtitle = document.getElementById('prop-modal-sub');
    const priceVal = document.getElementById('prop-modal-price');
    const rentTable = document.getElementById('prop-modal-rent-table');
    const mortgageBox = document.getElementById('prop-modal-mortgage-box');
    const statusBox = document.getElementById('prop-modal-status-box');
    const buyBtn = document.getElementById('btn-buy-prop');
    const passBtn = document.getElementById('btn-pass-prop');
    const auctionBtn = document.getElementById('btn-auction-prop');
    const inspectCloseBtn = document.getElementById('btn-prop-inspect-close');
    const shortageAlert = document.getElementById('prop-insufficient-funds-alert');
    const shortageDesc = document.getElementById('prop-shortage-desc');
    const loanQuickBtn = document.getElementById('btn-prop-quick-loan');
    const questionEl = document.getElementById('prop-buy-question');

    const groupData = COLOR_GROUPS[tile.group] || { color: '#1976d2', name: tile.group };
    if (header) {
      header.style.backgroundColor = groupData.color;
      header.innerHTML = `
        <div class="deed-type-badge">મિલકત પત્રિકા • TITLE DEED</div>
        <h2>${tile.name}</h2>
        <div class="deed-subname">${tile.subName || ''}</div>
      `;
    }
    if (title) title.innerText = tile.name;
    if (subtitle) subtitle.innerText = tile.subName || '';
    if (priceVal) priceVal.innerText = `રૂ. ${tile.price.toLocaleString('gu-IN')}`;

    // Render Authentic Navo Vyapar Rent Table
    if (rentTable) {
      if (tile.rent && tile.rent.length >= 5) {
        rentTable.innerHTML = `
          <tr><td>ખાલી પ્લોટનું ભાડું (Site Rent):</td><td><b>રૂ. ${tile.rent[0].toLocaleString('gu-IN')}</b></td></tr>
          <tr><td>આખો કલર ગ્રૂપ સેટ હોય ત્યારે:</td><td><b>રૂ. ${(tile.rent[0] * 2).toLocaleString('gu-IN')}</b></td></tr>
          <tr><td>૧ ઘર સાથે ભાડું (With 1 House):</td><td><b>રૂ. ${tile.rent[1].toLocaleString('gu-IN')}</b></td></tr>
          <tr><td>૨ ઘર સાથે ભાડું (With 2 Houses):</td><td><b>રૂ. ${tile.rent[2].toLocaleString('gu-IN')}</b></td></tr>
          <tr><td>૩ ઘર સાથે ભાડું (With 3 Houses):</td><td><b>રૂ. ${tile.rent[3].toLocaleString('gu-IN')}</b></td></tr>
          <tr><td>🏨 ૧ ભવ્ય હોટેલ સાથે ભાડું:</td><td><b style="color:#b71c1c;">રૂ. ${tile.rent[4].toLocaleString('gu-IN')}</b></td></tr>
        `;
      } else if (tile.type === 'transport' || tile.type === 'vehicle') {
        rentTable.innerHTML = `
          <tr><td>૧ વાહન માલિકી:</td><td><b>રૂ. ૨૫૦</b></td></tr>
          <tr><td>૨ વાહન માલિકી:</td><td><b>રૂ. ૫૦૦</b></td></tr>
          <tr><td>૩ વાહન માલિકી:</td><td><b>રૂ. ૧,૦૦૦</b></td></tr>
          <tr><td>૪ વાહન માલિકી:</td><td><b>રૂ. ૨,૦૦૦</b></td></tr>
        `;
      } else if (tile.type === 'utility') {
        rentTable.innerHTML = `
          <tr><td>૧ કંપની માલિકી:</td><td><b>પાસાના સરવાળાના ૫ ગણા</b></td></tr>
          <tr><td>૨ કંપની માલિકી:</td><td><b>પાસાના સરવાળાના ૧૦ ગણા</b></td></tr>
        `;
      } else {
        rentTable.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:8px;">${tile.desc || 'વિશેષ મિલ્કત'}</td></tr>`;
      }
    }

    // Mortgage & Construction Cost Box
    const mortgageVal = Math.floor(tile.price * 0.5);
    const hCost = tile.houseCost || 1500;
    if (mortgageBox) {
      mortgageBox.innerHTML = `
        <div class="deed-mortgage-row">
          <span>🏦 મોર્ટગેજ (ગીરો) કિંમત:</span>
          <b>રૂ. ${mortgageVal.toLocaleString('gu-IN')} (૫૦%)</b>
        </div>
        <div class="deed-mortgage-row">
          <span>🏠 દરેક ઘર બાંધકામ ખર્ચ:</span>
          <b>રૂ. ${hCost.toLocaleString('gu-IN')}</b>
        </div>
        <div class="deed-mortgage-row">
          <span>🏨 હોટેલ ખર્ચ:</span>
          <b>રૂ. ${hCost.toLocaleString('gu-IN')} વત્તા ૪ ઘરો</b>
        </div>
      `;
    }

    // Real-time Live Game Status
    const owner = this.players.find(p => p.properties.includes(tile.id));
    const stats = this.propertyStats[tile.id] || { totalVisits: 0, totalRevenue: 0 };
    if (statusBox) {
      if (owner) {
        const houses = owner.houses[tile.id] || 0;
        const isMortgaged = !!(owner.mortgaged && owner.mortgaged[tile.id]);
        let houseText = '🌱 ખાલી પ્લોટ';
        if (houses >= 5) houseText = '🏨 ૧ ભવ્ય હોટેલ';
        else if (houses > 0) houseText = `🏠 ${houses} ઘરો નિર્મિત`;

        let activeRent = tile.rent ? tile.rent[0] : 250;
        if (tile.rent) {
          if (houses === 5) activeRent = tile.rent[4];
          else if (houses > 0) activeRent = tile.rent[houses];
          else if (this.isColorGroupOwned(owner, tile.group)) activeRent = tile.rent[0] * 2;
        }

        statusBox.innerHTML = `
          <div style="background:rgba(13, 24, 48, 0.95); border:1.5px solid #ffd54f; border-radius:10px; padding:10px 12px; color:#fff; font-size:12px; display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span>👑 વર્તમાન માલિક:</span>
              <span style="font-weight:bold; color:${owner.color};">${owner.name} ${isMortgaged ? '<b style="color:#ef5350;">(ગીરો)</b>' : ''}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span>🏗️ બાંધકામ સ્થિતિ:</span>
              <span style="font-weight:bold; color:#ffd54f;">${houseText}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span>💰 વર્તમાન સક્રિય ભાડું:</span>
              <span style="font-weight:bold; color:#69f0ae;">રૂ. ${activeRent.toLocaleString('gu-IN')}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#b0bec5; border-top:1px solid rgba(255,255,255,0.1); padding-top:4px; margin-top:2px;">
              <span>👥 મુલાકાતો: ${stats.totalVisits || 0} વાર</span>
              <span>કુલ આવક: રૂ. ${(stats.totalRevenue || 0).toLocaleString('gu-IN')}</span>
            </div>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background:rgba(13, 24, 48, 0.95); border:1.5px solid #81c784; border-radius:10px; padding:8px 12px; color:#fff; font-size:12px; text-align:center;">
            <div style="color:#81c784; font-weight:800; font-size:13px; margin-bottom:2px;">🏷️ સરકારી તિજોરી / ખરીદવા માટે ઉપલબ્ધ</div>
            <div style="color:#cfd8dc; font-size:11px;">કોઈપણ ખેલાડી આ ખાના પર આવીને અથવા હરાજીમાં આ મિલ્કત ખરીદી શકે છે.</div>
          </div>
        `;
      }
    }

    if (isInspect) {
      // Inspection mode - only show close button
      if (inspectCloseBtn) inspectCloseBtn.style.display = 'inline-block';
      if (buyBtn) buyBtn.style.display = 'none';
      if (passBtn) passBtn.style.display = 'none';
      if (auctionBtn) auctionBtn.style.display = 'none';
      if (shortageAlert) shortageAlert.style.display = 'none';
      if (questionEl) questionEl.style.display = 'none';

      if (inspectCloseBtn) {
        inspectCloseBtn.onclick = () => {
          this.closeModal('modal-property');
        };
      }
    } else {
      // Landing mode during turn - player deciding to buy
      const curP = landingPlayer || this.players[this.currentPlayerIndex];
      if (inspectCloseBtn) inspectCloseBtn.style.display = 'none';
      if (buyBtn) buyBtn.style.display = 'inline-block';
      if (passBtn) passBtn.style.display = 'inline-block';
      if (auctionBtn) auctionBtn.style.display = 'inline-block';
      if (questionEl) questionEl.style.display = 'block';

      const isShort = curP.cash < tile.price;
      if (isShort) {
        if (shortageAlert) shortageAlert.style.display = 'block';
        if (shortageDesc) {
          const diff = tile.price - curP.cash;
          shortageDesc.innerHTML = `આ મિલ્કતની કિંમત <b>રૂ. ${tile.price.toLocaleString('gu-IN')}</b> છે, જ્યારે તમારી પાસે માત્ર <b>રૂ. ${curP.cash.toLocaleString('gu-IN')}</b> છે.<br><b style="color:#ffd54f;">ખૂટતી રકમ: રૂ. ${diff.toLocaleString('gu-IN')}</b>`;
        }
        if (questionEl) questionEl.innerText = 'તમારી પાસે પૂરતા પૈસા નથી! તમે બેંક પાસેથી લોન લઈ શકો છો અથવા હરાજી કરાવી શકો છો:';
        if (buyBtn) {
          buyBtn.disabled = true;
          buyBtn.innerHTML = '❌ રોકડ ખૂટે છે';
          buyBtn.style.opacity = '0.5';
        }
        if (loanQuickBtn) {
          loanQuickBtn.onclick = () => {
            this.closeModal('modal-property');
            this.showBankLoanModal();
          };
        }
      } else {
        if (shortageAlert) shortageAlert.style.display = 'none';
        if (questionEl) questionEl.innerText = 'શું તમે આ મિલ્કત ખરીદવા માંગો છો?';
        if (buyBtn) {
          buyBtn.disabled = false;
          buyBtn.innerHTML = `🟢 ખરીદો (Buy: રૂ. ${tile.price.toLocaleString('gu-IN')})`;
          buyBtn.style.opacity = '1';
          buyBtn.onclick = () => {
            this.closeModal('modal-property');
            this.buyProperty(curP, tile);
          };
        }
      }

      if (passBtn) {
        passBtn.onclick = () => {
          this.closeModal('modal-property');
          this.addLog(`${curP.name} એ ${tile.name} ખરીદવાનું ટાળ્યું.`);
          this.finishAction();
        };
      }

      if (auctionBtn) {
        auctionBtn.onclick = () => {
          this.closeModal('modal-property');
          this.startPropertyAuction(tile);
        };
      }
    }

    this.openModal('modal-property');
  }

  // =========================================================================
  // LIVE PUBLIC PROPERTY AUCTION SYSTEM (જાહેર હરાજી - લીલામી)
  // =========================================================================
  startPropertyAuction(tile) {
    // Starting bid: 25% of property value (rounded to nearest 100, min 200)
    const baseStartingBid = Math.max(200, Math.floor((tile.price * 0.25) / 100) * 100);

    // Eligible bidders: all active non-bankrupt players who have at least baseStartingBid cash
    const activeBidders = this.players.filter(p => !p.isBankrupt && p.cash >= baseStartingBid);

    if (activeBidders.length === 0) {
      this.showScreenNotification('🔨', 'હરાજી રદ', `કોઈપણ ખેલાડી પાસે બોલી લગાવવા પૂરતી રોકડ નથી.`, '#ffd54f', 3500);
      this.addLog(`જાહેર હરાજી રદ: કોઈ પણ ખેલાડી પાસે ઓછામાં ઓછી રૂ. ${baseStartingBid} ની બોલી લગાવવા જેટલી રોકડ નથી.`);
      this.finishAction();
      return;
    }

    this.auctionState = {
      tile: tile,
      highestBid: baseStartingBid,
      highestBidder: null,
      activeBidders: activeBidders.slice(),
      currentIndex: 0
    };

    // Open Auction Modal
    this.openModal('modal-auction');
    sound.playDice();

    const colorBar = document.getElementById('auction-color-bar');
    const tileNameEl = document.getElementById('auction-tile-name');
    const basePriceEl = document.getElementById('auction-base-price');
    const groupData = COLOR_GROUPS[tile.group] || { color: '#1976d2' };

    if (colorBar) colorBar.style.backgroundColor = groupData.color;
    if (tileNameEl) tileNameEl.innerText = tile.name;
    if (basePriceEl) basePriceEl.innerText = `રૂ. ${tile.price.toLocaleString('gu-IN')}`;

    const historyLog = document.getElementById('auction-history-log');
    if (historyLog) {
      historyLog.innerHTML = `<div style="color:#ffd54f;">🔨 <b>${tile.name}</b> ની જાહેર હરાજી શરૂ થઈ! પ્રારંભિક બોલી: રૂ. ${baseStartingBid.toLocaleString('gu-IN')}</div>`;
    }

    this.showScreenNotification('🔨', 'જાહેર હરાજી શરૂ!', `${tile.name} ની બોલી શરૂ થઈ ગઈ છે!`, '#ff9800', 3500);
    this.addLog(`🔨 જાહેર હરાજી શરૂ: ${tile.name} (મૂળ કિંમત રૂ. ${tile.price.toLocaleString('gu-IN')}), પ્રારંભિક બોલી રૂ. ${baseStartingBid.toLocaleString('gu-IN')}`);

    this.updateAuctionUI();
    this.processAuctionTurn();
  }

  updateAuctionUI() {
    if (!this.auctionState) return;
    const { tile, highestBid, highestBidder, activeBidders, currentIndex } = this.auctionState;

    const highestBidEl = document.getElementById('auction-highest-bid');
    const highestBidderEl = document.getElementById('auction-highest-bidder');
    const turnStatusEl = document.getElementById('auction-turn-status');
    const humanControls = document.getElementById('auction-human-controls');

    if (highestBidEl) {
      highestBidEl.innerText = `રૂ. ${highestBid.toLocaleString('gu-IN')}`;
    }
    if (highestBidderEl) {
      if (highestBidder) {
        highestBidderEl.innerHTML = `સૌથી ઊંચી બોલીદાર: <b style="color:${highestBidder.color};">${highestBidder.name}</b>`;
      } else {
        highestBidderEl.innerText = `પ્રારંભિક બોલી: રૂ. ${highestBid.toLocaleString('gu-IN')} (હજી કોઈ બોલીદાર નથી)`;
      }
    }

    const currentBidder = activeBidders[currentIndex];
    if (!currentBidder) return;

    if (currentBidder.isBot) {
      if (turnStatusEl) {
        turnStatusEl.innerHTML = `🤖 <b style="color:${currentBidder.color};">${currentBidder.name}</b> વિચારી રહ્યા છે...`;
      }
      if (humanControls) {
        humanControls.style.opacity = '0.4';
        humanControls.style.pointerEvents = 'none';
      }
    } else {
      if (turnStatusEl) {
        turnStatusEl.innerHTML = `👉 <b style="color:${currentBidder.color};">તમારો વારો (${currentBidder.name})</b>: નવી બોલી લગાવો અથવા ખસી જાઓ`;
      }
      if (humanControls) {
        humanControls.style.opacity = '1';
        humanControls.style.pointerEvents = 'auto';

        const raiseButtons = humanControls.querySelectorAll('.btn-auction-raise');
        raiseButtons.forEach(btn => {
          const raise = parseInt(btn.getAttribute('data-raise'), 10) || 100;
          const nextBid = highestBidder ? (highestBid + raise) : highestBid;
          if (currentBidder.cash >= nextBid) {
            btn.disabled = false;
            btn.style.opacity = '1';
          } else {
            btn.disabled = true;
            btn.style.opacity = '0.35';
          }
        });
      }
    }
  }

  processAuctionTurn() {
    if (!this.auctionState) return;

    // Check conclusion conditions:
    // 1. If only 1 bidder remains and that bidder placed a bid: they win!
    if (this.auctionState.activeBidders.length === 1 && this.auctionState.highestBidder) {
      this.concludeAuction(this.auctionState.highestBidder);
      return;
    }

    // 2. If no active bidders left:
    if (this.auctionState.activeBidders.length === 0) {
      if (this.auctionState.highestBidder) {
        this.concludeAuction(this.auctionState.highestBidder);
      } else {
        this.closeModal('modal-auction');
        this.addLog(`જાહેર હરાજી રદ: કોઈ પણ ખેલાડીએ ${this.auctionState.tile.name} માટે બોલી ન લગાવી.`);
        this.showScreenNotification('🔨', 'હરાજી રદ', `${this.auctionState.tile.name} માટે કોઈ બોલીદાર ન મળ્યા.`, '#90a4ae', 3500);
        this.auctionState = null;
        this.finishAction();
      }
      return;
    }

    if (this.auctionState.currentIndex >= this.auctionState.activeBidders.length) {
      this.auctionState.currentIndex = 0;
    }

    const currentBidder = this.auctionState.activeBidders[this.auctionState.currentIndex];

    // If current bidder is already the highest bidder and no other active bidder wants to raise:
    if (this.auctionState.highestBidder && currentBidder.id === this.auctionState.highestBidder.id && this.auctionState.activeBidders.length === 1) {
      this.concludeAuction(currentBidder);
      return;
    }

    this.updateAuctionUI();

    if (currentBidder.isBot) {
      setTimeout(() => {
        if (!this.auctionState) return;
        this.botAuctionDecision(currentBidder);
      }, 900);
    }
  }

  botAuctionDecision(bot) {
    if (!this.auctionState) return;
    const { tile, highestBid, highestBidder } = this.auctionState;

    const groupTiles = this.tiles.filter(t => t.group === tile.group);
    const ownedByBot = groupTiles.filter(t => t.owner === bot.id).length;

    let multiplier = 0.75;
    if (ownedByBot === 1) multiplier = 0.95;
    if (ownedByBot >= 2) multiplier = 1.25;

    const maxAffordableBid = Math.max(0, bot.cash - 1200);
    const maxValuation = Math.floor(tile.price * multiplier);
    const maxBidLimit = Math.min(maxAffordableBid, maxValuation);

    const minNextBid = highestBidder ? (highestBid + 100) : highestBid;

    if (minNextBid <= maxBidLimit) {
      let raise = 100;
      if (maxBidLimit - minNextBid >= 500 && Math.random() < 0.45) raise = 500;
      else if (maxBidLimit - minNextBid >= 200 && Math.random() < 0.5) raise = 200;

      const newBid = highestBidder ? (highestBid + raise) : highestBid;
      this.auctionState.highestBid = newBid;
      this.auctionState.highestBidder = bot;

      sound.playDice();
      this.addAuctionLog(`🤖 <b>${bot.name}</b> એ રૂ. ${newBid.toLocaleString('gu-IN')} ની બોલી લગાવી!`);

      this.auctionState.currentIndex = (this.auctionState.currentIndex + 1) % this.auctionState.activeBidders.length;
      this.processAuctionTurn();
    } else {
      this.addAuctionLog(`${bot.name} બોલીમાંથી ખસી ગયા (Pass).`);
      this.auctionState.activeBidders.splice(this.auctionState.currentIndex, 1);
      if (this.auctionState.currentIndex >= this.auctionState.activeBidders.length) {
        this.auctionState.currentIndex = 0;
      }
      this.processAuctionTurn();
    }
  }

  humanAuctionBid(raiseAmount) {
    if (!this.auctionState) return;
    const currentBidder = this.auctionState.activeBidders[this.auctionState.currentIndex];
    if (!currentBidder || currentBidder.isBot) return;

    const nextBid = this.auctionState.highestBidder ? (this.auctionState.highestBid + raiseAmount) : this.auctionState.highestBid;
    if (currentBidder.cash < nextBid) {
      alert('તમારી પાસે આ બોલી લગાવવા પૂરતી રોકડ નથી!');
      return;
    }

    this.auctionState.highestBid = nextBid;
    this.auctionState.highestBidder = currentBidder;

    sound.playDice();
    this.addAuctionLog(`⭐ <b>${currentBidder.name}</b> એ રૂ. ${nextBid.toLocaleString('gu-IN')} ની બોલી લગાવી!`);

    this.auctionState.currentIndex = (this.auctionState.currentIndex + 1) % this.auctionState.activeBidders.length;
    this.processAuctionTurn();
  }

  humanAuctionFold() {
    if (!this.auctionState) return;
    const currentBidder = this.auctionState.activeBidders[this.auctionState.currentIndex];
    if (!currentBidder || currentBidder.isBot) return;

    this.addAuctionLog(`તમે (${currentBidder.name}) બોલીમાંથી ખસી ગયા.`);
    this.auctionState.activeBidders.splice(this.auctionState.currentIndex, 1);
    if (this.auctionState.currentIndex >= this.auctionState.activeBidders.length) {
      this.auctionState.currentIndex = 0;
    }
    this.processAuctionTurn();
  }

  addAuctionLog(msg) {
    const historyLog = document.getElementById('auction-history-log');
    if (historyLog) {
      const line = document.createElement('div');
      line.style.padding = '2px 0';
      line.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      line.innerHTML = msg;
      historyLog.appendChild(line);
      historyLog.scrollTop = historyLog.scrollHeight;
    }
  }

  concludeAuction(winner) {
    if (!this.auctionState) return;
    const { tile, highestBid } = this.auctionState;
    this.closeModal('modal-auction');

    winner.cash -= highestBid;
    this.bank.cash += highestBid;
    tile.owner = winner.id;
    winner.properties.push(tile.id);

    sound.playVictory();
    this.addLog(`🎉 જાહેર હરાજી પરિણામ: ${winner.name} એ રૂ. ${highestBid.toLocaleString('gu-IN')} માં ${tile.name} જીતી લીધી!`, 'log-buy');
    this.showScreenNotification('🔨', 'હરાજી સંપન્ન!', `${winner.name} એ રૂ. ${highestBid.toLocaleString('gu-IN')} માં ${tile.name} ની બોલી જીતી લીધી!`, '#ffd54f', 5000);

    this.auctionState = null;
    this.renderBoard();
    this.updateUI();
    this.finishAction();
  }

  // =========================================================================
  // TAX, CLUB, BHAGYA & VYAVAHAR
  // =========================================================================
  handleTaxLanding(player, tile) {
    const taxAmount = tile.amount || 500;
    const title = "🏛️ સરકારી ટેક્સ / મિલકત વેરો (Property Tax)";
    const text = `${player.name} પર સરકારી મિલકત વેરો રૂ. ${taxAmount.toLocaleString('gu-IN')} લાગુ થયો છે.\n\nનિયમ મુજબ આ રકમ સેન્ટ્રલ બેંક / સરકારી તિજોરીમાં જમા કરાવવાની રહેશે.`;

    this.showEventModal(title, text, () => {
      sound.playCash();
      this.addLog(`${player.name} પર સરકારી મિલ્કત વેરો રૂ. ${taxAmount} લાગુ થયો!`, 'log-jail');
      this.showScreenNotification('🏛️', 'સરકારી ટેક્સ ચૂકવાયો', `${player.name} એ રૂ. ${taxAmount} મિલકત વેરો સરકારી તિજોરીમાં જમા કરાવ્યો.`, '#ef5350', 4000);
      this.payMoney(player, 'BANK', taxAmount);
      this.finishAction();
    });
  }

  handleClubLanding(player, tile) {
    const fee = tile.fee || 200;
    const title = "🏰 ક્લબ સભ્ય ફી (Club Fee)";
    const text = `${player.name} ક્લબમાં પહોંચ્યા!\n\nક્લબ નિયમો મુજબ સભ્ય ફી રૂ. ${fee} બેંકમાં જમા કરાવવાની રહેશે.`;

    this.showEventModal(title, text, () => {
      sound.playCash();
      this.addLog(`${player.name} ક્લબમાં પહોંચ્યા! સભ્ય ફી રૂ. ${fee} બેંકને ચૂકવી.`);
      this.showScreenNotification('🏰', 'ક્લબ ફી ચૂકવાઈ', `${player.name} એ રૂ. ${fee} ક્લબ સભ્ય ફી ચૂકવી.`, '#ffd54f', 4000);
      this.payMoney(player, 'BANK', fee);
      this.finishAction();
    });
  }

  handleBhagyaLanding(player) {
    const isEven = this.diceSum % 2 === 0;
    const rulePool = isEven ? BHAGYA_RULES.EVEN : BHAGYA_RULES.ODD;
    let rule = rulePool[this.diceSum] || Object.values(rulePool)[0];

    if (player.isBot) {
      this.showScreenNotification('❓', 'ભાગ્ય (Bhagya)', `${player.name} માટે: ${rule.text}`, '#ffd54f', 3200);
      this.addLog(`❓ ભાગ્ય: ${player.name} પર "${rule.text}" લાગુ થયું.`);
      setTimeout(() => {
        this.executeRule(player, rule);
      }, 1400);
    } else {
      this.showEventModal("ભાગ્ય (Bhagya)", rule.text, () => {
        this.executeRule(player, rule);
      });
    }
  }

  handleVyavaharLanding(player) {
    const isEven = this.diceSum % 2 === 0;
    const rulePool = isEven ? VYAVAHAR_RULES.EVEN : VYAVAHAR_RULES.ODD;
    let rule = rulePool[this.diceSum] || Object.values(rulePool)[0];

    if (player.isBot) {
      this.showScreenNotification('🤝', 'વ્યવહાર (Vyavahar)', `${player.name} માટે: ${rule.text}`, '#ffd54f', 3200);
      this.addLog(`🤝 વ્યવહાર: ${player.name} પર "${rule.text}" લાગુ થયું.`);
      setTimeout(() => {
        this.executeRule(player, rule);
      }, 1400);
    } else {
      this.showEventModal("વ્યવહાર (Vyavahar)", rule.text, () => {
        this.executeRule(player, rule);
      });
    }
  }

  executeRule(player, rule) {
    switch (rule.action) {
      case 'pay_bank':
        sound.playCash();
        this.payMoney(player, 'BANK', Math.abs(rule.amount));
        this.finishAction();
        break;

      case 'get_bank':
        sound.playCash();
        player.cash += rule.amount;
        this.bank.cash = Math.max(0, this.bank.cash - rule.amount);
        this.addLog(`${player.name} એ બેંક પાસેથી રૂ. ${rule.amount} મેળવ્યા! 🎉`, 'log-money');
        this.finishAction();
        break;

      case 'go_jail':
        sound.playJail();
        this.sendToJail(player);
        this.finishAction();
        break;

      case 'go_rest':
        player.position = 27;
        player.missNextTurn = true;
        this.renderTokens(player.id);
        setTimeout(() => this.renderTokens(null), 300);
        this.addLog(`${player.name} આરામગૃહમાં ગયા અને આગામી ૧ દાવ રદ થશે.`, 'log-jail');
        this.finishAction();
        break;

      case 'go_mumbai_reward':
        player.position = 1;
        player.cash += 4500;
        this.bank.cash = Math.max(0, this.bank.cash - 4500);
        this.renderTokens(player.id);
        this.updateUI();
        sound.playCash();
        this.addLog(`${player.name} પાછા મુંબઈ પહોંચ્યા અને બોનસ + ઇનામ રૂ. ૪,૫૦૦ મેળવ્યા! 🎉`, 'log-money');
        this.showScreenNotification('🏙️', 'પાછા મુંબઈ પહોંચ્યા!', `${player.name} મુંબઈ પહોંચ્યા અને રૂ. ૪,૫૦૦ મેળવ્યા!`, '#69f0ae', 3500);
        setTimeout(() => {
          this.renderTokens(null);
          const mumbaiTile = this.tiles[1];
          const owner = this.players.find(p => p.properties.includes(1));
          if (!owner) {
            if (!player.isBot) {
              this.showBuyPropertyModal(player, mumbaiTile);
            } else {
              this.handlePropertyLanding(player, mumbaiTile);
            }
          } else if (owner.id !== player.id) {
            this.handlePropertyLanding(player, mumbaiTile);
          } else {
            this.finishAction();
          }
        }, 1200);
        break;

      case 'collect_from_players':
        sound.playCash();
        let totalCollected = 0;
        this.players.forEach(other => {
          if (other.id !== player.id && !other.isBankrupt) {
            const amt = Math.min(other.cash, rule.amountPerPlayer || 500);
            other.cash -= amt;
            totalCollected += amt;
          }
        });
        player.cash += totalCollected;
        this.addLog(`${player.name} ને જન્મતિથિ પર અન્ય ખેલાડીઓ પાસેથી કુલ રૂ. ${totalCollected} મળ્યા! 🎂`, 'log-money');
        this.finishAction();
        break;

      case 'repair_tax':
        let totalHouses = 0;
        let totalHotels = 0;
        Object.values(player.houses).forEach(cnt => {
          if (cnt >= 4) totalHotels++;
          else totalHouses += cnt;
        });
        const tax = (totalHouses * 50) + (totalHotels * 1000) || 200;
        this.payMoney(player, 'BANK', tax);
        this.addLog(`${player.name} એ બાંધકામ ખર્ચ પેટે રૂ. ${tax} બેંકને ચૂકવ્યા.`);
        this.finishAction();
        break;

      default:
        this.finishAction();
    }
    this.updateUI();
  }

  showEventModal(title, text, callback) {
    const modal = document.getElementById('modal-event');
    const titleEl = document.getElementById('event-modal-title');
    const textEl = document.getElementById('event-modal-text');
    const okBtn = document.getElementById('btn-event-ok');
    const closeBtn = modal?.querySelector('.modal-close');

    if (titleEl) titleEl.innerText = title;
    if (textEl) textEl.innerHTML = text.replace(/\n/g, '<br>');

    let handled = false;
    const doProceed = () => {
      if (handled) return;
      handled = true;
      this.closeModal('modal-event');
      if (callback) callback();
    };

    if (okBtn) {
      okBtn.innerHTML = 'ઠીક છે / આગળ વધો (OK)';
      okBtn.onclick = doProceed;
    }
    if (closeBtn) closeBtn.onclick = doProceed;

    this.openModal('modal-event');
    // NOTE: NEVER auto-dismiss via setTimeout!
    // Stays open until the player manually reads it and clicks OK or '×'.
  }

  showScreenNotification(icon, title, desc, color = '#ffd54f', duration = 4000) {
    const banner = document.getElementById('screen-event-banner');
    const iconEl = document.getElementById('event-banner-icon');
    const titleEl = document.getElementById('event-banner-title');
    const descEl = document.getElementById('event-banner-desc');

    if (iconEl && icon) iconEl.innerText = icon;
    if (titleEl && title) titleEl.innerText = title;
    if (descEl && desc) descEl.innerHTML = desc;

    if (banner) {
      banner.style.display = 'flex';
      if (color) {
        banner.style.borderColor = color;
      }
      banner.classList.remove('highlight-event');
      void banner.offsetWidth;
      banner.classList.add('highlight-event');

      if (this.notificationTimer) clearTimeout(this.notificationTimer);
      this.notificationTimer = setTimeout(() => {
        banner.classList.remove('highlight-event');
        banner.style.display = 'none';
      }, duration);
    }
  }

  // =========================================================================
  // JAIL MECHANICS
  // =========================================================================
  sendToJail(player) {
    player.position = 9;
    player.inJail = true;
    player.jailTurns = 0;
    this.renderTokens(player.id);
    setTimeout(() => this.renderTokens(null), 300);
    sound.playJail();
    this.addLog(`${player.name} ને જેલમાં મોકલવામાં આવ્યા! ⛓️`, 'log-jail');
  }

  handleJailTurn(player) {
    player.jailTurns++;
    this.addLog(`${player.name} જેલમાં છે (વર્તુળ: ${player.jailTurns}).`);

    if (player.isBot) {
      const unownedCount = this.tiles.filter(t => t.price > 0 && !this.players.some(p => p.properties.includes(t.id))).length;
      const isEarlyGame = unownedCount > 8;

      if (isEarlyGame && player.cash >= 500) {
        player.cash -= 500;
        this.bank.cash += 500;
        player.inJail = false;
        this.addLog(`${player.name} એ રૂ. ૫૦૦ દંડ ભરીને જમીન ખરીદવા જેલમાંથી મુક્તિ મેળવી.`);
        this.endTurn();
      } else if (player.jailTurns >= 3) {
        player.inJail = false;
        this.addLog(`${player.name} ૩ દાવ પૂરા થતાં જેલમાંથી મુક્ત થયા.`);
        this.endTurn();
      } else {
        this.addLog(`${player.name} એ વ્યૂહાત્મક રીતે જેલમાં જ રહેવાનું પસંદ કર્યું.`);
        this.endTurn();
      }
      return;
    }

    const modal = document.getElementById('modal-jail');
    const payBtn = document.getElementById('btn-jail-pay');
    const stayBtn = document.getElementById('btn-jail-stay');

    if (payBtn) {
      payBtn.disabled = player.cash < 500;
      payBtn.onclick = () => {
        this.closeModal('modal-jail');
        player.cash -= 500;
        this.bank.cash += 500;
        player.inJail = false;
        sound.playCash();
        this.addLog(`${player.name} એ રૂ. ૫૦૦ દંડ ભરી જેલમાંથી છૂટકારો મેળવ્યો.`);
        this.updateUI();
        this.endTurn();
      };
    }

    if (stayBtn) {
      stayBtn.onclick = () => {
        this.closeModal('modal-jail');
        if (player.jailTurns >= 3) {
          player.inJail = false;
          this.addLog(`${player.name} ૩ દાવ પૂરા થતાં જેલમાંથી મુક્ત થયા.`);
        }
        this.endTurn();
      };
    }

    this.openModal('modal-jail');
  }

  // =========================================================================
  // BANK LOAN SYSTEM
  // =========================================================================
  showBankLoanModal(targetPlayer = null) {
    try { sound.playClick(); } catch(e) {}
    const humanPlayer = this.players.find(p => !p.isBot) || this.players[0] || {
      id: 0, name: 'તમે', cash: 25000, loan: 0, bankLoans: [], properties: [], isBot: false
    };
    const player = targetPlayer || humanPlayer;
    const modal = document.getElementById('modal-loan');

    // Update Central Bank Vault Display inside Modal
    const modalVaultCash = document.getElementById('modal-bank-vault-cash');
    if (modalVaultCash) modalVaultCash.innerText = `₹ ${(this.bank.cash || 350000).toLocaleString('gu-IN')}`;
    const cashEl = document.getElementById('loan-player-cash');
    const currLoanEl = document.getElementById('loan-player-active');
    const takeBtn = document.getElementById('btn-take-loan');
    const repayBtn = document.getElementById('btn-repay-loan');

    // Defaults
    let activeLoanTab = 'bank';
    const bankTabBtn = document.getElementById('tab-btn-bank-loan');
    const p2pTabBtn = document.getElementById('tab-btn-p2p-loan');
    const bankContent = document.getElementById('loan-tab-content-bank');
    const p2pContent = document.getElementById('loan-tab-content-p2p');

    if (bankTabBtn && p2pTabBtn) {
      bankTabBtn.onclick = () => {
        bankTabBtn.style.background = 'rgba(255,213,79,0.15)';
        bankTabBtn.style.color = '#ffd54f';
        p2pTabBtn.style.background = 'rgba(255,255,255,0.05)';
        p2pTabBtn.style.color = '#cfd8dc';
        if (bankContent) bankContent.style.display = 'block';
        if (p2pContent) p2pContent.style.display = 'none';
      };
      p2pTabBtn.onclick = () => {
        p2pTabBtn.style.background = 'rgba(76,175,80,0.2)';
        p2pTabBtn.style.color = '#81c784';
        bankTabBtn.style.background = 'rgba(255,255,255,0.05)';
        bankTabBtn.style.color = '#cfd8dc';
        if (bankContent) bankContent.style.display = 'none';
        if (p2pContent) p2pContent.style.display = 'block';
        this.updateP2PLoanTabUI(player);
      };
    }

    if (cashEl) cashEl.innerText = `રૂ. ${player.cash.toLocaleString('gu-IN')}`;
    if (currLoanEl) currLoanEl.innerText = `રૂ. ${player.loan.toLocaleString('gu-IN')}`;

    document.querySelectorAll('#loan-tab-content-bank .loan-preset-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('#loan-tab-content-bank .loan-preset-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedLoanAmount = parseInt(btn.dataset.amount);
      };
    });

    const activeLoans = this.getActiveLoansCount(player);
    const slotsCounter = document.getElementById('loan-slots-counter');
    const slotStatusMsg = document.getElementById('loan-slot-status-msg');

    if (slotsCounter) slotsCounter.innerText = `${activeLoans} / 3 વપરાયેલ`;
    if (slotStatusMsg) {
      if (activeLoans >= 3) {
        slotStatusMsg.innerHTML = '<span style="color:#ef5350;">🚫 ૩/૩ લોન મર્યાદા પૂર્ણ! નવી લોન માટે જૂની ચૂકવો</span>';
      } else {
        slotStatusMsg.innerHTML = `<span style="color:#81c784;">✅ ${3 - activeLoans} લોન સ્લોટ ઉપલબ્ધ</span>`;
      }
    }

    if (takeBtn) {
      takeBtn.disabled = activeLoans >= 3 || (player.loan + this.selectedLoanAmount) > 20000;
      takeBtn.onclick = () => {
        if (this.getActiveLoansCount(player) >= 3) {
          alert('🚫 તમે એકસાથે વધુમાં વધુ ૩ સક્રિય લોન રાખી શકો છો! નવી લોન લેવા માટે જૂની લોન ચૂકવો.');
          return;
        }
        this.takeBankLoan(player, this.selectedLoanAmount);
        this.closeModal('modal-loan');
      };
    }

    if (repayBtn) {
      repayBtn.disabled = player.loan <= 0 || player.cash < player.loan;
      repayBtn.onclick = () => {
        this.repayBankLoan(player);
        this.closeModal('modal-loan');
      };
    }

    // Custom Repay Presets setup
    document.querySelectorAll('.btn-custom-repay-preset').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.btn-custom-repay-preset').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const input = document.getElementById('input-custom-loan-repay');
        if (!input) return;
        if (btn.dataset.amount === 'full') {
          input.value = Math.min(player.cash, player.loan);
        } else {
          input.value = Math.min(parseInt(btn.dataset.amount), Math.min(player.cash, player.loan));
        }
      };
    });

    // Custom Repay Action
    const doCustomRepayBtn = document.getElementById('btn-do-custom-repay');
    if (doCustomRepayBtn) {
      doCustomRepayBtn.disabled = player.loan <= 0 || player.cash <= 0;
      doCustomRepayBtn.onclick = () => {
        const input = document.getElementById('input-custom-loan-repay');
        const val = parseInt(input?.value);
        if (isNaN(val) || val <= 0) {
          alert('કૃપા કરીને માન્ય રકમ દાખલ કરો.');
          return;
        }
        this.repayBankLoanCustom(player, val);
      };
    }

    this.updateP2PLoanTabUI(player);
    this.openModal('modal-loan');
  }

  updateP2PLoanTabUI(player) {
    const lenderSelect = document.getElementById('p2p-lender-select');
    if (lenderSelect) {
      lenderSelect.innerHTML = '';
      const otherPlayers = this.players.filter(p => !p.isBankrupt && p.id !== player.id);
      if (otherPlayers.length === 0) {
        lenderSelect.innerHTML = '<option value="">કોઈ અન્ય ખેલાડી ઉપલબ્ધ નથી</option>';
      } else {
        otherPlayers.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.id;
          opt.innerText = `${p.name} (${p.isBot ? 'AI BOT' : 'માણસ'} - ઉપલબ્ધ રોકડ: રૂ. ${p.cash.toLocaleString('gu-IN')})`;
          lenderSelect.appendChild(opt);
        });
      }
    }

    document.querySelectorAll('.p2p-preset-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.p2p-preset-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedP2PAmount = parseInt(btn.dataset.amount);
      };
    });

    const reqBtn = document.getElementById('btn-request-p2p-loan');
    if (reqBtn) {
      reqBtn.onclick = () => {
        const lenderId = parseInt(lenderSelect?.value);
        if (isNaN(lenderId)) {
          alert('કૃપા કરીને લોન આપનાર ખેલાડી પસંદ કરો.');
          return;
        }
        this.takeP2PLoan(player, lenderId, this.selectedP2PAmount || 1000);
      };
    }

    // Render Active P2P loans
    const p2pActiveList = document.getElementById('p2p-active-loans-list');
    if (p2pActiveList) {
      if (!player.p2pLoans || player.p2pLoans.length === 0) {
        p2pActiveList.innerHTML = '<p style="font-size:12px; color:#b0bec5;">તમારી કોઈ ચાલુ ખેલાડી લોન નથી.</p>';
      } else {
        p2pActiveList.innerHTML = '';
        player.p2pLoans.forEach((loan, idx) => {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.06); padding:8px 10px; border-radius:6px; margin-bottom:6px; font-size:12.5px;';
          row.innerHTML = `
            <div>
              <b style="color:#ffd54f;">${loan.lenderName}</b> ની લોન: 
              <span style="color:#ef5350; font-weight:bold;">રૂ. ${loan.repayAmount.toLocaleString('gu-IN')}</span> (મૂળ: રૂ. ${loan.amount})
            </div>
            <button class="btn-icon" style="background:#2e7d32; border-color:#4caf50; padding:4px 10px; font-size:11px;" id="btn-repay-p2p-${idx}">
              💸 પરત ચૂકવો
            </button>
          `;
          p2pActiveList.appendChild(row);

          const btn = row.querySelector(`#btn-repay-p2p-${idx}`);
          if (btn) {
            btn.onclick = () => {
              this.repayP2PLoan(player, idx);
            };
          }
        });
      }
    }
  }

  takeP2PLoan(borrower, lenderId, amount) {
    const activeCount = this.getActiveLoansCount(borrower);
    if (activeCount >= 3) {
      alert('🚫 લોન મર્યાદા: તમે એકસાથે વધુમાં વધુ ૩ સક્રિય લોન રાખી શકો છો!\nનવી લોન લેવા માટે કૃપા કરીને જૂની લોન પરત ચૂકવો.');
      return;
    }
    const lender = this.players.find(p => p.id === lenderId);
    if (!lender) return;

    const interest = Math.round(amount * 0.10);
    const repayAmount = amount + interest;

    if (lender.isBot) {
      // Smart Bot Decision
      if (lender.cash >= (amount + 1200)) {
        lender.cash -= amount;
        borrower.cash += amount;
        if (!borrower.p2pLoans) borrower.p2pLoans = [];
        if (!lender.p2pLent) lender.p2pLent = [];

        borrower.p2pLoans.push({ lenderId: lender.id, lenderName: lender.name, amount, repayAmount });
        lender.p2pLent.push({ borrowerId: borrower.id, borrowerName: borrower.name, amount, repayAmount });

        sound.playLoan();
        this.addLog(`🤝 ખેલાડી લોન: ${lender.name} એ ${borrower.name} ને રૂ. ${amount.toLocaleString('gu-IN')} ની લોન મંજૂર કરી! (પરત: રૂ. ${repayAmount.toLocaleString('gu-IN')})`, 'log-loan');
        this.showScreenNotification('🤝', 'ખેલાડી લોન મંજૂર!', `${lender.name} એ તમારી રૂ. ${amount.toLocaleString('gu-IN')} ની લોન મંજૂર કરી! નાણાં તમારા ખાતામાં જમા થયા.`, '#81c784', 4500);
        this.closeModal('modal-loan');
        this.updateUI();
      } else {
        sound.playPenalty();
        alert(`${lender.name} પાસે હાલ પૂરતી રોકડ (રૂ. ${lender.cash.toLocaleString('gu-IN')}) ન હોવાથી લોન નકારી છે.`);
      }
    } else {
      // Human Lender
      const approved = confirm(`${borrower.name} તમારી પાસેથી રૂ. ${amount.toLocaleString('gu-IN')} ની લોન માંગે છે.\n\n૧૦% વ્યાજ સહિત તમને રૂ. ${repayAmount.toLocaleString('gu-IN')} પરત મળશે.\nશું તમે લોન આપવા માંગો છો?`);
      if (approved) {
        if (lender.cash < amount) {
          alert('તમારી પાસે આ રકમ આપવા પૂરતી રોકડ નથી!');
          return;
        }
        lender.cash -= amount;
        borrower.cash += amount;
        if (!borrower.p2pLoans) borrower.p2pLoans = [];
        if (!lender.p2pLent) lender.p2pLent = [];

        borrower.p2pLoans.push({ lenderId: lender.id, lenderName: lender.name, amount, repayAmount });
        lender.p2pLent.push({ borrowerId: borrower.id, borrowerName: borrower.name, amount, repayAmount });

        sound.playLoan();
        this.addLog(`🤝 ખેલાડી લોન: ${lender.name} એ ${borrower.name} ને રૂ. ${amount.toLocaleString('gu-IN')} ની લોન મંજૂર કરી!`, 'log-loan');
        this.showScreenNotification('🤝', 'ખેલાડી લોન મંજૂર!', `${lender.name} એ રૂ. ${amount.toLocaleString('gu-IN')} ની લોન મંજૂર કરી!`, '#81c784', 4500);
        this.closeModal('modal-loan');
        this.updateUI();
      }
    }
  }

  repayP2PLoan(borrower, loanIdx) {
    if (!borrower.p2pLoans || !borrower.p2pLoans[loanIdx]) return;
    const loan = borrower.p2pLoans[loanIdx];

    if (borrower.cash < loan.repayAmount) {
      alert(`તમારી પાસે લોન પરત ચૂકવવા પૂરતી રોકડ (રૂ. ${loan.repayAmount.toLocaleString('gu-IN')}) નથી!`);
      return;
    }

    borrower.cash -= loan.repayAmount;
    const lender = this.players.find(p => p.id === loan.lenderId);
    if (lender) {
      lender.cash += loan.repayAmount;
      if (lender.p2pLent) {
        lender.p2pLent = lender.p2pLent.filter(l => !(l.borrowerId === borrower.id && l.amount === loan.amount));
      }
    }

    borrower.p2pLoans.splice(loanIdx, 1);
    sound.playCash();
    this.addLog(`💰 ખેલાડી લોન ચૂકવણી: ${borrower.name} એ ${loan.lenderName} ને પૂરી રકમ રૂ. ${loan.repayAmount.toLocaleString('gu-IN')} વ્યાજ સહિત પરત કરી દીધી!`, 'log-money');
    this.showScreenNotification('💰', 'ખેલાડી લોન ચૂકવાઈ!', `${borrower.name} એ ${loan.lenderName} ને રૂ. ${loan.repayAmount.toLocaleString('gu-IN')} પરત ચૂકવી દીધા! દેવું મુક્ત થયા.`, '#ffd54f', 4000);
    this.updateP2PLoanTabUI(borrower);
    this.updateUI();
  }

  takeBankLoan(player, amount) {
    const activeCount = this.getActiveLoansCount(player);
    if (activeCount >= 3) {
      alert('🚫 લોન મર્યાદા: તમે એકસાથે વધુમાં વધુ ૩ સક્રિય લોન રાખી શકો છો!\nનવી લોન લેવા માટે કૃપા કરીને જૂની લોન પરત ચૂકવો.');
      return;
    }
    if (this.bank.cash < amount) {
      alert('બેંક તિજોરીમાં પૂરતી રોકડ નથી!');
      return;
    }

    const interest = Math.round(amount * 0.1);
    const totalRepay = amount + interest;

    if (!player.bankLoans) player.bankLoans = [];
    player.bankLoans.push({
      id: Date.now(),
      amount: amount,
      repayAmount: totalRepay,
      remaining: totalRepay
    });

    player.cash += amount;
    player.loan += totalRepay;
    this.bank.cash -= amount;
    this.bank.totalLoans += totalRepay;

    sound.playLoan();
    this.addLog(`${player.name} એ બેંક પાસેથી રૂ. ${amount.toLocaleString('gu-IN')} ની લોન લીધી! (સક્રિય લોન: ${this.getActiveLoansCount(player)}/૩)`, 'log-loan');
    this.showScreenNotification('🏛️', 'બેંક લોન મંજૂર!', `${player.name} ને બેંક પાસેથી રૂ. ${amount.toLocaleString('gu-IN')} ની લોન મળી! (સક્રિય લોન: ${this.getActiveLoansCount(player)}/૩)`, '#81c784', 4000);
    this.updateUI();
  }

  repayBankLoanCustom(player, amount) {
    if (player.loan <= 0) {
      alert('તમારી પર કોઈ બેંક લોન બાકી નથી!');
      return;
    }
    if (amount > player.cash) {
      alert(`તમારી પાસે ચૂકવવા માટે પૂરતી રોકડ (રૂ. ${amount.toLocaleString('gu-IN')}) નથી!`);
      return;
    }
    if (amount > player.loan) {
      amount = player.loan;
    }

    player.cash -= amount;
    player.loan -= amount;
    this.bank.cash += amount;
    this.bank.totalLoans = Math.max(0, this.bank.totalLoans - amount);

    // Deduct from bankLoans records sequentially
    if (player.bankLoans && player.bankLoans.length > 0) {
      let toDeduct = amount;
      for (let i = 0; i < player.bankLoans.length && toDeduct > 0; i++) {
        const bLoan = player.bankLoans[i];
        if (bLoan.remaining <= toDeduct) {
          toDeduct -= bLoan.remaining;
          bLoan.remaining = 0;
        } else {
          bLoan.remaining -= toDeduct;
          toDeduct = 0;
        }
      }
      player.bankLoans = player.bankLoans.filter(l => l.remaining > 0);
    }

    sound.playCash();
    this.addLog(`💰 બેંક લોન ચૂકવણી: ${player.name} એ રૂ. ${amount.toLocaleString('gu-IN')} ચૂકવ્યા! (બાકી લોન દેવું: રૂ. ${player.loan.toLocaleString('gu-IN')})`, 'log-money');
    this.showScreenNotification('💰', 'બેંક લોન ચૂકવાઈ!', `${player.name} એ બેંકને રૂ. ${amount.toLocaleString('gu-IN')} ચૂકવ્યા! (બાકી લોન દેવું: રૂ. ${player.loan.toLocaleString('gu-IN')})`, '#ffd54f', 4000);

    if (player.loan === 0) {
      player.bankLoans = [];
    }

    this.updateUI();
    this.showBankLoanModal();
  }

  repayBankLoan(player) {
    if (player.loan <= 0) return;
    if (player.cash < player.loan) {
      this.addLog(`${player.name} પાસે લોન ચૂકવવા પૂરતા પૈસા નથી!`);
      return;
    }

    const repayAmt = player.loan;
    player.cash -= repayAmt;
    this.bank.cash += repayAmt;
    this.bank.totalLoans = Math.max(0, this.bank.totalLoans - repayAmt);
    player.loan = 0;
    player.bankLoans = [];

    sound.playCash();
    this.addLog(`${player.name} એ બેંકની તમામ લોન રૂ. ${repayAmt.toLocaleString('gu-IN')} સફળતાપૂર્વક ચૂકવી દીધી! 👏`, 'log-money');
    this.showScreenNotification('🏛️', 'બેંક લોન ચૂકવાઈ!', `${player.name} એ બેંકની રૂ. ${repayAmt.toLocaleString('gu-IN')} ની પૂરી લોન ચૂકવી દીધી! 👏`, '#ffd54f', 4000);
    this.updateUI();
  }

  // =========================================================================
  // PLAYER PROPERTY PORTFOLIO & COLOR GROUP MONOPOLY INSPECTION MODAL
  // =========================================================================
  showPlayerPortfolioModal(selectedPlayerId) {
    const tabsContainer = document.getElementById('portfolio-player-tabs');
    const bodyContainer = document.getElementById('portfolio-modal-body');

    if (!tabsContainer || !bodyContainer) return;

    // Render Player Tabs
    tabsContainer.innerHTML = '';
    this.players.forEach(p => {
      const pill = document.createElement('button');
      pill.className = `portfolio-player-pill ${p.id === selectedPlayerId ? 'active' : ''}`;
      pill.innerHTML = `
        <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${p.color};"></span>
        ${p.name}
      `;
      pill.onclick = () => {
        sound.playClick();
        this.showPlayerPortfolioModal(p.id);
      };
      tabsContainer.appendChild(pill);
    });

    const targetId = typeof selectedPlayerId === 'object' ? selectedPlayerId.id : selectedPlayerId;
    const targetPlayer = this.players.find(p => p.id === targetId) || this.players[0];

    let propVal = targetPlayer.properties.reduce((sum, id) => sum + this.tiles[id].price, 0);
    let netWorth = targetPlayer.cash + propVal - targetPlayer.loan;

    // Summary Card
    let html = `
      <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:12px 16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:50%; background:${targetPlayer.color}; display:flex; align-items:center; justify-content:center; border:2px solid #fff;">
              ${getPlayerTokenSVG(targetPlayer.shape || 'pawn', targetPlayer.color, targetPlayer.id)}
            </div>
            <div>
              <h4 style="font-size:17px; color:#ffd54f; margin:0;">${targetPlayer.name}</h4>
              <span style="font-size:11px; color:#cfd8dc;">${targetPlayer.isBot ? '🤖 સ્માર્ટ AI કોમ્પ્યુટર બોટ' : '👤 માનવ ખેલાડી'}</span>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px; color:#cfd8dc;">કુલ નેટવર્થ</div>
            <div style="font-size:18px; font-weight:900; color:#81c784;">રૂ. ${netWorth.toLocaleString('gu-IN')}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; text-align:center; background:rgba(0,0,0,0.3); padding:8px; border-radius:8px; font-size:11.5px;">
          <div><span style="color:#b0bec5;">રોકડ:</span><br><b style="color:#fff;">રૂ. ${targetPlayer.cash.toLocaleString('gu-IN')}</b></div>
          <div><span style="color:#b0bec5;">મિલ્કતો:</span><br><b style="color:#ffd54f;">${targetPlayer.properties.length} મિલ્કતો</b></div>
          <div><span style="color:#b0bec5;">બેંક લોન:</span><br><b style="color:#ef5350;">રૂ. ${targetPlayer.loan.toLocaleString('gu-IN')}</b></div>
          <div><span style="color:#b0bec5;">મિલ્કત મૂલ્ય:</span><br><b style="color:#4fc3f7;">રૂ. ${propVal.toLocaleString('gu-IN')}</b></div>
        </div>
      </div>

      <h4 style="color:#ffd54f; font-size:14px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
        🎨 કલર ગ્રૂપ મુજબ મિલ્કતો & હોટેલ પ્રગતિ:
      </h4>
    `;

    // Group all buyable tiles by group
    const buyableTiles = this.tiles.filter(t => t.price > 0);
    const groups = {};
    buyableTiles.forEach(t => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });

    Object.keys(groups).forEach(grpKey => {
      const allPropsInGroup = groups[grpKey];
      const grpInfo = COLOR_GROUPS[grpKey] || { name: grpKey, color: '#607d8b' };
      const ownedByThisPlayer = allPropsInGroup.filter(t => targetPlayer.properties.includes(t.id));
      const countOwned = ownedByThisPlayer.length;
      const totalCount = allPropsInGroup.length;
      const percent = Math.round((countOwned / totalCount) * 100);
      const isMonopoly = (countOwned === totalCount);

      html += `
        <div class="portfolio-group-card" style="border-left:4px solid ${grpInfo.color};">
          <div class="portfolio-group-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${grpInfo.color};"></span>
              <b style="color:#ffffff; font-size:13.5px;">${grpInfo.name}</b>
              <span style="font-size:11.5px; color:#ffd54f;">[${countOwned} / ${totalCount} મિલ્કતો]</span>
            </div>
            <div>
              ${isMonopoly ? '<span class="monopoly-star-badge" style="font-size:11px; padding:2px 8px;">🏆 પૂર્ણ સેટ - હોટેલ શક્ય!</span>' : `<span style="font-size:11px; color:#cfd8dc;">${percent}% પૂર્ણ</span>`}
            </div>
          </div>

          <div class="portfolio-progress-bar-bg">
            <div class="portfolio-progress-bar-fill" style="width:${percent}%; background:${grpInfo.color};"></div>
          </div>

          <div style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
      `;

      allPropsInGroup.forEach(prop => {
        const isOwned = targetPlayer.properties.includes(prop.id);
        const owner = this.players.find(p => p.properties.includes(prop.id));
        const houses = targetPlayer.houses[prop.id] || 0;
        let houseLabel = '';
        if (isOwned) {
          if (houses >= 5) houseLabel = '🏨 હોટેલ';
          else if (houses > 0) houseLabel = `🏠 ${houses} મકાન`;
        }

        const stats = this.propertyStats[prop.id] || { totalVisits: 0, totalRevenue: 0 };

        html += `
          <div style="display:flex; justify-content:space-between; align-items:center; background:${isOwned ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.2)'}; padding:6px 10px; border-radius:6px; cursor:pointer; transition:background 0.2s;" onclick="game.showPropertyDeedCard(${prop.id}, true)">
            <div>
              <span style="${isOwned ? 'color:#81c784; font-weight:bold;' : 'color:#90a4ae;'}">${isOwned ? '✅' : '⚪'} ${prop.name}</span>
              <span style="font-size:10.5px; color:#cfd8dc; margin-left:6px;">(કિંમત: રૂ. ${prop.price.toLocaleString('gu-IN')})</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              ${houseLabel ? `<span style="background:rgba(255,213,79,0.2); color:#ffd54f; padding:1px 6px; border-radius:4px; font-size:10.5px;">${houseLabel}</span>` : ''}
              ${isOwned ? `<span style="color:#ffd54f; font-size:10.5px;">આવક: રૂ. ${stats.totalRevenue.toLocaleString('gu-IN')}</span>` : `<span style="color:#cfd8dc; font-size:10.5px;">${owner ? `માલિક: ${owner.name}` : 'હજી વેચાયેલ નથી'}</span>`}
            </div>
          </div>
        `;
      });

      if (!isMonopoly && countOwned > 0) {
        const missing = allPropsInGroup.filter(t => !targetPlayer.properties.includes(t.id));
        html += `
          <div style="font-size:11px; color:#ffd54f; margin-top:4px; padding:3px 6px; background:rgba(255,213,79,0.08); border-radius:4px;">
            💡 <b>સેટ પૂર્ણ કરવા બાકી:</b> ${missing.map(m => m.name).join(', ')} (આ ખરીદતાં જ હોટેલ બાંધી શકાશે!)
          </div>
        `;
      }

      html += '</div></div>';
    });

    bodyContainer.innerHTML = html;
    this.openModal('modal-player-portfolio');
  }

  // =========================================================================
  // PROPERTY MANAGEMENT & MORTGAGE
  // =========================================================================
  showPropertyManageModal() {
    const player = this.getCurrentPlayer();
    const modal = document.getElementById('modal-manage');
    const container = document.getElementById('manage-props-list');

    if (!container) return;
    container.innerHTML = '';

    if (player.properties.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:#90a4ae; padding:20px; font-size:16px;">તમારી પાસે હાલ કોઈ મિલ્કત નથી.</p>';
    } else {
      player.properties.forEach(propId => {
        const tile = this.tiles[propId];
        const isMortgaged = !!player.mortgaged[propId];
        const houses = player.houses[propId] || 0;
        const groupTiles = this.tiles.filter(t => t.group === tile.group);
        const ownsFullGroup = groupTiles.every(t => player.properties.includes(t.id));

        const card = document.createElement('div');
        card.className = 'panel-card';
        card.style.marginBottom = '12px';
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <h4 style="color:#ffd54f; font-size:16px;">${tile.name} (${tile.subName})</h4>
              <p style="font-size:13px; color:#cfd8dc;">મૂળ કિંમત: રૂ. ${tile.price.toLocaleString('gu-IN')} | બાંધકામ: ${houses >= 4 ? '૧ હોટેલ' : houses + ' ઘરો'}</p>
              ${isMortgaged ? '<span style="color:#ef5350; font-weight:bold; font-size:12px;">[બેંકમાં ગીરો છે]</span>' : ''}
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${ownsFullGroup && !isMortgaged && houses < 4 && tile.houseCost ? `
                <button class="btn-icon" id="build-${tile.id}" style="background:#2e7d32; font-size:13px; padding:8px 12px;">
                  ➕ ઘર બાંધો (રૂ. ${tile.houseCost})
                </button>
              ` : ''}
              ${!isMortgaged ? `
                <button class="btn-icon" id="mortgage-${tile.id}" style="background:#c62828; font-size:13px; padding:8px 12px;">
                  🏦 ગીરો મૂકો (+રૂ. ${Math.round(tile.price * 0.5)})
                </button>
              ` : `
                <button class="btn-icon" id="unmortgage-${tile.id}" style="background:#0288d1; font-size:13px; padding:8px 12px;">
                  🔓 છૂટી કરાવો (-રૂ. ${Math.round(tile.price * 0.55)})
                </button>
              `}
            </div>
          </div>
        `;

        container.appendChild(card);

        const buildBtn = card.querySelector(`#build-${tile.id}`);
        if (buildBtn) {
          buildBtn.onclick = () => {
            if (player.cash >= tile.houseCost) {
              player.cash -= tile.houseCost;
              player.houses[tile.id] = (player.houses[tile.id] || 0) + 1;
              sound.playCash();
              this.addLog(`${player.name} એ ${tile.name} પર નવું બાંધકામ કર્યું!`);
              this.renderBuildings();
              this.showPropertyManageModal();
              this.updateUI();
            } else {
              this.addLog(`ઘર બાંધવા પૂરતા પૈસા નથી!`);
            }
          };
        }

        const mortBtn = card.querySelector(`#mortgage-${tile.id}`);
        if (mortBtn) {
          mortBtn.onclick = () => {
            const mortVal = Math.round(tile.price * 0.5);
            player.mortgaged[tile.id] = true;
            player.cash += mortVal;
            sound.playCash();
            this.addLog(`${player.name} એ ${tile.name} ગીરો મૂકી રૂ. ${mortVal} મેળવ્યા.`, 'log-loan');
            this.renderBuildings();
            this.showPropertyManageModal();
            this.updateUI();
          };
        }

        const unmortBtn = card.querySelector(`#unmortgage-${tile.id}`);
        if (unmortBtn) {
          unmortBtn.onclick = () => {
            const cost = Math.round(tile.price * 0.55);
            if (player.cash >= cost) {
              player.cash -= cost;
              delete player.mortgaged[tile.id];
              sound.playCash();
              this.addLog(`${player.name} એ ${tile.name} ગીરોમાંથી મુક્ત કરાવી!`);
              this.renderBuildings();
              this.showPropertyManageModal();
              this.updateUI();
            } else {
              this.addLog(`મિલ્કત છોડાવવા પૂરતા પૈસા નથી!`);
            }
          };
        }
      });
    }

    this.openModal('modal-manage');
  }

  // =========================================================================
  // MONEY TRANSFER & BANKRUPTCY
  // =========================================================================
  payMoney(fromPlayer, toPlayerOrBank, amount) {
    if (fromPlayer.cash < amount) {
      const deficit = amount - fromPlayer.cash;
      this.addLog(`ચેતવણી: ${fromPlayer.name} પાસે રૂ. ${deficit} ની ઘટ છે!`, 'log-jail');

      if (fromPlayer.isBot) {
        const nonSetProps = fromPlayer.properties.filter(id => !fromPlayer.mortgaged[id]);
        for (const pid of nonSetProps) {
          if (fromPlayer.cash >= amount) break;
          fromPlayer.mortgaged[pid] = true;
          const val = Math.round(this.tiles[pid].price * 0.5);
          fromPlayer.cash += val;
          this.addLog(`${fromPlayer.name} એ દેવું ચૂકવવા ${this.tiles[pid].name} ગીરો મૂક્યું (+રૂ. ${val}).`);
        }

        if (fromPlayer.cash < amount && fromPlayer.loan + 5000 <= 20000) {
          this.takeBankLoan(fromPlayer, 5000);
        }
      }
    }

    const actualPay = Math.min(fromPlayer.cash, amount);
    fromPlayer.cash -= actualPay;

    if (toPlayerOrBank === 'BANK') {
      this.bank.cash += actualPay;
    } else {
      toPlayerOrBank.cash += actualPay;
    }

    if (fromPlayer.cash <= 0 && fromPlayer.properties.length === 0 && fromPlayer.loan > 10000) {
      fromPlayer.isBankrupt = true;
      this.addLog(`દુર્ભાગ્યપૂર્ણ! ${fromPlayer.name} નાદાર (Bankrupt) જાહેર થયા! ❌`, 'log-jail');
      this.checkWinner();
    }
    this.updateUI();
  }

  // =========================================================================
  // TURN MANAGEMENT & BOT AUTOMATION
  // =========================================================================
  finishAction() {
    this.turnPhase = 'END';
    this.isMoving = false;
    this.updateUI();

    const player = this.getCurrentPlayer();
    if (player && player.isBot) {
      try {
        this.botManageTurn(player);
      } catch (e) {
        console.warn('Bot manage turn error:', e);
      }
      this.checkBotTurn();
    }
  }

  endTurn() {
    if (this.isMoving || this.isRolling) return; // Never end turn while token is in motion!

    if (this._botTurnTimer) {
      clearTimeout(this._botTurnTimer);
      this._botTurnTimer = null;
    }

    let nextIdx = (this.currentPlayerIndex + 1) % this.players.length;
    let attempts = 0;
    while (this.players[nextIdx].isBankrupt && attempts < this.players.length) {
      nextIdx = (nextIdx + 1) % this.players.length;
      attempts++;
    }

    this.currentPlayerIndex = nextIdx;
    this.turnPhase = 'ROLL';
    this.isRolling = false;
    this.isMoving = false;
    this.isTurnProcessing = false;
    this._turnCounter = (this._turnCounter || 0) + 1;
    this.updateUI();

    const nextPlayer = this.getCurrentPlayer();
    this.addLog(`હવે ${nextPlayer.name} નો દાવ છે.`);
    this.showScreenNotification('🎲', 'નવો દાવ શરૂ!', `હવે ${nextPlayer.name} નો દાવ છે! પાસા ફેંકો.`, nextPlayer.color, 2000);

    this.isGameActive = true;
    this.saveGameState();

    if (nextPlayer.isBot) {
      this.checkBotTurn();
    }
  }

  checkBotTurn() {
    const player = this.getCurrentPlayer();
    if (!player || !player.isBot || player.isBankrupt) return;

    if (this.isAnyModalOpen() || this.isMoving || this.isRolling) return;

    if (this._botTurnTimer) {
      clearTimeout(this._botTurnTimer);
      this._botTurnTimer = null;
    }

    const currentTurnId = this._turnCounter;

    if (this.turnPhase === 'ROLL') {
      this._botTurnTimer = setTimeout(() => {
        if (currentTurnId !== this._turnCounter || this.isAnyModalOpen() || this.isMoving || this.isRolling) return;
        const cur = this.getCurrentPlayer();
        if (cur && cur.id === player.id && cur.isBot && this.turnPhase === 'ROLL') {
          this.rollDice();
        }
      }, 950);
    } else if (this.turnPhase === 'END') {
      this._botTurnTimer = setTimeout(() => {
        if (currentTurnId !== this._turnCounter || this.isAnyModalOpen() || this.isMoving || this.isRolling) return;
        const cur = this.getCurrentPlayer();
        if (cur && cur.id === player.id && cur.isBot && this.turnPhase === 'END') {
          this.endTurn();
        }
      }, 850);
    }
  }

  startBotWatchdog() {
    if (this._watchdogInterval) clearInterval(this._watchdogInterval);
    this._watchdogInterval = setInterval(() => {
      if (!this.isGameActive) return;
      if (this.isAnyModalOpen()) return;
      if (this.isMoving || this.isRolling || this.isTurnProcessing) return;

      const player = this.getCurrentPlayer();
      if (!player || !player.isBot || player.isBankrupt) return;

      // Watchdog failsafe: Only triggers if bot is completely idle for >3.5s
      if (this.turnPhase === 'ROLL' && !this.isRolling && !this.isMoving) {
        this.rollDice();
      } else if (this.turnPhase === 'END' && !this.isMoving) {
        this.endTurn();
      }
    }, 3500);
  }

  checkWinner() {
    const active = this.players.filter(p => !p.isBankrupt);
    if (active.length === 1 && this.players.length > 1) {
      const winner = active[0];
      sound.playBuy();
      this.clearSavedGameState();
      alert(`અભિનંદન! ${winner.name} નવો વ્યાપાર રમતમાં મહાન વિજેતા બન્યા છે! 🏆👑`);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex] || this.players[0];
  }

  // =========================================================================
  // UI UPDATES & ACCESSIBILITY
  // =========================================================================
  toggleSeniorMode() {
    this.seniorMode = !this.seniorMode;
    document.body.classList.toggle('senior-mode', this.seniorMode);
    const btn = document.getElementById('btn-toggle-senior');
    if (btn) {
      btn.innerHTML = this.seniorMode ? '👓 સામાન્ય મોડ' : '👓 મોટા અક્ષરો (વડીલો માટે)';
    }
    this.addLog(this.seniorMode ? "મોટા અક્ષરો અને હાઇ-કોન્ટ્રાસ્ટ વ્યુ સક્રિય થયો." : "સામાન્ય વ્યુ સક્રિય થયો.");
  }

  updateUI() {
    const curPlayer = this.getCurrentPlayer();
    if (!curPlayer) return;

    const rollBtn = document.getElementById('btn-roll-dice');
    const rollBtnMobile = document.getElementById('btn-roll-mobile');
    const endBtn = document.getElementById('btn-end-turn');
    const endBtnMobile = document.getElementById('btn-end-mobile');
    const loanBtn = document.getElementById('btn-loan-quick');
    const manageBtn = document.getElementById('btn-manage-quick');

    const canRoll = this.turnPhase === 'ROLL' && !curPlayer.isBot;
    const canEnd = this.turnPhase === 'END' && !curPlayer.isBot;

    if (rollBtn) {
      rollBtn.disabled = !canRoll;
      rollBtn.style.display = (this.turnPhase === 'ROLL') ? 'inline-flex' : 'none';
    }
    if (rollBtnMobile) {
      rollBtnMobile.disabled = !canRoll;
      rollBtnMobile.style.display = (this.turnPhase === 'ROLL') ? 'inline-flex' : 'none';
    }
    if (endBtn) {
      endBtn.disabled = !canEnd;
      endBtn.style.display = (this.turnPhase === 'END') ? 'inline-flex' : 'none';
    }
    if (endBtnMobile) {
      endBtnMobile.disabled = !canEnd;
      endBtnMobile.style.display = (this.turnPhase === 'END') ? 'inline-flex' : 'none';
    }
    if (loanBtn) loanBtn.disabled = curPlayer.isBot;
    if (manageBtn) manageBtn.disabled = curPlayer.isBot;

    const loanBtnMobile = document.getElementById('btn-loan-mobile');
    const manageBtnMobile = document.getElementById('btn-manage-mobile');
    if (loanBtnMobile) loanBtnMobile.disabled = curPlayer.isBot;
    if (manageBtnMobile) manageBtnMobile.disabled = curPlayer.isBot;

    const bCash = document.getElementById('bank-vault-cash');
    const bLoans = document.getElementById('bank-active-loans');
    if (bCash) bCash.innerText = `રૂ. ${this.bank.cash.toLocaleString('gu-IN')}`;
    if (bLoans) bLoans.innerText = `રૂ. ${this.bank.totalLoans.toLocaleString('gu-IN')}`;

    // Top Bar Central Bank Pill
    const bCashPill = document.getElementById('bank-vault-cash-pill');
    const bLoansPill = document.getElementById('bank-active-loans-pill');
    if (bCashPill) bCashPill.innerText = `રૂ. ${this.bank.cash.toLocaleString('gu-IN')}`;
    if (bLoansPill) bLoansPill.innerText = `રૂ. ${this.bank.totalLoans.toLocaleString('gu-IN')}`;

    // Ludo King Corner Player Badges
    for (let i = 0; i < 6; i++) {
      const badge = document.getElementById(`corner-player-${i}`);
      if (!badge) continue;

      if (i >= this.players.length) {
        badge.style.display = 'none';
        continue;
      }

      const p = this.players[i];
      badge.style.display = 'flex';
      badge.classList.toggle('active-turn', i === this.currentPlayerIndex);
      badge.style.opacity = p.isBankrupt ? '0.35' : '1';

      const nameEl = document.getElementById(`corner-name-${i}`);
      const cashEl = document.getElementById(`corner-cash-${i}`);
      const turnBadge = document.getElementById(`corner-badge-${i}`);
      const avatarEl = document.getElementById(`corner-avatar-${i}`);
      const charEl = document.getElementById(`corner-char-${i}`);

      if (nameEl) nameEl.innerText = p.name;
      if (cashEl) cashEl.innerText = `₹ ${p.cash.toLocaleString('gu-IN')}`;
      if (turnBadge) turnBadge.style.display = (i === this.currentPlayerIndex) ? 'inline-block' : 'none';
      if (avatarEl) {
        avatarEl.style.backgroundColor = p.color;
        avatarEl.style.borderColor = (i === this.currentPlayerIndex) ? '#ffd54f' : '#ffffff';
      }
      if (charEl) {
        charEl.innerText = p.name.charAt(0);
      }
    }

    // Desktop 3-Column Arena Cards (Laptop / Desktop)
    for (let i = 0; i < 4; i++) {
      const card = document.getElementById(`desk-card-${i}`);
      if (!card) continue;
      if (i >= this.players.length) {
        card.style.display = 'none';
        continue;
      }
      const p = this.players[i];
      card.style.display = 'flex';
      card.classList.toggle('active-turn', i === this.currentPlayerIndex);
      card.style.opacity = p.isBankrupt ? '0.35' : '1';

      const nameEl = document.getElementById(`desk-name-${i}`);
      const cashEl = document.getElementById(`desk-cash-${i}`);
      const badgeEl = document.getElementById(`desk-badge-${i}`);
      const propsEl = document.getElementById(`desk-props-${i}`);
      const networthEl = document.getElementById(`desk-networth-${i}`);
      const avatarEl = document.getElementById(`desk-avatar-${i}`);

      let propVal = p.properties.reduce((sum, id) => sum + (this.tiles[id]?.price || 0), 0);
      let netWorth = p.cash + propVal - p.loan;

      if (nameEl) nameEl.innerText = p.name;
      if (cashEl) cashEl.innerText = `₹ ${p.cash.toLocaleString('gu-IN')}`;
      if (badgeEl) badgeEl.style.display = (i === this.currentPlayerIndex) ? 'inline-block' : 'none';
      if (propsEl) propsEl.innerText = p.properties.length;
      if (networthEl) networthEl.innerText = `₹ ${netWorth.toLocaleString('gu-IN')}`;
      if (avatarEl) {
        avatarEl.style.backgroundColor = p.color;
        avatarEl.innerText = p.name.charAt(0);
      }
    }

    // Desktop Bank Card
    const deskBankCash = document.getElementById('desk-bank-cash');
    const deskBankLoans = document.getElementById('desk-bank-loans');
    if (deskBankCash) deskBankCash.innerText = `₹ ${this.bank.cash.toLocaleString('gu-IN')}`;
    if (deskBankLoans) deskBankLoans.innerText = `₹ ${this.bank.totalLoans.toLocaleString('gu-IN')}`;

    // Desktop Live News Feed
    const deskLogsBox = document.getElementById('desktop-logs-box');
    if (deskLogsBox && this.logs && this.logs.length > 0) {
      deskLogsBox.innerHTML = this.logs.slice(-15).reverse().map(l => `
        <div style="background:rgba(255,255,255,0.04); padding:4px 6px; border-radius:4px; border-left:3px solid #ffd54f;">
          <span style="color:#ffd54f; font-size:10px;">[${l.time || ''}]</span> ${l.msg}
        </div>
      `).join('');
    }

    // Center Dock Turn Indicator
    const centerTurnPawn = document.getElementById('center-turn-pawn');
    const centerTurnText = document.getElementById('center-turn-text');
    if (centerTurnPawn && curPlayer) {
      centerTurnPawn.innerHTML = getPlayerTokenSVG(curPlayer.shape || 'pawn', curPlayer.color, curPlayer.id);
    }
    if (centerTurnText && curPlayer) {
      if (!curPlayer.isBot) {
        if (this.turnPhase === 'ROLL') {
          centerTurnText.innerText = '⭐ તમારો દાવ: પાસા ફેંકો';
        } else if (this.turnPhase === 'ACTION') {
          centerTurnText.innerText = '🎯 તમારો નિર્ણય: કાર્યવાહી કરો...';
        } else {
          centerTurnText.innerText = '⭐ દાવ પૂરો: નીચે બટન દબાવો';
        }
      } else {
        centerTurnText.innerText = `🤖 ${curPlayer.name} નો દાવ ચાલુ છે...`;
      }
    }

    const pList = document.getElementById('players-list-container');
    if (pList) {
      pList.innerHTML = '';
      this.players.forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = `player-item ${idx === this.currentPlayerIndex ? 'active' : ''} ${p.isBankrupt ? 'bankrupt' : ''}`;
        
        let propVal = p.properties.reduce((sum, id) => sum + this.tiles[id].price, 0);
        let netWorth = p.cash + propVal - p.loan;

        // Group properties by color group
        const groupMap = {};
        p.properties.forEach(tileId => {
          const t = this.tiles[tileId];
          if (!groupMap[t.group]) groupMap[t.group] = [];
          groupMap[t.group].push(t);
        });

        // Render group pills
        let groupsHtml = '';
        const groupKeys = Object.keys(groupMap);
        if (groupKeys.length === 0) {
          groupsHtml = '<div style="font-size:11px; color:#90a4ae; font-style:italic;">હજી કોઈ મિલ્કત નથી</div>';
        } else {
          groupsHtml = '<div class="player-property-pills-wrap">';
          groupKeys.forEach(grpKey => {
            const grpInfo = COLOR_GROUPS[grpKey] || { name: grpKey, color: '#607d8b' };
            const totalInGroup = this.tiles.filter(t => t.group === grpKey && t.price > 0).length;
            const ownedProps = groupMap[grpKey];
            const isComplete = (ownedProps.length === totalInGroup);

            let tilesPills = ownedProps.map(t => {
              const h = p.houses[t.id] || 0;
              const hIcon = (h >= 5) ? ' 🏨' : (h > 0 ? ` 🏠${h}` : '');
              return `<span class="mini-tile-pill" style="border-left:3px solid ${grpInfo.color};">${t.name}${hIcon}</span>`;
            }).join('');

            groupsHtml += `
              <div class="group-pill-row" style="border-left-color:${grpInfo.color};">
                <div class="group-pill-header">
                  <span class="group-name-tag">
                    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${grpInfo.color};"></span>
                    ${grpInfo.name} [${ownedProps.length}/${totalInGroup}]
                  </span>
                  ${isComplete ? '<span class="monopoly-star-badge" title="પૂર્ણ સેટ! હોટેલ બાંધી શકાય">🏆 સેટ પૂર્ણ</span>' : ''}
                </div>
                <div class="group-tiles-mini-list">
                  ${tilesPills}
                </div>
              </div>
            `;
          });
          groupsHtml += '</div>';
        }

        // P2P Loans summary
        let p2pLoanText = '';
        if (p.p2pLoans && p.p2pLoans.length > 0) {
          const totalP2P = p.p2pLoans.reduce((sum, l) => sum + l.repayAmount, 0);
          p2pLoanText = `<span class="player-loan-tag" style="background:#ad1457; color:#fff;" title="ખેલાડી લોન દેવું">🤝 ખેલાડી લોન: રૂ. ${totalP2P.toLocaleString('gu-IN')}</span>`;
        }

        item.innerHTML = `
          <div class="player-header">
            <div class="player-avatar" style="background:${p.color};">
              ${getPlayerTokenSVG(p.shape || 'pawn', p.color, p.id)}
            </div>
            <div class="player-info-meta" style="flex:1;">
              <div class="player-name-row" style="display:flex; justify-content:space-between; align-items:center;">
                <span class="player-name">${p.name}</span>
                ${p.isBot ? '<span class="player-bot-tag">AI BOT</span>' : '<span class="player-human-tag">માણસ</span>'}
              </div>
              <div class="player-cash">રોકડ: રૂ. ${p.cash.toLocaleString('gu-IN')}</div>
            </div>
          </div>
          <div class="player-details-row" style="display:flex; justify-content:space-between; font-size:11.5px; color:#cfd8dc; margin-top:2px;">
            <span>મિલ્કતો: <b>${p.properties.length}</b></span>
            ${p.loan > 0 ? `<span class="player-loan-tag">બેંક લોન: રૂ. ${p.loan}</span>` : ''}
            ${p2pLoanText}
            <span>નેટવર્થ: રૂ. ${netWorth.toLocaleString('gu-IN')}</span>
          </div>
          ${groupsHtml}
          <button class="btn-view-portfolio" data-player-id="${p.id}">
            🔍 ${p.name} ની મિલ્કતો & પ્રગતિ જુઓ
          </button>
        `;

        pList.appendChild(item);
      });

      pList.querySelectorAll('.btn-view-portfolio').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          sound.playClick();
          const pid = parseInt(btn.dataset.playerId);
          this.showPlayerPortfolioModal(pid);
        };
      });
    }

    this.renderBuildings();
    this.saveGameState();
  }

  addLog(msg, type = '') {
    const time = new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.logs.unshift({ msg, type, time });
    if (this.logs.length > 50) this.logs.pop();

    const container = document.getElementById('game-logs-box');
    if (container) {
      container.innerHTML = this.logs.map(log => `
        <div class="log-entry ${log.type}">
          <span style="font-size:11px; opacity:0.8;">[${log.time}]</span> ${log.msg}
        </div>
      `).join('');
    }

    const deskLogs = document.getElementById('desktop-logs-box');
    if (deskLogs) {
      deskLogs.innerHTML = this.logs.slice(0, 15).map(log => `
        <div style="background:rgba(255,255,255,0.04); padding:4px 6px; border-radius:4px; border-left:3px solid #ffd54f;">
          <span style="color:#ffd54f; font-size:10px;">[${log.time}]</span> ${log.msg}
        </div>
      `).join('');
    }
  }

  showTileDetails(tile) {
    if (tile.price > 0) {
      this.showPropertyDeedCard(tile.id, true);
    } else {
      this.updateActiveTileCard(tile.id, true);
    }
  }

  isAnyModalOpen() {
    return !!document.querySelector('.modal-overlay.active');
  }

  openModal(id) {
    if (this._botTurnTimer) {
      clearTimeout(this._botTurnTimer);
      this._botTurnTimer = null;
    }
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');

    // Only if ALL modals are closed, resume bot turn
    if (!this.isAnyModalOpen()) {
      const cur = this.getCurrentPlayer();
      if (cur && cur.isBot && !cur.isBankrupt && this.isGameActive) {
        setTimeout(() => this.checkBotTurn(), 400);
      }
    }
  }

  // =========================================================================
  // LUDO KING MODAL SELECTION & TOKEN CUSTOMIZATION CONTROLLER
  // =========================================================================
  updateLudoLaunchUI() {
    const mode = this.selectedGameMode;
    const count = this.selectedPlayerCount;

    document.querySelectorAll('.ludo-mode-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.mode === mode);
    });

    document.querySelectorAll('.ludo-count-btn').forEach(btn => {
      btn.classList.toggle('selected', parseInt(btn.dataset.count) === count);
    });

    // Update Token Preview for Player 1
    const tokenPreview = document.getElementById('player1-token-preview');
    if (tokenPreview) {
      tokenPreview.innerHTML = getPlayerTokenSVG(this.player1CustomShape, this.player1CustomColor, 999);
    }

    // Update active color circle
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.color === this.player1CustomColor);
    });

    // Update active shape card
    document.querySelectorAll('.shape-choice-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.shape === this.player1CustomShape);
    });

    const subContainer = document.getElementById('ludo-mode-suboptions');
    if (!subContainer) return;

    if (mode === 'VS_COMPUTER') {
      subContainer.innerHTML = `
        <div class="ludo-sub-box">
          <p style="color:#ffd54f; font-weight:bold; margin-bottom:4px;">
            🤖 ૧ માણસ (તમે) vs ${count - 1} સ્માર્ટ AI કોમ્પ્યુટર બોટ્સ
          </p>
          <p style="font-size:12px; color:#cfd8dc;">
            કોમ્પ્યુટર સાચા માણસની જેમ ચતુરાઈથી રમશે, ભાડું વસૂલશે અને જરૂર પડ્યે બેંક લોન પણ લેશે!
          </p>
        </div>
      `;
    } else if (mode === 'FRIENDS_FAMILY') {
      let inputsHtml = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">';
      const defaultNames = ['તમે (પી-૧)', 'પ્લેયર ૨', 'પ્લેયર ૩', 'પ્લેયર ૪', 'પ્લેયર ૫', 'પ્લેયર ૬'];
      for (let i = 0; i < count; i++) {
        inputsHtml += `
          <div>
            <label style="font-size:11px; color:#ffe082;">ખેલાડી ${i + 1} નામ:</label>
            <input type="text" id="friend-name-${i}" class="ludo-input" value="${defaultNames[i]}" placeholder="ખેલાડી નામ">
          </div>
        `;
      }
      inputsHtml += '</div>';

      subContainer.innerHTML = `
        <div class="ludo-sub-box">
          <p style="color:#81c784; font-weight:bold; margin-bottom:4px;">
            👨‍👩‍👧‍👦 મિત્રો અને પરિવાર મોડ (કોઈ કોમ્પ્યુટર નહીં - ૧૦૦% માણસો!)
          </p>
          <p style="font-size:12px; color:#cfd8dc;">બધા ખેલાડીઓ વારાફરતી પોતાનો દાવ રમશે (Pass & Play):</p>
          ${inputsHtml}
        </div>
      `;
    } else {
      let mixHtml = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">';
      for (let i = 0; i < count; i++) {
        mixHtml += `
          <div>
            <label style="font-size:11px; color:#ffd54f;">સ્લોટ ${i + 1}:</label>
            <select id="custom-isbot-${i}" class="ludo-input" style="padding:4px;">
              <option value="human" ${i === 0 ? 'selected' : ''}>👤 માણસ</option>
              <option value="bot" ${i > 0 ? 'selected' : ''}>🤖 કોમ્પ્યુટર (AI)</option>
            </select>
          </div>
        `;
      }
      mixHtml += '</div>';

      subContainer.innerHTML = `
        <div class="ludo-sub-box">
          <p style="color:#ffb74d; font-weight:bold; margin-bottom:4px;">
            🔀 કસ્ટમ ટીમ મોડ (માણસ + કોમ્પ્યુટર મિક્સ)
          </p>
          ${mixHtml}
        </div>
      `;
    }
  }

  setupEventListeners() {
    this.setupBoardZoomAndPan();

    const rollBtn = document.getElementById('btn-roll-dice');
    if (rollBtn) rollBtn.onclick = () => this.rollDice();

    const rollBtnMobile = document.getElementById('btn-roll-mobile');
    if (rollBtnMobile) rollBtnMobile.onclick = () => this.rollDice();

    const endBtn = document.getElementById('btn-end-turn');
    if (endBtn) endBtn.onclick = () => this.endTurn();

    const endBtnMobile = document.getElementById('btn-end-mobile');
    if (endBtnMobile) endBtnMobile.onclick = () => this.endTurn();

    const loanBtn = document.getElementById('btn-loan-quick');
    if (loanBtn) loanBtn.onclick = () => this.showBankLoanModal();

    const loanBtnCenter = document.getElementById('btn-loan-quick-center');
    if (loanBtnCenter) loanBtnCenter.onclick = () => this.showBankLoanModal();

    const loanBtnMobile = document.getElementById('btn-loan-mobile');
    if (loanBtnMobile) loanBtnMobile.onclick = () => this.showBankLoanModal();

    const manageBtn = document.getElementById('btn-manage-quick');
    if (manageBtn) manageBtn.onclick = () => this.showPropertyManageModal();

    const manageBtnMobile = document.getElementById('btn-manage-mobile');
    if (manageBtnMobile) manageBtnMobile.onclick = () => this.showPropertyManageModal();

    const topBankBtn = document.getElementById('btn-top-bank');
    if (topBankBtn) topBankBtn.onclick = () => this.showBankLoanModal();

    const deskLoanBtn = document.getElementById('btn-desk-loan-action');
    if (deskLoanBtn) deskLoanBtn.onclick = () => this.showBankLoanModal();

    // Desktop player cards click: open player portfolio modal
    for (let i = 0; i < 4; i++) {
      const card = document.getElementById(`desk-card-${i}`);
      if (card) {
        card.onclick = () => {
          if (this.players && this.players[i]) {
            sound.playClick();
            this.showPlayerPortfolioModal(this.players[i]);
          }
        };
      }
    }

    // Corner badges click: open player portfolio modal
    for (let i = 0; i < 6; i++) {
      const badge = document.getElementById(`corner-player-${i}`);
      if (badge) {
        badge.onclick = () => {
          if (this.players && this.players[i]) {
            sound.playClick();
            this.showPlayerPortfolioModal(this.players[i]);
          }
        };
      }
    }

    // Close tile toast button
    const closeToastBtn = document.getElementById('btn-close-tile-toast');
    if (closeToastBtn) {
      closeToastBtn.onclick = () => {
        const toast = document.getElementById('tile-tap-toast');
        if (toast) toast.style.display = 'none';
      };
    }

    const inspectCloseBtn = document.getElementById('btn-prop-inspect-close');
    if (inspectCloseBtn) {
      inspectCloseBtn.onclick = () => {
        sound.playClick();
        this.closeModal('modal-property');
      };
    }

    const seniorBtn = document.getElementById('btn-toggle-senior');
    if (seniorBtn) seniorBtn.onclick = () => this.toggleSeniorMode();

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.onclick = () => {
        const isMuted = sound.toggleMute();
        soundBtn.innerHTML = isMuted ? '🔇 અવાજ બંધ' : '🔊 અવાજ ચાલુ';
      };
    }

    const rulesBtn = document.getElementById('btn-view-rules');
    if (rulesBtn) rulesBtn.onclick = () => this.openModal('modal-rules');

    const boardRefBtn = document.getElementById('btn-view-board-ref');
    if (boardRefBtn) boardRefBtn.onclick = () => this.openModal('modal-board-ref');

    const newGameBtn = document.getElementById('btn-new-game');
    if (newGameBtn) newGameBtn.onclick = () => {
      if (this.isGameActive && this.players.length > 0) {
        const ok = confirm('શું તમે ચાલુ રમત બંધ કરીને તદ્દન નવી રમત શરૂ કરવા માંગો છો? (ચાલુ રમતનો ડેટા સાફ થશે)');
        if (!ok) return;
      }
      this.clearSavedGameState();
      this.openModal('modal-ludo-launch');
      this.updateLudoLaunchUI();
    };

    window.addEventListener('beforeunload', () => {
      this.saveGameState();
    });

    document.querySelectorAll('.modal-close, .btn-modal-cancel').forEach(btn => {
      btn.onclick = (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) this.closeModal(modal.id);
      };
    });

    document.querySelectorAll('.ludo-mode-card').forEach(card => {
      card.onclick = () => {
        sound.playClick();
        this.selectedGameMode = card.dataset.mode;
        this.updateLudoLaunchUI();
      };
    });

    document.querySelectorAll('.ludo-count-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        this.selectedPlayerCount = parseInt(btn.dataset.count);
        this.updateLudoLaunchUI();
      };
    });

    // Color Swatches Selection for Player 1
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        this.player1CustomColor = btn.dataset.color;
        this.updateLudoLaunchUI();
      };
    });

    // Shape Choices Selection for Player 1
    document.querySelectorAll('.shape-choice-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        this.player1CustomShape = btn.dataset.shape;
        this.updateLudoLaunchUI();
      };
    });

    const ludoStartBtn = document.getElementById('btn-ludo-start-game');
    if (ludoStartBtn) {
      ludoStartBtn.onclick = () => {
        this.startCustomGame(this.selectedGameMode, this.selectedPlayerCount);
      };
    }

    // Live Auction Controls
    const foldBtn = document.getElementById('btn-auction-fold');
    if (foldBtn) {
      foldBtn.onclick = () => this.humanAuctionFold();
    }

    const raiseButtons = document.querySelectorAll('.btn-auction-raise');
    raiseButtons.forEach(btn => {
      btn.onclick = () => {
        const raise = parseInt(btn.getAttribute('data-raise'), 10) || 100;
        this.humanAuctionBid(raise);
      };
    });

    const auctionCloseBtn = document.querySelector('#modal-auction .modal-close');
    if (auctionCloseBtn) {
      auctionCloseBtn.onclick = () => {
        if (this.auctionState) {
          this.humanAuctionFold();
        } else {
          this.closeModal('modal-auction');
        }
      };
    }
  }

  // =========================================================================
  // HIGH-PERFORMANCE 60-120FPS MOBILE BOARD ZOOM & PAN CONTROLLER
  // =========================================================================
  setupBoardZoomAndPan() {
    const viewport = document.getElementById('board-pan-viewport');
    const board = document.getElementById('game-board');
    const btnFit = document.getElementById('btn-zoom-fit');
    const btnZ1 = document.getElementById('btn-zoom-1');
    const btnZ2 = document.getElementById('btn-zoom-2');
    const hint = document.getElementById('zoom-pan-hint');

    if (!viewport || !board) return;

    let currentScale = 1.0;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialPanX = 0;
    let initialPanY = 0;
    let initialPinchDistance = 0;
    let initialScale = 1.0;

    const clampPan = (scale, x, y) => {
      if (scale <= 1.0) return { x: 0, y: 0 };
      const vWidth = viewport.clientWidth;
      const vHeight = viewport.clientHeight;
      const bWidth = vWidth * scale;
      const bHeight = vHeight * scale;
      const maxPanX = (bWidth - vWidth) / 2;
      const maxPanY = (bHeight - vHeight) / 2;
      return {
        x: Math.max(-maxPanX, Math.min(maxPanX, x)),
        y: Math.max(-maxPanY, Math.min(maxPanY, y))
      };
    };

    const applyTransform = (smooth = true) => {
      const clamped = clampPan(currentScale, panX, panY);
      panX = clamped.x;
      panY = clamped.y;

      board.style.transition = smooth ? 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none';
      board.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${currentScale})`;

      if (hint) {
        hint.style.display = (currentScale > 1.05) ? 'flex' : 'none';
      }

      if (btnFit && btnZ1 && btnZ2) {
        btnFit.classList.toggle('active', Math.abs(currentScale - 1.0) < 0.08);
        btnZ1.classList.toggle('active', Math.abs(currentScale - 1.35) < 0.08);
        btnZ2.classList.toggle('active', Math.abs(currentScale - 1.70) < 0.08);
      }
    };

    const setZoom = (scale) => {
      currentScale = scale;
      if (currentScale <= 1.0) {
        panX = 0;
        panY = 0;
      }
      applyTransform(true);
    };

    if (btnFit) btnFit.onclick = () => setZoom(1.0);
    if (btnZ1) btnZ1.onclick = () => setZoom(1.35);
    if (btnZ2) btnZ2.onclick = () => setZoom(1.70);

    // Touch events for dual-finger pinch zoom and single-finger pan
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialScale = currentScale;
        initialPanX = panX;
        initialPanY = panY;
      } else if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        initialPanX = panX;
        initialPanY = panY;
        window._isBoardPanning = false;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialPinchDistance > 0) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / initialPinchDistance;
        currentScale = Math.min(2.1, Math.max(1.0, initialScale * factor));
        applyTransform(false);
        window._isBoardPanning = true;
      } else if (e.touches.length === 1 && isDragging && currentScale > 1.05) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.hypot(dx, dy) > 8) {
          window._isBoardPanning = true;
        }
        panX = initialPanX + dx;
        panY = initialPanY + dy;
        applyTransform(false);
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        initialPinchDistance = 0;
      }
      if (e.touches.length === 0) {
        isDragging = false;
        applyTransform(true);
        setTimeout(() => {
          window._isBoardPanning = false;
        }, 120);
      }
    }, { passive: true });
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.game = new NavoVyaparGame();
  window.game.init();
});
