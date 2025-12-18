import { useState } from 'react'
import './style.css'
import { Header } from '../../components/header'
import { HeroMain } from '../../components/heroMain'
import {BoxComoFunciona } from '../../components/boxComoFunciona'
import { Footer } from '../../components/footer'



export function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header className='header'>
        <Header/>
      </header>
      
      <main>
        <section>
          <HeroMain/>
        </section>

        <section className='sect_como_funciona'>
          <BoxComoFunciona
            h1='1' 
            h2='Marque os Ingredientes'
            p='O bar marca os ingredientes em estoque, e o cliente vê apenas os drinks que são 100% possíveis de fazer naquele momento.'
          />

          <BoxComoFunciona
            h1='2'
            h2='Filtragem Automática'
            p='O sistema filtra os drinks disponíveis em tempo real.'
          />

          <BoxComoFunciona
            h1='3'
            h2='Cliente Feliz'
            p='Clientes veem apenas drinks que podem ser preparados'
          />
        </section>
      </main>
      
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Home