import type { BlogPost, FAQ, Hero, LegalPage, Navigation, PricingItem, SeoLandingPage, SiteSettings, Treatment, Workshop } from './types'

const ux = (id: string, w = 1300, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

export const photos = {
  heroLight: ux('1518495973542-4542c06a5843', 1100, 1380),
  aboutWarm: ux('1501785888041-af3ef285b470', 1200, 1200),
  portrait: ux('1531123897727-8f129e1688ce', 1000, 1300),
  transhealing: ux('1528319725582-ddc096101511', 1200, 900),
  opstelling: ux('1470071459604-3b5ec3a7fe05', 1200, 900),
  innerlijk: ux('1447752875215-b2761acb3c5d', 1200, 900),
  contact: ux('1441974231531-c6227db76b6e', 1200, 800),
  location: ux('1497366754035-f200968a6e72', 1300, 900),
  locationRoom: ux('1513694203232-719a280e022f', 1100, 820),
  locationDetail: ux('1518005020951-eccb494ad742', 1100, 820),
  ws1: ux('1501785888041-af3ef285b470', 900, 640),
  ws2: ux('1470071459604-3b5ec3a7fe05', 900, 640),
  ws3: ux('1441974231531-c6227db76b6e', 900, 640),
  ws4: ux('1518495973542-4542c06a5843', 900, 640),
  rust: ux('1500530855697-b586d89ba3ee', 1300, 900),
  patronen: ux('1473773508845-188df298d2d1', 1300, 900),
  lichaam: ux('1499209974431-9dddcece7f88', 1300, 900),
  grenzen: ux('1502082553048-f009c37129b9', 1300, 900),
  seizoen: ux('1507783548227-544c3b8fc065', 1300, 900)
}

export const siteSettings: SiteSettings = {
  siteName: 'Kathara Nova',
  siteTitle: 'Holistische therapie in Schoonoord | Kathara Nova',
  siteDescription: 'Holistische therapie, transheling, opstellingen en bewustwording in Schoonoord, Drenthe.',
  logoMark: '/assets/logo-phoenix-mark.png',
  logoFull: '/assets/logo-phoenix-full.png',
  email: 'hallo@katharanova.nl',
  phone: '06 12 34 56 78',
  location: 'Op afspraak · Schoonoord',
  appointmentUrl: '/contact',
  footerText: 'Een warme praktijk in Schoonoord voor holistische therapie, transheling, opstellingen en bewustwording. Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.',
  copyright: 'Kathara Nova - Heling & Bewustwording',
  kvkText: 'KvK 00000000'
}

export const navigation: Navigation = {
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Over mij', href: '/over-mij' },
    { label: 'Fotogallerij', href: '/fotogallerij' },
    { label: 'Locatie', href: '/locatie' },
    { label: 'Workshops', href: '/workshops' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tarieven', href: '/tarieven' },
    { label: 'Contact', href: '/contact' }
  ],
  treatmentItems: [
    { label: 'Transheling', href: '/transheling' },
    { label: 'Opstelling', href: '/opstelling' },
    { label: 'Innerlijke werk', href: '/innerlijke-werk' }
  ],
  ctaLabel: 'Plan een afspraak',
  ctaHref: '/contact'
}

export const home = {
  hero: {
    eyebrow: 'Holistische therapie in Schoonoord',
    title: 'Vastgelopen in patronen, spanning of levensvragen?',
    intro: 'Kathara Nova begeleidt je in Schoonoord met transheling, opstellingen en innerlijk werk naar meer rust, inzicht en bewustwording.',
    image: photos.heroLight
  },
  heroChipText: 'Ruimte om te helen en te groeien',
  heroMetaItems: [
    { icon: 'map-pin', label: 'Schoonoord, Drenthe', order: 1 },
    { icon: 'clock', label: 'Sessies 60-90 min', order: 2 }
  ],
  recognitionTitle: 'Soms voel je dat je verder wilt, maar iets houdt je tegen',
  recognitionIntro: 'Dat kan zich uiten in spanning, terugkerende emoties, oude overtuigingen, innerlijke onrust of patronen die steeds opnieuw terugkomen.',
  recognitionItems: [
    'Spanning of klachten waar je met aandacht naar wilt kijken',
    'Terugkerende emoties die om aandacht vragen',
    'Oude overtuigingen die je tegenhouden',
    'Innerlijke onrust en patronen die zich herhalen'
  ],
  treatmentsEyebrow: 'Behandelingen',
  treatmentsTitle: 'Transheling, opstellingen en innerlijk werk',
  treatmentsIntro: 'Drie vormen van holistische begeleiding in Schoonoord, afgestemd op waar jij nu staat.',
  aboutEyebrow: 'Over Kathara Nova',
  aboutTitle: 'Begeleiding met aandacht voor de diepere laag',
  aboutText: 'Bij Kathara Nova wordt niet alleen gekeken naar wat zichtbaar speelt, maar ook naar de patronen en overtuigingen eronder. De begeleiding ondersteunt bewustwording, rust, richting en verandering.',
  aboutImage: photos.aboutWarm,
  galleryEyebrow: 'Fotogallerij',
  galleryTitle: 'Sfeer van de praktijk',
  galleryIntro: 'Een indruk van de rust, natuur en aandacht die de begeleiding dragen.',
  galleryItems: [
    { image: photos.aboutWarm, caption: 'Zachte aandacht', order: 1 },
    { image: photos.heroLight, caption: 'Ruimte om te ademen', order: 2 },
    { image: photos.opstelling, caption: 'Natuur als bedding', order: 3 },
    { image: photos.contact, caption: 'Rust en helderheid', order: 4 },
    { image: photos.rust, caption: 'In jouw tempo', order: 5 }
  ],
  quote: 'Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.',
  workshopPreviewEyebrow: 'Workshops',
  workshopPreviewTitle: 'Workshops persoonlijke groei in Schoonoord',
  cta: {
    title: 'Voel je dat het tijd is om anders met je situatie om te gaan?',
    text: 'Je hoeft nog niet precies te weten wat je nodig hebt. Een eerste vraag stellen is genoeg om samen te kijken welke begeleiding passend is.',
    primaryLabel: 'Neem contact op',
    primaryHref: '/contact',
    secondaryLabel: 'Bekijk de tarieven',
    secondaryHref: '/tarieven'
  }
}

export const aboutPage = {
  hero: {
    eyebrow: 'Over mij',
    title: 'De mens achter Kathara Nova',
    intro: 'Ik geloof dat ieder mens een diep zelfhelend vermogen draagt. Mijn werk is om daar samen met jou ruimte voor te maken.'
  } satisfies Hero,
  portrait: photos.portrait,
  stats: [
    { value: '10+', label: 'jaar ervaring' },
    { value: '500+', label: 'sessies' },
    { value: '3', label: 'methoden' }
  ],
  introTitle: 'Introductie',
  intro: 'Mijn eigen pad - door verlies, vastlopen en herstel - bracht me naar dit werk. Ik weet hoe het voelt om te zoeken naar grond onder je voeten.\n\nVanuit die ervaring begeleid ik nu anderen die het gevoel hebben dat ze niet verder komen. Warm en nuchter tegelijk - ik blijf dicht bij wat er werkelijk speelt, zonder vaag jargon.',
  visionTitle: 'Mijn visie',
  vision: 'Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet. Klachten en patronen zijn vaak een signaal van iets dat dieper ligt. Wanneer je daar bewust van wordt, ontstaat er ruimte - en daarmee de mogelijkheid om anders te kiezen.',
  workingMethodTitle: 'Werkwijze',
  workingMethod: 'We werken in jouw tempo, met aandacht voor lichaam, emotie en betekenis. Ik combineer energetisch werk, systemisch inzicht en persoonlijke begeleiding, afgestemd op waar jij staat.',
  methodSteps: [
    { title: 'Veiligheid', description: 'Eerst rust en vertrouwen - zonder druk.', order: 1 },
    { title: 'Verdieping', description: 'Samen kijken naar wat er werkelijk speelt.', order: 2 },
    { title: 'Integratie', description: 'Inzichten een plek geven in je dagelijks leven.', order: 3 }
  ],
  forWhoTitle: 'Voor wie mijn begeleiding bedoeld is',
  forWho: [
    'Je loopt vast door chronische klachten of stress',
    'Je herkent terugkerende patronen of innerlijke conflicten',
    'Je draagt oud zeer, emoties of trauma met je mee',
    'Je zoekt richting, rust en diepere bewustwording'
  ],
  cta: {
    title: 'Benieuwd of het bij je past?',
    text: 'Een vrijblijvend kennismakingsgesprek is de zachtste manier om te beginnen. Ik denk graag met je mee.',
    primaryLabel: 'Plan een kennismaking',
    primaryHref: '/contact'
  }
}

export const locationPage = {
  hero: {
    eyebrow: 'Locatie',
    title: 'Een rustige plek om te landen',
    intro: 'De praktijkruimte is ingericht als een warme, stille bedding voor sessies, opstellingen en verdiepende begeleiding.',
    image: photos.location
  } satisfies Hero,
  introTitle: 'Welkom in de praktijk',
  intro: 'De locatie is bewust rustig gehouden: zachte materialen, natuurlijk licht en genoeg ruimte om even aan te komen voordat we beginnen.\n\nTijdens een sessie is er aandacht voor privacy, vertraging en een heldere afstemming op wat jij nodig hebt.',
  carouselItems: [
    { image: photos.location, caption: 'Rustige ontvangstruimte', order: 1 },
    { image: photos.locationRoom, caption: 'Ruimte voor sessies en opstellingen', order: 2 },
    { image: photos.locationDetail, caption: 'Zachte details en natuurlijke materialen', order: 3 },
    { image: photos.aboutWarm, caption: 'Een warme plek om te verdiepen', order: 4 }
  ],
  textBlocks: [
    { title: 'Bereikbaarheid', text: 'De praktijk is op afspraak geopend. Na het plannen ontvang je de exacte adresgegevens en praktische informatie voor je bezoek.', order: 1 },
    { title: 'Online of op locatie', text: 'Een deel van de begeleiding kan ook online plaatsvinden. We kijken samen wat passend is voor jouw vraag en situatie.', order: 2 },
    { title: 'Aankomen in rust', text: 'Plan als het kan wat ruimte rondom je afspraak, zodat je niet gehaast hoeft binnen te komen of direct weer door hoeft.', order: 3 }
  ],
  cta: {
    title: 'Wil je weten of een sessie op locatie past?',
    text: 'Stel gerust je vraag. Ik denk graag met je mee over wat praktisch en inhoudelijk klopt.',
    primaryLabel: 'Neem contact op',
    primaryHref: '/contact',
    secondaryLabel: 'Bekijk tarieven',
    secondaryHref: '/tarieven'
  }
}

export const treatments: Treatment[] = [
  {
    eyebrow: 'Behandeling · energetisch',
    title: 'Transheling',
    slug: 'transheling',
    navLabel: 'Transheling',
    summary: 'Energetisch en bewustzijnsgericht werk dat ondersteunt bij ontspanning, bewustwording en innerlijke ruimte.',
    intro: 'Energetisch en bewustzijnsgericht werk dat ondersteunt bij ontspanning, bewustwording en innerlijke ruimte.',
    whatTitle: 'Wat is transheling?',
    whatBody: 'Transheling is een zachte vorm van energetisch werk. Met aandacht en afstemming onderzoeken we wat spanning geeft en waar ruimte mag ontstaan. Veel mensen ervaren tijdens en na een sessie meer rust, helderheid en contact met hun lijf.',
    forWhoTitle: 'Voor wie is het bedoeld?',
    forWho: ['Chronische klachten en vermoeidheid', 'Stress, spanning en onrust', 'Vastgezette emoties of trauma', 'Het gevoel vast te zitten in je lichaam'],
    sessionTitle: 'Wat kun je verwachten tijdens een sessie?',
    sessionSteps: [
      { title: 'Intake', description: 'We bespreken wat er speelt en wat je nodig hebt.' },
      { title: 'Behandeling', description: 'Je ligt ontspannen; ik werk met aandacht en energie.' },
      { title: 'Integratie', description: 'Ruimte om te voelen, met tijd voor nazorg.' }
    ],
    outcomesTitle: 'Mogelijke effecten',
    outcomes: ['Meer rust en ruimte in je lichaam', 'Minder spanning en onrust', 'Helderheid en overzicht', 'Hernieuwd contact met jezelf'],
    icon: 'sparkles',
    tone: 'cream',
    image: photos.transhealing,
    order: 1,
    ctaTitle: 'Klaar voor een eerste stap?',
    ctaText: 'Stel vrijblijvend je vraag of plan een sessie. Ik denk graag met je mee.'
  },
  {
    eyebrow: 'Behandeling · systemisch',
    title: 'Opstelling',
    slug: 'opstelling',
    navLabel: 'Opstelling',
    summary: 'Inzicht in verborgen patronen binnen familiesystemen, relaties of levenssituaties.',
    intro: 'Inzicht in verborgen patronen binnen familiesystemen, relaties of levenssituaties - en de ruimte om ze een plek te geven.',
    whatTitle: 'Wat is een opstelling?',
    whatBody: 'Een (familie)opstelling brengt onbewuste dynamieken aan het licht. Wat generaties lang doorwerkt, wordt voelbaar en zichtbaar. Vaak ontstaat er een diepe beweging van erkenning, waardoor je je vrijer kunt verhouden tot je verleden.',
    forWhoTitle: 'Voor wie is het bedoeld?',
    forWho: ['Terugkerende patronen in relaties', 'Onverklaarbare loyaliteit of schuld', 'Levensthema’s die zich herhalen', 'Vragen rond familie en herkomst'],
    sessionTitle: 'Wat kun je verwachten tijdens een sessie?',
    sessionSteps: [
      { title: 'Vraag', description: 'We formuleren samen jouw thema of vraag.' },
      { title: 'Opstelling', description: 'Het systeem wordt zichtbaar gemaakt en in beweging gebracht.' },
      { title: 'Inzicht', description: 'Je neemt een nieuw, helend beeld met je mee.' }
    ],
    outcomesTitle: 'Mogelijke effecten',
    outcomes: ['Inzicht in wat onbewust speelt', 'Erkenning en verzachting', 'Meer innerlijke vrijheid', 'Rust in je systeem'],
    icon: 'git-fork',
    tone: 'sage',
    image: photos.opstelling,
    order: 2,
    ctaTitle: 'Klaar voor een eerste stap?',
    ctaText: 'Stel vrijblijvend je vraag of plan een sessie. Ik denk graag met je mee.'
  },
  {
    eyebrow: 'Behandeling · persoonlijk',
    title: 'Innerlijke werk',
    slug: 'innerlijke-werk',
    navLabel: 'Innerlijke werk',
    summary: 'Begeleiding bij beperkende overtuigingen, emoties en persoonlijke groei.',
    intro: 'Begeleiding bij beperkende overtuigingen, emoties en persoonlijke groei - gericht op heling, bewustwording en richting.',
    whatTitle: 'Wat is innerlijk werk?',
    whatBody: 'Innerlijke werk is een verdiepend traject waarin we kijken naar de overtuigingen en emoties die je onbewust sturen. Stap voor stap maak je contact met wat er werkelijk speelt. We werken aan emotionele verwerking, bewustwording en zelfcompassie, zodat er ruimte ontstaat voor groei en vertrouwen.',
    forWhoTitle: 'Voor wie is het bedoeld?',
    forWho: ['Beperkende overtuigingen over jezelf', 'Emoties die om verwerking vragen', 'Behoefte aan bewustwording en richting', 'Verlangen naar meer zelfcompassie en groei'],
    sessionTitle: 'Wat kun je verwachten tijdens een sessie?',
    sessionSteps: [
      { title: 'Verkenning', description: 'We brengen in kaart wat je tegenhoudt.' },
      { title: 'Verdieping', description: 'We werken met emotie, lichaam en bewustzijn.' },
      { title: 'Groei', description: 'Je integreert nieuwe inzichten in je dagelijks leven.' }
    ],
    outcomesTitle: 'Mogelijke effecten',
    outcomes: ['Zachtere, helpende overtuigingen', 'Meer zelfcompassie', 'Innerlijke rust en richting', 'Vertrouwen en persoonlijke groei'],
    icon: 'heart-handshake',
    tone: 'clay',
    image: photos.innerlijk,
    order: 3,
    ctaTitle: 'Klaar voor een eerste stap?',
    ctaText: 'Stel vrijblijvend je vraag of plan een sessie. Ik denk graag met je mee.'
  }
]

export const workshops: Workshop[] = [
  { date: '2026-09-14', title: 'Aarden & loslaten', slug: 'aarden-loslaten', tone: 'cream', image: photos.ws1, spotsLabel: '6 plekken', location: 'Praktijk · Nederland', durationLabel: '1 dag · 10-16u', price: '€95', excerpt: 'Een dag om te landen in je lijf, spanning los te laten en weer rust te vinden.', active: true, featured: true },
  { date: '2026-10-05', title: 'Werken met de schaduw', slug: 'werken-met-de-schaduw', tone: 'sage', image: photos.ws2, spotsLabel: '8 plekken', location: 'Praktijk · Nederland', durationLabel: 'Middag · 13-17u', price: '€65', excerpt: 'Ontmoet de delen van jezelf die je liever wegduwt - met zachtheid en moed.', active: true, featured: false },
  { date: '2026-11-02', title: 'Familiepatronen helen', slug: 'familiepatronen-helen', tone: 'clay', image: photos.ws3, spotsLabel: '10 plekken', location: 'Praktijk · Nederland', durationLabel: '1 dag · 10-17u', price: '€110', excerpt: 'Een groepsopstelling rond herkomst, loyaliteit en de patronen die doorwerken.', active: true, featured: false },
  { date: '2026-12-07', title: 'Stilte & bewustwording', slug: 'stilte-bewustwording', tone: 'cream', image: photos.ws4, spotsLabel: '12 plekken', location: 'Online', durationLabel: 'Ochtend · 9-12u', price: '€45', excerpt: 'Meditatief werk om contact te maken met je innerlijke stem en richting.', active: true, featured: false }
]

export const workshopsPage = {
  hero: { eyebrow: 'Workshops', title: 'Samen helen in een kleine groep', intro: 'In een veilige groep ontstaat vaak iets wat alleen moeilijk lukt: herkenning. Praktische dagen en dagdelen rond heling en bewustwording.' },
  groupHealingEyebrow: 'Waarom een groep?',
  groupHealingTitle: 'Wat in een groep kan helen',
  groupHealingText: 'Sommige dingen worden pas zichtbaar in het contact met anderen. Een groep biedt herkenning, spiegeling en een veilige ruimte om te oefenen.',
  groupHealingItems: [
    { icon: 'users', title: 'Herkenning', description: 'Je ervaart dat je niet de enige bent - dat alleen al verzacht.' },
    { icon: 'heart-handshake', title: 'Spiegeling', description: 'Anderen laten je delen van jezelf zien die je alleen niet ziet.' },
    { icon: 'shield', title: 'Veiligheid', description: 'Een kleine, zorgvuldig begeleide groep, zonder druk.' }
  ],
  cta: { title: 'Een vraag over een workshop?', text: 'Twijfel je of een workshop bij je past, of wil je op de hoogte blijven van nieuwe data? Laat het me weten.', primaryLabel: 'Neem contact op', primaryHref: '/contact' }
}

export const blogPage = {
  hero: { eyebrow: 'Blog', title: 'Woorden voor onderweg', intro: 'Korte teksten over heling, bewustwording en het leven dat soms vastloopt - en weer in beweging komt. Lees in jouw tempo.' },
  cta: { title: 'Liever een gesprek dan een tekst?', text: 'Wat je hier leest is een begin. Een vrijblijvend kennismakingsgesprek is de zachtste manier om de volgende stap te zetten.', primaryLabel: 'Plan een kennismaking', primaryHref: '/contact' }
}

export const blogCategories = [
  { title: 'Bewustwording', slug: 'bewustwording', order: 1 },
  { title: 'Opstelling', slug: 'opstelling', order: 2 },
  { title: 'Transheling', slug: 'transheling', order: 3 },
  { title: 'Innerlijke werk', slug: 'innerlijke-werk', order: 4 }
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'rust-vinden-als-je-vastloopt',
    category: 'Bewustwording',
    tone: 'sage',
    image: photos.rust,
    publishedAt: '2026-06-12',
    readTime: '6 min',
    title: 'Rust vinden als alles vastloopt',
    excerpt: 'Soms loopt het leven vast en weet je niet hoe verder. Over de eerste, zachte stap terug naar grond onder je voeten.',
    featured: true,
    content: [
      { type: 'lead', text: 'Soms loopt het leven vast - en weet je even niet hoe verder. Je doet je best, je houdt vol, en toch lijkt er iets te blijven hangen. Juist dan is het waardevol om niet harder te duwen, maar zachter te kijken.' },
      { type: 'p', text: 'Vastlopen voelt vaak als falen. Maar het is eerder een signaal: iets in jou vraagt om aandacht. Klachten, onrust of vermoeidheid zijn dan niet de vijand, maar een boodschapper.' },
      { type: 'h', text: 'Niet wat je overkomt, maar hoe je ermee omgaat' },
      { type: 'quote', text: 'Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.' },
      { type: 'p', text: 'Je hoeft het niet alleen te doen, en je hoeft nog niet te weten waar je heen wilt. Vaak is de eerste stap simpelweg: erkennen dat je vastloopt, en jezelf toestaan om hulp te vragen.' }
    ]
  },
  {
    slug: 'waarom-patronen-zich-herhalen',
    category: 'Opstelling',
    tone: 'cream',
    image: photos.patronen,
    publishedAt: '2026-05-28',
    readTime: '7 min',
    title: 'Waarom patronen zich blijven herhalen',
    excerpt: 'Dezelfde situatie, dezelfde emotie, een ander gezicht. Over de onzichtbare loyaliteiten die ons sturen - en hoe ze kunnen verzachten.',
    featured: false,
    content: [
      { type: 'lead', text: 'Je herkent het misschien: dezelfde dynamiek in steeds andere relaties, dezelfde emotie die telkens terugkeert.' },
      { type: 'p', text: 'Veel patronen ontstaan lang voordat we ze bewust kozen. Ze worden doorgegeven in families, gevormd door wat er niet gezegd kon worden, gedragen uit loyaliteit aan wie vóór ons kwam.' },
      { type: 'h', text: 'Het systeem zichtbaar maken' },
      { type: 'quote', text: 'Wat erkend mag worden, hoeft zich niet langer te herhalen.' },
      { type: 'p', text: 'Helen betekent niet je verleden afsnijden. Het betekent het een plek geven, zodat het je niet langer onbewust stuurt.' }
    ]
  },
  {
    slug: 'luisteren-naar-je-lichaam',
    category: 'Transheling',
    tone: 'clay',
    image: photos.lichaam,
    publishedAt: '2026-05-09',
    readTime: '5 min',
    title: 'Luisteren naar de taal van je lichaam',
    excerpt: 'Spanning, vermoeidheid, onrust - je lichaam spreekt voortdurend. Over wat er gebeurt als je weer leert luisteren.',
    featured: false,
    content: [
      { type: 'lead', text: 'Je lichaam praat de hele dag tegen je. Een gespannen kaak, een drukkende borst, een vermoeidheid die niet weggaat.' },
      { type: 'p', text: 'Vastgezette spanning, emoties en klachten hebben de neiging zich op te stapelen. Het lichaam onthoudt wat de geest probeert te vergeten.' },
      { type: 'quote', text: 'Je lichaam weet de weg terug - het heeft alleen ruimte nodig.' }
    ]
  },
  {
    slug: 'grenzen-als-vorm-van-zorg',
    category: 'Innerlijke werk',
    tone: 'cream',
    image: photos.grenzen,
    publishedAt: '2026-04-21',
    readTime: '6 min',
    title: 'Grenzen stellen als vorm van zelfzorg',
    excerpt: 'Voor velen voelt nee zeggen onveilig. Over waarom grenzen geen muren zijn, maar een manier om dichter bij jezelf te blijven.',
    featured: false,
    content: [
      { type: 'lead', text: 'Voor veel mensen voelt grenzen stellen ongemakkelijk - of zelfs onveilig.' },
      { type: 'p', text: 'Vaak liggen daar oude overtuigingen onder: dat je er moet zijn voor anderen, dat jouw behoeften minder tellen.' },
      { type: 'quote', text: 'Je grens beschermt niet alleen jou - hij maakt eerlijk contact mogelijk.' }
    ]
  },
  {
    slug: 'leven-met-de-seizoenen',
    category: 'Bewustwording',
    tone: 'sage',
    image: photos.seizoen,
    publishedAt: '2026-04-03',
    readTime: '4 min',
    title: 'Leven in beweging, leven met de seizoenen',
    excerpt: 'Niets in de natuur staat stil - en jij ook niet. Over loslaten, rusten en weer opbloeien, in jouw eigen ritme.',
    featured: false,
    content: [
      { type: 'lead', text: 'De natuur laat het ons elk jaar zien: er is een tijd van bloei, een tijd van loslaten, en een tijd van rust.' },
      { type: 'p', text: 'Wanneer het even donkerder of stiller in je is, betekent dat niet dat er iets mis gaat.' },
      { type: 'quote', text: 'Ook jij mag rusten voordat je weer opbloeit.' }
    ]
  }
]

