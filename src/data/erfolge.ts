import { Erfolg, Spielstand } from '../types'

export const erfolge: Erfolg[] = [
  // === ERSTE SCHRITTE ===
  {
    id: 'erste_antwort',
    titel: 'Erster Kontakt',
    beschreibung: 'Beantworte deine erste Frage',
    icon: '📡',
    punkte: 10,
    bedingung: (s: Spielstand) => s.fragenGesamt >= 1,
  },
  {
    id: 'zehn_richtig',
    titel: 'Auf der Frequenz',
    beschreibung: '10 Fragen richtig beantwortet',
    icon: '🎯',
    punkte: 25,
    bedingung: (s: Spielstand) => s.fragenRichtig >= 10,
  },
  {
    id: 'fuenfzig_richtig',
    titel: 'Funkamateur',
    beschreibung: '50 Fragen richtig beantwortet',
    icon: '📻',
    punkte: 50,
    bedingung: (s: Spielstand) => s.fragenRichtig >= 50,
  },
  {
    id: 'hundert_richtig',
    titel: 'Funkexperte',
    beschreibung: '100 Fragen richtig beantwortet',
    icon: '🏆',
    punkte: 100,
    bedingung: (s: Spielstand) => s.fragenRichtig >= 100,
  },
  {
    id: 'fuenfhundert_richtig',
    titel: 'Funkmeister',
    beschreibung: '500 Fragen richtig beantwortet',
    icon: '👑',
    punkte: 250,
    selten: true,
    bedingung: (s: Spielstand) => s.fragenRichtig >= 500,
  },

  // === STREAKS ===
  {
    id: 'streak_3',
    titel: 'Dranbleiben',
    beschreibung: '3 Tage in Folge geübt',
    icon: '🔥',
    punkte: 30,
    bedingung: (s: Spielstand) => s.laengsterStreak >= 3,
  },
  {
    id: 'streak_7',
    titel: 'Wochenläufer',
    beschreibung: '7 Tage in Folge geübt',
    icon: '🔥',
    punkte: 70,
    bedingung: (s: Spielstand) => s.laengsterStreak >= 7,
  },
  {
    id: 'streak_14',
    titel: 'Zweiwochenmarke',
    beschreibung: '14 Tage in Folge geübt',
    icon: '🔥',
    punkte: 140,
    bedingung: (s: Spielstand) => s.laengsterStreak >= 14,
  },
  {
    id: 'streak_30',
    titel: 'Monatsmeister',
    beschreibung: '30 Tage in Folge geübt',
    icon: '🌟',
    punkte: 300,
    selten: true,
    bedingung: (s: Spielstand) => s.laengsterStreak >= 30,
  },

  // === BLITZ MODUS ===
  {
    id: 'blitz_erste',
    titel: 'Blitzstart',
    beschreibung: 'Erste Blitz-Runde absolviert',
    icon: '⚡',
    punkte: 15,
    bedingung: (s: Spielstand) => s.blitzHoechstpunkte > 0,
  },
  {
    id: 'blitz_100',
    titel: 'Blitzableiter',
    beschreibung: '100 Punkte im Blitz-Modus erreicht',
    icon: '⚡',
    punkte: 50,
    bedingung: (s: Spielstand) => s.blitzHoechstpunkte >= 100,
  },
  {
    id: 'blitz_250',
    titel: 'Stromschlag',
    beschreibung: '250 Punkte im Blitz-Modus erreicht',
    icon: '⚡',
    punkte: 100,
    bedingung: (s: Spielstand) => s.blitzHoechstpunkte >= 250,
  },
  {
    id: 'blitz_500',
    titel: 'Hochspannung',
    beschreibung: '500 Punkte im Blitz-Modus erreicht',
    icon: '⚡',
    punkte: 200,
    selten: true,
    bedingung: (s: Spielstand) => s.blitzHoechstpunkte >= 500,
  },

  // === QUIZ ===
  {
    id: 'quiz_erste',
    titel: 'Quizmaster',
    beschreibung: 'Erstes Quiz abgeschlossen',
    icon: '📝',
    punkte: 20,
    bedingung: (s: Spielstand) => s.quizAbgeschlossen >= 1,
  },
  {
    id: 'quiz_10',
    titel: 'Fleißig',
    beschreibung: '10 Quiz abgeschlossen',
    icon: '📝',
    punkte: 75,
    bedingung: (s: Spielstand) => s.quizAbgeschlossen >= 10,
  },
  {
    id: 'quiz_25',
    titel: 'Ausdauernd',
    beschreibung: '25 Quiz abgeschlossen',
    icon: '📝',
    punkte: 150,
    bedingung: (s: Spielstand) => s.quizAbgeschlossen >= 25,
  },

  // === PRÜFUNG ===
  {
    id: 'pruefung_bestanden',
    titel: 'Prüfungsreif',
    beschreibung: 'Erste Prüfungssimulation bestanden',
    icon: '🎓',
    punkte: 100,
    bedingung: (s: Spielstand) => s.pruefungenBestanden >= 1,
  },
  {
    id: 'pruefung_5',
    titel: 'Prüfungsprofi',
    beschreibung: '5 Prüfungssimulationen bestanden',
    icon: '🎓',
    punkte: 200,
    bedingung: (s: Spielstand) => s.pruefungenBestanden >= 5,
  },
  {
    id: 'pruefung_10',
    titel: 'Lizenziert',
    beschreibung: '10 Prüfungssimulationen bestanden',
    icon: '📜',
    punkte: 300,
    selten: true,
    bedingung: (s: Spielstand) => s.pruefungenBestanden >= 10,
  },

  // === PUNKTE ===
  {
    id: 'punkte_100',
    titel: 'Sammler',
    beschreibung: '100 Punkte gesammelt',
    icon: '💎',
    punkte: 0,
    bedingung: (s: Spielstand) => s.gesamtPunkte >= 100,
  },
  {
    id: 'punkte_500',
    titel: 'Punktejäger',
    beschreibung: '500 Punkte gesammelt',
    icon: '💎',
    punkte: 0,
    bedingung: (s: Spielstand) => s.gesamtPunkte >= 500,
  },
  {
    id: 'punkte_1000',
    titel: 'Punktekönig',
    beschreibung: '1000 Punkte gesammelt',
    icon: '💎',
    punkte: 0,
    bedingung: (s: Spielstand) => s.gesamtPunkte >= 1000,
  },
  {
    id: 'punkte_5000',
    titel: 'Punktemeister',
    beschreibung: '5000 Punkte gesammelt',
    icon: '👑',
    punkte: 0,
    selten: true,
    bedingung: (s: Spielstand) => s.gesamtPunkte >= 5000,
  },

  // === LERNFORTSCHRITT ===
  {
    id: 'alle_gesehen',
    titel: 'Entdecker',
    beschreibung: 'Alle Q-Gruppen mindestens einmal geübt',
    icon: '🗺️',
    punkte: 100,
    bedingung: (s: Spielstand) => Object.keys(s.lernstatus).length >= 40,
  },
  {
    id: 'zehn_gemeistert',
    titel: 'Spezialist',
    beschreibung: '10 Q-Gruppen auf Level 5 gebracht',
    icon: '⭐',
    punkte: 150,
    bedingung: (s: Spielstand) =>
      Object.values(s.lernstatus).filter(ls => ls.level >= 5).length >= 10,
  },
  {
    id: 'alle_gemeistert',
    titel: 'Großmeister',
    beschreibung: 'Alle Q-Gruppen auf Level 5 gebracht',
    icon: '🏅',
    punkte: 500,
    selten: true,
    bedingung: (s: Spielstand) =>
      Object.values(s.lernstatus).filter(ls => ls.level >= 5).length >= 40,
  },

  // === GEHEIME ERFOLGE ===
  {
    id: 'perfekte_runde',
    titel: 'Perfektionist',
    beschreibung: 'Ein Quiz ohne Fehler abgeschlossen',
    icon: '✨',
    punkte: 75,
    selten: true,
    bedingung: () => false, // Wird manuell freigeschaltet
  },
  {
    id: 'nachtaktiv',
    titel: 'Nachtschicht',
    beschreibung: 'Zwischen 0 und 5 Uhr geübt',
    icon: '🌙',
    punkte: 25,
    bedingung: () => {
      const hour = new Date().getHours()
      return hour >= 0 && hour < 5
    },
  },
  {
    id: 'wochenende',
    titel: 'Wochenendkrieger',
    beschreibung: 'Am Wochenende geübt',
    icon: '🎉',
    punkte: 15,
    bedingung: () => {
      const day = new Date().getDay()
      return day === 0 || day === 6
    },
  },
]

// Helper: Get all achievements
export const getAllErfolge = (): Erfolg[] => erfolge

// Helper: Get achievement by ID
export const getErfolgById = (id: string): Erfolg | undefined =>
  erfolge.find(e => e.id === id)

// Helper: Get unlocked achievements
export const getFreigeschalteteErfolge = (ids: string[]): Erfolg[] =>
  erfolge.filter(e => ids.includes(e.id))

// Helper: Get locked achievements
export const getGesperrteErfolge = (ids: string[]): Erfolg[] =>
  erfolge.filter(e => !ids.includes(e.id))

// Helper: Check for new achievements
export const pruefeNeueErfolge = (spielstand: Spielstand): string[] => {
  const neue: string[] = []

  erfolge.forEach(erfolg => {
    if (
      !spielstand.freigeschalteteErfolge.includes(erfolg.id) &&
      erfolg.bedingung(spielstand)
    ) {
      neue.push(erfolg.id)
    }
  })

  return neue
}
