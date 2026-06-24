import { useState } from 'react'
import type { Step, DateData } from './types'

import Intro from './components/Intro'
import DateTime from './components/DateTime'

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


  return (
    <div className="min-h-screen bg-black">
      {step === 'intro' && <Intro onSuccess={() => setStep('datetime')} />}
      {step === 'datetime' && <DateTime onNext={handleFechaHora} />}
    </div>
  )
}

export default App