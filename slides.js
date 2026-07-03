/*
 * Inhalt der Präsentation.
 * Hier kannst du alles anpassen: Texte, Reihenfolge, Screenshots.
 *
 * Screenshots: Lege deine Bilder in den Ordner "assets/screenshots/"
 * und trage den Dateinamen unten bei "media" ein. Solange ein Bild
 * fehlt, wird automatisch ein Platzhalter angezeigt.
 *
 * Bild:  { type: "image", src: "assets/screenshots/datei.jpg", caption: "Beschreibung" }
 * Video: { type: "video", src: "assets/videos/datei.mp4", caption: "...", hover: true }
 *   hover:true  => Video startet beim Drüberfahren (z. B. Produktbild-Animation)
 */

const DECK = {
  brand: "Website Audit & Strategie",
  client: "elizabetazefi.com",
  url: "https://www.elizabetazefi.com",
  logo: "assets/logo.png",
  subtitle: "UX-/UI-Analyse, technische Mängel und Wachstums­chancen",
  author: "",
};

const SECTIONS = {
  intro: { label: "Start", color: "#6366f1" },
  audit: { label: "Audit", color: "#ef4444" },
  videos: { label: "Produktvideos", color: "#f59e0b" },
  chance: { label: "Chancen", color: "#10b981" },
};

