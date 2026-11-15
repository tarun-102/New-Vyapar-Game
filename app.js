// data.js - નવો વ્યાપાર બોર્ડ ડેટા, નિયમો અને ૬ ખેલાડીઓ (Navo Vyapar Board Data)

const COLOR_GROUPS = {
  START: { name: "સ્ટાર્ટ", color: "#1e3c72" },
  MUMBAI: { name: "મુંબઈ સ્પેશિયલ", color: "#6a1b9a", textColor: "#fff" },
  NORTH_GREEN: { name: "ઉત્તર ઝોન (લીલો)", color: "#2e7d32", textColor: "#fff" },
  TRANSPORT: { name: "વાહન વ્યવહાર", color: "#d32f2f", textColor: "#fff" },
  TAX: { name: "ટેક્સ", color: "#455a64", textColor: "#fff" },
  CHANCE: { name: "ભાગ્ય", color: "#e65100", textColor: "#fff" },
  COMMUNITY: { name: "વ્યવહાર", color: "#c2185b", textColor: "#fff" },
  JAIL: { name: "જેલ", color: "#212121", textColor: "#fff" },
  UTILITY: { name: "કંપની", color: "#f57f17", textColor: "#fff" },
  DELHI_ZONE: { name: "દિલ્હી ઝોન", color: "#00796b", textColor: "#fff" },
  EAST_PINK: { name: "પૂર્વ ઝોન (ગુલાબી)", color: "#ad1457", textColor: "#fff" },
  CLUB: { name: "ક્લબ", color: "#4e342e", textColor: "#fff" },
  CENTRAL_BLUE: { name: "મધ્ય ઝોન (વાદળી)", color: "#0277bd", textColor: "#fff" },
  HIMALAYAN_BROWN: { name: "પહાડી ઝોન", color: "#5d4037", textColor: "#fff" },
  REST: { name: "આરામગૃહ", color: "#00695c", textColor: "#fff" },
  SOUTH_RED: { name: "દક્ષિણ ઝોન (લાલ)", color: "#c62828", textColor: "#fff" },
  WEST_ORANGE: { name: "પશ્ચિમ ઝોન (નારંગી)", color: "#ef6c00", textColor: "#fff" },
  COASTAL_TEAL: { name: "દરિયાઈ ઝોન (મોરપીંછ)", color: "#00838f", textColor: "#fff" }
};

