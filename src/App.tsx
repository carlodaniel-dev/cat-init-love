import { useState } from 'react'
import type { Step, DateData, QuizAnswers, ResultadoFinal } from './types'

import Intro from './components/Intro'
import DateTime from './components/DateTime'
import Quiz from './components/Quiz'
import Summary from './components/Summary'

function App() {
  const [step, setStep] = useState<Step>('intro')
  // dateData -> Guarda las respuestas
  const [dateData, setDateData] = useState<DateData>({
    fecha: '',
    hora: '',
    respuestas: {},
  })

  const [resultado, setResultado] = useState<ResultadoFinal | null>(null)

  const handleFechaHora = (fecha: string, hora: string) => {
    setDateData((prev) => ({ ...prev, fecha, hora }))
    setStep('quiz')
  }

  const handleQuizComplete = (respuestas: QuizAnswers, resultadoFinal: ResultadoFinal) => {
    setDateData((prev) => ({ ...prev, respuestas }))
    setResultado(resultadoFinal)
    setStep('summary')
  }

  return (
    <div className="min-h-screen bg-black">
      {step === 'intro' && <Intro onSuccess={() => setStep('datetime')} />}
      {step === 'datetime' && <DateTime onNext={handleFechaHora} />}
      {step === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {step === 'summary' && resultado && <Summary dateData={dateData} resultado={resultado} onNext={() => setStep('confirmation')} />} 
    </div>
  )
}

export default App