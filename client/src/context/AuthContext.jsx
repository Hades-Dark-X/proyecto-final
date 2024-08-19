import PropTypes from 'prop-types';
import { useState, createContext, useContext, useEffect } from "react"
import Cookie from 'js-cookie'
import { peticionRegistro, peticionLogin, verificacionToken } from '../api/auth'


export const AuthContext = createContext()

export const useAuth= ()=>{
  const context= useContext(AuthContext)
    if (!context) { 
      throw new Error('useAuth debe ser usado con un AuthProvider')
    }
    return context
}

export const AuthProvider= ({children})=>{
  const [user, setUser]= useState(null)
  const [autenticado, setAutenticado]= useState(false)
  const [errors, setErrors]= useState([])
  const [cargando, setCargando]= useState(true)

  const registrandoUsuario= async(user)=>{
    try {
      const res= await peticionRegistro(user)
      console.log(res)
      setAutenticado(true)
      setUser(res.data)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
    }
  }

  const inicioSesion= async(user)=>{
    try {
      const res= await peticionLogin(user)
      console.log(res)
      setAutenticado(true)
      setUser(res.data)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
    }
  }

  /* Logout del usuario */
  const cerrarSesion= ()=>{
    Cookie.remove('token')
    setAutenticado(false)
    setUser(null)
  }

/* Manejo del tiempo en el cartel de error */ 
  useEffect(()=>{
    if(errors.length > 0){
      const tiempo= setTimeout(()=>{
        setErrors([])
      }, 6000)
      return ()=> clearTimeout(tiempo)
    }
  }, [errors])

  /* Manejo de la cookie para validar si el usuario esta autenticado */
  useEffect(()=>{
    const verificarToken= async()=>{
      const leerCookie= Cookie.get()

      if (!leerCookie.token) {
        setAutenticado(false)
        setCargando(false)
        return setUser(null)
      }

      try {
        const res= await verificacionToken(leerCookie.token)
        if (!res.data) {
          setAutenticado(false)
          setCargando(false)
          return
        }

        setUser(res.data)
        setAutenticado(true)
        setCargando(false)
      } catch (error) {
        console.log(error)
        setAutenticado(false)
        setCargando(false)
        setUser(null)
      }
    }
    verificarToken()
  }, [])
  
  
  return(
    <AuthContext.Provider value={{
      registrandoUsuario,
      user,
      autenticado,
      inicioSesion,
      errors,
      cargando,
      cerrarSesion,
      
      }}>

      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};