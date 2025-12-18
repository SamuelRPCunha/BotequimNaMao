import { BotaoCardapio } from './BotaoCardapio.jsx'
import './heroMain.estilos.css'

export function HeroMain () {
  return (
    <div className="hero_section">
      <div className="conteudo_hero_section">
        <h1>Cardápio Digital Inteligente</h1>
        <p>
          O cliente fala os ingredientes desejados, e o bar vê apenas os drinks que são 100% possíveis de fazer naquele momento.
        </p>
        <div className='div_hero_main'>
          <button className='button_comecar'>Começar</button>
          <BotaoCardapio/>
        </div>
      </div>
    </div>
  )
}