// 36 બોર્ડ ટાઇલ્સ (૧૦ x ૧૦ પેરીમીટર - ૪ ખૂણા + ૮ દરેક બાજુ)
const BOARD_TILES = [
  // ૧. ટોચની બાજુ (Top Edge: Index 0 to 8)
  {
    id: 0,
    name: "સ્ટાર્ટીંગ પોઈન્ટ",
    subName: "Starting Point",
    type: "start",
    price: 0,
    salary: 2500,
    group: "START",
    icon: "start",
    desc: "અહીંથી રમત શરૂ થાય છે. પસાર થતાં રૂ. ૨,૫૦૦ બોનસ મળે છે (સીધા આવતાં રૂ. ૩,૦૦૦)."
  },
  {
    id: 1,
    name: "મુંબઈ",
    subName: "Mumbai",
    type: "property",
    price: 8500,
    rent: [850, 2500, 5000, 8000, 12000],
    houseCost: 3000,
    group: "MUMBAI",
    icon: "gateway",
    desc: "ભારતની આર્થિક રાજધાની - બોમ્બે સ્ટોક એક્સચેન્જ અને ગેટવે ઓફ ઈન્ડિયા."
  },
  {
    id: 2,
    name: "પાણીપત",
    subName: "Panipat",
    type: "property",
    price: 3200,
    rent: [320, 1000, 2200, 4000, 6000],
    houseCost: 1500,
    group: "NORTH_GREEN",
    icon: "monument",
    desc: "ઐતિહાસિક યુદ્ધભૂમિ અને ટેક્સટાઇલ હબ."
  },
  {
    id: 3,
    name: "ચંદીગઢ",
    subName: "Chandigarh",
    type: "property",
    price: 2500,
    rent: [250, 800, 1800, 3200, 5000],
    houseCost: 1200,
    group: "NORTH_GREEN",
    icon: "garden",
    desc: "રોક ગાર્ડન અને સુવ્યવસ્થિત સુંદર શહેર."
  },
  {
    id: 4,
    name: "અમદાવાદ",
    subName: "Ahmedabad",
    type: "property",
    price: 4000,
    rent: [400, 1200, 2600, 4800, 7500],
    houseCost: 1800,
    group: "NORTH_GREEN",
    icon: "jali",
    desc: "સિદી સૈયદની જાળી અને હેરિટેજ વેપારી પાટનગર."
  },
  {
    id: 5,
    name: "મિલકત વેરો",
    subName: "Property Tax",
    type: "tax",
    amount: 500,
    group: "TAX",
    icon: "tax",
    desc: "મિલ્કત વેરો રૂ. ૫૦૦ બેંકમાં જમા કરાવો."
  },
  {
    id: 6,
    name: "રેલ્વે",
    subName: "Railway",
    type: "transport",
    price: 9500,
    rent: [950, 2000, 4000, 8000],
    group: "TRANSPORT",
    icon: "train",
    desc: "ભારતીય રેલ્વે નેટવર્ક. વધુ ટ્રાન્સપોર્ટથી વધુ ભાડું."
  },
  {
    id: 7,
    name: "ભાગ્ય",
    subName: "Bhagya (Chance)",
    type: "bhagya",
    group: "CHANCE",
    icon: "question",
    desc: "પાસાના નંબર (એકી/બેકી) પ્રમાણે ભાગ્ય અજમાવો!"
  },
  {
    id: 8,
    name: "જયપુર",
    subName: "Jaipur",
    type: "property",
    price: 3000,
    rent: [300, 900, 2000, 3800, 5800],
    houseCost: 1500,
    group: "CENTRAL_BLUE",
    icon: "palace",
    desc: "ગુલાબી નગરી - હવા મહેલ અને રજવાડું."
  },

  // ૨. જમણી બાજુ (Right Edge: Index 9 to 17)
  {
    id: 9,
    name: "જેલ",
    subName: "Jail",
    type: "jail",
    group: "JAIL",
    icon: "handcuffs",
    desc: "ફક્ત મુલાકાત અથવા કેદ! બહાર આવવા રૂ. ૫૦૦ અથવા ડબલ્સ ફેંકો."
  },
  {
    id: 10,
    name: "ઇલેક્ટ્રિક કંપની",
    subName: "Electric Co.",
    type: "utility",
    price: 2500,
    group: "UTILITY",
    icon: "bulb",
    desc: "પાસાના સરવાળાના ૫૦ ગણું ભાડું મેળવો."
  },
  {
    id: 11,
    name: "દિલ્હી",
    subName: "Delhi",
    type: "property",
    price: 6000,
    rent: [600, 1800, 3800, 6800, 10000],
    houseCost: 2500,
    group: "DELHI_ZONE",
    icon: "indiagate",
    desc: "ભારતની રાજધાની - ઇન્ડિયા ગેટ અને લાલ કિલ્લો."
  },
  {
    id: 12,
    name: "ઇન્દોર",
    subName: "Indore",
    type: "property",
    price: 2500,
    rent: [250, 800, 1800, 3200, 5000],
    houseCost: 1200,
    group: "DELHI_ZONE",
    icon: "fort",
    desc: "રાજવાડા મહેલ અને સ્વાદિષ્ટ ખાણીપીણીનું શહેર."
  },
  {
    id: 13,
    name: "બેસ્ટ",
    subName: "B.E.S.T.",
    type: "transport",
    price: 3500,
    rent: [400, 1000, 2000, 4000],
    group: "TRANSPORT",
    icon: "bus",
    desc: "મુંબઈની જાણીતી ડબલ ડેકર લાલ બસ સર્વિસ."
  },
  {
    id: 14,
    name: "કોલકત્તા",
    subName: "Kolkata",
    type: "property",
    price: 6500,
    rent: [650, 1900, 4000, 7200, 10500],
    houseCost: 2500,
    group: "EAST_PINK",
    icon: "victoriamemorial",
    desc: "સિટિ ઓફ જોય - વિક્ટોરિયા મેમોરિયલ અને હાવડા બ્રિજ."
  },
  {
    id: 15,
    name: "અમૃતસર",
    subName: "Amritsar",
    type: "property",
    price: 3300,
    rent: [330, 1000, 2200, 4000, 6000],
    houseCost: 1500,
    group: "EAST_PINK",
    icon: "goldentemple",
    desc: "પવિત્ર સુવર્ણ મંદિર અને દેશભક્તિની ભૂમિ."
  },
  {
    id: 16,
    name: "વ્યવહાર",
    subName: "Vyavahar",
    type: "vyavahar",
    group: "COMMUNITY",
    icon: "vyavahar",
    desc: "પાસાના નંબર મુજબ બેંક કે ખેલાડીઓ સાથે વ્યવહાર કરો!"
  },
  {
    id: 17,
    name: "શ્રીનગર",
    subName: "Srinagar",
    type: "property",
    price: 5000,
    rent: [500, 1500, 3200, 5800, 8500],
    houseCost: 2000,
    group: "EAST_PINK",
    icon: "shikara",
    desc: "કાશ્મીરનું સ્વર્ગ - દાલ સરોવર અને શિકારા રાઇડ."
  },

  // ૩. નીચેની બાજુ (Bottom Edge: Index 18 to 26)
  {
    id: 18,
    name: "ક્લબ",
    subName: "Club",
    type: "club",
    fee: 200,
    group: "CLUB",
    icon: "club",
    desc: "ક્લબમાં મનોરંજન! સભ્ય ફી રૂ. ૨૦૦ બેંકને આપો."
  },
  {
    id: 19,
    name: "આગ્રા",
    subName: "Agra",
    type: "property",
    price: 2500,
    rent: [250, 800, 1800, 3200, 5000],
    houseCost: 1200,
    group: "CENTRAL_BLUE",
    icon: "tajmahal",
    desc: "વિશ્વની અજાયબી - ભવ્ય તાજમહેલ."
  },
  {
    id: 20,
    name: "ભાગ્ય",
    subName: "Bhagya (Chance)",
    type: "bhagya",
    group: "CHANCE",
    icon: "question",
    desc: "પાસાના નંબર (એકી/બેકી) પ્રમાણે ભાગ્ય અજમાવો!"
  },
  {
    id: 21,
    name: "રાંચી",
    subName: "Ranchi",
    type: "property",
    price: 2500,
    rent: [250, 800, 1800, 3200, 5000],
    houseCost: 1200,
    group: "CENTRAL_BLUE",
    icon: "temple",
    desc: "ઝરણાઓ અને કુદરતી સૌંદર્યનું શહેર."
  },
  {
    id: 22,
    name: "પટના",
    subName: "Patna",
    type: "property",
    price: 2000,
    rent: [200, 600, 1400, 2600, 4200],
    houseCost: 1000,
    group: "CENTRAL_BLUE",
    icon: "golghar",
    desc: "પ્રાચીન પાટલીપુત્ર અને ઐતિહાસિક ગોલઘર."
  },
  {
    id: 23,
    name: "દાર્જિલિંગ",
    subName: "Darjeeling",
    type: "property",
    price: 2500,
    rent: [250, 800, 1800, 3200, 5000],
    houseCost: 1200,
    group: "HIMALAYAN_BROWN",
    icon: "teagarden",
    desc: "લીલાછમ ચાના બગીચા અને હિમાલયની રમણીયતા."
  },
  {
    id: 24,
    name: "એર ઇન્ડિયા",
    subName: "Air India",
    type: "transport",
    price: 10500,
    rent: [1000, 2500, 5000, 10000],
    group: "TRANSPORT",
    icon: "plane",
    desc: "ભારતનું રાષ્ટ્રીય વિમાન મહારાજા! ઝડપી મુસાફરી."
  },
  {
    id: 25,
    name: "સિમલા",
    subName: "Simla",
    type: "property",
    price: 2200,
    rent: [220, 700, 1600, 2900, 4600],
    houseCost: 1100,
    group: "HIMALAYAN_BROWN",
    icon: "snowmountains",
    desc: "બરફાચ્છાદિત પહાડો અને રમણીય હિલ સ્ટેશન."
  },
  {
    id: 26,
    name: "હૈદરાબાદ",
    subName: "Hyderabad",
    type: "property",
    price: 3500,
    rent: [350, 1000, 2200, 4200, 6500],
    houseCost: 1600,
    group: "HIMALAYAN_BROWN",
    icon: "charminar",
    desc: "મોતીઓનું શહેર - ચારમિનાર અને બિરયાની."
  },

  // ૪. ડાબી બાજુ (Left Edge: Index 27 to 35)
  {
    id: 27,
    name: "આરામગૃહ",
    subName: "Rest House",
    type: "rest",
    group: "REST",
    icon: "resort",
    desc: "આરામ કરો અને મફત રોકાણનો આનંદ લો. સુરક્ષિત જગ્યા!"
  },
  {
    id: 28,
    name: "ચેન્નઈ",
    subName: "Chennai",
    type: "property",
    price: 7000,
    rent: [700, 2100, 4500, 7800, 11500],
    houseCost: 2800,
    group: "SOUTH_RED",
    icon: "southtemple",
    desc: "દક્ષિણ ભારતનું પ્રવેશદ્વાર - ભવ્ય મંદિરો અને મરીના બીચ."
  },
  {
    id: 29,
    name: "વ્યવહાર",
    subName: "Vyavahar",
    type: "vyavahar",
    group: "COMMUNITY",
    icon: "vyavahar",
    desc: "પાસાના નંબર મુજબ બેંક કે ખેલાડીઓ સાથે વ્યવહાર કરો!"
  },
  {
    id: 30,
    name: "બેંગલોર",
    subName: "Bangalore",
    type: "property",
    price: 4000,
    rent: [400, 1200, 2600, 4800, 7500],
    houseCost: 1800,
    group: "WEST_ORANGE",
    icon: "glasshouse",
    desc: "ભારતની સિલિકોન વેલી અને સુંદર ગાર્ડન સિટી."
  },
  {
    id: 31,
    name: "મિલકત વેરો",
    subName: "Property Tax",
    type: "tax",
    amount: 500,
    group: "TAX",
    icon: "tax",
    desc: "સરકારી મિલ્કત વેરો રૂ. ૫૦૦ બેંકમાં ભરો."
  },
  {
    id: 32,
    name: "કાનપુર",
    subName: "Kanpur",
    type: "property",
    price: 4000,
    rent: [400, 1200, 2600, 4800, 7500],
    houseCost: 1800,
    group: "WEST_ORANGE",
    icon: "fountain",
    desc: "ઔદ્યોગિક કેન્દ્ર અને ગંગા કિનારાનું શહેર."
  },
  {
    id: 33,
    name: "કોચીન",
    subName: "Cochin",
    type: "property",
    price: 3000,
    rent: [300, 900, 2000, 3800, 5800],
    houseCost: 1500,
    group: "COASTAL_TEAL",
    icon: "beach",
    desc: "અરબી સમુદ્રની રાણી - સુંદર કુદરતી બંદર."
  },
  {
    id: 34,
    name: "મોટરબોટ",
    subName: "Motor Boat",
    type: "transport",
    price: 5500,
    rent: [550, 1400, 2800, 5500],
    group: "TRANSPORT",
    icon: "motorboat",
    desc: "દરિયાઈ સહેલગાહ માટે ઝડપી મોટરબોટ સેવા."
  },
  {
    id: 35,
    name: "ગોવા",
    subName: "Goa",
    type: "property",
    price: 4000,
    rent: [400, 1200, 2600, 4800, 7500],
    houseCost: 1800,
    group: "COASTAL_TEAL",
    icon: "goa",
    desc: "સોનેરી દરિયાકિનારો અને પ્રવાસીઓનું માનીતું પર્યટન સ્થળ."
  }
];

