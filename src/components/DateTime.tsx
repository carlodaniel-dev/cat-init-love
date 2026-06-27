import { useState } from 'react'

interface DateTimePickerProps {
    onNext: (fecha: string, hora: string) => void
}

const mensajesFecha = [
    'Me parece perfecto',
    'Como ordenes, jefa',
    'Anotado en mi calendario interno',
    'Esa fecha ya quedó grabada en piedra',
]

const mensajesHora = [
    'A esa hora ya estaré listo',
    'Como ordenes, jefa',
    'Hora confirmada en mi calendario',
]

function elegirMensajeRandom(lista: string[]) {
    const indice = Math.floor(Math.random() * lista.length)
    return lista[indice]
}

function DateTimePicker({ onNext }: DateTimePickerProps) {
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [mensajeFecha, setMensajeFecha] = useState('')
    const [mensajeHora, setMensajeHora] = useState('')

    const puedeContinuar = fecha !== '' && hora !== ''

    const handleFechaChange = (valor: string) => {
        setFecha(valor)
        setMensajeFecha(elegirMensajeRandom(mensajesFecha))
    }

    const handleHoraChange = (valor: string) => {
        setHora(valor)
        setMensajeHora(elegirMensajeRandom(mensajesHora))
    }

    const handleContinuar = () => {
        if (puedeContinuar) {
            onNext(fecha, hora)
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 text-center gap-6">
            <img
                src="/src/assets/memes/cat_asks.png"
                alt="Gatito"
                className="w-48 h-48 object-cover rounded-2xl border-2 border-purple-500"
            />

            <p className="text-gray-400 text-sm">
                ¿Cuándo quieres que sea nuestra cita?
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <div className="flex flex-col gap-1 text-left">
                    <label htmlFor="fecha" className="text-gray-400 text-xs">
                        fecha:
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => handleFechaChange(e.target.value)}
                        className="bg-gray-900 border border-purple-500 text-purple-300 rounded-lg px-3 py-2 outline-none focus:border-purple-300"
                    />
                    {mensajeFecha && (
                        <p className="text-green-400 text-xs mt-1">{mensajeFecha}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1 text-left">
                    <label htmlFor="hora" className="text-gray-400 text-xs">
                        hora:
                    </label>
                    <input
                        id="hora"
                        type="time"
                        value={hora}
                        onChange={(e) => handleHoraChange(e.target.value)}
                        className="bg-gray-900 border border-purple-500 text-purple-300 rounded-lg px-3 py-2 outline-none focus:border-purple-300"
                    />
                    {mensajeHora && (
                        <p className="text-green-400 text-xs mt-1">{mensajeHora}</p>
                    )}
                </div>
            </div>

            <button
                onClick={handleContinuar}
                disabled={!puedeContinuar}
                className={`px-6 py-2 rounded-lg transition ${puedeContinuar
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
            >
                Continuar →
            </button>
        </div>
    )
}

export default DateTimePicker