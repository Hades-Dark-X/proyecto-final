import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import {Registro} from './pages/Registro'
import {Login} from './pages/Login'
import { IpLookup } from './pages/Ip'
import {Inicio} from './pages/Inicio'
import {Perfil} from './pages/Perfil'
import {Actualizar} from './pages/Actualizar'
import { RutaProtegida } from './components/RutaProtegida'
import { Navbar } from './components/Navbar'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className='container mx-auto px-10'>
        <Navbar/>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/registro' element={<Registro/>} />
        <Route path='Login' element={<Login/>} />

        <Route element={<RutaProtegida/>}>
          <Route path='/ip' element={<IpLookup/>}/>
          <Route path='/profile' element={<Perfil/>}/>
          <Route path='/profile/update' element={<Actualizar/>}/>
        </Route>
      </Routes>
        </main>
    </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App