export const seoLandingPages: SeoLandingPage[] = [
  {
    eyebrow: 'Holistische therapie Schoonoord',
    title: 'Holistische therapie in Schoonoord',
    slug: 'holistische-therapie-schoonoord',
    intro: 'Kathara Nova begeleidt je met aandacht voor lichaam, emoties, patronen en bewustwording, op afspraak in Schoonoord.',
    sections: [
      {
        title: 'Voor wie is holistische therapie bedoeld?',
        text: 'Deze begeleiding kan passend zijn als je vastloopt in terugkerende patronen, innerlijke onrust, stress, oude emoties of levensvragen. We kijken niet alleen naar de klacht, maar ook naar wat eronder ligt.'
      },
      {
        title: 'Wat kun je verwachten?',
        text: 'Tijdens een sessie stemmen we af op jouw vraag en werken we in jouw tempo. Afhankelijk van wat nodig is kan de begeleiding bestaan uit transheling, innerlijk werk, systemisch kijken of praktische integratie.'
      },
      {
        title: 'Praktisch',
        text: 'Sessies zijn op afspraak in Schoonoord. Je hoeft vooraf nog niet precies te weten welke vorm past; een eerste vraag stellen is genoeg om samen te kijken wat klopt.'
      }
    ],
    highlights: ['Schoonoord', 'Drenthe', 'Op afspraak', 'Online mogelijk'],
    relatedLinks: [
      { label: 'Transheling', href: '/transheling' },
      { label: 'Opstelling', href: '/opstelling' },
      { label: 'Contact', href: '/contact' }
    ],
    seo: {
      metaTitle: 'Holistische therapie in Schoonoord | Kathara Nova',
      metaDescription: 'Holistische therapie, heling en bewustwording in Schoonoord voor wie vastloopt in klachten, emoties of patronen.'
    }
  },
  {
    eyebrow: 'Trance-healing Drenthe',
    title: 'Trance-healing in Drenthe',
    slug: 'trance-healing-drenthe',
    intro: 'Bij Kathara Nova in Schoonoord kun je terecht voor transheling: energetisch en bewustzijnsgericht werk in een rustige setting.',
    sections: [
      {
        title: 'Wat is trance-healing?',
        text: 'Transheling is een vorm van energetische begeleiding waarbij rust, aandacht en bewustwording centraal staan. De sessie nodigt je uit om te vertragen en te onderzoeken wat gezien of verzacht mag worden.'
      },
      {
        title: 'Wanneer kan het passen?',
        text: 'Mensen komen vaak met spanning, vermoeidheid, terugkerende emoties, oude overtuigingen of het gevoel vast te zitten. De sessie is bedoeld als ondersteuning bij bewustwording en innerlijke ruimte.'
      },
      {
        title: 'Locatie en afspraak',
        text: 'De praktijk is gevestigd in Schoonoord en werkt op afspraak. Woon je in Drenthe, bijvoorbeeld rond Coevorden of Emmen, dan is de praktijk goed bereikbaar.'
      }
    ],
    highlights: ['Transheling', 'Schoonoord', 'Drenthe', 'Rust en bewustwording'],
    relatedLinks: [
      { label: 'Lees meer over transheling', href: '/transheling' },
      { label: 'Bekijk tarieven', href: '/tarieven' },
      { label: 'Plan een afspraak', href: '/contact' }
    ],
    seo: {
      metaTitle: 'Trance-healing in Drenthe | Kathara Nova',
      metaDescription: 'Trance-healing en energetische begeleiding in Drenthe voor rust, bewustwording en persoonlijke groei.'
    }
  },
  {
    eyebrow: 'Systeemopstelling Drenthe',
    title: 'Systeemopstelling in Drenthe',
    slug: 'systeemopstelling-drenthe',
    intro: 'Een opstelling bij Kathara Nova helpt zichtbaar maken welke patronen, loyaliteiten of dynamieken onbewust meebewegen.',
    sections: [
      {
        title: 'Wat maakt een opstelling zichtbaar?',
        text: 'Een systeemopstelling of familieopstelling kan inzicht geven in terugkerende patronen binnen familie, relaties, werk of levensvragen. Wat onbewust meespeelt, krijgt ruimte om gezien te worden.'
      },
      {
        title: 'Voor welke vragen?',
        text: 'Een opstelling kan passend zijn bij terugkerende relatiepatronen, schuldgevoel, loyaliteit, familiebelasting, keuzes die vastzitten of situaties waarin je merkt dat ratio alleen niet genoeg is.'
      },
      {
        title: 'Op afspraak in Schoonoord',
        text: 'De begeleiding vindt plaats in een rustige praktijksetting in Schoonoord. Samen formuleren we je vraag en onderzoeken we wat zich op een veilige manier wil laten zien.'
      }
    ],
    highlights: ['Systeemopstelling', 'Familieopstelling', 'Schoonoord', 'Drenthe'],
    relatedLinks: [
      { label: 'Lees meer over opstellingen', href: '/opstelling' },
      { label: 'Holistische therapie', href: '/holistische-therapie-schoonoord' },
      { label: 'Contact', href: '/contact' }
    ],
    seo: {
      metaTitle: 'Systeemopstelling in Drenthe | Kathara Nova',
      metaDescription: 'Systeemopstelling en familieopstelling in Drenthe voor inzicht in patronen, relaties en terugkerende dynamieken.'
    }
  }
]