const SLIDES = [
  // ---------------------------------------------------------------
  // 0: INDEX / HUB (Startseite mit 3 Einstiegspunkten)
  // ---------------------------------------------------------------
  {
    section: "intro",
    kind: "hub",
    title: DECK.brand,
    tooltip: "Startseite",
    cards: [
      { target: "audit", n: "01", t: "Audit", d: "UX-/UI-Mängel und technische SEO-Findings, mit Screenshots." },
      { target: "videos", n: "02", t: "Produktvideos", d: "Animierte Produktbilder, die beim Hover lebendig werden." },
      { target: "chance", n: "03", t: "Chancen", d: "UGC-Content, KI-Bilder & Videos, Affiliate-Programm." },
    ],
  },

  // ---------------------------------------------------------------
  // AUDIT: Sektionsstart
  // ---------------------------------------------------------------
  {
    section: "audit",
    kind: "section-intro",
    title: "Audit",
    tooltip: "Audit: Übersicht",
    intro: "Konkrete Schwachstellen aus der Analyse, jeweils mit Beobachtung, Begründung und Beleg.",
  },

  // ---------------------------------------------------------------
  // MÄNGEL (audit)
  // ---------------------------------------------------------------
  {
    section: "audit",
    title: "Kontaktformular ohne Datenschutz",
    tooltip: "Kontaktformular: Datenschutz",
    observation: "Am Kontaktformular fehlt ein Hinweis auf die Datenschutzerklärung, weder im Text noch als Verlinkung zur Datenschutzseite.",
    why: "Bei personenbezogenen Daten muss Vertrauen genau dort entstehen, wo Daten eingegeben werden. Empfehlung: direkt am Formular einen kurzen Text mit Link zur Datenschutzseite ergänzen. Kein Checkbox-Opt-in nötig, aber die Verlinkung ist Pflicht.",
    severity: "Hoch",
    mediaRatio: "614 / 766",
    media: [
      { type: "image", src: "assets/screenshots/kontaktformular-1.png", caption: "Kontaktformular ohne Datenschutz-Verlinkung" },
    ],
  },
  {
    section: "audit",
    title: "Datenschutzseite fehlt komplett",
    tooltip: "Datenschutzseite fehlt",
    observation: "Es existiert keine eigene Datenschutzerklärung.",
    why: "Abmahngefahr. Eine Datenschutzseite ist Pflicht und ein Vertrauenssignal; ihr Fehlen ist ein rechtliches und reputationsbezogenes Risiko.",
    severity: "Kritisch",
    mediaRatio: "742 / 460",
    media: [
      { type: "image", src: "assets/screenshots/datenschutz-1.png", caption: "Fehlende Datenschutzseite (404 / nicht vorhanden)" },
    ],
  },
  {
    section: "audit",
    title: "Header: zu viele Menüpunkte & Icons",
    tooltip: "Header überladen",
    observation: "Zu viele Menüpunkte und Icons gleichzeitig, darunter Account, Suche und Warenkorb. Zudem sind die Menüpunkte auf Englisch (Haircare, Styling, About Us, Salon, Blog, FAQ), obwohl die Seite auf Deutsch eingestellt ist.",
    why: "Nutzer sehen zu viele Entscheidungen auf einmal; das erhöht die kognitive Last und lenkt vom Kauf ab. Der Warenkorb kann dynamisch eingeblendet werden (nur bei Artikeln im Cart sichtbar), und der Account-Link lässt sich alternativ in den Footer verlagern, sodass der Header ohne Funktionsverlust entlastet wird. Die Sprach-Inkonsistenz im Menü untergräbt zudem den Premium-Eindruck und wirkt unprofessionell für deutschsprachige Kunden.",
    severity: "Mittel",
    media: [
      { type: "image", src: "assets/screenshots/header-menue-1.png", caption: "Überladene Navigation mit englischen Menüpunkten auf deutscher Seite" },
    ],
  },
  {
    section: "audit",
    title: "Header: dunkler Balken oben",
    tooltip: "Dunkler Header-Balken",
    observation: "Ein dunkler Balken oben nimmt wertvollen Platz weg, aktuell ohne sichtbaren Inhalt.",
    why: "Entweder den Balken sinnvoll nutzen (Social-Media-Icons, Telefon-Kontakt, Sprache/Währung) oder ganz entfernen. In der jetzigen Form ist er reine Platzverschwendung, vor allem auf Mobile, wo jeder Pixel für Produkt und CTA zählt.",
    severity: "Niedrig",
    media: [
      { type: "image", src: "assets/screenshots/header-balken-1.png", caption: "Leerer dunkler Balken: ungenutzter Platz im Header" },
    ],
  },
  {
    section: "audit",
    title: "Reviews überlappen den Header",
    tooltip: "Reviews überlappen",
    observation: "Die Überschrift „Kundenempfehlungen“ überlappt mit dem Logo im Header, besonders auf Mobile sichtbar.",
    why: "Das Layout wirkt kaputt und unkontrolliert. Solche visuellen Fehler untergraben das Vertrauen in eine Premium-Marke.",
    severity: "Hoch",
    media: [
      { type: "image", src: "assets/screenshots/reviews-1.png", caption: "Überlappung Reviews / Header auf Mobile" },
    ],
  },
  {
    section: "audit",
    title: "WhatsApp-Button überlappt Inhalte (Checkout)",
    tooltip: "WhatsApp-Button (Checkout)",
    observation: "Der WhatsApp-Button überlappt den Warenkorb und den Checkout-Button („Bezahlen“).",
    why: "Er kann Checkout und Reviews stören und der Nutzen ist unklar. Empfehlung: nur kontextbezogen anzeigen (Salon statt Shop).",
    severity: "Hoch",
    mediaRatio: "380 / 629",
    media: [
      { type: "image", src: "assets/screenshots/whatsapp-1.png", caption: "WhatsApp-Button über Warenkorb / Checkout" },
    ],
  },
  {
    section: "audit",
    title: "Quiz: Englisch, Octane-Branding & E-Mail-Zwang",
    tooltip: "Quiz: Sprache & Octane AI",
    observation: "Das Quiz ist auf Englisch („Next question“, „BACK“), obwohl die Seite auf Deutsch eingestellt ist. Zudem ist „Powered by Octane AI“ sichtbar und eine E-Mail ist erforderlich.",
    why: "Der Sprachbruch wirkt unprofessionell für deutschsprachige Kunden. Das sichtbare Drittanbieter-Branding passt nicht zur Premium-Marke, und der E-Mail-Zwang erzeugt zusätzliche Reibung: ein Conversion-Killer.",
    severity: "Mittel",
    media: [
      { type: "image", src: "assets/screenshots/quiz-octane-1.png", caption: "Englisches Quiz mit Octane-AI-Branding auf deutscher Seite" },
    ],
  },
  {
    section: "audit",
    title: "Suche: leer und ohne Vorschläge",
    tooltip: "Suche ohne Vorschläge",
    observation: "Die Suche startet komplett leer, ohne Vorschläge, Bestseller oder Produktideen. Nutzer sehen nur ein leeres Suchfeld.",
    why: "Neue Kunden wissen oft nicht, wonach sie suchen sollen. Vorgeschlagene Produkte (z. B. Bestseller) führen direkt zum Kauf und verbessern die Conversion, statt dass Besucher ohne Orientierung abbrechen.",
    severity: "Mittel",
    mediaRatio: "498 / 349",
    media: [
      { type: "image", src: "assets/screenshots/suche-1.png", caption: "Ist-Zustand: leere Suche ohne Vorschläge" },
      { type: "image", src: "assets/screenshots/suche-2.png", caption: "Empfehlung: Bestseller & Produktvorschläge direkt in der Suche" },
    ],
  },
  {
    section: "audit",
    title: "SEO: fehlende Alt-Texte",
    tooltip: "Ahrefs: Alt-Texte",
    observation: "Bildern fehlen Alt-Texte (Ahrefs-Audit).",
    why: "SEO und Barrierefreiheit sind nicht sauber. Suchmaschinen und Screenreader können Bilder nicht erfassen.",
    severity: "Mittel",
    badge: "Ahrefs",
    media: [
      { type: "image", src: "assets/screenshots/ahrefs-alt-1.png", caption: "Ahrefs: 354 Bilder ohne Alt-Text" },
    ],
  },
  {
    section: "audit",
    title: "SEO: fehlende Social Images",
    tooltip: "Ahrefs: Social Images",
    observation: "Open-Graph- und Twitter-Karten-Tags sind unvollständig: og:image und twitter:image fehlen (z. B. auf /de/collections/hair-growth). Links werden ohne Vorschaubild geteilt.",
    why: "Geteilte Links wirken ohne Vorschaubild schlechter und werden seltener geklickt: verschenkte Reichweite auf Social Media, WhatsApp und Pinterest.",
    severity: "Mittel",
    badge: "Ahrefs",
    media: [
      { type: "image", src: "assets/screenshots/ahrefs-social-1.png", caption: "Ahrefs: fehlende og:image & twitter:image" },
    ],
  },
  {
    section: "audit",
    title: "SEO: H1 & H2 falsch gesetzt",
    tooltip: "SEO: fehlende H1 & H2-Hierarchie",
    observation: "Auf Kategorieseiten (z. B. /de/collections/hair-growth) fehlt eine H1 komplett; die erste Überschrift ist H2. Stattdessen sind UI-Elemente wie „Sprache“ und „Währung“ als H2 markiert. Die Hierarchie springt außerdem unlogisch (H2 → H3 → H5 → H4).",
    why: "Suchmaschinen lesen Überschriften, um das Hauptthema einer Seite zu erkennen. Ohne H1 ist unklar, worum es geht; Keyword-Relevanz und Rankings leiden. Falsche H2 für Navigation verfälscht die Seitenstruktur, und gebrochene Hierarchie erschwert das Crawling. Google kann Inhalte schlechter einordnen; Snippets und Sichtbarkeit für Kategorieseiten sinken.",
    severity: "Mittel",
    badge: "SEO",
    media: [
      { type: "image", src: "assets/screenshots/ahrefs-h1-h2-1.png", caption: "Fehlende H1, UI als H2, gebrochene Überschriften-Hierarchie" },
    ],
  },
  {
    section: "audit",
    title: "Impressum heißt „Imprint“",
    tooltip: "Lokalisierung Impressum",
    observation: "Die Seite trägt den Titel „Imprint“ statt „Impressum“, obwohl die Adresse in München, Deutschland steht.",
    why: "Für deutsche Nutzer und Suchmaschinen ist „Impressum“ kein Kosmetik-Detail, sondern ein Vertrauenssignal: Es signalisiert, dass ein rechtlich verantwortlicher Anbieter in Deutschland erreichbar ist. Fehlt das Wort bei einer deutschen Adresse, wirkt die Seite weniger seriös. Google und LLMs werten das als Lokalisierungs- und Trust-Lücke. Das kann Rankings und Sichtbarkeit in DE schwächen, weil die Seite nicht konsequent als deutsch/deutschlandbezogen erkennbar ist.",
    severity: "Mittel",
    media: [
      { type: "image", src: "assets/screenshots/impressum-1.png", caption: "„Imprint“ statt „Impressum“, trotz Adresse in Deutschland" },
    ],
  },
  {
    section: "audit",
    title: "Sticky-CTA: „Konfigurieren“ statt Kaufen",
    tooltip: "Sticky-CTA: Konfigurieren",
    observation: "Der fixierte Kauf-Button unten auf der Produktseite heißt „Konfigurieren“, obwohl es sich um ein fertiges Produkt mit festem Preis handelt (z. B. Hair Growth Conditioner • €47,00). Es gibt zudem nur eine einzige Variante (ml); diese sollte deshalb vorausgewählt sein.",
    why: "„Konfigurieren“ klingt nach einem optionalen Schritt und bremst die Kaufentscheidung. Besser: klare Kauf-CTAs wie „Jetzt kaufen“, „In den Warenkorb“ oder „Sofort bestellen“. Sie sind eindeutig, aktiv und conversion-orientiert.",
    severity: "Hoch",
    mediaRatio: "482 / 122",
    media: [
      { type: "image", src: "assets/screenshots/produktseite-konfigurieren-1.png", caption: "Sticky-CTA: „Konfigurieren“ statt „Jetzt kaufen“ / „In den Warenkorb“" },
    ],
  },

  // ---------------------------------------------------------------
  // PRODUKTVIDEOS (videos): 3 Videos nebeneinander
  // ---------------------------------------------------------------
  {
    section: "videos",
    kind: "videos",
    title: "Animierte Produktvideos",
    tooltip: "Produktvideos",
    intro: "Produktbilder, die beim Drüberfahren als kurzes Video animieren: mehr Verweildauer und Kaufabsicht. Fahre mit der Maus über ein Video für die Demo.",
    videos: [
      { src: "assets/videos/produkt-1.mp4", caption: "Produkt 1" },
      { src: "assets/videos/produkt-2.mp4", caption: "Produkt 2" },
      { src: "assets/videos/produkt-3.mp4", caption: "Produkt 3" },
    ],
  },

  // ---------------------------------------------------------------
  // CHANCEN (chance)
  // ---------------------------------------------------------------
  {
    section: "chance",
    kind: "section-intro",
    title: "Chancen",
    tooltip: "Chancen: Übersicht",
    intro: "Aus den Mängeln werden Hebel. Diese Maßnahmen schaffen Reichweite, Vertrauen und Umsatz.",
  },
  {
    section: "chance",
    title: "UGC-Instagram-Account (KI-Content)",
    tooltip: "UGC Instagram (KI)",
    observation: "Ein zweiter Instagram-Account (nicht der Main-Account) mit KI-generiertem Content samt Markenbezug.",
    why: "UGC-artiger Content wirkt authentisch und skaliert ohne Produktions­aufwand. Er testet Hooks/Trends risikofrei und leitet Reichweite auf Shop und Marke.",
    mediaRatio: "1 / 1",
    media: [
      { type: "video", src: "assets/videos/chance-ugc-1.mp4", caption: "Beispiel UGC-Content (KI-generiert)", autoplay: true },
    ],
  },
  {
    section: "chance",
    title: "KI Bilder & Videos",
    tooltip: "KI Bilder & Videos",
    observation: "KI-generierte Bilder und Videos für Kampagnen, Moodboards und Produktinszenierung.",
    why: "Schnell, günstig und flexibel: frische Visuals on-brand, ohne aufwändige Shootings. Ideal für A/B-Tests von Anzeigen und Landingpages.",
    mediaRatio: "1 / 1",
    media: [
      { type: "video", src: "assets/videos/chance-ai-1.mp4", caption: "Beispiel KI Bilder & Videos", autoplay: true },
    ],
  },
  {
    section: "chance",
    title: "Partnerprogramm / Affiliate-Marketing",
    tooltip: "Affiliate-Programm",
    observation: "Aufbau eines Partner-/Affiliate-Programms.",
    why: "Performance-basiertes Wachstum: Partner und Creator bewerben die Marke und werden nur bei echtem Umsatz vergütet. Das ermöglicht planbares, risikoarmes Skalieren.",
    mediaRatio: "1024 / 686",
    media: [
      { type: "image", src: "assets/screenshots/chance-affiliate-1.png", caption: "Elizabeta Zefi Affiliate Programm: 20 % Provision" },
    ],
  },

  // ---------------------------------------------------------------
  // ANGEBOT: Webdesign & Marketing aus einer Hand
  // ---------------------------------------------------------------
  {
    section: "chance",
    kind: "offer",
    title: "Webdesign & Marketing aus einer Hand",
    tooltip: "Angebot: Aus einer Hand",
    person: "Edvinas Jurevicius",
    lead: "Design, Strategie und Technik aus einer Hand. Kein Stückwerk aus mehreren Dienstleistern, sondern jemand, der Customer Journey, User Experience und die technische Umsetzung zusammen denkt.",
    caseStudy: {
      title: "sim.do",
      observation: "1-Person-Projekt: 2.242 erfolgreiche Zahlungen in unter 3 Monaten, ohne Marketing-Budget, ohne Werbung und ohne Social Media.",
      why: "sim.do zeigt kein Glück, sondern ein wiederholbares Muster: SEO und GEO bedienen bestehende Nachfrage, ohne Werbebudget. Für Elizabeta Zefi gilt dasselbe: **In einem Markt mit klarer Produktnachfrage liegt Potenzial brach, solange organische Sichtbarkeit und technische Basis fehlen.** Entscheidend ist nicht, laut zu werben, sondern die Nachfrage gezielt zu nutzen, wo sie wirklich da ist.",
      media: [
        { type: "image", src: "assets/screenshots/casestudy-simdo-1.png", caption: "sim.do: 2.242 Zahlungen, 0 € Marketing (01.12.2025 bis 27.02.2026)" },
      ],
    },
    features: [
      {
        icon: "design",
        t: "Design, UX & Customer Journey",
        d: "Nicht nur schöne Optik: Ich verstehe, wie eine Customer Journey und User Experience funktionieren, und habe das technische Know-how für wirklich gutes, durchdachtes UI.",
      },
      {
        icon: "seo",
        t: "GEO-Marketing & optimiertes SEO",
        d: "Neue Technologien für GEO-Marketing und sauberes, optimiertes SEO, damit die Marke nicht nur bei Google, sondern auch in KI-Antworten sichtbar wird.",
      },
      {
        icon: "code",
        t: "Next.js statt Shopify-Baukasten",
        d: "Kein Shopify von der Stange, sondern ein maßgeschneidertes Next.js-Frontend: Top-PageSpeed und alles custom, vom Detail bis zur gesamten Architektur.",
      },
      {
        icon: "conversion",
        t: "Conversion-Technik, komplett custom",
        d: "Vom Cookie-Banner über interaktive Quizzes bis zu conversion-optimierten E-Mail-Sequenzen: alles individuell umgesetzt und auf Umsatz ausgerichtet.",
      },
    ],
    meta: [
      { t: "Alles aus einer Hand", icon: "hand" },
      { t: "Monatlich abrechenbar", icon: "card" },
      { t: "Umsetzung in 8 Wochen", icon: "clock" },
    ],
  },

  // ---------------------------------------------------------------
  // ABSCHLUSS
  // ---------------------------------------------------------------
  {
    section: "intro",
    kind: "outro",
    title: "Danke",
    tooltip: "Abschluss",
    intro: "Lassen Sie uns gerne über die nächsten Schritte sprechen.",
  },
];
