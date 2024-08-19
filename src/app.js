import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import ip from './routes/ip.routes.js'


export const app= express()

/* Middlewares */
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))  /* muestra las peticiones http por consola */
app.use(express.json())/* convierte los objetos javascript a objeto json */
app.use(cookieParser()) /* convierte las cookies a un objeto json */

/* Rutas autenticadas */
app.use('/api', authRoutes)
app.use('/api', ip)