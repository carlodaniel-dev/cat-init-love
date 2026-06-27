import type { Vibe, PuntosPorVibe, ResultadoFinal } from '../types'

const resultados: Record<Vibe, ResultadoFinal> = {
    aventurero: {
        vibe: 'aventurero',
        titulo: 'Misión: Cita Inesperada',
        descripcion: 'Su algoritmo de compatibilidad detectó que buscan emociones fuertes. Prepárense para lo random.',
        emoji: '🌪️',
    },
    romantico: {
        vibe: 'romantico',
        titulo: 'Protocolo: Cita Clásica',
        descripcion: 'Su algoritmo detectó alta compatibilidad romántica. Esto va para largo.',
        emoji: '💜',
    },
    tranquilo: {
        vibe: 'tranquilo',
        titulo: 'Modo: Cita Sin Prisa',
        descripcion: 'Su algoritmo detectó que prefieren ir con calma. Nada de presiones, solo buena compañía.',
        emoji: '🌙',
    },
    divertido: {
        vibe: 'divertido',
        titulo: 'Sistema: Cita Modo Diversión',
        descripcion: 'Su algoritmo detectó que la prioridad es pasarla bien y reírse mucho.',
        emoji: '😆',
    },
}

// Recibe el total acumulado de puntos de las 4 respuestas, y devuelve el resultado ganador
export function calcularResultado(totalPuntos: PuntosPorVibe): ResultadoFinal {
    let vibeGanadora: Vibe = 'divertido' // valor por defecto si todo empata en 0
    let maxPuntos = -1

    for (const vibe in totalPuntos) {
        const puntos = totalPuntos[vibe as Vibe] ?? 0
        if (puntos > maxPuntos) {
            maxPuntos = puntos
            vibeGanadora = vibe as Vibe
        }
    }

    return resultados[vibeGanadora]
}