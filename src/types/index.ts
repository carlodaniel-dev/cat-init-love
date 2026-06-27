/**
 *  Ayuda a manejar el estado de la app, 
 *  marcando como error por manejo de datos o errores ortograficos.
*/

// Las "pantallas" posibles de la app, en orden
export type Step = 'intro' | 'datetime' | 'quiz' | 'summary' | 'confirmation'
// Las 4 categorías que compiten por ser el resultado final
export type Vibe = 'aventurero' | 'romantico' | 'tranquilo' | 'divertido'

// Las respuestas del quiz (lo que la persona va eligiendo)
export interface QuizAnswers {
    plan?: string
    pelicula?: string
    comida?: string
    caminata?: string
    sorpresa?: string
    despues?: string
}
// Cuántos puntos suma esta opción a cada vibe (no necesita sumar a las 4)
export type PuntosPorVibe = Partial<Record<Vibe, number>>

// Todo el estado de la "cita" en un solo lugar
export interface DateData {
    fecha: string
    hora: string
    respuestas: QuizAnswers
}
// El resultado final que se muestra en el resumen
export interface ResultadoFinal {
    vibe: Vibe
    titulo: string
    descripcion: string
    emoji: string
}