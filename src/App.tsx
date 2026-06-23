import { useState } from 'react'
import type { Step, DateData } from './types'

function App() {
  const [step, setStep] = useState<Step>('intro')
  // dateData -> Guarda las respuestas
  const [dateData, setDateData] = useState<DateData>({
    fecha: '',
    hora: '',
    respuestas: { pelicula: '', plan: '', comida: '', despues: '' },
  })

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <p className="text-purple-400 text-xl">
        Paso actual: {step}
      </p>
    </div>
  )
}

export default App