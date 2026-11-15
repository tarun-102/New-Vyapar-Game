// icons.js - તમામ શહેરો, ચિહ્નો અને ૮ પ્રકારના કસ્ટમ ૩D ટોકન્સ (Custom 3D Pawn Shapes)

export function getPlayerTokenSVG(shape = 'pawn', color = '#e53935', id = 0) {
  const gradId = `token-grad-${id}`;
  const darkGradId = `token-dark-${id}`;

  const shapes = {
    // ૧. ક્લાસિક ૩D ગોટી (Classic Pawn)
    pawn: `
      <ellipse cx="15" cy="36" rx="11" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <ellipse cx="15" cy="33" rx="10" ry="3" fill="#111"/>
      <path d="M7 33 C7 26, 10 22, 11 16 L19 16 C20 22, 23 26, 23 33 Z" fill="url(#${gradId})"/>
      <ellipse cx="15" cy="16" rx="5" ry="1.8" fill="#fff" opacity="0.8"/>
      <circle cx="15" cy="9" r="6.5" fill="url(#${gradId})" stroke="#fff" stroke-width="0.8"/>
      <ellipse cx="13" cy="7" rx="2.2" ry="1.4" fill="#ffffff" opacity="0.8"/>
    `,

    // ૨. વિન્ટેજ ગાડી (Classic Vintage Car)
    car: `
      <ellipse cx="15" cy="34" rx="13" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <path d="M4 26 L7 19 L13 14 L21 14 L26 19 L28 26 Z" fill="url(#${gradId})" stroke="#222" stroke-width="1"/>
      <path d="M9 19 L13 15 L20 15 L23 19 Z" fill="#b3e5fc" opacity="0.9"/>
      <rect x="2" y="24" width="26" height="7" rx="3" fill="url(#${darkGradId})"/>
      <circle cx="7" cy="31" r="3.5" fill="#212121" stroke="#fff" stroke-width="1"/>
      <circle cx="23" cy="31" r="3.5" fill="#212121" stroke="#fff" stroke-width="1"/>
      <circle cx="27" cy="26" r="1.5" fill="#ffeb3b"/>
    `,

    // ૩. સઢવાળું વહાણ (Sailing Clipper Ship)
    ship: `
      <ellipse cx="15" cy="35" rx="12" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <path d="M4 27 L26 27 L24 33 L7 33 Z" fill="url(#${darkGradId})" stroke="#222" stroke-width="1"/>
      <line x1="15" y1="27" x2="15" y2="6" stroke="#5d4037" stroke-width="1.8"/>
      <path d="M15 7 Q22 11 22 17 L15 16 Z" fill="url(#${gradId})" stroke="#fff" stroke-width="0.8"/>
      <path d="M15 17 Q24 21 24 26 L15 25 Z" fill="url(#${gradId})" stroke="#fff" stroke-width="0.8"/>
      <path d="M15 10 Q9 13 9 18 L15 17 Z" fill="#ffffff" opacity="0.9"/>
      <polygon points="15,6 18,7 15,8" fill="#ffd54f"/>
    `,

    // ૪. જેટ વિમાન (Air Jet Plane)
    plane: `
      <ellipse cx="15" cy="34" rx="12" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <path d="M13 5 L17 5 L18 20 L27 24 L27 28 L17 25 L16 33 L20 36 L17 36 L15 34 L13 36 L10 36 L14 33 L13 25 L3 28 L3 24 L12 20 Z" fill="url(#${gradId})" stroke="#222" stroke-width="1"/>
      <ellipse cx="15" cy="9" rx="1.5" ry="3" fill="#e1f5fe"/>
    `,

    // ૫. રોયલ ટોપી (Top Hat)
    hat: `
      <ellipse cx="15" cy="34" rx="13" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <ellipse cx="15" cy="30" rx="12" ry="4" fill="url(#${darkGradId})" stroke="#111" stroke-width="1"/>
      <path d="M8 30 L8 12 L22 12 L22 30 Z" fill="url(#${gradId})" stroke="#111" stroke-width="1"/>
      <ellipse cx="15" cy="12" rx="7" ry="2.5" fill="url(#${gradId})" stroke="#fff" stroke-width="0.8"/>
      <rect x="8" y="26" width="14" height="3" fill="#ffd54f"/>
    `,

    // ૬. સોનેરી મુગટ (Royal Crown)
    crown: `
      <ellipse cx="15" cy="34" rx="12" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <path d="M5 30 L6 16 L10 22 L15 12 L20 22 L24 16 L25 30 Z" fill="url(#${gradId})" stroke="#222" stroke-width="1"/>
      <rect x="5" y="27" width="20" height="4" rx="1" fill="#ffd54f" stroke="#e65100" stroke-width="0.8"/>
      <circle cx="6" cy="16" r="1.8" fill="#ffeb3b"/>
      <circle cx="15" cy="12" r="2.2" fill="#ffeb3b"/>
      <circle cx="24" cy="16" r="1.8" fill="#ffeb3b"/>
      <circle cx="10" cy="28" r="1.2" fill="#e53935"/>
      <circle cx="15" cy="28" r="1.5" fill="#2e7d32"/>
      <circle cx="20" cy="28" r="1.2" fill="#1e88e5"/>
    `,

    // ૭. રજવાડી ઘોડો (Knight / Horse)
    horse: `
      <ellipse cx="15" cy="35" rx="11" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <ellipse cx="15" cy="32" rx="9" ry="3" fill="#111"/>
      <path d="M9 32 C8 24, 7 17, 12 11 C13 7, 16 6, 17 9 C18 10, 22 13, 21 17 C20 19, 17 19, 15 22 C14 24, 18 25, 20 32 Z" fill="url(#${gradId})" stroke="#222" stroke-width="1"/>
      <circle cx="16" cy="12" r="1.2" fill="#ffffff"/>
      <circle cx="16" cy="12" r="0.6" fill="#000000"/>
    `,

    // ૮. ચમકતો હીરો / રત્ન (Diamond Jewel)
    diamond: `
      <ellipse cx="15" cy="35" rx="11" ry="3.5" fill="rgba(0,0,0,0.5)"/>
      <polygon points="15,6 25,16 15,33 5,16" fill="url(#${gradId})" stroke="#fff" stroke-width="1"/>
      <polygon points="15,6 20,16 15,33" fill="#ffffff" opacity="0.3"/>
      <polygon points="15,6 10,16 15,33" fill="#000000" opacity="0.15"/>
      <line x1="5" y1="16" x2="25" y2="16" stroke="#ffffff" stroke-width="1"/>
    `
  };

  const selectedPath = shapes[shape] || shapes.pawn;

  return `
    <svg viewBox="0 0 30 38" class="custom-token-svg">
      <defs>
        <radialGradient id="${gradId}" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
          <stop offset="25%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#111111"/>
        </radialGradient>
        <linearGradient id="${darkGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </linearGradient>
      </defs>
      ${selectedPath}
    </svg>
  `;
}

