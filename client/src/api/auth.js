import axios from "./axios.config"

export const peticionRegistro= user=> axios.post(`/registro`, user)

export const peticionLogin= user=> axios.post(`/login`, user)

export const peticionActualizar= (user)=> axios.put(`/profile/${user._id}`, user)

export const peticionEliminar= (id)=> axios.delete(`/profile/${id}`)

export const verificacionToken= ()=> axios.get(`/verificacion`)