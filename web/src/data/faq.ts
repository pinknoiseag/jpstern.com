export type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'h4'; text: string };

export interface FaqItem {
  id: string;
  question: string;
  blocks: FaqBlock[];
  homeTeaser?: string;
}

export interface FaqSection {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqSections: FaqSection[] = [
  {
    id: 'grundlagen',
    title: 'Grundlagen',
    items: [
      {
        id: 'kontakt',
        question: 'Wie kann ich dich erreichen?',
        blocks: [
          {
            type: 'p',
            text: 'Am einfachsten über das Kontaktformular auf dieser Website. Alternativ per Instagram (@jpstern.photography) oder WhatsApp (+506 8687 9292). Schreib mir kurz, was du dir vorstellst — ich melde mich persönlich bei dir.',
          },
        ],
      },
      {
        id: 'anfaenger',
        question: 'Bin ich als Anfängerin willkommen?',
        blocks: [
          {
            type: 'p',
            text: 'Ja, sehr. Erfahrung vor der Kamera ist schön, aber kein Muss. Wichtig sind Offenheit, Lust am gemeinsamen Ausprobieren und dass wir deine Grenzen vorher klar besprechen. Ich coache dich respektvoll durch Posen und Ablauf — ohne Druck.',
          },
        ],
      },
      {
        id: 'tfp',
        question: 'Was bedeutet TFP?',
        blocks: [
          {
            type: 'p',
            text: 'TFP steht für Time for Pictures: Du investierst deine Zeit, ich meine Zeit, mein Equipment und die Bearbeitung. Wir stimmen das Konzept gemeinsam ab — ein bisschen deine Vorstellungen, ein bisschen meine kreative Idee, immer innerhalb deiner Grenzen.',
          },
          {
            type: 'p',
            text: 'Mir ist wichtig, dass wir etwas Besonderes erschaffen — kein 0815-Shooting von der Stange.',
          },
        ],
      },
      {
        id: 'pre-shoot',
        question: 'Was ist die Pre-Shoot Stilabklärung?',
        blocks: [
          {
            type: 'p',
            text: 'Vor dem Shooting erhältst du per Mail oder DM einen privaten Link mit Passwort zur Pre-Shoot-Seite. Dort siehst du Beispielbilder aus verschiedenen Bereichen (Lifestyle, Sensual, Art Nude usw.) und markierst, was dir gefällt und was zu deinem Stil passt.',
          },
          {
            type: 'p',
            text: 'Der Passwortschutz ist bewusst so gewählt: Die Beispielbilder — besonders im Sensual-Bereich — sind nicht für die öffentliche Website gedacht. So bleiben die Vorbilder geschützt, und nur Models mit einem geplanten Shooting sehen sie.',
          },
          {
            type: 'p',
            text: 'So wissen wir beide vor dem Termin, in welche Richtung es gehen soll — und können das Shooting gezielt planen.',
          },
        ],
      },
      {
        id: 'region',
        question: 'Wo shooten wir — und wann bist du in meiner Nähe?',
        blocks: [
          {
            type: 'p',
            text: 'Ich bin Traveling Photographer: Derzeit vor allem in Costa Rica (Sámara), jedes Jahr auch Zeit in der Schweiz und anderen Ländern. Wenn ich in deiner Nähe bin, shooten wir gerne — schreib einfach, wo du bist.',
          },
        ],
      },
      {
        id: 'alter',
        question: 'Gibt es ein Mindestalter?',
        blocks: [
          {
            type: 'p',
            text: 'Ja. Hard Limit: 18 Jahre — nicht darunter, auch nicht mit Zustimmung der Eltern. Keine Ausnahmen.',
          },
        ],
      },
      {
        id: 'storno',
        question: 'Was passiert bei Absage oder Terminverschiebung?',
        blocks: [
          {
            type: 'p',
            text: 'Absagen sind nicht cool — aber sie können passieren (Krankheit, wichtige Termine). Bitte sag so früh wie möglich Bescheid, dann können wir verschieben oder neu planen, ohne dass jemand im Regen steht.',
          },
        ],
      },
    ],
  },
  {
    id: 'location',
    title: 'Wo shooten wir?',
    items: [
      {
        id: 'location-home',
        question: 'Shooting bei dir zuhause — was spricht dafür?',
        blocks: [
          {
            type: 'p',
            text: 'Vorteile: Du hast alle Ressourcen vor Ort (Kleider, Schmuck, Props), kennst die Umgebung und fühlst dich oft entspannter.',
          },
          {
            type: 'p',
            text: 'Nachteile: Begrenzt auf deine Räumlichkeiten und die Entfernungen, die ich fahren kann.',
          },
        ],
      },
      {
        id: 'location-studio',
        question: 'Shooting im Studio — was spricht dafür?',
        blocks: [
          {
            type: 'p',
            text: 'Vorteile: Ideal für High-End-Looks, Bodyscapes und kontrolliertes Licht.',
          },
          {
            type: 'p',
            text: 'Nachteile: Kann sich schnell eintönig anfühlen. Oft lange Anreise, teuer und sollte früh gebucht werden.',
          },
        ],
      },
      {
        id: 'location-outdoor',
        question: 'Outdoor-Shooting — was spricht dafür?',
        blocks: [
          {
            type: 'p',
            text: 'Vorteile: Extrem vielfältig — Natur, Licht, Stimmungen.',
          },
          {
            type: 'p',
            text: 'Nachteile: Wetterabhängig. Sensual-Shootings sind outdoor oft eingeschränkt möglich.',
          },
        ],
      },
      {
        id: 'location-hotel',
        question: 'Shooting im Hotel — was spricht dafür?',
        blocks: [
          {
            type: 'p',
            text: 'Vorteile: Schöne Kulisse — Bett, Bad, Fenster, Terrasse, eventuell Flur.',
          },
          {
            type: 'p',
            text: 'Nachteile: Begrenzte Möglichkeiten, teuer.',
          },
        ],
      },
      {
        id: 'location-airbnb',
        question: 'Shooting in einer Airbnb — was spricht dafür?',
        blocks: [
          {
            type: 'p',
            text: 'Vorteile: Wie ein Home-Shooting, aber mit wechselnder Kulisse, Aussicht und vielen Optionen (z. B. Küche, Pool, Garten).',
          },
          {
            type: 'p',
            text: 'Nachteile: Teuer und sollte früh gebucht werden.',
          },
        ],
      },
      {
        id: 'location-akt',
        question: 'Studio vs. Location bei Akt-Shootings',
        blocks: [
          {
            type: 'p',
            text: 'Im Studio habe ich volle Kontrolle über Licht, Wärme und Privatsphäre — ideal für Bodyscapes, Low-Key und präzise Körperdarstellung.',
          },
          {
            type: 'p',
            text: 'An der Location (Hotel, Airbnb, Outdoor) entstehen oft natürlichere, atmosphärische Bilder — besonders schön bei weichem Tageslicht oder dramatischen Landschaften. Für Akt-Shootings brauchen wir dort einen abgeschirmten Bereich und genug Zeit zum Ankommen.',
          },
          {
            type: 'p',
            text: 'Wir wählen gemeinsam, was zum gewünschten Look und deinem Wohlbefinden passt.',
          },
        ],
      },
    ],
  },
  {
    id: 'team',
    title: 'Wer ist dabei?',
    items: [
      {
        id: 'team-size',
        question: 'Wie viele Personen sind beim Shooting dabei?',
        blocks: [
          {
            type: 'p',
            text: 'Normalerweise nur du und ich.',
          },
          {
            type: 'ul',
            items: [
              'Allenfalls zwei Models — dann shooten wir abwechselnd oder nacheinander.',
              'Gruppenfotos sind in der Regel nicht vorgesehen (zu zweit kann ausnahmsweise funktionieren).',
            ],
          },
        ],
      },
      {
        id: 'begleitperson',
        question: 'Darf ich eine Begleitperson mitbringen?',
        blocks: [
          {
            type: 'p',
            text: 'Ja, eine Begleitperson ist möglich — am besten eine enge Freundin, der du vertraust.',
          },
          {
            type: 'p',
            text: 'Partner sind weniger ideal: Sie sehen nicht unbedingt, was die Kamera sieht, und das kann unbewusst Druck auf dich ausüben. Eine Freundin kann im Einzelfall auch mitshooten — aber nur nach vorheriger klarer Absprache.',
          },
          {
            type: 'p',
            text: 'Die Begleitperson soll das Shooting nicht stören (kein Handy-Fotografieren, kein Einmischen). Meist wartet sie im Nebenraum.',
          },
          {
            type: 'p',
            text: 'Reisekosten, Eintritte oder Essen muss die Begleitperson hingegen selber übernehmen.',
          },
        ],
      },
    ],
  },
  {
    id: 'ablauf',
    title: 'Ablauf & Sets',
    items: [
      {
        id: 'ablauf-shooting',
        question: 'Wie läuft ein Shooting bei mir ab?',
        blocks: [
          {
            type: 'p',
            text: 'Ich arbeite gerne mit mehreren unterschiedlichen Sets pro Shooting. Ein Set ist eine thematische Einheit, in der wir Location, Licht, Outfit oder Stimmung wechseln. So entsteht viel Abwechslung und wir fangen verschiedene Looks ein.',
          },
        ],
      },
      {
        id: 'was-ist-set',
        question: 'Was genau ist ein «Set»?',
        blocks: [
          {
            type: 'p',
            text: 'Ein Set besteht aus einer bestimmten Location oder Lichtsituation und einem klaren kreativen Konzept. Innerhalb eines Sets machen wir verschiedene Bildserien, zum Beispiel:',
          },
          {
            type: 'ul',
            items: [
              'Stehend (verschiedene Posen und Winkel)',
              'Sitzend / kniend',
              'Liegend (Boden oder Bett)',
              'Abgewandt / von hinten / Silhouette',
              'Nahaufnahmen (Portraits, Details, Hände)',
              'Bewegung / Dynamik',
              'Mit oder ohne Props',
            ],
          },
          {
            type: 'p',
            text: 'So bekommst du pro Set schon eine grosse Bandbreite — keine Serie von fast identischen Bildern.',
          },
        ],
      },
      {
        id: 'anzahl-sets',
        question: 'Wie viele Sets machen wir normalerweise?',
        blocks: [
          {
            type: 'p',
            text: 'Das hängt von der verfügbaren Zeit und deiner Energie ab. Typischerweise plane ich 2–4 Sets pro Shooting (z. B. Indoor mit natürlichem Licht → Studio-Blitz → Outdoor Golden Hour → kreatives Low-Key). Wir passen das flexibel an.',
          },
        ],
      },
      {
        id: 'bilder-pro-set',
        question: 'Wie viele Bilder entstehen pro Set?',
        blocks: [
          {
            type: 'p',
            text: 'Pro Set entstehen grob 100 bis 250 Aufnahmen. Davon wähle ich die besten aus und bearbeite 5–10 pro Set leicht. Deine absoluten Favoriten bearbeite ich nochmals etwas intensiver.',
          },
          {
            type: 'p',
            text: 'Du bekommst echte Vielfalt — verschiedene Serien und Posen, nicht dutzende fast identische Aufnahmen.',
          },
        ],
      },
      {
        id: 'dauer',
        question: 'Wie lange dauert das Shooting?',
        homeTeaser:
          'Von kurzen Meet & Greet bis zu längeren Shootings, manchmal auf verschiedene Locations verteilt — alles ist möglich.',
        blocks: [
          {
            type: 'p',
            text: 'Kurze Kennenlern-Shootings oder ein Meet & Greet sind möglich. Ein volles Shooting mit 2–4 Sets plane ich in der Regel 3–5 Stunden ein — inklusive Pausen, Umziehen und verschiedenen Looks. Manchmal verteilen wir das auch auf mehrere Locations oder Tage.',
          },
          {
            type: 'p',
            text: 'Es gibt keinen Zeitdruck: Wir nehmen uns die Zeit, die du brauchst.',
          },
        ],
      },
    ],
  },
  {
    id: 'bilder',
    title: 'Bilder & Nutzung',
    items: [
      {
        id: 'kosten',
        question: 'Wer zahlt was bei einem TFP-Shooting?',
        blocks: [
          {
            type: 'p',
            text: 'Bei TFP übernehme ich die Spesen rund ums Shooting (z. B. Studio, Location, Eintritte während des Shootings).',
          },
          {
            type: 'p',
            text: 'Die Anreise zum Shooting-Standort zahlt jeder selber. Reisekosten während des Shootings (z. B. Fahrten zwischen Locations) übernehme ich.',
          },
        ],
      },
      {
        id: 'tfp-bezahlung',
        question: 'TFP oder Bezahlung?',
        blocks: [
          {
            type: 'p',
            text: 'Die meisten Shootings laufen auf TFP-Basis — Details unter «Was bedeutet TFP?». Bei sehr erfahrenen oder kommerziell aktiven Models biete ich manchmal eine Aufwandsentschädigung an — das besprechen wir immer individuell und transparent im Voraus.',
          },
        ],
      },
      {
        id: 'bilder',
        question: 'Wann bekomme ich meine Bilder?',
        homeTeaser: 'Alle nicht defekten Bilder innert weniger Tage — Bearbeitung je nach Auslastung.',
        blocks: [
          {
            type: 'p',
            text: 'Nach dem Shooting sortiere ich alle Bilder und lösche technisch misslungene Aufnahmen. Du bekommst alle nicht defekten Bilder in einer privaten Online-Galerie — in der Regel innert weniger Tage.',
          },
          {
            type: 'p',
            text: 'Die Bearbeitung der Favoriten kann je nach Auslastung und Anzahl etwas länger dauern. Du erhältst die von mir bearbeiteten Bilder zusätzlich zum Download.',
          },
          {
            type: 'p',
            text: 'Du darfst alle Bilder für dein Portfolio, Social Media und Eigenwerbung nutzen — mit Credit @jpstern.photography, wenn möglich. Ich verwende sie für mein Portfolio, Website oder Social Media nur mit deiner ausdrücklichen Zustimmung — pro Bild oder pro Serie, wie wir es im Vertrag festhalten.',
          },
          {
            type: 'p',
            text: 'Geliefert werden JPGs — keine RAW-Dateien. Gefällt dir ein Bild nicht, kannst du es selber bearbeiten oder weglassen. Veröffentlichung meinerseits ohnehin nur mit deiner Zustimmung.',
          },
        ],
      },
      {
        id: 'bearbeitungsstil',
        question: 'Wie werden die Bilder bearbeitet?',
        blocks: [
          {
            type: 'p',
            text: 'Wir shooten in Farbe. Ich bearbeite sehr gerne in Schwarz-Weiss — zeitlos und intensiv, wie du es von meinem Portfolio kennst. Du darfst die Bilder auch selber bearbeiten; bei Veröffentlichung gelten die Grenzen aus unserem Vertrag.',
          },
        ],
      },
      {
        id: 'veroeffentlichung',
        question: 'Werden meine Bilder veröffentlicht?',
        homeTeaser:
          'Du bestimmst, was ich veröffentliche — keine Veröffentlichung ohne deine ausdrückliche Zustimmung.',
        blocks: [
          {
            type: 'p',
            text: 'Du darfst für Portfolio und Social Media veröffentlichen, was du möchtest — Details regeln wir im Vertrag. Umgekehrt kannst du für jedes Foto oder jede Serie genau festlegen, was ich veröffentlichen darf und was nicht.',
          },
          {
            type: 'p',
            text: 'Keine Veröffentlichung meinerseits ohne deine ausdrückliche Zustimmung — das ist im Model Release klar geregelt.',
          },
        ],
      },
      {
        id: 'kommerziell',
        question: 'Darf ich die Bilder kommerziell nutzen?',
        blocks: [
          {
            type: 'p',
            text: 'Für private und Portfolio-Nutzung: ja.',
          },
          {
            type: 'p',
            text: 'Für kommerzielle Nutzung (Werbung, OnlyFans-Promotion, Print-Verkauf usw.) sprechen wir vorher ab und regeln das mit einer separaten Vereinbarung.',
          },
        ],
      },
      {
        id: 'model-release',
        question: 'Vertrag / Model Release',
        blocks: [
          {
            type: 'p',
            text: 'Vor dem Shooting unterschreiben wir einen Model Release (digital oder auf Papier). Darin wird geregelt, welche Nutzungsrechte jeder von uns an den Bildern hat — z. B. für mein Portfolio, Social Media, Website oder Ausstellungen.',
          },
        ],
      },
      {
        id: 'datenschutz',
        question: 'Datenschutz & Vertraulichkeit',
        blocks: [
          {
            type: 'p',
            text: 'Deine Kontaktdaten und alle Informationen aus unserem Gespräch behandle ich vertraulich. Sie werden nicht an Dritte weitergegeben.',
          },
          {
            type: 'p',
            text: 'Rohbilder und unbearbeitete Dateien bleiben auf meinen gesicherten Systemen. Die Online-Galerie ist privat und nur für dich zugänglich. Auf Wunsch lösche ich Bilder nach abgeschlossener Auslieferung — das besprechen wir im Voraus.',
          },
        ],
      },
    ],
  },
  {
    id: 'vorbereitung',
    title: 'Vorbereitung',
    items: [
      {
        id: 'vorbereitung',
        question: 'Wie bereite ich mich vor?',
        homeTeaser: 'Moodboard, Outfits, Location — wir klären alles vorher gemeinsam.',
        blocks: [
          {
            type: 'p',
            text: 'Wir schreiben oder telefonieren und besprechen deine Wünsche, Vorlieben und Grenzen. Ich erstelle ein kurzes Shooting-Konzept mit Sets und grober Zeitplanung. Wir legen den Termin fest und bestätigen alles schriftlich. Bei Bedarf machen wir ein bis zwei Tage vorher noch einen kurzen Check-in.',
          },
        ],
      },
      {
        id: 'mitbringen',
        question: 'Was solltest du mitbringen?',
        blocks: [
          {
            type: 'ul',
            items: [
              'Verschiedene Outfits / Unterwäsche / Bodys (je nach gewünschtem Look)',
              'Schuhe, Accessoires, Schmuck',
              'Deine Lieblings-Make-up- und Haarprodukte',
              'Falls vorhanden: Moodboard mit Ideen oder Referenzfotos',
              'Bademantel oder Kimono für Pausen (besonders bei Sensual/Akt)',
              'Gute Laune und Energie',
            ],
          },
        ],
      },
      {
        id: 'makeup',
        question: 'Make-up & Styling',
        blocks: [
          {
            type: 'p',
            text: 'Du bist für dein Make-up und Styling selbst verantwortlich — die meisten Models machen das gerne selbst. Sag einfach rechtzeitig Bescheid, falls du eine Makeup-Artistin möchtest.',
          },
        ],
      },
    ],
  },
  {
    id: 'sensual',
    title: 'Boudoir, Lingerie, Sensual & Akt',
    items: [
      {
        id: 'genres-angebot',
        question: 'Welche Stile bietest du an?',
        blocks: [
          {
            type: 'p',
            text: 'Porträt, Lifestyle, Boudoir, Lingerie, Sensual (inkl. Implied), Art Nude / Akt, Bodyscapes und Shibari — das sind einige meiner liebsten Bereiche. Ich fotografiere mit viel Respekt und Fingerspitzengefühl, vom natürlichen Porträt bis zum künstlerischen Akt.',
          },
        ],
      },
      {
        id: 'genres-unterschied',
        question: 'Was ist der Unterschied zwischen diesen Genres?',
        blocks: [
          {
            type: 'ul',
            items: [
              'Porträt: Ausdruck, Persönlichkeit, Blick — oft klassisch oder Fine Art.',
              'Lifestyle: Natürlich, lebendig, unterwegs — weniger inszeniert.',
              'Boudoir: Romantisch, weich, feminin und persönlich. Viel Fokus auf Emotion, Licht und Körpergefühl — meist in Dessous.',
              'Lingerie: Hochwertiger Wäsche-Look, elegante und sinnliche Posen, oft mit Fashion-Charakter.',
              'Sensual / Implied: Sinnlich und verführerisch, oft ohne vollständige Nacktheit. Starke Emotionen, Blicke und Atmosphäre.',
              'Akt / Art Nude: Künstlerischer Akt — Körper, Formen, Licht und Schatten. Ästhetisch, intim oder dramatisch.',
              'Bodyscapes: Körperdetails und Formen abstrakt oder grafisch inszeniert.',
              'Shibari: Ästhetische Seil-Kunst — nur mit klarer Vorab-Absprache und Vertrauen.',
            ],
          },
        ],
      },
      {
        id: 'wohlbefinden',
        question: 'Wie sorgst du für mein Wohlbefinden?',
        blocks: [
          {
            type: 'p',
            text: 'Vor dem Shooting klären wir alle Wünsche, No-Gos und Grenzen genau ab. Während des Shootings arbeite ich mit klarem, respektvollem Coaching — nie mit anzüglichen Kommentaren. Ich zeige dir zwischendurch gerne Bilder auf dem Kameradisplay.',
          },
          {
            type: 'p',
            text: 'Du kannst mir jederzeit sagen, wenn dir etwas unangenehm ist oder du eine andere Pose möchtest. Du kannst dir jederzeit etwas überziehen oder eine Pause verlangen. Dein Wohlbefinden hat absolute Priorität — ich bin per Du und spreche alles offen an.',
          },
        ],
      },
      {
        id: 'akt-druck',
        question: 'Muss ich mich komplett wohlfühlen, um Akt zu machen?',
        blocks: [
          {
            type: 'p',
            text: 'Nein. Viele starten mit Lingerie oder Sensual und merken während des Shootings, dass sie sich sicherer fühlen. Manche bleiben bei Lingerie — das ist völlig in Ordnung. Es gibt keinen Druck in irgendeine Richtung.',
          },
        ],
      },
      {
        id: 'vorbereitung-sensual',
        question: 'Gibt es besondere Vorbereitung für Boudoir / Akt?',
        blocks: [
          {
            type: 'ul',
            items: [
              'Frische Rasur / Enthaarung, falls du das möchtest',
              'Gut eingecremte Haut (am besten am Tag vorher)',
              'Keine engen Kleidungsstücke 1–2 Stunden vorher (vermeidet Abdrücke auf der Haut)',
              'Bei Akt-Shootings: Raum ist vorgeheizt, damit dir nicht kalt wird',
            ],
          },
        ],
      },
    ],
  },
];

const faqHomeOrder = ['bilder', 'veroeffentlichung', 'dauer', 'vorbereitung'] as const;

const faqById = new Map(
  faqSections.flatMap((section) => section.items).map((item) => [item.id, item]),
);

export const faqHomeItems = faqHomeOrder
  .map((id) => faqById.get(id))
  .filter((item): item is FaqItem => item !== undefined);