export const pricingItems: PricingItem[] = [
  { title: '1-op-1 sessie', price: '€95', unit: 'per 75 min', tone: 'sand', description: 'Een persoonlijke sessie transheling of innerlijke werk, volledig afgestemd op jou.', features: ['Transheling of innerlijke werk', 'Online of op locatie', 'Inclusief nazorg'], ctaLabel: 'Plan een sessie', ctaHref: '/contact', featured: true, order: 1 },
  { title: 'Opstelling', price: '€120', unit: 'per 90 min', tone: 'cream', description: 'Een individuele opstelling rond een thema of vraag die je bezighoudt.', features: ['Individueel of in een groep', 'Familie-, relatie- of levensthema', 'Inclusief voor- en nagesprek'], ctaLabel: 'Plan een opstelling', ctaHref: '/contact', featured: false, order: 2 },
  { title: 'Workshop', price: 'vanaf €45', unit: 'per dagdeel', tone: 'cream', description: 'Samen helen in een kleine groep, tijdens een dag of dagdeel.', features: ['Kleine groep', 'Wisselende thema’s', 'Online of op locatie'], ctaLabel: 'Bekijk workshops', ctaHref: '/workshops', featured: false, order: 3 }
]

export const tarievenPage = {
  hero: { eyebrow: 'Tarieven', title: 'Helder en eerlijk', intro: 'Investeren in jezelf mag overzichtelijk zijn. Geen verrassingen - wel ruimte om te kiezen wat bij je past.' },
  faqEyebrow: 'Goed om te weten',
  faqTitle: 'Betaling, annulering en vragen',
  faqIntro: 'Goed om te weten voordat je een afspraak plant.',
  cta: { title: 'Wil je eerst overleggen?', text: 'Stel vrijblijvend je vraag. Samen kijken we wat passend is.', primaryLabel: 'Neem contact op', primaryHref: '/contact' }
}

