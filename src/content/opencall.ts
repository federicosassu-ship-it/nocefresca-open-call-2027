/**
 * NOCEFRESCA — OPEN CALL 2027 · single source of truth for the landing page.
 *
 * Every fact below was taken from nocefresca.it on 7 Nov 2026 (source URL noted per block).
 * Update this file — not the components — when dates, fees, status or copy change.
 * Items marked [TO CONFIRM] must be checked by the Nocefresca team before launch.
 */

const SITE = 'https://www.nocefresca.it/';
export const src = (path: string) => `${SITE}?/${path}`;

/* ------------------------------------------------------------------ */
/* 1. APPLICATION STATUS — the one block to edit when the status changes */
/* ------------------------------------------------------------------ */

export type StatusState = 'open' | 'rolling' | 'closed' | 'upcoming';
export type Availability = 'unknown' | 'available' | 'few' | 'full';

export const status = {
  /**
   * 'open'     → before the deadline
   * 'rolling'  → deadline passed, applications still considered while places remain (source: "**Is the open call expired? If there are available places, you can still apply")
   * 'closed'   → no more places for this edition (CTA switches to short stays + contact)
   * 'upcoming' → next open call announced but not yet open
   */
  state: 'rolling' as StatusState,
  edition: 7,
  year: 2027,
  deadline: '2026-09-07', // "APPLICATION DEADLINE: 7th September 2026" — src('open_call&ocpag=dates')
  resultsDate: '2026-09-21', // "SELECTION RESULTS NOTIFICATION: 21st September 2026"
  lastVerified: '2026-11-07',
  /** Optional public note. Leave '' to hide. Never publish "42 places" as live availability: 6 periods × 7 residents = 42 is total capacity. [TO CONFIRM] */
  note: '',
};

export const statusCopy: Record<StatusState, { badge: string; line: string; detail: string; cta: string }> = {
  open: {
    badge: 'Applications open',
    line: 'Apply by 7 September 2026',
    detail: 'Selection results are announced by 21 September 2026.',
    cta: 'Apply now',
  },
  rolling: {
    badge: 'Remaining places',
    line: 'Main deadline passed · applications still welcome if places are available',
    detail:
      'The main deadline (7 September 2026) has passed, but applications are still welcome if places are available. A green light here means there may still be availability for your chosen period. We’ll confirm this when reviewing your application. Otherwise, you can wait for the next open call or apply for a two-week short stay.',
    cta: 'Apply now',
  },
  closed: {
    badge: 'Applications closed',
    line: 'Open Call 2027 is full · short stays still available',
    detail: 'All places for this edition are taken. Join a two-week short stay or write to us to hear about the next call.',
    cta: 'See short stays',
  },
  upcoming: {
    badge: 'Opening soon',
    line: 'The next open call opens soon',
    detail: 'Write to us to be notified when applications open.',
    cta: 'Get in touch',
  },
};

/* ------------------------------------------------------------------ */
/* 2. LINKS & CONTACTS                                                 */
/* ------------------------------------------------------------------ */

export const links = {
  /** The real application form (8 steps). The landing replaces the interstitial ?/apply_form page. */
  apply: src('apply_now'),
  applyInfo: src('apply_form'),
  openCall: src('open_call&ocpag=new_open_call_announced'),
  shortStays: src('shortstays'),
  faq: src('faq'),
  artists: src('artists'),
  about: src('about'),
  press: src('press'),
  studios: src('open_call&ocpag=studios'),
  equipment: src('open_call&ocpag=equipment_and_gears'),
  housing: src('open_call&ocpag=housing'),
  location: src('open_call&ocpag=location'),
  programme: src('open_call&ocpag=programme'),
  fees: src('open_call&ocpag=fees'),
  facilities: src('open_call&ocpag=facilities_and_additional_services'),
  dates: src('open_call&ocpag=dates'),
  calendarPdf: `${SITE}archivio/pdf/calendar_apr_may_2025.pdf`,
  pastTopic: src('news_show_one&qnews=87&titolo=Unofficial_Cartographies'),
  whichMonth: src('news_show_one&qnews=41'),
  milisGuide: src('news_show_one&qnews=14'),
  westSardiniaGuide: src('news_show_one&qnews=13'),
  letterMakenzie: src('news_show_one&qnews=103&titolo=To_Inquiring_Artists_Letter_from_a_2026_two_months_resident'),
  diaryAnna: src('news_show_one&qnews=92&titolo=A_Day_in_Milis_Finding_a_Routine_in_a_New_Reality'),
  email: 'info@nocefresca.it',
  whatsapp: 'https://wa.me/393402640505',
  whatsappDisplay: '+39 340 264 0505',
  instagram: 'https://www.instagram.com/nocefresca/',
  facebook: 'https://www.facebook.com/NOCEFRESCA-443169183177257',
  privacy: 'https://www.iubenda.com/privacy-policy/89390951',
};

export const address = {
  street: 'Via Diaz, 18',
  postalCode: '09070',
  city: 'Milis',
  province: 'OR',
  region: 'Sardinia',
  country: 'Italy',
  lat: 40.0514, // 40° 03′ 05″ N
  lon: 8.6381, //  8° 38′ 17″ E
};

