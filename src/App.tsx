import { useState } from 'react'
import type { Step, DateData, QuizAnswers } from './types'

import Intro from './components/Intro'
import DateTime from './components/DateTime'
import Quiz from './components/Quiz'

function App() {
  const [step, setStep] = useState<Step>('intro')
  // dateData -> Guarda las respuestas
  const [dateData, setDateData] = useState<DateData>({
    fecha: '',
    hora: '',
    respuestas: { pelicula: '', plan: '', comida: '', despues: '' },
  })

  const handleFechaHora = (fecha: string, hora: string) => {
    setDateData((prev) => ({ ...prev, fecha, hora }))
    setStep('quiz')
  }

  const handleQuizComplete = (respuestas: QuizAnswers) => {
    setDateData((prev) => ({ ...prev, respuestas }))
    setStep('summary')
  }

  return (
    <div className="min-h-screen bg-black">
      {step === 'intro' && <Intro onSuccess={() => setStep('datetime')} />}
      {step === 'datetime' && <DateTime onNext={handleFechaHora} />}
      {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
    </div>
  )
}

export default App