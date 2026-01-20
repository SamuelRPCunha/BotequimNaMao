import { Routes, Route } from 'react-router-dom';
import { Home } from './home/index.jsx'
import { Cardapio } from './cardapio/index.jsx'
import Login from './login/index.jsx'
import '../global.css'

export default function Padrao() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}