/* ------------------------------------------------------------------ */
/* 3. DATES                                                            */
/* ------------------------------------------------------------------ */

// src('open_call&ocpag=dates'); seasonal notes from "Which month to choose…" (qnews=41); weather from the FAQ.
export const periods: {
  id: string;
  label: string;
  arrive: string;
  depart: string;
  weather: string;
  highlights: string;
  availability: Availability;
}[] = [
  { id: 'mar-apr', label: 'March – April', arrive: '2027-03-17', depart: '2027-04-13', weather: 'Mild, 12–22 °C', highlights: 'Wild asparagus, Holy Week traditions and the first barefoot walks on the sand.', availability: 'unknown' },
  { id: 'apr-may', label: 'April – May', arrive: '2027-04-15', depart: '2027-05-13', weather: '12–22 °C, warming up', highlights: 'Easter night choirs, bread-making rites, rural feasts — and Sant’Efisio in Cagliari on 1 May.', availability: 'unknown' },
  { id: 'may-jun', label: 'May – June', arrive: '2027-05-17', depart: '2027-06-14', weather: 'Warm, 20–30 °C', highlights: 'Green valleys, wild fennel, village festivals and the cherries of Montiferru.', availability: 'unknown' },
  { id: 'sep-oct', label: 'September – October', arrive: '2027-09-14', depart: '2027-10-12', weather: '20–30 °C, softening', highlights: 'Blackberries, quieter beaches, the equinox light at the Santa Cristina well, the grape harvest.', availability: 'unknown' },
  { id: 'oct-nov', label: 'October – November', arrive: '2027-10-14', depart: '2027-11-11', weather: '10–20 °C, still swimmable', highlights: 'Wild mushrooms and harvests in October; new wine and the first oranges in November.', availability: 'unknown' },
  { id: 'nov-dec', label: 'November – December', arrive: '2027-11-15', depart: '2027-12-14', weather: '10–20 °C, then 10–15 °C', highlights: 'Long flaming sunsets, persimmons, mild days for trekking and winter songs.', availability: 'unknown' },
];

/* ------------------------------------------------------------------ */
/* 4. FEES — src('open_call&ocpag=fees')                               */
/* ------------------------------------------------------------------ */

export const fees = [
  {
    id: 'A',
    price: 1650,
    title: 'Casa Bagnolo studio + private bedroom',
    studio: 'Private studio in Casa Bagnolo (Studio Ramiro, Nick or Marco)',
    sleep: 'Private bedroom, queen-size bed for single use',
    bath: 'Bathroom shared with one other bedroom',
    bestFor: 'Anyone who wants to be at the heart of the residency',
    detail:
      'You sleep in one of the shared apartments (max 4 artists). Your private studio is in Casa Bagnolo, a 5-minute walk from the accommodation.',
  },
  {
    id: 'B',
    price: 1800,
    title: 'Casa Oaxaca studio + private bedroom',
    studio: 'Private studio in Casa Oaxaca + Oaxaca Studio Garden',
    sleep: 'Private bedroom, queen-size bed for single use',
    bath: 'Bathroom shared with one other bedroom',
    bestFor: 'Artists who want to work outdoors or with bulky materials',
    detail:
      'You sleep in one of the shared apartments (max 4 people). Your studio is in Casa Oaxaca, a 5-minute walk away, with access to the Oaxaca Studio Garden: an 80 m² shaded outdoor workspace shared with up to three other artists. 24/7 access to the communal spaces at Casa Bagnolo.',
  },
  {
    id: 'C',
    price: 1820,
    title: 'Private Research Studio suite',
    studio: 'Research studio inside your suite + Oaxaca Studio Garden',
    sleep: 'Private suite, queen-size bed for single use, fireplace',
    bath: 'En-suite bathroom',
    bestFor: 'Writers, digital artists and researchers',
    detail:
      'You live and work in Casa Oaxaca (max 4 guests): a private suite with en-suite bathroom, a relaxation area with fireplace and a dedicated workstation, plus the Oaxaca Studio Garden. 24/7 access to the communal spaces at Casa Bagnolo.',
  },
  {
    id: 'D',
    price: 1850,
    title: 'Casa Oaxaca studio + en-suite bedroom',
    studio: 'Private studio in Casa Oaxaca + Oaxaca Studio Garden access', // per founder's 2026-11 edits [TO CONFIRM]
    sleep: 'Private bedroom in Casa Oaxaca, French-size bed for single use',
    bath: 'En-suite bathroom',
    bestFor: 'Artists who want a private bathroom and the Studio Garden',
    detail:
      'You sleep in Casa Oaxaca (max 4 people) with an en-suite bathroom; your private studio is also in Casa Oaxaca, with access to the Oaxaca Studio Garden. 24/7 access to the communal spaces at Casa Bagnolo.',
  },
  {
    id: 'E',
    price: 1880,
    title: 'Orchard Studio Cottage',
    studio: 'Private cottage in a citrus orchard, studio and home in one',
    sleep: 'French-size bed for single use',
    bath: 'Private bathroom',
    bestFor: 'Writers, researchers, digital artists and musicians — the cottage is music friendly',
    detail:
      'A private two-floor cottage in the countryside of Milis with an indoor workspace and two shaded patios. Casa Bagnolo is a 20-minute walk, 10-minute bike ride or 5-minute drive away, with 24/7 access to its communal areas.',
  },
];

