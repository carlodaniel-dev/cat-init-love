import { useState } from 'react'
import type { Step, DateData } from './types'

import Intro from './components/Intro'

function App() {
  const [step, setStep] = useState<Step>('intro')
  // dateData -> Guarda las respuestas
  const [dateData, setDateData] = useState<DateData>({
    fecha: '',
    hora: '',
    respuestas: { pelicula: '', plan: '', comida: '', despues: '' },
  })

  return (
    <div className="min-h-screen bg-black">
      {step === 'intro' && <Intro onSuccess={() => setStep('datetime')} />}
    </div>
  )
}

export default App