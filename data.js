// data.js - નવો વ્યાપાર બોર્ડ ડેટા, નિયમો અને ૬ ખેલાડીઓ (Navo Vyapar Board Data)

export const COLOR_GROUPS = {
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
export const BOARD_TILES = [
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
export const BHAGYA_RULES = {
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

export const VYAVAHAR_RULES = {
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
export const DEFAULT_PLAYERS = [
  { id: 0, name: "તમે (લાલ)", color: "#e53935", tokenClass: "token-red", isBot: false },
  { id: 1, name: "બોટ ૧: રમેશ (લીલો)", color: "#43a047", tokenClass: "token-green", isBot: true },
  { id: 2, name: "બોટ ૨: સુરેશ (પીળો)", color: "#fdd835", tokenClass: "token-yellow", isBot: true },
  { id: 3, name: "બોટ ૩: મહેશ (વાદળી)", color: "#1e88e5", tokenClass: "token-blue", isBot: true },
  { id: 4, name: "બોટ ૪: પરેશ (જાંબલી)", color: "#8e24aa", tokenClass: "token-purple", isBot: true },
  { id: 5, name: "બોટ ૫: કલ્પેશ (કેસરી)", color: "#fb8c00", tokenClass: "token-orange", isBot: true }
];
