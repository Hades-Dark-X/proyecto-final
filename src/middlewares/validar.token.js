import jwt from 'jsonwebtoken'
import { tokenSecreto } from '../config.js'

export const authRequerida= (req, res, next)=>{
    const {token}= req.cookies

    if(!token)
        return res.status(401).json({message: 'No autorizado, no hay token'})

    jwt.verify(token, tokenSecreto, (error, user)=>{
        if(error) return res.status(403).json({message: 'token invalido'})
        req.user= user
        console.log(user)
        next()
    })
}
    