export const feeIncludes = [
  'Your private studio, open 24/7',
  'Accommodation with water, electricity, gas, kitchenware, bed linen and towels, washing machine and Wi-Fi',
  'General cleaning at the start and end of your stay', // Housing page; FAQ adds "in the middle" [TO CONFIRM]
  'Guest curator: two group meetings, three one-to-one sessions and a written text on your practice',
  'Scheduled activities: open studio, workshops, public talks and trips in the calendar',
  'Shared equipment, yoga mats and bikes — plus a budget for durable equipment on request',
  '24/7 access to Casa Bagnolo’s communal areas, meeting/projection room and courtyard',
  'Invitation letter, pre-departure plan and help with materials, permits and local contacts',
  'Open studios and public talks to show your work',
  'Your profile in the Nocefresca online archive',
  'Liability insurance for the residency buildings',
];

// src('open_call&ocpag=facilities_and_additional_services') — "Main facilities" included in the residency fee
export const facilities: [string, string][] = [
  ['Housing', 'Private bedroom in a shared home with a fully equipped kitchen, washing machine, heating and cooling, bed linen and towels. Private apartments on request.'],
  ['Studio & meeting room', '24/7 access to studios and meeting/projection areas with Wi-Fi in the historic centre of Milis.'],
  ['Curatorial assistance', 'Invitation letter, pre-departure plan, inspirational hints, meetings with the guest curator, help sourcing materials, permits and licences, and support with the local community.'],
  ['Equipment', 'A budget for durable equipment on request (consumables not included).'],
  ['Planned activities', 'Workshops by other residents and trips in the calendar are covered; some partner activities may have an extra fee.'],
  ['Outdoors', 'Free access to the courtyard of Casa Bagnolo for work and rest.'],
  ['Events', 'Show work in progress or finished pieces at open studios and public talks.'],
  ['Bikes', 'A set of bicycles for daily use, best for short distances.'],
  ['Archive', 'Your artist profile published in the Nocefresca online archive.'],
  ['Insurance', 'Buildings carry liability insurance for accidental damage to third parties. Personal health insurance is not included: arrange your own cover for the whole stay.'],
];

export const feeExcludes = ['Travel', 'Medical insurance (arrange your own cover for the whole stay)', 'Food', 'Production costs', 'Consumable materials', 'Extra services'];

export const feeExtras = [
  { name: 'Meals at Casa Bagnolo', detail: 'Sardinian and international dishes cooked by Antonella, a local farmer, on booking (association membership required).', price: 'On booking' },
  { name: 'A guest in your room', detail: 'One guest can share the artist’s room and bed, whatever option you choose.', price: '€15 / night, min. 7 nights' },
  { name: 'Art supplies bought for you', detail: 'Too heavy or delicate to travel with? We buy them and bring them to your studio before you arrive.', price: 'Extra fee' },
  { name: 'Italian lessons', detail: 'Online private lessons with a certified Italian teacher.', price: 'Extra fee' },
  { name: 'Yoga lessons', detail: 'With Antonella, indoors or outdoors depending on the weather.', price: 'On request' },
];

// FAQ "payment, cancellation and rescheduling policy" + application form step 7
export const payment = {
  confirmationFee: 450,
  confirmationWindow: 'within 2 weeks of the selection notice',
  balanceDue: '12 weeks before your start date at the latest',
  methods: 'Bank transfer or online money transfer through Wise',
  cancellation: [
    { when: 'Up to 8 weeks before', refund: 'Full residency fee refunded, minus the confirmation fee' },
    { when: '8 to 4 weeks before', refund: '50% of the residency fee refunded, minus the confirmation fee' },
    { when: 'Less than 4 weeks before', refund: 'No refund' },
  ],
  rescheduling: '€80 fee, at least 8 weeks’ notice, within the same calendar year and only if places are available.',
};

/* ------------------------------------------------------------------ */
/* 5. STUDIOS — src('open_call&ocpag=studios')                         */
/* ------------------------------------------------------------------ */

export type Studio = {
  id: string;
  name: string;
  house: 'Casa Bagnolo' | 'Casa Oaxaca' | 'Orchard';
  size: string;
  specs: string[];
  bestFor: string;
  text: string;
  note?: string;
  options: string[];
  images: string[]; // file names in src/assets/img/studios
};

