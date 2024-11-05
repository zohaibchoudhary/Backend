import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Savatar from './components/Savatar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<Savatar />} />
      </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
