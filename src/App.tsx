import { useState, useEffect } from 'react'
import StartBildschirm from './components/StartBildschirm'
import LernModus from './components/lern/LernModus'
import QuizModus from './components/quiz/QuizModus'
import BlitzModus from './components/blitz/BlitzModus'
import PruefungsModus from './components/pruefung/PruefungsModus'
import GegensaetzeTrainer from './components/gegensaetze/GegensaetzeTrainer'
import Nachschlagewerk from './components/nachschlagewerk/Nachschlagewerk'
import Statistik from './components/statistik/Statistik'
import Einstellungen from './components/Einstellungen'
import useEinstellungen from './hooks/useEinstellungen'

export type Screen =
  | 'start'
  | 'lernen'
  | 'quiz'
  | 'blitz'
  | 'pruefung'
  | 'gegensaetze'
  | 'nachschlagewerk'
  | 'statistik'
  | 'einstellungen'

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const { einstellungen } = useEinstellungen()

  // Apply dark mode class to html element
  useEffect(() => {
    if (einstellungen.dunklerModus) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [einstellungen.dunklerModus])

  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartBildschirm onNavigate={setScreen} />
      case 'lernen':
        return <LernModus onBack={() => setScreen('start')} />
      case 'quiz':
        return <QuizModus onBack={() => setScreen('start')} />
      case 'blitz':
        return <BlitzModus onBack={() => setScreen('start')} />
      case 'pruefung':
        return <PruefungsModus onBack={() => setScreen('start')} />
      case 'gegensaetze':
        return <GegensaetzeTrainer onBack={() => setScreen('start')} />
      case 'nachschlagewerk':
        return <Nachschlagewerk onBack={() => setScreen('start')} />
      case 'statistik':
        return <Statistik onBack={() => setScreen('start')} />
      case 'einstellungen':
        return <Einstellungen onBack={() => setScreen('start')} />
      default:
        return <StartBildschirm onNavigate={setScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {renderScreen()}
    </div>
  )
}

export default App
