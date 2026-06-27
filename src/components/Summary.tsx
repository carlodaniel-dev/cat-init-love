import { useState, useEffect } from 'react'
import { preguntas } from '../data/preguntas'
import type { DateData, ResultadoFinal } from '../types'

interface SummaryProps {
    dateData: DateData
    resultado: ResultadoFinal
    onNext: () => void
}

function Summary({ dateData, resultado, onNext }: SummaryProps) {
    const [calculando, setCalculando] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setCalculando(false), 3800)
        return () => clearTimeout(timer)
    }, [])

    // Convertimos las respuestas (un objeto) en una lista de [id, texto]
    // para poder recorrerlas con .map() y mostrar solo las que existen
    const respuestasExistentes = Object.entries(dateData.respuestas).filter(
        ([, valor]) => valor !== undefined && valor !== ''
    )

    if (calculando) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 text-center gap-4">
                <p className="text-purple-400 text-lg animate-pulse">
                    Calculando Compatibilidad
                </p>
                <p className="text-gray-500 text-sm">procesando respuestas...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 text-center gap-6">
            <div className="text-6xl">{resultado.emoji}</div>

            <h1 className="text-purple-400 text-2xl font-bold">{resultado.titulo}</h1>

            <img
                src="/src/assets/memes/cat_result.webp"
                alt="Gatito"
                className="w-48 h-48 object-cover rounded-2xl border-2 border-purple-500"
            />

            <p className="text-gray-300 text-sm max-w-sm">{resultado.descripcion}</p>

            <div className="w-full max-w-xs border border-purple-500 rounded-lg p-4 text-left flex flex-col gap-2">
                <p className="text-purple-400 text-xs mb-1">// resumen_de_la_cita</p>

                <p className="text-gray-300 text-sm">
                    <span className="text-gray-500">fecha:</span> {dateData.fecha}
                </p>
                <p className="text-gray-300 text-sm">
                    <span className="text-gray-500">hora:</span> {dateData.hora}
                </p>

                {respuestasExistentes.map(([id, valor]) => (
                    <p key={id} className="text-gray-300 text-sm">
                        <span className="text-gray-500">
                            {preguntas[id as keyof typeof preguntas].titulo}:
                        </span>{' '}
                        {valor}
                    </p>
                ))}
            </div>

            <button
                onClick={onNext}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
                Confirmar cita →
            </button>
        </div>
    )
}

export default Summary