// બોર્ડ પર દર્શાવેલા અધિકૃત ભાગ્ય (Bhagya) અને વ્યવહાર (Vyavahar) નિયમો:
const BHAGYA_RULES = {
  EVEN: { // બેકી સંખ્યા (2, 4, 6, 8, 10, 12) - બેંકને આપો
    2: { text: "શેરબજારમાં નુકશાની: રૂ. ૨,૦૦૦ બેંકને આપો.", amount: -2000, action: "pay_bank" },
    4: { text: "દારૂ પીને ગાડી ચલાવીને અકસ્માતમાં દંડ: રૂ. ૧,૦૦૦ બેંકને આપો.", amount: -1000, action: "pay_bank" },
    6: { text: "ઘર સમારકામ ખર્ચ પેટે રૂ. ૧,૫૦૦ બેંકને આપો.", amount: -1500, action: "pay_bank" },
    8: { text: "ગોડાઉનમાં આગથી નુકશાની: રૂ. ૩,૦૦૦ બેંકને આપો.", amount: -3000, action: "pay_bank" },
    10: { text: "ગંભીર ગુનો! તાત્કાલિક જેલમાં જાઓ.", action: "go_jail" },
    12: { text: "આરામગૃહમાં જાઓ અને તમારો આગામી ૧ દાવ રદ થશે.", action: "go_rest" }
  },
  ODD: { // એકી સંખ્યા (3, 5, 7, 9, 11) - બેંક પાસેથી મેળવો / વિશેષ
    3: { text: "રોટરી ક્લબ ઇનામ મળ્યું: રૂ. ૨,૫૦૦ બેંક પાસેથી મેળવો!", amount: 2500, action: "get_bank" },
    5: { text: "ક્રોસવર્ડ સ્પર્ધાનું ઇનામ: રૂ. ૧,૦૦૦ બેંક પાસેથી મેળવો!", amount: 1000, action: "get_bank" },
    7: { text: "વેકેશન મુસાફરી ખર્ચ: રૂ. ૨,૦૦૦ બેંકને ચૂકવો.", amount: -2000, action: "pay_bank" },
    9: { text: "પાછા મુંબઈ જાઓ. સ્ટાર્ટીંગ પોઈન્ટ ઓળંગો તો રૂ. ૧,૫૦૦ લો અને રૂ. ૩,૦૦૦ ઇનામ મેળવો!", action: "go_mumbai_reward" },
    11: { text: "મિલ્કતમાં ઉત્તમ કામગીરી માટે ઇનામ: રૂ. ૪,૦૦૦ બેંક પાસેથી મેળવો!", amount: 4000, action: "get_bank" }
  }
};