export const studios: Studio[] = [
  {
    id: 'ramiro',
    name: 'Studio Ramiro',
    house: 'Casa Bagnolo',
    size: '13 m²',
    specs: ['Ground floor', 'Door', 'Fan', 'Courtyard sink', 'Wi-Fi'],
    bestFor: 'Large-scale work',
    text: 'A maxi table and wide walls to hang canvases or large pieces, steps from the courtyard sink for cleaning brushes. Generally cool, with a fan in summer; heating and cooling are shared with the communal areas on the same floor.',
    options: ['A'],
    images: ['ramiro-1.jpg', 'ramiro-2.jpg', 'ramiro-3.jpg'],
  },
  {
    id: 'marco',
    name: 'Studio Marco',
    house: 'Casa Bagnolo',
    size: '13 m²',
    specs: ['Ground floor', 'Curtain instead of a door', 'AC', 'Courtyard sink', 'Wi-Fi'],
    bestFor: 'Large-scale work, afternoon light',
    text: 'A big table and a wooden board for canvases. A curtain instead of a door — perfect if you don’t like being closed in — and beautiful natural light in the afternoon.',
    note: 'You may hear the artist in the studio above through a small gap in the wooden ceiling.',
    options: ['A'],
    images: ['marco-1.jpg', 'marco-2.jpg', 'marco-3.jpg'],
  },
  {
    id: 'nick',
    name: 'Studio Nick',
    house: 'Casa Bagnolo',
    size: '13 m²',
    specs: ['First floor', 'Door', 'AC', 'Rooftop view', 'Wi-Fi'],
    bestFor: 'Photographers, painters, textile artists',
    text: 'On the first floor, with a rooftop view and natural light. Chosen by many kinds of artists; AC inside and a toilet on the same floor.',
    note: 'You may hear the artist in the studio below through a small gap in the wooden floor.',
    options: ['A'],
    images: ['nick-1.jpg', 'nick-2.jpg', 'nick-3.jpg'],
  },
  {
    id: 'italo',
    name: 'Studio Italo',
    house: 'Casa Oaxaca',
    size: '13 m²',
    specs: ['Ground floor', 'Door', 'AC', 'Courtyard sink', 'Studio Garden'],
    bestFor: 'Photographers, painters, textile artists',
    text: 'Located on the ground floor of Casa Oaxaca, with easy access to the internal courtyard, its sink and the 80 m² Oaxaca Studio Garden. A wooden panel can be installed on request.',
    options: ['B', 'D'],
    images: ['italo-2.jpg', 'italo-3.jpg', 'italo-5.jpg'],
  },
  {
    id: 'leo',
    name: 'Studio Leo',
    house: 'Casa Oaxaca',
    size: '16 m²',
    specs: ['Ground floor', 'Door', 'AC', 'Courtyard sink', 'Studio Garden'],
    bestFor: 'Photographers, painters, textile artists',
    text: 'The largest indoor studio, on the ground floor next to the courtyard and the shared Oaxaca Studio Garden. A wooden panel can be installed on request.',
    note: 'Photo not up to date: the new furniture matches the Casa Bagnolo studios.',
    options: ['B', 'D'],
    images: ['leo-1.jpg'],
  },
  {
    id: 'research',
    name: 'Research Studio',
    house: 'Casa Oaxaca',
    size: '10 m²',
    specs: ['Inside a private suite', 'En-suite bathroom', 'Fireplace', 'AC', 'Studio Garden'],
    bestFor: 'Writers, digital artists, researchers',
    text: 'A dedicated workstation inside a private suite with a queen-size bed, en-suite bathroom and a relaxation area with fireplace. 24/7 access to Casa Bagnolo, a 5-minute walk away.',
    note: 'Images not yet up to date: the studio is being finalised and will have a desk, task lamp and swivel chair.',
    options: ['C'],
    images: ['research-1.jpg', 'research-2.jpg'],
  },
  {
    id: 'garden',
    name: 'Oaxaca Studio Garden',
    house: 'Casa Oaxaca',
    size: '80 m²',
    specs: ['Outdoor', 'Shaded canopy', 'Shared by up to 4 artists'],
    bestFor: 'Bulky or messy materials, outdoor work',
    text: 'An outdoor workspace in a private courtyard garden designed by local landscape designers Italo and Leo. Ideal for bulky materials, toxic substances or simply more time outdoors.',
    options: ['B', 'C', 'D'],
    images: ['garden-5.jpg', 'garden-6.jpg', 'garden-7.jpg', 'garden-1.jpg'],
  },
  {
    id: 'orchard',
    name: 'Orchard Studio Cottage',
    house: 'Orchard',
    size: 'Two floors',
    specs: ['Private cottage', 'Countryside', 'AC', 'Two shaded patios', 'Music friendly'],
    bestFor: 'Writing, reading, drawing, music',
    text: 'A private cottage in Maria’s citrus orchard, 20 minutes on foot from Casa Bagnolo: living room with fireplace and workstation, kitchenette, double bedroom and bathroom. A basic mountain bike is provided.',
    note: 'Not suitable for painting or messy, toxic materials. The road is not lit at night, so a car is convenient after dark. Cicadas sing from spring to late summer.',
    options: ['E'],
    images: ['orchard-2.jpg', 'orchard-3.jpg', 'orchard-6.jpg', 'orchard-8.jpg', 'orchard-5.jpg'],
  },
];

