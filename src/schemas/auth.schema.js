import { z } from "zod";

export const registroSchema= z.object({
    username: z.string({
        required_error: 'Nombre de usuario es requerido'
    }),

    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El email es invalido'
    }),

    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8, {
        message: 'La contraseña debe ser de al menos 8 caracteres'
    })
})

export const loginSchema= z.object({
    email: z.string({
        message: 'El email es requerido'
    }).email({
        message: 'El email es incorrecto'
    }),

    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8, {
        message: 'La contrase debe ser de al menos 8 caracteres'
    })
})