const VYAVAHAR_RULES = {
  EVEN: { // બેકી સંખ્યા (2, 4, 6, 8, 10, 12) - બેંક પાસેથી મેળવો / ખેલાડીઓ પાસેથી
    2: { text: "તમારી જન્મતિથિ! દરેક પ્લેયર પાસેથી રૂ. ૫૦૦ મેળવો.", amountPerPlayer: 500, action: "collect_from_players" },
    4: { text: "દરેક હોટેલમાં રોકાણ ખર્ચ: રૂ. ૫૦૦ બેંકને આપો.", amount: -500, action: "pay_bank" },
    6: { text: "સુંદર હસ્તલેખન સ્પર્ધા ઇનામ: રૂ. ૨,૦૦૦ બેંક પાસેથી મેળવો!", amount: 2000, action: "get_bank" },
    8: { text: "ઇન્કમ ટેક્સ રિફંડ પાછો મળ્યો: રૂ. ૨,૦૦૦ બેંક પાસેથી મેળવો!", amount: 2000, action: "get_bank" },
    10: { text: "શેરબજાર પર વ્યાજ મળ્યું: રૂ. ૧,૫૦૦ બેંક પાસેથી મેળવો!", amount: 1500, action: "get_bank" },
    12: { text: "જૂની મોટરનું વેચાણ કર્યું: રૂ. ૩,૦૦૦ બેંક પાસેથી મેળવો!", amount: 3000, action: "get_bank" }
  },
  ODD: { // એકી સંખ્યા (3, 5, 7, 9, 11) - બેંકને આપો
    3: { text: "નિયમભંગ માટે જેલમાં જાઓ!", action: "go_jail" },
    5: { text: "કન્યા કેળવણી ફંડમાં દાન: રૂ. ૧,૦૦૦ બેંકને આપો.", amount: -1000, action: "pay_bank" },
    7: { text: "કુપોષણ સામે જંગ ખર્ચ પેટે રૂ. ૨,૦૦૦ બેંકને આપો.", amount: -2000, action: "pay_bank" },
    9: { text: "રીવર ફ્રન્ટ ખાતે બાંધકામ ખર્ચ: દરેક ઘર દીઠ રૂ. ૫૦ અને હોટેલ દીઠ રૂ. ૧,૦૦૦ બેંકને આપો.", action: "repair_tax" },
    11: { text: "વિમાન મુસાફરી ખર્ચ: રૂ. ૧,૫૦૦ બેંકને આપો.", amount: -1500, action: "pay_bank" }
  }
};