// src('open_call&ocpag=equipment_and_gears')
export const equipment: { group: string; items: string[] }[] = [
  { group: 'Devices', items: ['28" 4K UHD monitor (Samsung UR55)', 'B/W laser printer-scanner, max A4 (HP LaserJet Pro MFP M28)', 'Projector (Lumeri F500-W)', 'Projector (Epson EB-FH52)', 'Projector screen (2 × 1.5 m)'] },
  { group: 'Painting', items: ['Easels', 'Staple gun', 'Glue gun', 'Plastic and tin containers', 'Glass painting palette (30 × 40 cm)', 'Porcelain mortars (100 & 150 mm) with pestle', 'Spatulas and small tools'] },
  { group: 'Photography', items: ['Manfrotto tripod', 'LED work lights with tripod', 'Black fabric backdrop (150 × 200 cm)', 'White fabric backdrop (200 × 300 cm)'] },
  { group: 'Drawing & collage', items: ['A3 light pad', 'A3 cutting mat'] },
  { group: 'Sewing & weaving', items: ['Sewing machine (Juki HZL-353ZR-A)', 'Seamstress and embroidery scissors', 'Seamstress rulers', 'Iron and ironing board', 'Ashford rigid heddle loom (80 cm)'] },
  { group: 'Stationery', items: ['Thumbtacks, clips, Post-its', 'Scissors and cutting knife', 'Set squares, stapler, hole punch', 'A4 office paper'] },
  { group: 'General tools', items: ['US–EU 3-prong adapters', 'Telescopic ladder (3.76 m)', 'Measuring tape (10 m), level, 1 m metal ruler', 'Plastic basin, small electric chopper, flour sieve'] },
  { group: 'Refreshment point', items: ['Kettle and electric moka pot', 'Small fridge', 'Bottles, glasses, cups, boards and cutlery'] },
  { group: 'Body & mind', items: ['Yoga mats (6)', 'Bikes'] },
  { group: 'Donated materials', items: ['A box of materials and supplies left by past residents — help yourself'] },
];

/* ------------------------------------------------------------------ */
/* 6. PEOPLE                                                           */
/* ------------------------------------------------------------------ */

// Home page review carousel (all 4 reviews published) — quotes verbatim.
export const testimonials = [
  { id: 'momo', name: 'Momo', role: 'Fashion designer', country: 'USA', quote: 'Nocefresca was a life changing experience. It allowed me to create in gorgeous studios and to plan my days around an inspiring schedule. It introduced me to lifelong friends and it gave me space to grow and learn within a beautiful island.', portrait: 'review-22-portrait.jpg', work: 'review-22-work.jpg', url: 'https://www.momofashions.art/' },
  { id: 'sean', name: 'Sean Dahlman', role: 'Video maker and composer', country: 'USA', quote: 'Nocefresca was truly incredible. I created many beautiful friendships and memories. The activities helped me develop my art and, with little distractions and stunning landscapes, I had consistent focus, which is rare in the city I live in.', portrait: 'review-26-portrait.jpg', work: 'review-26-work.jpg', url: 'https://www.facebook.com/dahlmansean/' },
  { id: 'stefano', name: 'Stefano Conti', role: 'Visual artist and photographer', country: 'Sweden', quote: 'In Sardinia I got to experience life with another phase, slower and more laid back. This helped my mental health and my focus on the project. I also had the chance to get to know the local community that made the whole experience priceless.', portrait: 'review-27-portrait.jpg', work: 'review-27-work.jpg', url: 'https://www.stefanoconti.info/' },
  { id: 'olga', name: 'Oľga Paštéková', role: 'Painter', country: 'Slovakia', quote: 'I’m very happy with the new works I developed at Nocefresca. Starting from the online residency we had during the first Covid lockdown, I decided then to visit Sardinia in 2021 to continue working on my painting project Nonfinito.', portrait: 'review-18-portrait.jpg', work: 'review-18-work.jpg', url: 'http://www.olique.sk/' },
];

// "To Inquiring Artists — Letter from a 2026 two months resident", Makenzie Quinn (qnews=103)
export const letter = {
  author: 'Makenzie Quinn',
  role: 'Writer in residence, 2026',
  quotes: {
    lead: 'I arrived as one person, and left as more myself.',
    middle: 'At Nocefresca, you’re rewarded for being in the middle, for experimenting, and being uncertain.',
    honest:
      'If you came to an artist residency to fry on the beach when your lust for creation dulls […] Nocefresca might not be the place for you. But that’s why it was the place for me.',
    group: 'We watched each other try, fail, and revise. We listened to each other’s music, and we made each other tea.',
    close: 'If you have the chance to do it, go.',
  },
};

// "A Day in Milis — Finding a Routine in a New Reality", Anna Dreussi (qnews=92)
export const diary = {
  author: 'Anna Dreussi',
  role: 'Writer in residence, March 2025',
  quote: 'Our dinner is pieced together. A little like we are pieced together. We’re from everywhere and ended up here.',
};

