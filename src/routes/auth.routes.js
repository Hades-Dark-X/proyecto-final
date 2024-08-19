import {Router} from 'express'
import { profile, registro, login, logout, verificacion, profileActualizar, profileEliminar} from '../controllers/auth.controller.js'
import { authRequerida } from '../middlewares/validar.token.js'
import { validarSchema } from '../middlewares/validar.usuarios.js'
import { registroSchema, loginSchema } from '../schemas/auth.schema.js'


const router= Router()

router.get('/verificacion', verificacion)
router.post('/registro', validarSchema(registroSchema), registro)
router.post('/login', validarSchema(loginSchema), login)
router.post('/logout', logout)

/* Ruta protegida por la autenticación */
router.get('/profile', authRequerida, profile)
router.get('/profile/update', authRequerida, (req, res)=> res.status(200))
router.put('/profile/update/:id', authRequerida, profileActualizar)
router.delete('/profile/:id', authRequerida, profileEliminar)

export default router