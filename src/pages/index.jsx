import { Header } from "../components/header";
import {Routes, Route} from 'react-router-dom';
import { Home } from './home/'
import Cardapio from './cardapio/'

export default function Padrao () {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
    </div>
  )
}