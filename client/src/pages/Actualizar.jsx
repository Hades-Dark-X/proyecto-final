import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'
import {Link} from 'react-router-dom'

export const Actualizar= ()=>{
    const {user, }= useAuth
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: user });

    const onSubmit= handleSubmit(data => {
      console.log(data)
    })

      return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
           <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                
           
                
                <h1 className='text-2xl font-bold'>Actualizar Información</h1>
                
                <form onSubmit={onSubmit}>

                <input type="email" {...register('email', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa un email' autoFocus />
                {errors.email && (<p className='text-red-500'>El email es requerido</p>)}


                <input type="password" {...register('password', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa una contraseña, minimo 8 caracteres'/>
                {errors.password && (<p className='text-red-500'>La contraseña es requerido</p>)}

                <button type='submit'>Guardar Cambios</button>

                <p className='flex gap-x-2 justify-between '>Actualiza tus datos e inicia sesión<Link to= '/login' className='text-sky-500'>Login</Link></p>

                </form>
           </div>
       </div>
      )
}

