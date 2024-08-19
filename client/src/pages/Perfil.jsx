import { useAuth } from '../context/AuthContext'
import {Link} from 'react-router-dom'

export const Perfil= ()=>{
    
  const { user, }= useAuth()
 
  return(
     <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
         <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
              
              <h1 className='text-2xl font-bold'>Perfil de Usuario</h1>
              
              <p>Nombre de usuario: {user.username}</p>
              <p>Correo: {user.email}</p>
              <p>Fecha de creación: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p>Última actualización: {new Date(user.updatedAt).toLocaleDateString()}</p>

              <Link to={'/profile/update'} className='bg-indigo-500 px-4 py-1 rounded-sm'>Actualizar Perfil</Link>
         </div>
     </div>
  )
}