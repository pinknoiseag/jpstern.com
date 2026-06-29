/**
 * Rechtstexte — fehlende Felder mit TODO markiert, nach Rückmeldung ergänzen.
 */
export const legalMeta = {
  siteName: 'JP Stern Photography',
  siteUrl: 'https://jpstern.com',
  ownerDisplayName: 'JP Stern',
  ownerLegalName: 'JP Stern',
  postalAddress: 'Sámara, 50205, Guanacaste, Costa Rica',
  email: 'info@jpstern.com',
  phone: '+506 8687 9292',
  locationNote: 'Traveling Photographer · Sámara, Costa Rica',
  /** UID/MWST — leer lassen wenn nicht relevant */
  uidMwst: '' as string,
  hostingProvider: 'Hostpoint AG, Neue Jonastrasse 60, 8640 Rapperswil-Jona, Schweiz',
  lastUpdated: 'Juni 2026',
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const impressumSections: LegalSection[] = [
  {
    id: 'verantwortlich',
    title: 'Verantwortlich für den Inhalt',
    paragraphs: [
      `${legalMeta.ownerLegalName}`,
      legalMeta.postalAddress,
      legalMeta.locationNote,
      `E-Mail: ${legalMeta.email}`,
      `Telefon / WhatsApp: ${legalMeta.phone}`,
    ],
  },
  {
    id: 'uid',
    title: 'Unternehmens-Identifikation',
    paragraphs: legalMeta.uidMwst
      ? [`UID / MWST-Nr.: ${legalMeta.uidMwst}`]
      : [
          'Die Fotografie auf jpstern.com ist eine private Leidenschaft und kein gewerbliches Hauptgeschäft. Eine UID/MWST-Nummer ist derzeit nicht ausgewiesen.',
        ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      `Diese Website wird gehostet bei ${legalMeta.hostingProvider}.`,
      'Technischer Betrieb und Serverstandort: Schweiz.',
    ],
  },
  {
    id: 'haftung',
    title: 'Haftungsausschluss',
    paragraphs: [
      'Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden.',
      'Verweise auf externe Websites (z. B. Instagram) liegen ausserhalb des Einflussbereichs. Für deren Inhalte sind ausschliesslich deren Betreiber verantwortlich.',
    ],
  },
  {
    id: 'urheber',
    title: 'Urheberrecht',
    paragraphs: [
      'Alle Fotografien, Texte und Gestaltungselemente auf jpstern.com sind urheberrechtlich geschützt, sofern nicht anders gekennzeichnet.',
      'Vervielfältigung, Verbreitung oder kommerzielle Nutzung ohne schriftliche Zustimmung ist nicht gestattet.',
    ],
  },
];

export const datenschutzSections: LegalSection[] = [
  {
    id: 'verantwortlicher',
    title: 'Verantwortliche Person',
    paragraphs: [
      'Verantwortlich für die Datenbearbeitung im Sinne des Schweizer Datenschutzgesetzes (DSG) und — soweit anwendbar — der DSGVO:',
      `${legalMeta.ownerLegalName}, ${legalMeta.postalAddress}, ${legalMeta.email}`,
    ],
  },
  {
    id: 'grundsaetze',
    title: 'Grundsätze',
    paragraphs: [
      'Ich bearbeite personenbezogene Daten nur, soweit dies für die Kommunikation, die Planung von Shootings oder die Bereitstellung dieser Website erforderlich ist.',
      'Shooting-Anfragen, Moodboards und persönliche Informationen aus Gesprächen behandle ich vertraulich und gebe sie nicht an Dritte weiter, ausser du hast dem ausdrücklich zugestimmt oder eine gesetzliche Pflicht besteht.',
    ],
  },
  {
    id: 'kontakt',
    title: 'Kontaktformular & E-Mail',
    paragraphs: [
      'Das Kontaktformular auf /contact/ öffnet dein E-Mail-Programm (mailto). Die eingegebenen Daten werden zunächst nur lokal auf deinem Gerät verarbeitet und erst übertragen, wenn du die E-Mail selbst absendest.',
      'Wenn du mir schreibst, bearbeite ich die von dir mitgeteilten Angaben (Name, E-Mail, Telefon, Instagram, Nachricht, gewünschte Shooting-Art) zur Bearbeitung deiner Anfrage.',
      'Rechtsgrundlage: berechtigtes Interesse an der Beantwortung von Anfragen bzw. vorvertragliche Massnahmen.',
    ],
  },
  {
    id: 'preshoot',
    title: 'Pre-Shoot-Bereich (passwortgeschützt)',
    paragraphs: [
      'Der Bereich unter /pre-shoot-style-clarification/ und den zugehörigen Kategorie-Seiten ist nicht öffentlich beworben und passwortgeschützt (serverseitig via HTTP Basic Auth sowie zusätzlich clientseitig).',
      'Wenn du dort Stil-Beispiele auswählst, kannst du Name und E-Mail angeben. Diese Auswahl wird per send-selection.php an info@jpstern.com übermittelt. Thumbnails werden in der E-Mail eingebettet (Base64), damit sie auch später noch sichtbar sind.',
      'Der Zugang wird in deinem Browser per sessionStorage gespeichert, bis du den Tab schliesst.',
    ],
  },
  {
    id: 'bilder',
    title: 'Fotografien & Model-Daten',
    paragraphs: [
      'Rohbilder und unbearbeitete Dateien verbleiben auf gesicherten Systemen. Online-Galerien für Models sind privat und nur für die betreffende Person zugänglich.',
      'Details zu Veröffentlichung, Löschung und Model Release werden vor dem Shooting individuell besprochen und vertraglich geregelt.',
    ],
  },
  {
    id: 'technik',
    title: 'Server-Logs & Hosting',
    paragraphs: [
      `Beim Aufruf der Website können beim Hosting-Provider (${legalMeta.hostingProvider}) technische Zugriffsdaten (IP-Adresse, Zeitstempel, angeforderte URL, Browser-Typ) in Server-Logfiles anfallen. Diese dienen dem Betrieb und der Sicherheit der Website.`,
      'Es werden keine Marketing- oder Tracking-Cookies durch mich gesetzt. Es ist keine Webanalyse (z. B. Google Analytics) eingebunden.',
    ],
  },
  {
    id: 'extern',
    title: 'Externe Dienste & Links',
    paragraphs: [
      'Diese Website nutzt Schriftarten von Google Fonts (fonts.googleapis.com / fonts.gstatic.com). Beim Laden können Daten an Google übermittelt werden.',
      'Links zu Instagram, WhatsApp und E-Mail führen zu externen Anbietern mit eigenen Datenschutzbestimmungen.',
    ],
  },
  {
    id: 'rechte',
    title: 'Deine Rechte',
    paragraphs: [
      'Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Bearbeitung deiner Daten, soweit gesetzlich vorgesehen.',
      `Anfragen richte bitte an ${legalMeta.email}. Ich antworte in der Regel innerhalb von 30 Tagen.`,
    ],
  },
  {
    id: 'aenderungen',
    title: 'Änderungen',
    paragraphs: [
      `Diese Datenschutzerklärung kann bei Bedarf angepasst werden. Stand: ${legalMeta.lastUpdated}.`,
    ],
  },
];