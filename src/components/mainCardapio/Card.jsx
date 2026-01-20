import { useState, useEffect } from 'react';

export function Card({ receitas }) {
  const [listaReceitas, setListaReceitas] = useState([]);

  useEffect(() => {
    if (receitas) {
      setListaReceitas(receitas);
    } else {
      fetch('/data/recipes.json')
        .then(res => res.json())
        .then(data => setListaReceitas(data));
    }
  }, [receitas]);

  return (
    <div className="conjunto_cards_bebidas">
      {}
      {listaReceitas.map((receita) => (
        
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
            {receita.ingredientsNeeded.map((ingrediente, index) => (
            <span key={index} className="tag-ingrediente">
              {ingrediente}
            </span>
            ))}
          </div>
        </div>

      ))}
    </div>
  );
}

export default Card;