export const faqs: FAQ[] = [
  { question: 'Hoe verloopt de betaling?', answer: 'Betaling gaat via overschrijving of tikkie, na de sessie of voorafgaand aan een workshop. Je ontvangt altijd een duidelijke factuur.', pageContext: 'tarieven', order: 1 },
  { question: 'Kan ik kosteloos annuleren?', answer: 'Annuleren of verzetten kan kosteloos tot 24 uur voor de afspraak. Daarna breng ik het tarief in rekening, tenzij er sprake is van overmacht.', pageContext: 'tarieven', order: 2 },
  { question: 'Worden sessies vergoed?', answer: 'Sommige zorgverzekeraars vergoeden een deel van de sessies vanuit de aanvullende verzekering. Vraag dit na bij je eigen verzekeraar.', pageContext: 'tarieven', order: 3 },
  { question: 'Ik heb een andere vraag of wens.', answer: 'Heb je een specifieke vraag of een wens die hier niet tussen staat? Neem gerust contact op - we kijken samen wat passend is.', pageContext: 'tarieven', order: 4 }
]

export const contactPage = {
  hero: { eyebrow: 'Contact', title: 'Stel je vraag of plan een afspraak', intro: 'Je hoeft nog niet precies te weten wat je nodig hebt. Je mag altijd contact opnemen met je vraag.' },
  formIntro: 'Vertel kort waar je tegenaan loopt. Je bericht wordt veilig naar mij verzonden; ik neem meestal binnen 2 werkdagen contact met je op.',
  availabilityText: 'Ik neem meestal binnen 2 werkdagen contact met je op.',
  image: photos.contact,
  quote: 'De eerste stap is vaak de moeilijkste - en de mooiste.',
  contactCards: [
    { icon: 'mail', label: 'E-mail', value: siteSettings.email, order: 1 },
    { icon: 'phone', label: 'Telefoon', value: siteSettings.phone, order: 2 },
    { icon: 'map-pin', label: 'Praktijk', value: siteSettings.location, order: 3 },
    { icon: 'clock', label: 'Openingstijden', value: 'Ma-vr · 9.00-18.00' }
  ]
}

