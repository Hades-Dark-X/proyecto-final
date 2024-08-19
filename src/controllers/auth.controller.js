import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { accessToken } from "../libs/token.js"
import { tokenSecreto } from '../config.js'


export const registro= async (req, res)=>{
    const {username, email, password}= req.body

   try {
    const usuarioEncontrado= await User.findOne({email})
    if(usuarioEncontrado) return res.status(400).json({message: 'Ese email ya a sido registrado'})

    const passwordHash= await bcrypt.hash(password, 10)
    const nuevoUsuario= new User({
        username,
        email,
        password: passwordHash
    })
    const usuarioGuardado= await nuevoUsuario.save()
    const token= await accessToken({id: usuarioGuardado._id})

    res.cookie('token', token)
        res.json({
            id: usuarioGuardado._id,
            username: usuarioGuardado.username,
            email: usuarioGuardado.email,
            createdAt: usuarioGuardado.createdAt,
            updateAt: usuarioGuardado.updatedAt
        })
   } catch (error) { 
    res.status(500).json({message: error.message})
   }
}

export const login= async (req, res)=>{
    const {email, password}= req.body
    
   try {
    const encontrarUsuario= await User.findOne({email})
    if (!encontrarUsuario) {
        return res.status(400).json({message: 'Cuenta de usuario no encontrada'})
    }
    const coincidir= await bcrypt.compare(password, encontrarUsuario.password)
    if (!coincidir) {
        return res.status(400).json({message: 'Contraseña incorrecta'})
    }
    
    const token= await accessToken({id: encontrarUsuario._id})

    res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: false
    })
        res.json({
            id: encontrarUsuario._id,
            username: encontrarUsuario.username,
            email: encontrarUsuario.email,
            createdAt: encontrarUsuario.createdAt,
            updateAt: encontrarUsuario.updatedAt
        })
   } catch (error) { 
    res.status(500).json({message: error.message})
   }
}

 export const logout= (req, res)=>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
 }

export const profile= async (req, res)=> {
   const usuarioEncontrado= await User.findById(req.user.id)
   if(!usuarioEncontrado) res.status(400).json({message: 'usuario no encontrado'})

    return res.json({
        id: usuarioEncontrado._id,
        username: usuarioEncontrado.username,
        email: usuarioEncontrado.email,
        createdAt: usuarioEncontrado.createdAt,
        updatedAt: usuarioEncontrado.updatedAt
    })
}

export const verificacion= async(req, res)=>{
    const {token}=req.cookies
    if(!token) return res.status(401).json({message: 'No autorizado'})
    
    jwt.verify(token, tokenSecreto, async (error, user)=> {
        if(error) return res.status(401).json({message: 'No autorizado'})
        
        const usuarioEncontrado= await User.findById(user.id)
        if(!usuarioEncontrado) return res.status(401).json({message: 'No autorizado'})
            return res.json({id: usuarioEncontrado._id,
            username: usuarioEncontrado.username,
            email: usuarioEncontrado.email})
    })
}

export const profileActualizar= async(req, res)=>{
    const usuarioActualizado= await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!usuarioActualizado) return res.status(404).json({message: 'Datos de usuario no fueron actualizados'})
    
    res.json(usuarioActualizado)
}

export const profileEliminar = async (req, res) => {
    const usuarioEliminado= await User.findByIdAndDelete(req.params.id)
    if (!usuarioEliminado) return res.status(404).json({message: 'Cuenta no encontrada'})
    res.status(204)
}


/* Registro
1 se guarda el cuerpo de la peticion en un objeto
2  con bcrypt se convierte el password a un hash
3 se crea un objeto que va a guardar los datos del nuevo usuario
4 se solicita el token al fronten por seguridad
5 se envia una respuesta del back-end o el error*/

/* Login 
1 se guarda el cuerpo de la peticion en un objeto email y password
2 se busca el usuario por email para ver si ya existe o esta registrado
3 se compara la contraseña para validar que es la correcta con bcrypt.compare
4 se genera un token del usuario encontrado*/

/* logout
1 responde con una cookie que contieene un token vacio
2 la sesion no expira ya que esta en 0 */

/* Profile
1 usuario encontrado usa el metodo  findById que le pertenece al modelo de User
2 el req que representa la peticio.user._id es el token decodificado de la funcion de autenticación 
3 si no hay una cuenta con ese usuario retorna un error 400 por parte del back-end
4 si encuentra un usuario devuelve: id, username, emai, fecha de creacion y actualización*/