// કુલ ૬ ખેલાડીઓ (૧ માણસ + ૫ હોંશિયાર કોમ્પ્યુટર બોટ્સ)
const DEFAULT_PLAYERS = [
  { id: 0, name: "તમે (લાલ)", color: "#e53935", tokenClass: "token-red", isBot: false },
  { id: 1, name: "બોટ ૧: રમેશ (લીલો)", color: "#43a047", tokenClass: "token-green", isBot: true },
  { id: 2, name: "બોટ ૨: સુરેશ (પીળો)", color: "#fdd835", tokenClass: "token-yellow", isBot: true },
  { id: 3, name: "બોટ ૩: મહેશ (વાદળી)", color: "#1e88e5", tokenClass: "token-blue", isBot: true },
  { id: 4, name: "બોટ ૪: પરેશ (જાંબલી)", color: "#8e24aa", tokenClass: "token-purple", isBot: true },
  { id: 5, name: "બોટ ૫: કલ્પેશ (કેસરી)", color: "#fb8c00", tokenClass: "token-orange", isBot: true }
];


// icons.js - તમામ શહેરો, ચિહ્નો અને ૮ પ્રકારના કસ્ટમ ૩D ટોકન્સ (Custom 3D Pawn Shapes)

const _tokenCache = {};

function getPlayerTokenSVG(shape = 'pawn', color = '#e53935', id = 0) {
  const cacheKey = `${shape}_${color}_${id}`;
  if (_tokenCache[cacheKey]) return _tokenCache[cacheKey];

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

  const svgString = `
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
  _tokenCache[cacheKey] = svgString;
  return svgString;
}

// Backward compatibility alias
function getPawnSVG(color, id = 0) {
  return getPlayerTokenSVG('pawn', color, id);
}

function getTileIcon(iconName) {
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


// audio.js - Web Audio API આધારિત સાઉન્ડ ઇફેક્ટ્સ (૧૦૦% સેફ, ક્યારેય ક્રેક કે એરર ન આપે)

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      // Audio not permitted without gesture on some mobile browsers
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // પાસા ફેંકવાનો અવાજ (Dice Roll Clatter)
  playDice() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const count = 4;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          try {
            if (!this.ctx || this.ctx.state !== 'running') return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const freq = 140 + Math.random() * 260;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.055);
          } catch (err) {}
        }, i * 55);
      }
    } catch (e) {}
  }

  // કૂકરી ચાલવાનો અવાજ (Token Step)
  playStep() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // પૈસાનો ખણખણાટ / કેશ ટ્રાન્ઝેક્શન (Coins & Cash "Ka-Ching")
  playCash() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.37);
    } catch (e) {}
  }

  // બેંક લોન મંજૂર સાઉન્ડ (Bank Loan Fanfare)
  playLoan() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const startTime = this.ctx.currentTime + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) {}
  }

  // મિલ્કત ખરીદવાનો વિજયી અવાજ (Buy Property Fanfare)
  playBuy() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, idx) => {
        const startTime = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.24);
      });
    } catch (e) {}
  }

  // જેલ અથવા નુકશાનનો બઝર (Jail / Penalty Slam)
  playJail() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }

  playVictory() {
    this.playBuy();
  }

  playPenalty() {
    this.playJail();
  }

  // બટન ક્લિક
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== 'running') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }
}

const sound = new SoundFX();


// game.js - નવો વ્યાપાર મુખ્ય એન્જિન (Custom Tokens, Shapes, Colors & Rent Collection System)


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
        name = (nameInput && nameInput.value && nameInput.value.trim()) || (mode === 'VS_COMPUTER' ? 'તમે (માણસ)' : 'પ્લેયર ૧');
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
        isBankrupt: false
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
        this.updateActiveTileCard(tile.id);
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
  // ACTIVE TILE FOCUS CARD
  // =========================================================================
  updateActiveTileCard(tileId) {
    const tile = this.tiles[tileId];
    if (!tile) return;

    const cardContainer = document.getElementById('active-tile-focus-card');
    if (!cardContainer) return;

    const owner = this.players.find(p => p.properties.includes(tile.id));
    const groupData = COLOR_GROUPS[tile.group] || { color: '#0288d1' };

    let statusHtml = '';
    let rentInfoHtml = '';

    if (tile.type === 'property' || tile.type === 'transport' || tile.type === 'utility') {
      if (!owner) {
        statusHtml = `<span class="badge-unowned">🏛️ ખરીદી શકાય છે: રૂ. ${tile.price.toLocaleString('gu-IN')}</span>`;
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

  // =========================================================================
  // DICE ROLL & STEP MOVEMENT (ONLY moving player hops!)
  // =========================================================================
  rollDice() {
    if (this.isRolling) {
      if (Date.now() - (this._rollStartTime || 0) > 1500) {
        this.isRolling = false;
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
    let stepsLeft = steps;
    const stepDuration = 125;
    const interval = setInterval(() => {
      if (stepsLeft <= 0) {
        clearInterval(interval);
        this.renderTokens(player.id);
        setTimeout(() => this.renderTokens(null), 200);
        this.updateActiveTileCard(player.position);
        this.handleTileLanding(player);
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
          this.addLog(`${player.name} એ વિચારપૂર્વક ${tile.name} ખરીદવાનું ટાળ્યું.`);
          this.finishAction();
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
    const modal = document.getElementById('modal-property');
    const header = document.getElementById('prop-modal-header');
    const title = document.getElementById('prop-modal-title');
    const subtitle = document.getElementById('prop-modal-sub');
    const priceVal = document.getElementById('prop-modal-price');
    const rentTable = document.getElementById('prop-modal-rent-table');
    const buyBtn = document.getElementById('btn-buy-prop');
    const passBtn = document.getElementById('btn-pass-prop');

    const groupData = COLOR_GROUPS[tile.group] || { color: '#1976d2' };
    if (header) header.style.backgroundColor = groupData.color;
    if (title) title.innerText = tile.name;
    if (subtitle) subtitle.innerText = tile.subName;
    if (priceVal) priceVal.innerText = `રૂ. ${tile.price.toLocaleString('gu-IN')}`;

    if (rentTable) {
      if (tile.rent) {
        rentTable.innerHTML = `
          <tr><td>સામાન્ય ભાડું:</td><td><b>રૂ. ${tile.rent[0]}</b></td></tr>
          <tr><td>આખો કલર સેટ:</td><td><b>રૂ. ${tile.rent[0] * 2}</b></td></tr>
          <tr><td>૧ ઘર સાથે ભાડું:</td><td><b>રૂ. ${tile.rent[1]}</b></td></tr>
          <tr><td>૨ ઘર સાથે ભાડું:</td><td><b>રૂ. ${tile.rent[2]}</b></td></tr>
          <tr><td>૩ ઘર સાથે ભાડું:</td><td><b>રૂ. ${tile.rent[3]}</b></td></tr>
          <tr><td>૧ હોટેલ સાથે ભાડું:</td><td><b style="color:#b71c1c;">રૂ. ${tile.rent[4]}</b></td></tr>
          <tr><td>ઘર બાંધકામ ખર્ચ:</td><td>રૂ. ${tile.houseCost || 1500}</td></tr>
        `;
      } else {
        rentTable.innerHTML = `<tr><td colspan="2">${tile.desc}</td></tr>`;
      }
    }

    const shortageAlert = document.getElementById('prop-insufficient-funds-alert');
    const shortageDesc = document.getElementById('prop-shortage-desc');
    const loanQuickBtn = document.getElementById('btn-prop-quick-loan');
    const questionEl = document.getElementById('prop-buy-question');

    const isShort = player.cash < tile.price;

    if (isShort) {
      if (shortageAlert) shortageAlert.style.display = 'block';
      if (shortageDesc) {
        const diff = tile.price - player.cash;
        shortageDesc.innerHTML = `આ મિલ્કતની કિંમત <b>રૂ. ${tile.price.toLocaleString('gu-IN')}</b> છે, જ્યારે તમારી પાસે માત્ર <b>રૂ. ${player.cash.toLocaleString('gu-IN')}</b> છે.<br><b style="color:#ffd54f;">ખૂટતી રકમ: રૂ. ${diff.toLocaleString('gu-IN')}</b>`;
      }
      if (questionEl) questionEl.innerText = 'તમારી પાસે પૂરતા પૈસા નથી! તમે બેંક કે અન્ય ખેલાડી પાસેથી લોન લઈ શકો છો:';
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
        buyBtn.innerHTML = `ખરીદો (Buy: રૂ. ${tile.price.toLocaleString('gu-IN')})`;
        buyBtn.style.opacity = '1';
        buyBtn.onclick = () => {
          this.closeModal('modal-property');
          this.buyProperty(player, tile);
        };
      }
    }

    if (passBtn) {
      passBtn.onclick = () => {
        this.closeModal('modal-property');
        this.addLog(`${player.name} એ ${tile.name} ખરીદવાનું ટાળ્યું.`);
        this.finishAction();
      };
    }

    const auctionBtn = document.getElementById('btn-auction-prop');
    if (auctionBtn) {
      auctionBtn.onclick = () => {
        this.closeModal('modal-property');
        this.startPropertyAuction(tile);
      };
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

    this.showEventModal("ભાગ્ય (Bhagya)", rule.text, () => {
      this.executeRule(player, rule);
    });
  }

  handleVyavaharLanding(player) {
    const isEven = this.diceSum % 2 === 0;
    const rulePool = isEven ? VYAVAHAR_RULES.EVEN : VYAVAHAR_RULES.ODD;
    let rule = rulePool[this.diceSum] || Object.values(rulePool)[0];

    this.showEventModal("વ્યવહાર (Vyavahar)", rule.text, () => {
      this.executeRule(player, rule);
    });
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
        this.renderTokens(player.id);
        setTimeout(() => this.renderTokens(null), 300);
        sound.playCash();
        this.addLog(`${player.name} પાછા મુંબઈ ગયા અને સ્ટાર્ટીંગ બોનસ + ઇનામ રૂ. ૪,૫૦૦ મેળવ્યા!`, 'log-money');
        this.finishAction();
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
      if (color) {
        banner.style.borderColor = color;
      }
      banner.classList.remove('highlight-event');
      void banner.offsetWidth;
      banner.classList.add('highlight-event');

      if (this.notificationTimer) clearTimeout(this.notificationTimer);
      this.notificationTimer = setTimeout(() => {
        banner.classList.remove('highlight-event');
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
  showBankLoanModal() {
    const player = this.getCurrentPlayer();
    const modal = document.getElementById('modal-loan');
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

    const targetPlayer = this.players.find(p => p.id === selectedPlayerId) || this.players[0];

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
          <div style="display:flex; justify-content:space-between; align-items:center; background:${isOwned ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.2)'}; padding:5px 8px; border-radius:5px;">
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
    this.updateUI();

    const player = this.getCurrentPlayer();
    if (player && player.isBot) {
      try {
        this.botManageTurn(player);
      } catch (e) {
        console.warn('Bot manage turn error:', e);
      }
      setTimeout(() => {
        if (document.querySelector('.modal-overlay.active')) return;
        const cur = this.getCurrentPlayer();
        if (cur && cur.isBot && this.turnPhase === 'END') {
          this.endTurn();
        }
      }, 700);
    }
  }

  endTurn() {
    let nextIdx = (this.currentPlayerIndex + 1) % this.players.length;
    let attempts = 0;
    while (this.players[nextIdx].isBankrupt && attempts < this.players.length) {
      nextIdx = (nextIdx + 1) % this.players.length;
      attempts++;
    }

    this.currentPlayerIndex = nextIdx;
    this.turnPhase = 'ROLL';
    this.isRolling = false; // Always clear rolling flag on turn transition
    this.updateUI();

    const nextPlayer = this.getCurrentPlayer();
    this.addLog(`હવે ${nextPlayer.name} નો દાવ છે.`);
    this.showScreenNotification('🎲', 'નવો દાવ શરૂ!', `હવે ${nextPlayer.name} નો દાવ છે! પાસા ફેંકો.`, nextPlayer.color, 2500);

    this.isGameActive = true;
    this.saveGameState();
    this.startBotWatchdog();
    this.checkBotTurn();
  }

  checkBotTurn() {
    const player = this.getCurrentPlayer();
    if (!player || !player.isBot || player.isBankrupt) return;

    // Do not trigger bot action if any modal popup is open on screen
    if (document.querySelector('.modal-overlay.active')) return;

    if (this._botTurnTimer) clearTimeout(this._botTurnTimer);

    if (this.turnPhase === 'ROLL') {
      this._botTurnTimer = setTimeout(() => {
        if (document.querySelector('.modal-overlay.active')) return;
        const cur = this.getCurrentPlayer();
        if (cur && cur.isBot && this.turnPhase === 'ROLL') {
          this.rollDice();
        }
      }, 750);
    } else if (this.turnPhase === 'END') {
      this._botTurnTimer = setTimeout(() => {
        if (document.querySelector('.modal-overlay.active')) return;
        const cur = this.getCurrentPlayer();
        if (cur && cur.isBot && this.turnPhase === 'END') {
          this.endTurn();
        }
      }, 600);
    }
  }

  startBotWatchdog() {
    if (this._watchdogInterval) clearInterval(this._watchdogInterval);
    this._watchdogInterval = setInterval(() => {
      if (!this.isGameActive) return;
      // Do not interrupt while any modal is open on screen
      if (document.querySelector('.modal-overlay.active')) return;

      const player = this.getCurrentPlayer();
      if (!player || !player.isBot || player.isBankrupt) return;

      // Watchdog failsafe: If bot is in ROLL phase and not moving for >2.5s, force roll
      if (this.turnPhase === 'ROLL' && !this.isRolling) {
        this.rollDice();
      } else if (this.turnPhase === 'END') {
        this.endTurn();
      }
    }, 2200);
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

    const bCash = document.getElementById('bank-vault-cash');
    const bLoans = document.getElementById('bank-active-loans');
    if (bCash) bCash.innerText = `રૂ. ${this.bank.cash.toLocaleString('gu-IN')}`;
    if (bLoans) bLoans.innerText = `રૂ. ${this.bank.totalLoans.toLocaleString('gu-IN')}`;

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
  }

  showTileDetails(tile) {
    this.updateActiveTileCard(tile.id);
  }

  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
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
        if (modal) modal.classList.remove('active');
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