export const termsPage: LegalPage = {
  hero: {
    eyebrow: 'Voorwaarden',
    title: 'Algemene voorwaarden',
    intro: 'Hier vind je de voorwaarden die gelden voor afspraken, sessies en workshops bij Kathara Nova.'
  },
  content: 'Deze pagina is voorbereid zodat je de algemene voorwaarden in de admin kunt invullen.\n\nVervang deze tekst door de definitieve voorwaarden voor afspraken, betaling, annulering en aansprakelijkheid.'
}

export const privacyPage: LegalPage = {
  hero: {
    eyebrow: 'Privacy',
    title: 'Privacyverklaring',
    intro: 'Hier lees je hoe Kathara Nova omgaat met persoonsgegevens en vertrouwelijke informatie.'
  },
  content: `Privacyverklaring
Praktijk Kathara Nova
Versie: 7-07-2026
Bij Praktijk Kathara Nova hecht ik veel waarde aan jouw privacy. Ik ga zorgvuldig om met jouw persoonsgegevens en zorg ervoor dat deze vertrouwelijk worden behandeld. In deze privacyverklaring lees je welke gegevens ik verzamel, waarom ik deze nodig heb en welke rechten je hebt.
1. Welke persoonsgegevens verwerk ik?
Wanneer je contact met mij opneemt of gebruikmaakt van mijn diensten, kan ik de volgende gegevens verwerken:
Voor- en achternaam
Adresgegevens (indien nodig voor facturatie)
Telefoonnummer
E-mailadres
Geboortedatum (indien relevant voor de begeleiding)
Gegevens over jouw hulpvraag
Notities die tijdens sessies worden gemaakt
Factuurgegevens
Ik verwerk uitsluitend gegevens die noodzakelijk zijn voor een goede begeleiding en administratie.
2. Waarom verwerk ik jouw gegevens?
Ik gebruik jouw persoonsgegevens om:
afspraken te plannen;
contact met je op te nemen;
behandelingen en begeleiding goed uit te voeren;
een cliëntendossier bij te houden;
facturen te versturen;
te voldoen aan wettelijke verplichtingen, zoals de belastingwetgeving.
3. Bijzondere persoonsgegevens
Tijdens sessies kunnen persoonlijke of gevoelige gegevens worden besproken. Deze informatie wordt vertrouwelijk behandeld en alleen vastgelegd wanneer dit noodzakelijk is voor de begeleiding.
4. Bewaartermijn
Ik bewaar jouw gegevens niet langer dan noodzakelijk is.
Administratieve gegevens en facturen worden volgens de wettelijke bewaarplicht 7 jaar bewaard.
Cliëntdossiers worden maximaal 5 jaar na de laatste afspraak bewaard, tenzij een langere bewaartermijn wettelijk verplicht is of jij toestemming geeft.
5. Delen van persoonsgegevens
Jouw gegevens worden niet verkocht of verstrekt aan derden.
Gegevens worden alleen gedeeld wanneer:
jij hiervoor schriftelijk toestemming hebt gegeven;
dit wettelijk verplicht is;
dit noodzakelijk is voor de uitvoering van de overeenkomst (bijvoorbeeld met een boekhouder die een geheimhoudingsplicht heeft).
6. Beveiliging
Ik neem passende maatregelen om jouw persoonsgegevens te beschermen tegen verlies, misbruik of onbevoegde toegang.
Onder andere door:
beveiligde apparatuur;
sterke wachtwoorden;
beveiligde e-mail waar mogelijk;
beperkte toegang tot persoonsgegevens.
7. Website
Wanneer je mijn website bezoekt, kunnen technische gegevens zoals IP-adres, browsergegevens en cookies worden verwerkt.
Cookies
Mijn website gebruikt uitsluitend functionele en eventueel analytische cookies die geen inbreuk maken op jouw privacy.
Indien ik gebruikmaak van marketingcookies of trackingcookies, zal hiervoor eerst toestemming worden gevraagd.
8. Jouw rechten
Je hebt het recht om:
jouw gegevens in te zien;
jouw gegevens te laten corrigeren;
jouw gegevens te laten verwijderen (voor zover wettelijk toegestaan);
bezwaar te maken tegen de verwerking;
jouw toestemming in te trekken;
jouw gegevens over te laten dragen.
Wil je hiervan gebruikmaken? Neem dan contact met mij op via de onderstaande gegevens.
9. Klachten
Heb je een klacht over de verwerking van jouw persoonsgegevens? Dan hoor ik dat graag zodat we samen tot een oplossing kunnen komen.
Je hebt daarnaast het recht een klacht in te dienen bij de:
Autoriteit Persoonsgegevens
https://www.autoriteitpersoonsgegevens.nl
10. Contact
Heb je vragen over deze privacyverklaring of over de verwerking van jouw persoonsgegevens?
Neem gerust contact op.`
}
