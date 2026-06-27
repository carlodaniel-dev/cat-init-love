import { useState } from 'react'
import { preguntas } from '../data/preguntas'
import { calcularResultado } from '../data/resultados'
import type { Opcion, PreguntaId } from '../data/preguntas'
import type { QuizAnswers, PuntosPorVibe, ResultadoFinal, Vibe } from '../types'

interface QuizProps {
    onComplete: (respuestas: QuizAnswers, resultado: ResultadoFinal) => void
}

// Cuántos pasos tiene cada rama, para poder mostrar una barra de progreso realista
const pasosPorRama: Record<string, number> = {
    'Cine': 3,             // plan -> pelicula -> despues
    'Cena tranquila': 2,   // plan -> comida
    'Caminata/parque': 3,  // plan -> caminata -> despues
    'Algo random': 3,      // plan -> sorpresa -> despues
}

function Quiz({ onComplete }: QuizProps) {
    const [idActual, setIdActual] = useState<PreguntaId>('plan')
    const [respuestas, setRespuestas] = useState<QuizAnswers>({})
    const [puntosAcumulados, setPuntosAcumulados] = useState<PuntosPorVibe>({})
    const [pasoActual, setPasoActual] = useState(1)
    const [totalPasos, setTotalPasos] = useState(4) // valor inicial, se ajusta tras la 1ra respuesta

    const preguntaActual = preguntas[idActual]
    const progreso = (pasoActual / totalPasos) * 100

    const handleSeleccion = (opcion: Opcion) => {
        // 1. Guardamos la respuesta en texto
        const nuevasRespuestas = { ...respuestas, [preguntaActual.id]: opcion.texto }
        setRespuestas(nuevasRespuestas)

        // 2. Si esta es la pregunta "plan", ya sabemos cuántos pasos tendrá toda la rama
        if (preguntaActual.id === 'plan') {
            setTotalPasos(pasosPorRama[opcion.texto] ?? 3)
        }

        // 3. Sumamos los puntos de esta opción a los puntos totales del quiz
        const nuevosPuntos: PuntosPorVibe = { ...puntosAcumulados }
        for (const vibe in opcion.puntos) {
            const vibeKey = vibe as Vibe
            const puntosActuales = nuevosPuntos[vibeKey] ?? 0
            const puntosASumar = opcion.puntos[vibeKey] ?? 0
            nuevosPuntos[vibeKey] = puntosActuales + puntosASumar
        }
        setPuntosAcumulados(nuevosPuntos)

        // 4. Decidimos qué sigue: otra pregunta, o el resultado final
        if (opcion.siguiente === 'fin') {
            const resultado = calcularResultado(nuevosPuntos)
            onComplete(nuevasRespuestas, resultado)
        } else {
            setIdActual(opcion.siguiente)
            setPasoActual((prev) => prev + 1)
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 text-center gap-6">
            <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>pregunta {pasoActual} de {totalPasos}</span>
                    <span>{Math.round(progreso)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                    />
                </div>
            </div>

            <img
                src="/src/assets/memes/cat_plan.webp"
                alt="Gatito"
                className="w-48 h-48 object-cover rounded-2xl border-2 border-purple-500"
            />

            <h1 className="text-purple-400 text-2xl font-bold max-w-sm">
                {preguntaActual.titulo}
            </h1>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                {preguntaActual.opciones.map((opcion) => (
                    <button
                        key={opcion.texto}
                        onClick={() => handleSeleccion(opcion)}
                        className="bg-gray-900 border border-purple-500 text-purple-300 px-4 py-3 rounded-lg hover:bg-purple-900 transition text-left"
                    >
                        {opcion.texto}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Quiz