import { QGruppe } from '../types'

export const qgruppen: QGruppe[] = [
  // === STANDORT & RICHTUNG ===
  {
    code: 'QTH',
    frage: 'Welches ist Ihr Standort?',
    antwort: 'Mein Standort ist...',
    bedeutung: 'Standort / Position',
    kategorie: 'standort',
    pruefungsrelevant: true,
    eselsbruecke: 'T = Town, H = Here → Standort hier',
    beispiel: 'QTH ist Berlin',
  },
  {
    code: 'QRA',
    frage: 'Wie ist der Name Ihrer Funkstelle?',
    antwort: 'Der Name meiner Funkstelle ist...',
    bedeutung: 'Stationsname / Rufzeichen',
    kategorie: 'standort',
    pruefungsrelevant: true,
    eselsbruecke: 'RA = Radio Address',
  },
  {
    code: 'QRB',
    frage: 'In welcher Entfernung befinden Sie sich?',
    antwort: 'Die Entfernung beträgt... km',
    bedeutung: 'Entfernung zwischen Stationen',
    kategorie: 'standort',
    pruefungsrelevant: true,
    eselsbruecke: 'B = Between → Distanz dazwischen',
  },
  {
    code: 'QTE',
    frage: 'Welches ist meine Peilung von Ihnen?',
    antwort: 'Ihre Peilung von mir ist... Grad',
    bedeutung: 'Peilung / Richtung',
    kategorie: 'standort',
    pruefungsrelevant: true,
    eselsbruecke: 'TE = True direction East (Richtung)',
  },
  {
    code: 'QTF',
    frage: 'Können Sie mir meinen Standort angeben?',
    antwort: 'Ihr Standort ist...',
    bedeutung: 'Standortbestimmung durch Peilung',
    kategorie: 'standort',
    pruefungsrelevant: false,
  },

  // === FREQUENZ & BETRIEB ===
  {
    code: 'QRG',
    frage: 'Können Sie mir meine genaue Frequenz mitteilen?',
    antwort: 'Ihre genaue Frequenz ist... kHz/MHz',
    bedeutung: 'Genaue Frequenz',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'G = Genau → Genaue Frequenz',
  },
  {
    code: 'QRV',
    frage: 'Sind Sie bereit?',
    antwort: 'Ich bin bereit.',
    bedeutung: 'Bereit / Empfangsbereit',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'V = Very ready → Bereit',
  },
  {
    code: 'QRX',
    frage: 'Wann werden Sie mich wieder rufen?',
    antwort: 'Ich werde Sie um... Uhr wieder rufen',
    bedeutung: 'Standby / Warten Sie',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'X = eXpect later → Warte',
  },
  {
    code: 'QRZ',
    frage: 'Von wem werde ich gerufen?',
    antwort: 'Sie werden von... gerufen',
    bedeutung: 'Wer ruft mich?',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'Z = Wer ist da? (Who is calling?)',
  },
  {
    code: 'QSO',
    frage: 'Können Sie mit... unmittelbar verkehren?',
    antwort: 'Ich kann mit... unmittelbar verkehren',
    bedeutung: 'Funkverbindung / Funkgespräch',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'SO = Speaking Operation → Gespräch',
  },
  {
    code: 'QSY',
    frage: 'Soll ich auf eine andere Frequenz wechseln?',
    antwort: 'Wechseln Sie auf... kHz/MHz',
    bedeutung: 'Frequenzwechsel',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'SY = Switch Your frequency',
  },
  {
    code: 'QRT',
    frage: 'Soll ich die Übermittlung einstellen?',
    antwort: 'Stellen Sie die Übermittlung ein',
    bedeutung: 'Sendung beenden / Stop',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'RT = Radio Terminate → Ende',
  },
  {
    code: 'QRL',
    frage: 'Sind Sie beschäftigt?',
    antwort: 'Ich bin beschäftigt, bitte nicht stören',
    bedeutung: 'Frequenz besetzt',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'L = Leave me alone → Besetzt',
  },
  {
    code: 'QRU',
    frage: 'Haben Sie etwas für mich?',
    antwort: 'Ich habe nichts für Sie',
    bedeutung: 'Keine Nachrichten',
    kategorie: 'frequenz',
    pruefungsrelevant: true,
    eselsbruecke: 'U = nothing for U → Nichts für dich',
  },

  // === SIGNALQUALITÄT ===
  {
    code: 'QRK',
    frage: 'Wie ist die Verständlichkeit meiner Zeichen?',
    antwort: 'Die Verständlichkeit ist... (1-5)',
    bedeutung: 'Lesbarkeit/Verständlichkeit (1-5)',
    kategorie: 'signal',
    pruefungsrelevant: true,
    eselsbruecke: 'K = Klarheit → Verständlichkeit',
    beispiel: 'QRK 5 = ausgezeichnet lesbar',
  },
  {
    code: 'QRS',
    frage: 'Soll ich langsamer geben?',
    antwort: 'Geben Sie langsamer',
    bedeutung: 'Langsamer senden',
    kategorie: 'signal',
    pruefungsrelevant: true,
    eselsbruecke: 'S = Slow → Langsam',
    gegensatz: 'QRQ',
  },
  {
    code: 'QRQ',
    frage: 'Soll ich schneller geben?',
    antwort: 'Geben Sie schneller',
    bedeutung: 'Schneller senden',
    kategorie: 'signal',
    pruefungsrelevant: true,
    eselsbruecke: 'Q = Quick → Schnell',
    gegensatz: 'QRS',
  },
  {
    code: 'QSA',
    frage: 'Wie ist die Stärke meiner Zeichen?',
    antwort: 'Die Stärke Ihrer Zeichen ist... (1-5)',
    bedeutung: 'Signalstärke (1-5)',
    kategorie: 'signal',
    pruefungsrelevant: true,
    eselsbruecke: 'SA = Signal Amplitude → Stärke',
    beispiel: 'QSA 5 = sehr stark',
  },
  {
    code: 'QSB',
    frage: 'Schwankt die Stärke meiner Zeichen?',
    antwort: 'Ja, die Stärke schwankt',
    bedeutung: 'Fading / Signalschwankung',
    kategorie: 'signal',
    pruefungsrelevant: true,
    eselsbruecke: 'SB = Signal Bouncing → Schwankend',
  },

  // === STÖRUNGEN ===
  {
    code: 'QRM',
    frage: 'Werden Sie gestört?',
    antwort: 'Ich werde gestört (1-5)',
    bedeutung: 'Störung durch andere Stationen',
    kategorie: 'stoerung',
    pruefungsrelevant: true,
    eselsbruecke: 'M = Man-made interference → Menschliche Störung',
    gegensatz: 'QRN',
  },
  {
    code: 'QRN',
    frage: 'Werden Sie durch atmosphärische Störungen beeinträchtigt?',
    antwort: 'Ich werde durch atmosphärische Störungen beeinträchtigt (1-5)',
    bedeutung: 'Atmosphärische Störungen (Gewitter)',
    kategorie: 'stoerung',
    pruefungsrelevant: true,
    eselsbruecke: 'N = Natural noise → Natürliche Störung',
    gegensatz: 'QRM',
  },

  // === TECHNISCH ===
  {
    code: 'QRO',
    frage: 'Soll ich die Sendeleistung erhöhen?',
    antwort: 'Erhöhen Sie die Sendeleistung',
    bedeutung: 'Mehr Leistung / High Power',
    kategorie: 'technisch',
    pruefungsrelevant: true,
    eselsbruecke: 'O = mOre power → Mehr Leistung',
    gegensatz: 'QRP',
  },
  {
    code: 'QRP',
    frage: 'Soll ich die Sendeleistung vermindern?',
    antwort: 'Vermindern Sie die Sendeleistung',
    bedeutung: 'Weniger Leistung / Low Power',
    kategorie: 'technisch',
    pruefungsrelevant: true,
    eselsbruecke: 'P = Poor power (wenig) → Weniger Leistung',
    gegensatz: 'QRO',
  },
  {
    code: 'QRR',
    frage: 'Sind Sie zur automatischen Übermittlung bereit?',
    antwort: 'Ich bin zur automatischen Übermittlung bereit',
    bedeutung: 'Bereit für automatischen Betrieb',
    kategorie: 'technisch',
    pruefungsrelevant: false,
  },
  {
    code: 'QRI',
    frage: 'Wie ist der Ton meiner Aussendung?',
    antwort: 'Der Ton Ihrer Aussendung ist... (1-3)',
    bedeutung: 'Tonqualität (1=gut, 2=variiert, 3=schlecht)',
    kategorie: 'technisch',
    pruefungsrelevant: false,
  },

  // === NACHRICHTEN & BESTÄTIGUNGEN ===
  {
    code: 'QSL',
    frage: 'Können Sie mir Empfangsbestätigung geben?',
    antwort: 'Ich gebe Ihnen Empfangsbestätigung',
    bedeutung: 'Empfangsbestätigung / QSL-Karte',
    kategorie: 'nachricht',
    pruefungsrelevant: true,
    eselsbruecke: 'SL = Signed Letter → Bestätigung',
  },
  {
    code: 'QSP',
    frage: 'Wollen Sie an... vermitteln?',
    antwort: 'Ich werde an... vermitteln',
    bedeutung: 'Nachricht weiterleiten',
    kategorie: 'nachricht',
    pruefungsrelevant: true,
    eselsbruecke: 'SP = Spread → Weiterleiten',
  },
  {
    code: 'QTC',
    frage: 'Wie viele Telegramme haben Sie zu übermitteln?',
    antwort: 'Ich habe... Telegramme für Sie',
    bedeutung: 'Nachricht / Telegramm',
    kategorie: 'nachricht',
    pruefungsrelevant: true,
    eselsbruecke: 'TC = Telegram Count',
  },
  {
    code: 'QSK',
    frage: 'Können Sie mich zwischen Ihren Zeichen hören?',
    antwort: 'Ja, ich kann Sie zwischen meinen Zeichen hören',
    bedeutung: 'Break-In-Betrieb möglich',
    kategorie: 'nachricht',
    pruefungsrelevant: false,
    eselsbruecke: 'SK = Skip between → Dazwischen hören',
  },
  {
    code: 'QSW',
    frage: 'Werden Sie auf dieser Frequenz senden?',
    antwort: 'Ich werde auf dieser Frequenz senden',
    bedeutung: 'Auf dieser Frequenz senden',
    kategorie: 'nachricht',
    pruefungsrelevant: false,
  },

  // === ZEIT ===
  {
    code: 'QTR',
    frage: 'Wie spät ist es?',
    antwort: 'Es ist... Uhr',
    bedeutung: 'Genaue Uhrzeit',
    kategorie: 'zeit',
    pruefungsrelevant: true,
    eselsbruecke: 'TR = Time Reading → Zeit ablesen',
  },

  // === VERSCHIEDENES ===
  {
    code: 'QAP',
    frage: 'Soll ich auf Empfang bleiben?',
    antwort: 'Bleiben Sie auf Empfang',
    bedeutung: 'Auf Empfang bleiben / Bereitschaft',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QRH',
    frage: 'Schwankt meine Frequenz?',
    antwort: 'Ja, Ihre Frequenz schwankt',
    bedeutung: 'Frequenzschwankung',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QRJ',
    frage: 'Wie viele Funksprüche haben Sie zu übermitteln?',
    antwort: 'Ich habe... Funksprüche',
    bedeutung: 'Anzahl der Funksprüche',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QSM',
    frage: 'Soll ich die letzte Nachricht wiederholen?',
    antwort: 'Wiederholen Sie die letzte Nachricht',
    bedeutung: 'Letzte Nachricht wiederholen',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QSZ',
    frage: 'Soll ich jedes Wort mehrmals geben?',
    antwort: 'Geben Sie jedes Wort... mal',
    bedeutung: 'Wörter wiederholen',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QTA',
    frage: 'Soll ich die Nachricht Nr. ... annullieren?',
    antwort: 'Annullieren Sie Nachricht Nr. ...',
    bedeutung: 'Nachricht annullieren',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QTN',
    frage: 'Um welche Zeit sind Sie abgefahren?',
    antwort: 'Ich bin um... Uhr abgefahren',
    bedeutung: 'Abfahrtszeit',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QTX',
    frage: 'Wollen Sie Ihre Station für mich offen halten?',
    antwort: 'Ich halte meine Station für Sie offen bis...',
    bedeutung: 'Station offen halten',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QUA',
    frage: 'Haben Sie Nachrichten von...?',
    antwort: 'Ich habe Nachrichten von...',
    bedeutung: 'Nachrichten von (Stelle)',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QUD',
    frage: 'Haben Sie das Dringlichkeitssignal erhalten?',
    antwort: 'Ich habe das Dringlichkeitssignal erhalten',
    bedeutung: 'Dringlichkeitssignal empfangen',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
  {
    code: 'QUM',
    frage: 'Darf ich den normalen Betrieb wieder aufnehmen?',
    antwort: 'Der normale Betrieb kann wieder aufgenommen werden',
    bedeutung: 'Normalbetrieb wieder aufnehmen',
    kategorie: 'verschiedenes',
    pruefungsrelevant: false,
  },
]

// Helper: Get all Q-groups
export const getAllQGruppen = (): QGruppe[] => qgruppen

// Helper: Get only exam-relevant Q-groups
export const getPruefungsrelevant = (): QGruppe[] =>
  qgruppen.filter(q => q.pruefungsrelevant)

// Helper: Get Q-groups by category
export const getByKategorie = (kategorie: string): QGruppe[] =>
  qgruppen.filter(q => q.kategorie === kategorie)

// Helper: Get a specific Q-group by code
export const getByCode = (code: string): QGruppe | undefined =>
  qgruppen.find(q => q.code === code)

// Helper: Get opposite pairs
export const getGegensatzPaare = (): { code1: string; code2: string }[] => {
  const pairs: { code1: string; code2: string }[] = []
  const seen = new Set<string>()

  qgruppen.forEach(q => {
    if (q.gegensatz && !seen.has(q.code) && !seen.has(q.gegensatz)) {
      pairs.push({ code1: q.code, code2: q.gegensatz })
      seen.add(q.code)
      seen.add(q.gegensatz)
    }
  })

  return pairs
}

// Helper: Get random Q-groups
export const getRandomQGruppen = (count: number, filter?: (q: QGruppe) => boolean): QGruppe[] => {
  let filtered = filter ? qgruppen.filter(filter) : [...qgruppen]
  const result: QGruppe[] = []

  while (result.length < count && filtered.length > 0) {
    const index = Math.floor(Math.random() * filtered.length)
    result.push(filtered[index])
    filtered = filtered.filter((_, i) => i !== index)
  }

  return result
}

// Category labels in German
export const kategorieLabels: Record<string, string> = {
  standort: 'Standort & Richtung',
  frequenz: 'Frequenz & Betrieb',
  signal: 'Signalqualität',
  stoerung: 'Störungen',
  technisch: 'Technisch',
  nachricht: 'Nachrichten',
  zeit: 'Zeit',
  verschiedenes: 'Verschiedenes',
}
