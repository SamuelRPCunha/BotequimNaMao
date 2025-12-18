import {useNavigate} from 'react-router-dom';
import './botaoCardapio.estilos.css'

export function BotaoCardapio () {
  const navigate = useNavigate()

  function irParaCardapio () {
    console.log("Indo")

    navigate('/cardapio')
  }

  return (
    <button className='button_cardapio' onClick={irParaCardapio}>
      Cardápio (DEMO)
    </button>
  )

}