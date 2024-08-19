import token from "jsonwebtoken"
import { tokenSecreto } from "../config.js"

export function accessToken(payload){
    return new Promise((resolve, reject) => {
        token.sign(
            payload,
            tokenSecreto,
            {
                expiresIn: "1h",
            },
            (error, token)=>{
                if(error) reject(error)
                resolve(token)
            }
        )
    })
}