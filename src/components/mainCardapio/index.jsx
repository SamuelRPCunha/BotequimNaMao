import { Card } from "./Card";
import './mainCardapio.estilos.css'

export function MainCardapio () {
  return (
    <div className="main">
      <section className="disponibilidade_e_filtros">
        <div className="disponibilidade_texto">
          <h1>Cardápio Disponível</h1>
          <p>dsdsd</p>
        </div>

        <div className="disponibilidade_filtros">
          <button>Todos</button>
          <button>Clássicos</button>
          <button>Tropicais</button>
          <button>Refrescantes</button>
          <button>Fortes</button>
        </div>
      </section>

      <section>
        <Card/>
      </section>
    </div>
  )
}