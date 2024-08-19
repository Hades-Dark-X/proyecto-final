import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'


export const Registro= ()=>{
    
  const {register, handleSubmit, formState: {errors}}= useForm()
  const { registrandoUsuario, autenticado, errors: errorRegistro}= useAuth()
  const navegacion= useNavigate()

  useEffect(()=>{
    if(autenticado) navegacion('/ip')
  }, [autenticado])

  const onSubmit= handleSubmit(async(values)=>{
    registrandoUsuario(values)
  })
  
  return(
     <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
         <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
              
              {errorRegistro.map((error, i)=>(<div className='bg-red-500 text-white text-center' key={i}>{error}</div>))}
              
              <h1 className='text-2xl font-bold'>Registro</h1>
              
              <form onSubmit={onSubmit}>

              <input type="username" {...register('username', {required: true})} 
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa un nombre de usuario'/>
              {errors.username && (<p className='text-red-500'>El nombre de usuario es requerido</p>)}
              
              
              <input type="email" {...register('email', {required: true})} 
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa un email'/>
              {errors.email && (<p className='text-red-500'>El email es requerido</p>)}


              <input type="password" {...register('password', {required: true})} 
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa una contraseña, minimo 8 caracteres'/>
              {errors.password && (<p className='text-red-500'>La contraseña es requerida</p>)}

              <button type='submit'>Registrar</button>

              <p className='flex gap-x-2 justify-between '>¿Ya tienes una cuenta?<Link to= '/login' className='text-sky-500'>Inicia Sesión</Link></p>

              </form>
         </div>
     </div>
  )
}