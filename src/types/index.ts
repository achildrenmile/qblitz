// Q-Gruppe Kategorien
export type QKategorie =
  | 'standort'      // Standort & Richtung
  | 'frequenz'      // Frequenz & Betrieb
  | 'signal'        // Signalqualität
  | 'stoerung'      // Störungen
  | 'technisch'     // Technische Angaben
  | 'nachricht'     // Nachrichten & Bestätigungen
  | 'zeit'          // Zeit
  | 'verschiedenes' // Sonstige

// Q-Gruppe Definition
export interface QGruppe {
  code: string
  frage: string           // "Was ist Ihr Standort?"
  antwort: string         // "Mein Standort ist..."
  bedeutung: string       // Kurze Erklärung
  kategorie: QKategorie
  pruefungsrelevant: boolean
  eselsbruecke?: string   // Optionale Merkhilfe
  beispiel?: string       // Optionales Anwendungsbeispiel
  gegensatz?: string      // Optionaler Gegensatz-Code
}

// Fragetypen für Quiz/Blitz
export type FrageTyp =
  | 'code_zu_bedeutung'    // QTH -> "Standort"
  | 'bedeutung_zu_code'    // "Standort" -> QTH
  | 'frage_zu_code'        // "Was ist Ihr Standort?" -> QTH
  | 'code_zu_antwort'      // QTH -> "Mein Standort ist..."

// Lernstatus für Spaced Repetition
export interface LernStatus {
  code: string
  level: number           // 0-5
  naechsteWiederholung: number  // Timestamp
  richtigInFolge: number
  falschGesamt: number
  richtigGesamt: number
  letzteAntwort: number   // Timestamp
}

// Erfolg/Achievement
export interface Erfolg {
  id: string
  titel: string
  beschreibung: string
  icon: string
  bedingung: (spielstand: Spielstand) => boolean
  punkte: number
  selten?: boolean        // Seltener Erfolg
}

// Spielstand
export interface Spielstand {
  gesamtPunkte: number
  tagesStreak: number
  laengsterStreak: number
  letzterTag: string      // ISO date string

  // Statistiken
  fragenGesamt: number
  fragenRichtig: number

  // Pro Modus
  blitzBestzeit: number
  blitzHoechstpunkte: number
  quizAbgeschlossen: number
  pruefungenBestanden: number

  // Erfolge
  freigeschalteteErfolge: string[]

  // Lernfortschritt
  lernstatus: Record<string, LernStatus>
}

// Einstellungen
export interface Einstellungen {
  // Blitz-Modus
  blitzZeit: number       // Sekunden (30, 60, 90, 120)

  // Quiz
  fragenProQuiz: number   // 10, 15, 20, 25
  kategorien: QKategorie[]
  nurPruefungsrelevant: boolean

  // Anzeige
  dunklerModus: boolean   // Always true for now
  animationen: boolean
  sound: boolean

  // Spaced Repetition
  tagesZiel: number       // Anzahl Karten pro Tag
}

// Quiz/Blitz Frage
export interface Frage {
  qgruppe: QGruppe
  typ: FrageTyp
  frageText: string
  richtigeAntwort: string
  falscheAntworten: string[]
  alleAntworten: string[] // Gemischt
}

// Session-Ergebnis
export interface SessionErgebnis {
  modus: 'quiz' | 'blitz' | 'pruefung' | 'lernen'
  fragenGesamt: number
  richtig: number
  falsch: number
  punkte: number
  zeit: number            // Sekunden
  neueErfolge: string[]
  details: FrageErgebnis[]
}

export interface FrageErgebnis {
  code: string
  richtig: boolean
  gewaehlteAntwort: string
  richtigeAntwort: string
  zeit: number            // Millisekunden für diese Frage
}

// Gegensatz-Paar
export interface GegensatzPaar {
  code1: string
  code2: string
  beschreibung1: string
  beschreibung2: string
  thema: string           // z.B. "Sendeleistung"
}

// Default Einstellungen
export const DEFAULT_EINSTELLUNGEN: Einstellungen = {
  blitzZeit: 60,
  fragenProQuiz: 10,
  kategorien: ['standort', 'frequenz', 'signal', 'stoerung', 'technisch', 'nachricht', 'zeit', 'verschiedenes'],
  nurPruefungsrelevant: false,
  dunklerModus: true,
  animationen: true,
  sound: true,
  tagesZiel: 20,
}

// Default Spielstand
export const DEFAULT_SPIELSTAND: Spielstand = {
  gesamtPunkte: 0,
  tagesStreak: 0,
  laengsterStreak: 0,
  letzterTag: '',
  fragenGesamt: 0,
  fragenRichtig: 0,
  blitzBestzeit: 0,
  blitzHoechstpunkte: 0,
  quizAbgeschlossen: 0,
  pruefungenBestanden: 0,
  freigeschalteteErfolge: [],
  lernstatus: {},
}

// Spaced Repetition Intervalle (in Tagen)
export const SR_INTERVALLE = [0, 1, 3, 7, 14, 30]
