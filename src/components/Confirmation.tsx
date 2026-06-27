import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { etiquetasCortas } from '../data/preguntas'
import type { DateData, ResultadoFinal } from '../types'
import catFlower from '../assets/memes/cat_flower.webp'

interface ConfirmationProps {
    dateData: DateData
    resultado: ResultadoFinal
}

function Confirmation({ dateData, resultado }: ConfirmationProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [descargando, setDescargando] = useState(false)

    const respuestasExistentes = Object.entries(dateData.respuestas).filter(
        ([, valor]) => valor !== undefined && valor !== ''
    )

    const handleDescargar = async () => {
        if (!cardRef.current) return
        setDescargando(true)

        try {
            const dataUrl = await toPng(cardRef.current, {
                pixelRatio: 2,
                backgroundColor: '#000000',
            })

            const link = document.createElement('a')
            link.download = 'nuestra-cita.png'
            link.href = dataUrl
            link.click()
        } catch (error) {
            console.error('Error generando la imagen:', error)
        } finally {
            setDescargando(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono px-6 gap-6">
            <div
                ref={cardRef}
                className="aspect-[9/16] w-full max-w-xs bg-gradient-to-br from-purple-950 via-black to-black border border-purple-700 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.25)] flex flex-col items-center justify-center gap-2 p-5 text-center overflow-hidden"
            >
                <p className="text-purple-400/70 text-[10px] tracking-widest">
                    💜 · 🤍 · 💜
                </p>

                <img
                    src={catFlower}
                    alt="Gatito con flores"
                    style={{ width: '72px', height: '72px' }}
                    className="shrink-0 object-cover rounded-full border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                />

                <h1
                    className="text-purple-300 text-xl italic px-2 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {resultado.emoji} {resultado.titulo}
                </h1>

                <p className="text-gray-400 text-[11px] font-mono px-2 leading-snug">
                    {resultado.descripcion}
                </p>

                <div className="w-full mt-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-px bg-purple-700/50" />
                        <span className="text-purple-400 text-xs">♡</span>
                        <div className="flex-1 h-px bg-purple-700/50" />
                    </div>

                    <div className="border border-purple-700/50 rounded-lg p-3 text-left flex flex-col gap-0.5 font-mono">
                        <p className="text-gray-300 text-[11px]">
                            <span className="text-gray-500">fecha:</span> {dateData.fecha}
                        </p>
                        <p className="text-gray-300 text-[11px]">
                            <span className="text-gray-500">hora:</span> {dateData.hora}
                        </p>

                        {respuestasExistentes.map(([id, valor]) => (
                            <p key={id} className="text-gray-300 text-[11px]">
                                <span className="text-gray-500">
                                    {etiquetasCortas[id as keyof typeof etiquetasCortas]}:
                                </span>{' '}
                                {valor}
                            </p>
                        ))}
                    </div>
                </div>

                <p
                    className="text-purple-300 text-xs italic mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Nos vemos en nuestra cita 🐱💜
                </p>
                <p className="text-purple-300 text-xs italic mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Guarda este comprobante  💌
                </p>
            </div>

            <button
                onClick={handleDescargar}
                disabled={descargando}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
                {descargando ? 'Generando imagen...' : 'Descargar imagen 📸'}
            </button>
        </div>
    )
}

export default Confirmation