// Artists archive, 2026 edition "Unofficial Cartographies — Second Edition" (src('artists'))
export const residents2026 = [
  { name: 'Richard Ballon', role: 'Poet, playwright', country: 'USA', img: '193.jpg' },
  { name: 'Phillipa Byrne', role: 'Ceramic artist', country: 'Australia', img: '199.jpg' },
  { name: 'Josefina De Urquiza', role: 'Painter', country: 'Argentina / Mexico', img: '196.jpg' },
  { name: 'Eniko Czigany', role: 'Visual artist', country: 'Hungary', img: '208.jpg' },
  { name: 'Mattia Scioni', role: 'Composer', country: 'Italy, Sardinia', img: '212.jpg' },
  { name: 'Iva Ivanova', role: 'Textile designer', country: 'Austria', img: '201.jpg' },
  { name: 'Stang Gubbels', role: 'Illustrator, graphic designer', country: 'Netherlands', img: '194.jpg' },
  { name: 'Makenzie Quinn', role: 'Writer', country: 'USA', img: '197.jpg' },
  { name: 'Rosemary Smith', role: 'Illustrator', country: 'Hong Kong', img: '211.jpg' },
  { name: 'Ian Nelson', role: 'Filmmaker', country: 'USA', img: '198.jpg' },
  { name: 'Cristina Pop & Manuela Batas', role: 'Visual artists', country: 'Romania', img: '215.jpg' },
  { name: 'Claire Drummond', role: 'Painter', country: 'Canada', img: '202.jpg' },
  { name: 'Mary Zompetti', role: 'Photographer', country: 'USA', img: '195.jpg' },
];

// Derived from the Artists archive on 7 Nov 2026: 169 entries in Milis 2021–2026 (some are duos), 36 countries/territories. [TO CONFIRM]
export const stats = [
  { value: '7th', label: 'edition in 2027' },
  { value: '170+', label: 'artists in Milis since 2021' },
  { value: '30+', label: 'countries' },
  { value: '7', label: 'residents at a time, at most' },
];

// src('open_call&ocpag=housing') — hosts and their own words (verbatim excerpts)
export const hosts = [
  { name: 'Antonella', place: 'Casa Bagnolo', role: 'Her family owns Casa Bagnolo, one of the oldest houses in Milis and the headquarters of the residency. She is your link to the village.', quote: 'Returning to Sardinia I rediscovered the pleasure of slow rhythms.', img: 'host-1-face.jpg' },
  { name: 'Italo & Leo', place: 'Casa Oaxaca', role: 'Garden designers and nurserymen (I Campi). They met in Chicago and moved to Italo’s homeland.', quote: 'Innovation in landscape architecture in Sardinia must start from the existing reality.', img: 'host-2-face.jpg' },
  { name: 'The Mastinu family', place: 'A renovated family house', role: 'Augusto sings in Milis’ La Vega choir; his family hosts artists in a large house renovated for them.', quote: 'We adore meeting new people and sharing our time and experiences.', img: 'host-9-face.jpg' },
  { name: 'Maria', place: 'Orchard Studio Cottage', role: 'Keeper of an unofficial ethnographic museum and of the family orchard where the cottage stands.', quote: 'My philosophy? Laugh, have fun, and always look on the bright side of life.', img: 'host-10-face.jpg' },
];

export const curator = {
  name: 'Francesca Sassu',
  role: 'Founder, cultural project manager and curator',
  quote:
    'Please feel free to contact me anytime to discuss your interest in Nocefresca and how Sardinia can accommodate your unique artist discipline and goals.',
};

/* ------------------------------------------------------------------ */
/* 7. FOR WHOM / PROGRAMME / PARTNERS                                  */
/* ------------------------------------------------------------------ */

export const disciplines = [
  'Visual artists', 'Writers', 'Designers', 'Composers', 'Film-makers', 'Illustrators',
  'Mixed-media artists', 'Architects', 'Fashion designers', 'Researchers', 'Community artists',
];

// Home page "You will love it if you want to…"
export const loveIt = [
  { title: 'Take a step back', text: 'You need some quiet time and space to reflect and recharge.' },
  { title: 'Focus on your practice', text: 'You want to develop new work or bring an ongoing project forward.' },
  { title: 'Explore a line of research', text: 'You are curious about a subject, a context or a question you want to investigate.' },
  { title: 'Experiment', text: 'You are looking for the freedom to test ideas, work with unfamiliar approaches and discover new possibilities.' },
  { title: 'Receive curatorial support', text: 'You value exchanging ideas and reflecting on your research and creative process.' },
  { title: 'Be part of a small community', text: 'You enjoy sharing ideas, conversations and everyday moments with others.' },
  { title: 'Experience a different side of Italy', text: 'Fresh food, local culture and the rhythms of a rural Sardinian village.' },
];

// Honest filters — each grounded in the FAQ, Programme page or Location page.
export const notForYou = [
  { title: 'You want a beach holiday or nightlife', text: 'Milis is a village of 1,500 people. The sea is 19 km away and you’ll need a car to explore.' },
  { title: 'You need a structured course', text: 'The residency is self-directed: you’re expected to be self-sufficient in your practice.' },
  { title: 'You need a fully funded fellowship', text: 'Nocefresca can’t offer fellowships at the moment — but can support your own funding applications.' },
];

// For Whom page — "Ten adjectives to describe Nocefresca"
export const tenWords = [
  { word: 'International', text: 'You meet artists and creatives from all over the world.' },
  { word: 'Intergenerational', text: 'All ages can apply.' },
  { word: 'Community friendly', text: 'We support you in interacting with the local community for your art projects.' },
  { word: 'Rural', text: 'Five minutes’ walk from your studio, you can chat with sheep, horses and chickens.' },
  { word: 'Inspiring', text: 'Daily doses of inspiration from the culture and nature of an ancient island.' },
  { word: 'Digital friendly', text: 'Ideal for digital creative professionals in need of a rural workspace.' },
  { word: 'Process based', text: 'No final outcome required.' },
  { word: 'Detox', text: 'Alternate work sessions with walks around town, the countryside, or time with residents and locals.' },
  { word: 'Mediterranean', text: 'Temperate climate and natural-food diets.' },
  { word: 'Sustainable', text: 'Part of a growing community focused on humans, nature and sustainability.' },
];

