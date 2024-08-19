import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react'

export const Login= ()=>{
    
    const {register, handleSubmit, formState: {errors}}= useForm()
    const {inicioSesion, autenticado,  errors: errorInicioSesion}= useAuth()
    const navegacion= useNavigate()
    const onSubmit= handleSubmit(data => {inicioSesion(data)})

    useEffect(()=>{
        if(autenticado) navegacion('/ip')
      }, [autenticado])
    
    return(
       <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
           <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                
                {errorInicioSesion.map((error, i)=>(<div className='bg-red-500 text-white text-center' key={i}>{error}</div>))}
                
                <h1 className='text-2xl font-bold'>Login</h1>
                
                <form onSubmit={onSubmit}>

                <input type="email" {...register('email', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa un email'/>
                {errors.email && (<p className='text-red-500'>El email es requerido</p>)}


                <input type="password" {...register('password', {required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa una contraseña, minimo 8 caracteres'/>
                {errors.password && (<p className='text-red-500'>La contraseña es requerido</p>)}

                <button type='submit'>Inicio de sesión</button>

                <p className='flex gap-x-2 justify-between '>¿Aún no tienes una cuenta?<Link to= '/registro' className='text-sky-500'>Registrate</Link></p>

                </form>
           </div>
       </div>
    )
}