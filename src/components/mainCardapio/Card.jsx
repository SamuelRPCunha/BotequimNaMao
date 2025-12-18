import { useState, useEffect } from 'react';
import './card.estilos.css'

export function Card() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    fetch('/data/recipes.json')
      .then(res => res.json())
      .then(data => setReceitas(data));
  }, []);

  return (
    <div className="conjunto_cards_bebidas">
      {}
      {receitas.map((receita) => (
        
        // Aqui é o "Card" escrito direto em JSX
        <div key={receita.id} className="cards_bebidas">
          <div className="card_imagem">
            <img src={receita.image} alt={receita.name} />
          </div>
          <div className="section_card">
            <h2>{receita.name}</h2>
            <p>{receita.description}</p>

            <h2>Ingredientes:</h2>
          </div>

          <div className='section_card_ingredientes'>
            <div className='span_ingredientes_card'>
              {receita.ingredientsNeeded.map((ingrediente, index) => (
              <span key={index} className="tag-ingrediente">
                {ingrediente}
              </span>
              ))}
            </div>
            
          </div>
        </div>

      ))}
    </div>
  );
}

export default Card;