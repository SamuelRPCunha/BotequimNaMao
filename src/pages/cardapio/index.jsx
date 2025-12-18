import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { MainCardapio } from "../../components/mainCardapio";

export default function Cardapio () {
  return (
    <div>
      <header className="header">
        <Header comBusca={true}/>
      </header>
      
      <main>
        <section>
          <MainCardapio/>
        </section>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
    
  )
}