export const pastThemes = [
  { year: 2023, title: 'The Citrus Route' },
  { year: 2024, title: 'The Water Journey' },
  { year: 2025, title: 'Unofficial Cartographies' },
  { year: 2026, title: 'Unofficial Cartographies — second edition' },
];

/**
 * Institutions that have funded past residents' stays (embassies, arts councils, universities…).
 * Shown as a logo wall under the fees. To be supplied by Nocefresca — the wall stays hidden while empty.
 * Example: { name: 'Arts Council X', country: 'Country', logo: 'funders/arts-council-x.png' } (file in src/assets/img/funders/)
 */
export const funders: { name: string; country?: string; logo?: string }[] = [
  { name: 'Europe Moves Culture' },
  { name: 'Swedish Arts Grants Committee' },
  { name: 'Kingdom of the Netherlands' },
  { name: 'Stroom Den Haag' },
  { name: 'Jacksonville State University' },
  { name: 'Boynes Emerging Artist Award' },
  { name: 'American Academy in Rome' },
  { name: 'Galleria MANCASPAZIO' },
  { name: 'Ministero della Cultura – Soprintendenza Archivistica della Sardegna' },
  { name: 'Regione Sardegna' },
];

export const press = [
  { outlet: 'Artribune', title: 'Nocefresca, il nuovo programma di residenze artistiche in Sardegna', url: 'https://www.artribune.com/professioni-e-professionisti/who-is-who/2021/10/nocefresca-nuovo-programma-residenze-artistiche-sardegna/' },
  { outlet: 'Acremagazine', title: 'Nocefresca è casa, ricerca, relazioni, collettività', url: 'https://acremagazine.com/2022/03/30/nocefresca-e-casa-ricerca-relazioni-collettivita/' },
  { outlet: 'Frizzifrizzi', title: 'I tappeti tessuti dal designer Marco Loi', url: 'https://www.frizzifrizzi.it/2021/07/28/fotografia-e-suono-si-intrecciano-nei-tappeti-tessuti-dal-designer-marco-loi-con-la-tecnica-tradizionale-sarda-a-pibiones/' },
];

/* ------------------------------------------------------------------ */
/* 8. APPLICATION — src('apply_form') + the 8-step form at src('apply_now') */
/* ------------------------------------------------------------------ */

export const selectionCriteria = [
  'Artistic quality <small>(<strong>the project proposal and the presentation of your artistic background and practice</strong>)</small>',
  'Feasibility of the project',
  'Length of stay',
  'Impact on the group and on the local community',
  'Secured budget',
];

export const prepareChecklist = [
  { title: 'A short project idea', text: 'It doesn’t need to be finished during the residency — it helps us understand your practice and research.' },
  { title: 'The equipment you’d need', text: 'Check the shared equipment list first.' },
  { title: 'Length and timing', text: 'One, two or three months, plus your first, second and third choice of starting month.' },
  { title: 'Your gift to the community', text: 'What you’d like to share with locals or fellow residents: a recipe at a public dinner, a workshop, a talk…' },
  { title: 'Studio, housing and guests', text: 'Your preferred studio and housing option, and whether a guest will join you.' },
  { title: 'How you’ll fund your stay', text: 'Self-funded, a grant you already have, or one you’re applying for.' },
  { title: 'CV + portfolio in one PDF', text: 'Max 20 MB. Texts or other supporting material are fine if more relevant to your practice.' },
  { title: 'Your links', text: 'Website, Instagram and Facebook (optional).' },
];

/** The actual questions of the online form, so artists can draft answers offline ("Copy the questions"). */
export const formQuestions = `NOCEFRESCA — OPEN CALL 2027 · APPLICATION FORM QUESTIONS
(Copied from nocefresca.it — draft your answers here, then paste them into the form: ${links.apply})

1. PERSONAL DATA
- Name* / Surname* / Nickname
- Date of birth* / Pronoun* / Born in / Based in* / E-mail*
- How did you discover Nocefresca?

2. OBJECTIVES AND LENGTH OF STAY
- If you already have a project idea to develop during the residency, write a short description* (no required outcomes)
- Which kind of equipment would you need?* (check the available equipment first)
- For how many months are you applying?* (1, 2 or 3)
- Starting from which month?* First, second and third choice (March, April, May, September, October, November)
- What would you like to donate to the local community or to the other resident artists during your stay?*

3. STUDIO AND HOUSING
- Preferred studio (Ramiro, Marco, Nick, Italo + Garden, Leo + Garden, Research Studio + Garden, Orchard Studio Cottage)
- Select your housing
- Do you come with a companion / external guest?* (€15/night, min. 7 nights)
- I have read the information about the fees

4. FUNDS
- In case of selection, how do you plan to cover the cost of your residency?*

5. CV / PORTFOLIO / SOCIAL MEDIA
- CV + portfolio combined in a single PDF (max 20 MB)*
- Website / Instagram / Facebook

6. ADDITIONAL NOTES
- Any other need or thought

7. TERMS OF SERVICE
- Payment, cancellation, rescheduling and privacy policies (to accept)

8. SUMMARY — review and press Submit (the application is not sent until you do).
`;

