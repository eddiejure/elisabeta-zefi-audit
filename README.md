# Website Audit & Pitch – Präsentation

Eine schlanke HTML/JS-Präsentation (kein Build, keine Abhängigkeiten) für den Kundenpitch.
Einfach `index.html` im Browser öffnen.

## Bedienung

- **Weiterblättern:** Pfeiltasten `←` / `→`, Leertaste, die seitlichen Pfeile oder Klick auf die Folie.
- **Springen:** Mobil per Wischen.
- **Home:** Button oben links → zurück zur Titelseite.
- **Navigation oben:** nummerierte Punkte (Breadcrumbs). Beim Drüberfahren zeigt ein Tooltip, worum es auf der Folie geht. Klick springt direkt dorthin. Senkrechte Trenner markieren die Abschnitte (Start / Audit / Produktvideos / Chancen).
- **Startseite (Hub):** zeigt das Logo und drei Karten – **Audit**, **Produktvideos**, **Chancen**. Klick auf eine Karte springt direkt in den jeweiligen Bereich. Die Chancen liegen bewusst außerhalb des Audits und werden über die Startseite erreicht.

## Screenshots & Videos einfügen

Lege deine Dateien in die Ordner `assets/screenshots/` bzw. `assets/videos/`.
Solange eine Datei fehlt, zeigt die Folie automatisch einen Platzhalter mit dem erwarteten Dateinamen – du musst also nichts im Code ändern, nur die Datei mit dem passenden Namen ablegen.

### Erwartete Screenshot-Dateinamen (`assets/screenshots/`)

| Folie | Dateiname |
|---|---|
| Kontaktformular ohne Datenschutz | `kontaktformular-1.png` |
| Datenschutzseite fehlt | `datenschutz-1.png` |
| Header: zu viele Menüpunkte | `header-menue-1.png` |
| Header: dunkler Balken | `header-balken-1.png` |
| Reviews überlappen Header | `reviews-1.png` |
| WhatsApp-Button | `whatsapp-1.png` |
| Quiz: Sprache & Octane AI | `quiz-octane-1.png` |
| Suche ohne Vorschläge | `suche-1.jpg` |
| SEO: Alt-Texte | `ahrefs-alt-1.jpg` |
| SEO: Social Images | `ahrefs-social-1.png` |
| SEO: H2 Sprache/Währung | `ahrefs-h2-1.jpg` |
| Impressum „Imprint“ | `impressum-1.png` |
| Produktseite Sticky-CTA | `produktseite-1.jpg`, `produktseite-2.jpg` |
| Chance: UGC Instagram | `chance-ugc-1.jpg` |
| Chance: AI-Bilder | `chance-aibilder-1.jpg` |
| Chance: Affiliate | `chance-affiliate-1.jpg` |

### Produktvideos (`assets/videos/`)

Die Folie „Produktvideos“ zeigt **3 Videos nebeneinander**:

| Position | Dateiname |
|---|---|
| Video 1 | `produkt-1.mp4` |
| Video 2 | `produkt-2.mp4` |
| Video 3 | `produkt-3.mp4` |

> Die Videos starten automatisch beim Drüberfahren mit der Maus und stoppen beim Verlassen.
> Weitere Videos/Beschriftungen kannst du im `videos`-Array der Folie in `slides.js` anpassen.

## Logo

Das Kundenlogo liegt unter `assets/logo.png` und wird auf der Startseite auf weißem Hintergrund angezeigt. Zum Austauschen einfach die Datei ersetzen (oder den Pfad bei `DECK.logo` in `slides.js` ändern).

## Mehrere Screenshots pro Folie (Carousel)

Jede Folie kann mehrere Bilder als Carousel zeigen. Öffne `slides.js`, suche die gewünschte Folie
und ergänze das `media`-Array um weitere Einträge:

```js
media: [
  { type: "image", src: "assets/screenshots/warenkorb-1.jpg", caption: "Vorher" },
  { type: "image", src: "assets/screenshots/warenkorb-2.jpg", caption: "Detailansicht" },
]
```

Bei zwei oder mehr Einträgen erscheinen automatisch Pfeile und Punkte zum Durchblättern.

## Texte anpassen

Alle Inhalte stehen in `slides.js`:

- `DECK` oben: Marke, Kundenname, Untertitel, Autor.
- `SLIDES`: Reihenfolge, Titel, Beobachtung, Begründung, Schweregrad und Medien je Folie.

Reihenfolge ändern = Einträge im `SLIDES`-Array verschieben. Neue Folie = neues Objekt einfügen.

## Dateien

- `index.html` – Grundgerüst
- `styles.css` – Design
- `slides.js` – **Inhalte** (hier anpassen)
- `app.js` – Präsentations-Logik
