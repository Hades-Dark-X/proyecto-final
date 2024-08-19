import {Router} from 'express'
import { authRequerida } from '../middlewares/validar.token.js'

const router= Router()

/* Ruta protegida por la autenticación */
router.get('/ip', authRequerida, (req, res)=> res.status(200))

export default router