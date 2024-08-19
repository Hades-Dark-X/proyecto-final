import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

export const Navbar= ()=>{
    
    const {user, autenticado, cerrarSesion}= useAuth()
    
    const botonLogout = () => {
        cerrarSesion()
      }

    return(
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-5 rounded-lg">
            <Link to={'/'}>
                <h1 className='text-2xl font-bold'>Buscador IP</h1>
            </Link>
            <ul className="flex gap-x-2">
                {autenticado ? (
                    <>
                        <li>
                            <h1>Bienvenido: {user.username}</h1>
                        </li>

                        <li>
                            <Link to={'/ip'}>IP</Link>
                        </li>

                        <li>
                            <Link to={'/profile'}>Perfil</Link>
                        </li>

                        <li>
                            <button className='bg-indigo-500 px-4 py-1 rounded-sm' onClick={botonLogout}>Logout</button>
                        </li>
                    </>
                    ): (
                    <>
                        <li>
                            <Link to={'/login'} className='bg-indigo-500 px-4 py-1 rounded-sm'>Login</Link>
                        </li>

                        <li>
                            <Link to={'/registro'} className='bg-indigo-500 px-4 py-1 rounded-sm'   >Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}