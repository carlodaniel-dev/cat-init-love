import { useState } from 'react'

interface IntroProps {
    onSuccess: () => void
}

const MAX_INTENTOS = 8

function Intro({ onSuccess }: IntroProps) {
    const [noCount, setNoCount] = useState(0)
    const [noPosition, setNoPosition] = useState({ top: '50%', left: '50%' })
    const [isEscaping, setIsEscaping] = useState(false)
    const [isGone, setIsGone] = useState(false)

    const mensajesNo = [
        'Error 404: opción "No" se escapó del servidor',
        'Intenta de nuevo, esa respuesta no existe en este universo',
        'El botón "No" se está escapando... síguelo si puedes',
        'Nivel de persistencia: alto. Respeto.',
        'El botón "No" está perdiendo señal...',
        'Advertencia: integridad del botón al 40%',
        'El botón "No" está a punto de colapsar',
        'Últimos segundos de vida del botón "No"...',
    ]

    const mensajeFinal = 'La opción "No" salió del chat 🐱💨'

    const escaparBoton = () => {
        if (isGone) return // ya no hay nada que escapar

        const nuevoCount = noCount + 1

        if (nuevoCount >= MAX_INTENTOS) {
            setIsGone(true)
            return
        }

        const nuevoTop = Math.random() * 75 + 10
        const nuevoLeft = Math.random() * 75 + 10

        setNoPosition({ top: `${nuevoTop}%`, left: `${nuevoLeft}%` })
        setNoCount(nuevoCount)
        setIsEscaping(true)
    }

    // La escala va de 1 (tamaño normal) a 0.2 (casi invisible) según los intentos
    const escala = Math.max(1 - noCount * 0.11, 0.2)

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 text-center gap-6 relative overflow-hidden">
            <img
                src="/src/assets/memes/cat_nervious.webp"
                alt="Gatito"
                className="w-48 h-48 object-cover rounded-2xl border-2 border-purple-500"
            />

            <h1 className="text-purple-400 text-2xl font-bold">
                ¿Quieres tener una cita conmigo?
            </h1>

            <div className="flex gap-4 relative">
                <button
                    onClick={onSuccess}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
                >
                    Sí
                </button>

                {!isEscaping && !isGone && (
                    <button
                        onMouseEnter={escaparBoton}
                        className="bg-gray-800 text-gray-400 px-6 py-2 rounded-lg"
                    >
                        No
                    </button>
                )}
            </div>

            {isEscaping && !isGone && (
                <button
                    onMouseEnter={escaparBoton}
                    style={{
                        top: noPosition.top,
                        left: noPosition.left,
                        transform: `scale(${escala})`,
                    }}
                    className="absolute bg-gray-800 text-gray-400 px-6 py-2 rounded-lg transition-all duration-300"
                >
                    No
                </button>
            )}

            {!isGone && noCount > 0 && (
                <p className="text-red-400 text-sm max-w-xs">
                    {mensajesNo[Math.min(noCount - 1, mensajesNo.length - 1)]}
                </p>
            )}

            {isGone && (
                <p className="text-red-400 text-sm max-w-xs font-bold">
                    {mensajeFinal}
                </p>
            )}
        </div>
    )
}

export default Intro