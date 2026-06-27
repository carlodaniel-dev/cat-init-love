import type { PuntosPorVibe } from '../types'

// Todos los IDs posibles de pregunta en el árbol
export type PreguntaId = 'plan' | 'pelicula' | 'comida' | 'caminata' | 'sorpresa' | 'despues'

export interface Opcion {
    texto: string
    puntos: PuntosPorVibe
    siguiente: PreguntaId | 'fin' // a qué pregunta saltar, o 'fin' si ya se acabó el quiz
}

export interface Pregunta {
    id: PreguntaId
    titulo: string
    opciones: Opcion[]
}

// Usamos un objeto (no un arreglo) para poder buscar la pregunta por su id directamente
export const preguntas: Record<PreguntaId, Pregunta> = {
    plan: {
        id: 'plan',
        titulo: '¿Qué plan te agrada más?',
        opciones: [
            { texto: 'Cine', puntos: { tranquilo: 1, romantico: 1 }, siguiente: 'pelicula' },
            { texto: 'Salir a comer', puntos: { romantico: 2 }, siguiente: 'comida' },
            { texto: 'Caminata/parque', puntos: { tranquilo: 2 }, siguiente: 'caminata' },
            { texto: 'Algo random', puntos: { aventurero: 2 }, siguiente: 'sorpresa' },
        ],
    },

    pelicula: {
        id: 'pelicula',
        titulo: 'Ya que vamos al cine, ¿qué nos echamos?',
        opciones: [
            { texto: 'Comedia', puntos: { divertido: 2 }, siguiente: 'despues' },
            { texto: 'Terror', puntos: { aventurero: 2 }, siguiente: 'despues' },
            { texto: 'Acción', puntos: { aventurero: 1, divertido: 1 }, siguiente: 'despues' },
            { texto: 'Romance', puntos: { romantico: 2 }, siguiente: 'despues' },
        ],
    },

    comida: {
        id: 'comida',
        titulo: '¿Qué se te antoja comer?',
        opciones: [
            { texto: 'Comida rápida', puntos: { divertido: 1, aventurero: 1 }, siguiente: 'despues' },
            { texto: 'Desayuno', puntos: { divertido: 1, aventurero: 1 }, siguiente: 'despues' },
            { texto: 'Almuerzo', puntos: { romantico: 2 }, siguiente: 'despues' },
            { texto: 'Postres', puntos: { tranquilo: 1, divertido: 1 }, siguiente: 'despues' },
            { texto: 'Sorpréndeme', puntos: { aventurero: 2 }, siguiente: 'despues' },
        ],
    },

    caminata: {
        id: 'caminata',
        titulo: 'Ya que andamos caminando... ¿hacia dónde vamos?',
        opciones: [
            { texto: 'En un parque/naturaleza', puntos: { tranquilo: 2 }, siguiente: 'despues' },
            { texto: 'Por el centro de la ciudad', puntos: { divertido: 1, aventurero: 1 }, siguiente: 'despues' },
            { texto: 'A donde tú quieras llevarme', puntos: { romantico: 1, tranquilo: 1 }, siguiente: 'despues' },
            { texto: 'Sin rumbo, solo caminando y platicando', puntos: { tranquilo: 2 }, siguiente: 'despues' },
        ],
    },

    sorpresa: {
        id: 'sorpresa',
        titulo: 'Algo random suena bien... ¿qué tan random?',
        opciones: [
            { texto: 'Algo improvisado en el momento', puntos: { aventurero: 2 }, siguiente: 'despues' },
            { texto: 'Un lugar nuevo que no conozcamos', puntos: { aventurero: 1, divertido: 1 }, siguiente: 'despues' },
            { texto: 'Tú elige la sorpresa', puntos: { romantico: 1, aventurero: 1 }, siguiente: 'despues' },
            { texto: 'Que decida el destino (lanzo una moneda)', puntos: { divertido: 2 }, siguiente: 'despues' },
            { texto: 'Lo que sea, contigo todo es buena idea', puntos: { romantico: 2 }, siguiente: 'despues' },
        ],
    },

    despues: {
        id: 'despues',
        titulo: '¿Qué hacemos después?',
        opciones: [
            { texto: 'Seguimos platicando', puntos: { romantico: 1, tranquilo: 1 }, siguiente: 'fin' },
            { texto: 'Otra cita ya mismo', puntos: { aventurero: 2 }, siguiente: 'fin' },
            { texto: 'Ver qué sale', puntos: { tranquilo: 2 }, siguiente: 'fin' },
            { texto: 'Tú decides', puntos: { divertido: 2 }, siguiente: 'fin' },
            { texto: 'Nos despedimos', puntos: { divertido: 2 }, siguiente: 'fin' },
        ],
    },
}