// Backward compatibility alias
export function getPawnSVG(color, id = 0) {
  return getPlayerTokenSVG('pawn', color, id);
}

export function getTileIcon(iconName) {
  const icons = {
    start: `
      <svg viewBox="0 0 100 100" class="tile-svg">
        <defs>
          <linearGradient id="startGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0288d1" />
            <stop offset="100%" stop-color="#01579b" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#startGrad)" stroke="#ffd54f" stroke-width="4"/>
        <path d="M50 16 L74 48 L58 48 L58 80 L42 80 L42 48 L26 48 Z" fill="#ffeb3b" stroke="#f57f17" stroke-width="2"/>
        <circle cx="50" cy="50" r="10" fill="#ffffff" />
        <text x="50" y="54" font-size="11" font-weight="bold" fill="#01579b" text-anchor="middle">₹</text>
      </svg>
    `,

    gateway: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="15" y="30" width="16" height="45" fill="#d7ccc8" stroke="#5d4037" stroke-width="2"/>
        <rect x="69" y="30" width="16" height="45" fill="#d7ccc8" stroke="#5d4037" stroke-width="2"/>
        <path d="M31 40 Q50 20 69 40 L69 75 L31 75 Z" fill="#bcaaa4" stroke="#5d4037" stroke-width="2"/>
        <path d="M10 30 L90 30 L85 18 L15 18 Z" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
        <rect x="42" y="48" width="16" height="27" rx="8" fill="#4e342e"/>
        <circle cx="23" cy="12" r="5" fill="#d7ccc8" stroke="#5d4037"/>
        <circle cx="77" cy="12" r="5" fill="#d7ccc8" stroke="#5d4037"/>
        <circle cx="50" cy="10" r="6" fill="#ffd54f" stroke="#ff8f00"/>
      </svg>
    `,

    monument: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="50,10 40,70 60,70" fill="#78909c" stroke="#37474f" stroke-width="2"/>
        <rect x="30" y="70" width="40" height="8" fill="#546e7a"/>
        <circle cx="50" cy="8" r="4" fill="#ffd54f"/>
        <line x1="20" y1="75" x2="80" y2="75" stroke="#37474f" stroke-width="3"/>
      </svg>
    `,

    garden: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M15 75 Q30 35 45 75" fill="#66bb6a"/>
        <path d="M40 75 Q55 25 70 75" fill="#43a047"/>
        <path d="M60 75 Q75 40 90 75" fill="#81c784"/>
        <circle cx="50" cy="30" r="10" fill="#4fc3f7" opacity="0.8"/>
        <path d="M45 40 Q50 55 45 75" stroke="#29b6f6" stroke-width="4" fill="none"/>
        <path d="M55 40 Q50 55 55 75" stroke="#039be5" stroke-width="3" fill="none"/>
      </svg>
    `,

    jali: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M20 75 L20 40 Q50 8 80 40 L80 75 Z" fill="#fff8e1" stroke="#ff8f00" stroke-width="2.5"/>
        <path d="M50 75 L50 35 M50 55 Q35 45 28 35 M50 55 Q65 45 72 35 M50 42 Q32 28 40 18 M50 42 Q68 28 60 18" stroke="#e65100" stroke-width="2" fill="none"/>
        <circle cx="35" cy="30" r="3" fill="#ffb300"/>
        <circle cx="65" cy="30" r="3" fill="#ffb300"/>
        <circle cx="50" cy="22" r="3" fill="#ffb300"/>
      </svg>
    `,

    tax: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="25" y="10" width="50" height="65" rx="4" fill="#eceff1" stroke="#455a64" stroke-width="2"/>
        <line x1="33" y1="22" x2="67" y2="22" stroke="#90a4ae" stroke-width="2"/>
        <line x1="33" y1="30" x2="67" y2="30" stroke="#90a4ae" stroke-width="2"/>
        <circle cx="50" cy="50" r="14" fill="#e53935"/>
        <text x="50" y="56" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">₹</text>
      </svg>
    `,

    train: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="18" y="20" width="64" height="42" rx="8" fill="#1e88e5" stroke="#0d47a1" stroke-width="2"/>
        <rect x="26" y="26" width="20" height="15" rx="3" fill="#e1f5fe"/>
        <rect x="54" y="26" width="20" height="15" rx="3" fill="#e1f5fe"/>
        <circle cx="50" cy="52" r="5" fill="#ffeb3b" stroke="#f57f17" stroke-width="1.5"/>
        <circle cx="32" cy="65" r="7" fill="#424242" stroke="#212121" stroke-width="2"/>
        <circle cx="68" cy="65" r="7" fill="#424242" stroke="#212121" stroke-width="2"/>
        <line x1="10" y1="73" x2="90" y2="73" stroke="#616161" stroke-width="3"/>
      </svg>
    `,

    question: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <circle cx="50" cy="40" r="34" fill="#ff6f00" stroke="#ffd54f" stroke-width="3"/>
        <text x="50" y="55" font-size="44" font-family="serif" font-weight="900" fill="#ffffff" text-anchor="middle">?</text>
      </svg>
    `,

    palace: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="20" y="30" width="60" height="45" fill="#f8bbd0" stroke="#c2185b" stroke-width="2"/>
        <path d="M20 30 Q50 5 80 30 Z" fill="#e91e63" stroke="#880e4f" stroke-width="2"/>
        <circle cx="32" cy="45" r="4" fill="#ad1457"/>
        <circle cx="50" cy="45" r="4" fill="#ad1457"/>
        <circle cx="68" cy="45" r="4" fill="#ad1457"/>
        <circle cx="50" cy="62" r="5" fill="#ad1457"/>
        <polygon points="50,2 48,8 52,8" fill="#ffd54f"/>
      </svg>
    `,

    handcuffs: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <line x1="15" y1="5" x2="15" y2="75" stroke="#546e7a" stroke-width="3"/>
        <line x1="35" y1="5" x2="35" y2="75" stroke="#546e7a" stroke-width="3"/>
        <line x1="65" y1="5" x2="65" y2="75" stroke="#546e7a" stroke-width="3"/>
        <line x1="85" y1="5" x2="85" y2="75" stroke="#546e7a" stroke-width="3"/>
        <circle cx="36" cy="45" r="14" fill="none" stroke="#cfd8dc" stroke-width="4"/>
        <circle cx="64" cy="45" r="14" fill="none" stroke="#cfd8dc" stroke-width="4"/>
        <line x1="48" y1="45" x2="52" y2="45" stroke="#ffb300" stroke-width="4"/>
      </svg>
    `,

    bulb: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M35 30 A18 18 0 1 1 65 30 C65 40 58 45 58 52 L42 52 C42 45 35 40 35 30 Z" fill="#fff59d" stroke="#fbc02d" stroke-width="2.5"/>
        <rect x="44" y="53" width="12" height="6" fill="#9e9e9e"/>
        <rect x="46" y="59" width="8" height="4" fill="#616161"/>
        <line x1="50" y1="5" x2="50" y2="10" stroke="#fbc02d" stroke-width="3"/>
        <line x1="25" y1="18" x2="30" y2="22" stroke="#fbc02d" stroke-width="3"/>
        <line x1="75" y1="18" x2="70" y2="22" stroke="#fbc02d" stroke-width="3"/>
      </svg>
    `,

    indiagate: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="22" y="22" width="56" height="52" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>
        <path d="M38 74 L38 45 Q50 32 62 45 L62 74 Z" fill="#d84315"/>
        <rect x="18" y="16" width="64" height="8" fill="#ffb74d" stroke="#e65100" stroke-width="2"/>
        <rect x="30" y="8" width="40" height="8" fill="#ffa726"/>
      </svg>
    `,

    fort: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="20" y="35" width="60" height="40" fill="#cfd8dc" stroke="#37474f" stroke-width="2"/>
        <polygon points="20,35 26,35 26,27 34,27 34,35 46,35 46,27 54,27 54,35 66,35 66,27 74,27 74,35 80,35 80,75 20,75" fill="#b0bec5" stroke="#37474f" stroke-width="2"/>
        <rect x="44" y="52" width="12" height="23" rx="6" fill="#263238"/>
      </svg>
    `,

    bus: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="15" y="15" width="70" height="48" rx="6" fill="#d32f2f" stroke="#b71c1c" stroke-width="2"/>
        <rect x="22" y="20" width="14" height="12" fill="#fff9c4"/>
        <rect x="42" y="20" width="14" height="12" fill="#fff9c4"/>
        <rect x="62" y="20" width="14" height="12" fill="#fff9c4"/>
        <rect x="22" y="36" width="14" height="12" fill="#fff9c4"/>
        <rect x="42" y="36" width="14" height="12" fill="#fff9c4"/>
        <rect x="62" y="36" width="14" height="12" fill="#fff9c4"/>
        <circle cx="30" cy="65" r="7" fill="#212121" stroke="#757575" stroke-width="2"/>
        <circle cx="70" cy="65" r="7" fill="#212121" stroke="#757575" stroke-width="2"/>
      </svg>
    `,

    victoriamemorial: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="18" y="42" width="64" height="32" fill="#f5f5f5" stroke="#757575" stroke-width="2"/>
        <path d="M35 42 Q50 14 65 42 Z" fill="#e0e0e0" stroke="#616161" stroke-width="2"/>
        <circle cx="50" cy="14" r="3" fill="#ffd54f"/>
        <path d="M22 42 Q28 28 34 42 Z" fill="#eeeeee"/>
        <path d="M66 42 Q72 28 78 42 Z" fill="#eeeeee"/>
        <line x1="42" y1="45" x2="42" y2="72" stroke="#9e9e9e" stroke-width="2"/>
        <line x1="50" y1="45" x2="50" y2="72" stroke="#9e9e9e" stroke-width="2"/>
        <line x1="58" y1="45" x2="58" y2="72" stroke="#9e9e9e" stroke-width="2"/>
      </svg>
    `,

    goldentemple: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="25" y="32" width="50" height="36" fill="#ffd54f" stroke="#f57f17" stroke-width="2"/>
        <path d="M36 32 Q50 12 64 32 Z" fill="#ffb300" stroke="#e65100" stroke-width="2"/>
        <circle cx="50" cy="10" r="3" fill="#ffeb3b"/>
        <rect x="10" y="68" width="80" height="8" fill="#4fc3f7"/>
        <line x1="30" y1="72" x2="70" y2="72" stroke="#ffd54f" stroke-width="2"/>
      </svg>
    `,

    vyavahar: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="20" y="15" width="60" height="52" rx="6" fill="#880e4f" stroke="#f8bbd0" stroke-width="2"/>
        <circle cx="50" cy="41" r="16" fill="#f48fb1"/>
        <text x="50" y="47" font-size="16" font-weight="bold" fill="#880e4f" text-anchor="middle">🤝</text>
      </svg>
    `,

    shikara: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="10,45 35,20 60,45" fill="#90caf9"/>
        <polygon points="45,45 70,22 95,45" fill="#bbdefb"/>
        <rect x="5" y="45" width="90" height="30" fill="#29b6f6"/>
        <path d="M20 58 Q50 72 80 58 L75 52 L25 52 Z" fill="#6d4c41"/>
        <path d="M35 52 L35 40 L65 40 L65 52 Z" fill="#f44336"/>
      </svg>
    `,

    club: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="50,15 15,42 85,42" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
        <rect x="22" y="42" width="56" height="32" fill="#efebe9" stroke="#3e2723" stroke-width="2"/>
        <rect x="42" y="52" width="16" height="22" fill="#3e2723"/>
        <circle cx="50" cy="30" r="5" fill="#ffb300"/>
      </svg>
    `,

    tajmahal: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="24" y="36" width="52" height="38" fill="#ffffff" stroke="#90a4ae" stroke-width="2"/>
        <path d="M38 36 Q50 12 62 36 Z" fill="#f5f5f5" stroke="#78909c" stroke-width="2"/>
        <circle cx="50" cy="11" r="2.5" fill="#ffd54f"/>
        <path d="M42 74 L42 50 Q50 42 58 50 L58 74 Z" fill="#cfd8dc"/>
        <rect x="14" y="24" width="5" height="50" fill="#ffffff" stroke="#90a4ae"/>
        <rect x="81" y="24" width="5" height="50" fill="#ffffff" stroke="#90a4ae"/>
      </svg>
    `,

    temple: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="50,12 30,55 70,55" fill="#ff7043" stroke="#d84315" stroke-width="2"/>
        <rect x="28" y="55" width="44" height="20" fill="#ffccbc" stroke="#d84315" stroke-width="2"/>
        <rect x="44" y="60" width="12" height="15" fill="#d84315"/>
        <line x1="50" y1="5" x2="50" y2="12" stroke="#ffeb3b" stroke-width="2"/>
      </svg>
    `,

    golghar: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M20 74 Q20 20 50 20 Q80 20 80 74 Z" fill="#b0bec5" stroke="#37474f" stroke-width="2.5"/>
        <path d="M22 65 Q50 40 78 65" stroke="#78909c" stroke-width="2" fill="none"/>
        <path d="M26 50 Q50 30 74 50" stroke="#78909c" stroke-width="2" fill="none"/>
        <circle cx="50" cy="18" r="4" fill="#37474f"/>
      </svg>
    `,

    teagarden: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M5 75 Q30 35 60 75 Z" fill="#43a047"/>
        <path d="M40 75 Q70 25 95 75 Z" fill="#2e7d32"/>
        <path d="M10 75 Q50 50 90 75 Z" fill="#66bb6a"/>
        <path d="M50 40 Q40 25 50 20 Q60 25 50 40" fill="#a5d6a7" stroke="#1b5e20" stroke-width="1.5"/>
      </svg>
    `,

    plane_icon: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M15 45 Q50 40 85 45 Q88 47 85 49 Q50 54 15 49 Z" fill="#ffffff" stroke="#d32f2f" stroke-width="2"/>
        <polygon points="40,43 55,20 62,20 52,43" fill="#d32f2f"/>
        <polygon points="40,49 55,70 62,70 52,49" fill="#d32f2f"/>
        <polygon points="18,45 12,28 17,28 24,45" fill="#fbc02d"/>
        <circle cx="80" cy="46" r="2" fill="#d32f2f"/>
      </svg>
    `,

    snowmountains: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="35,18 10,74 60,74" fill="#78909c"/>
        <polygon points="35,18 24,40 35,36 46,40" fill="#ffffff"/>
        <polygon points="65,26 42,74 88,74" fill="#546e7a"/>
        <polygon points="65,26 56,43 65,40 74,43" fill="#ffffff"/>
      </svg>
    `,

    charminar: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="24" y="32" width="52" height="42" fill="#ffe082" stroke="#ff8f00" stroke-width="2"/>
        <path d="M38 74 L38 50 Q50 38 62 50 L62 74 Z" fill="#e65100"/>
        <rect x="18" y="14" width="7" height="60" fill="#ffd54f" stroke="#ff8f00"/>
        <rect x="75" y="14" width="7" height="60" fill="#ffd54f" stroke="#ff8f00"/>
        <circle cx="21.5" cy="12" r="4" fill="#ff6f00"/>
        <circle cx="78.5" cy="12" r="4" fill="#ff6f00"/>
      </svg>
    `,

    resort: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M35 74 Q32 45 45 35" stroke="#795548" stroke-width="4" fill="none"/>
        <path d="M45 35 Q20 30 15 45" stroke="#2e7d32" stroke-width="3" fill="none"/>
        <path d="M45 35 Q35 15 25 22" stroke="#2e7d32" stroke-width="3" fill="none"/>
        <path d="M45 35 Q55 15 65 25" stroke="#2e7d32" stroke-width="3" fill="none"/>
        <path d="M45 35 Q65 35 60 50" stroke="#2e7d32" stroke-width="3" fill="none"/>
        <path d="M55 58 L75 58 L85 70" stroke="#0288d1" stroke-width="3" fill="none"/>
        <line x1="70" y1="45" x2="70" y2="72" stroke="#455a64" stroke-width="2"/>
        <path d="M55 45 Q70 35 85 45 Z" fill="#ff9800"/>
      </svg>
    `,

    southtemple: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <polygon points="50,12 36,25 64,25" fill="#e53935" stroke="#b71c1c" stroke-width="1.5"/>
        <polygon points="50,22 32,40 68,40" fill="#fb8c00" stroke="#e65100" stroke-width="1.5"/>
        <polygon points="50,38 28,58 72,58" fill="#fdd835" stroke="#f57f17" stroke-width="1.5"/>
        <rect x="24" y="58" width="52" height="16" fill="#8e24aa" stroke="#4a148c" stroke-width="1.5"/>
        <rect x="44" y="62" width="12" height="12" fill="#212121"/>
        <circle cx="50" cy="8" r="3" fill="#ffeb3b"/>
      </svg>
    `,

    glasshouse: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <rect x="20" y="40" width="60" height="34" fill="#e0f7fa" stroke="#00838f" stroke-width="2"/>
        <path d="M20 40 Q50 15 80 40 Z" fill="#b2ebf2" stroke="#006064" stroke-width="2"/>
        <line x1="35" y1="40" x2="35" y2="74" stroke="#0097a7" stroke-width="1.5"/>
        <line x1="50" y1="40" x2="50" y2="74" stroke="#0097a7" stroke-width="1.5"/>
        <line x1="65" y1="40" x2="65" y2="74" stroke="#0097a7" stroke-width="1.5"/>
      </svg>
    `,

    fountain: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <ellipse cx="50" cy="65" rx="35" ry="10" fill="#0288d1" stroke="#01579b" stroke-width="2"/>
        <rect x="46" y="45" width="8" height="20" fill="#b0bec5"/>
        <ellipse cx="50" cy="45" rx="18" ry="6" fill="#4fc3f7" stroke="#0288d1" stroke-width="1.5"/>
        <path d="M50 45 Q40 20 28 35" stroke="#e1f5fe" stroke-width="2.5" fill="none"/>
        <path d="M50 45 Q60 20 72 35" stroke="#e1f5fe" stroke-width="2.5" fill="none"/>
        <path d="M50 45 Q50 15 50 10" stroke="#e1f5fe" stroke-width="2.5" fill="none"/>
      </svg>
    `,

    beach: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M10 74 Q50 55 90 74 Z" fill="#ffe082"/>
        <path d="M10 55 Q40 68 90 50 L90 74 L10 74 Z" fill="#4dd0e1"/>
        <path d="M25 74 Q35 48 30 35" stroke="#6d4c41" stroke-width="3.5" fill="none"/>
        <path d="M30 35 Q15 32 10 42" stroke="#2e7d32" stroke-width="2.5" fill="none"/>
        <path d="M30 35 Q20 20 15 26" stroke="#2e7d32" stroke-width="2.5" fill="none"/>
        <path d="M30 35 Q40 18 45 26" stroke="#2e7d32" stroke-width="2.5" fill="none"/>
        <path d="M30 35 Q50 35 45 45" stroke="#2e7d32" stroke-width="2.5" fill="none"/>
      </svg>
    `,

    motorboat: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <path d="M5 65 Q25 55 45 65 Q65 75 85 65 L95 75 L5 75 Z" fill="#0288d1"/>
        <polygon points="20,54 75,54 85,42 35,42" fill="#ffffff" stroke="#d32f2f" stroke-width="2"/>
        <polygon points="40,42 58,42 52,32 42,32" fill="#00bcd4" stroke="#00838f" stroke-width="1.5"/>
        <line x1="82" y1="42" x2="88" y2="35" stroke="#fbc02d" stroke-width="2"/>
      </svg>
    `,

    goa: `
      <svg viewBox="0 0 100 80" class="tile-svg">
        <circle cx="75" cy="25" r="14" fill="#ffb300"/>
        <rect x="5" y="48" width="90" height="26" fill="#00acc1"/>
        <path d="M5 62 Q50 54 95 62 L95 75 L5 75 Z" fill="#ffe082"/>
        <path d="M30 45 Q45 32 60 45 Z" fill="#e53935"/>
        <line x1="45" y1="45" x2="45" y2="65" stroke="#37474f" stroke-width="2.5"/>
      </svg>
    `
  };

  if (iconName === 'plane') return icons.plane_icon;
  return icons[iconName] || icons.palace;
}
