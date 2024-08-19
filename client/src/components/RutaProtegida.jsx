import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export const RutaProtegida= ()=>{
    
    const {cargando,autenticado}= useAuth()
    console.log(cargando,autenticado)

    if (cargando) {
        return <h1>Cargando...</h1>
    }
    if (!cargando && !autenticado) {
      return <Navigate to= '/login' replace />
    }
    return <Outlet/>
}