/* ------------------------------------------------------------------ */
/* 9. FAQ — answers condensed from src('faq'), facts unchanged          */
/* ------------------------------------------------------------------ */

export const faq: { id: string; group: 'Applying' | 'The residency' | 'Practical'; q: string; a: string }[] = [
  { id: 'who', group: 'Applying', q: 'Who can apply?', a: 'Nocefresca is perfect for — but not limited to — visual artists, writers, designers, composers, film-makers, illustrators, mixed-media artists, architects, fashion designers, researchers and community artists. Solo artists, collectives and small groups of all ages are welcome.' },
  { id: 'project', group: 'Applying', q: 'Do I need a specific project? Is a final outcome required?', a: 'There are no required outcomes: Nocefresca is a research-based residency focused on experimentation and exchange. Your project idea is still an important part of the application, because it helps us understand your practice, interests and research approach.' },
  { id: 'deadline', group: 'Applying', q: 'Can I apply after the deadline?', a: 'Yes, if there are still places available. The main deadline for Open Call 2027 was 7 September 2026. If places remain in the period you want, you can still apply; if not, you can wait for the next call or join a <a href="https://www.nocefresca.it/?/shortstays">two-week short stay (Nocefreschissima)</a>. It is also possible to apply at any time if you already have specific funds to cover your participation.' },
  { id: 'selection', group: 'Applying', q: 'How does selection work?', a: 'The selection aims to create a harmonious group. Criteria are artistic quality, feasibility of the project, length of stay, impact on the group and on the local community, and secured budget.' },
  { id: 'funding', group: 'Applying', q: 'Do you offer fellowships or funding?', a: 'Not at the moment. If you are selected, we provide a formal invitation letter and, if needed, an official residency plan with a personalised budget to support your funding applications. The open call is published a year ahead partly to give artists time to find funding.' },
  { id: 'length', group: 'The residency', q: 'How long can I stay?', a: 'One, two or three months, in the periods between March and June and between September and December 2027. In the form you choose up to three preferred starting months; if selected we’ll do our best to meet your request, though periods may be changed with notice to design a balanced group.' },
  { id: 'included', group: 'The residency', q: 'What is included in the fee — and what isn’t?', a: 'Included: accommodation (utilities, kitchenware, towels and bed linen, washing machine, Wi-Fi, street parking, cleaning), 24/7 studio access, equipment, yoga mats and bikes, curatorial assistance, scheduled activities such as open studios, workshops, talks and trips, and your profile in the online archive. Not included: travel, medical insurance, food, production costs, consumable materials and extra services.' },
  { id: 'group', group: 'The residency', q: 'How many artists are there at the same time?', a: 'Up to 7 residents, plus up to 2 short-stay guests.' },
  { id: 'mandatory', group: 'The residency', q: 'Are the group activities mandatory?', a: 'No. Whether you share a flat or live privately, you decide how much time to give to activities. We encourage them as a way to connect with each other and better understand the Sardinian context — the final open studio is optional too.' },
  { id: 'italian', group: 'Practical', q: 'Do I need to speak Italian?', a: 'Not essential. The staff at Casa Bagnolo and the other residents speak English. Milis is rural and not many people speak English, so some Italian helps — learn to order your cappuccino and vino rosso beforehand! Online lessons can be arranged.' },
  { id: 'travel', group: 'Practical', q: 'How do I get there, and do I need a car?', a: 'Fly into Cagliari, take a train to Oristano, then a bus (about 30 minutes) or a pre-booked taxi with our trusted drivers. Olbia and Alghero airports are possible but connections are more limited. Many artists stayed without a car; to explore the island, renting one (and sharing it) is strongly advised. Bikes are available for the village. You receive a pre-departure guide once confirmed.' },
  { id: 'guests', group: 'Practical', q: 'Can I bring a guest, children or a pet?', a: 'One guest can share your room and bed (€15 per night, minimum one week). Children are welcome only if you request a private apartment, and cannot stay at the studio premises. Pets can’t be accommodated at the moment.' },
  { id: 'access', group: 'Practical', q: 'Are the studios and houses accessible?', a: 'On the ground floor of Casa Bagnolo, two studios and two desk spaces are accessible to wheelchair users and people with limited mobility, and so is the courtyard; the upper floor is not. Each house is different — write to us and we’ll tell you more.' },
  { id: 'payment', group: 'Practical', q: 'What are the payment, cancellation and rescheduling terms?', a: 'If selected, you sign a confirmation letter and pay a €450 confirmation fee within 2 weeks (non-refundable; it secures your place). The rest is due 12 weeks before you start. Cancel 8+ weeks before: full refund minus the confirmation fee; 8–4 weeks: 50% refund minus the confirmation fee; under 4 weeks: no refund. Rescheduling costs €80 with at least 8 weeks’ notice, within the same calendar year and subject to availability.' },
];
