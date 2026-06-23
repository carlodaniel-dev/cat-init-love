/**
 *  Ayuda a manejar el estado de la app, 
 *  marcando como error por manejo de datos o errores ortograficos.
*/

// Las "pantallas" posibles de la app, en orden
export type Step = 'intro' | 'datetime' | 'quiz' | 'summary' | 'confirmation'

// Las respuestas del quiz (lo que la persona va eligiendo)
export interface QuizAnswers {
    pelicula: string
    plan: string
    comida: string
    despues: string
}

// Todo el estado de la "cita" en un solo lugar
export interface DateData {
    fecha: string
    hora: string
    respuestas: QuizAnswers
}