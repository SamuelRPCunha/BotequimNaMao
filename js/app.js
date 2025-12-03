// 1. Seleciona o local onde vamos colocar os cards
const drinksList = document.getElementById('conjunto_cards_bebidas');

// 2. Função para carregar os dados
async function loadRecipes() {
    try {
        // Busca o arquivo JSON
        const response = await fetch('../data/recipes.json');
        const recipes = await response.json();

        // Para cada receita, cria um card
        recipes.forEach(recipe => {
            const cardHTML = `
              <div class="cards_bebidas">
                <img src="${recipe.image}" alt="Imagem ilustrativa da bebida">

                <section class="section_card">
                  <h1>${recipe.name}</h1>
                  <p>${recipe.description}</p>

                  <h2>Ingredientes:</h2>
                </section>

                <section class="section_card_ingredientes">
                  <div class="span_ingredientes_card">
                    ${recipe.ingredientsNeeded.map(ing => `<span>${ing}</span>`).join('')}
                  </div>
                </section>
              </div>
            `
            
            // Adiciona o card ao HTML
            drinksList.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Erro ao carregar receitas:", error);
    }
}

// 3. Executa a função quando a página carregar
document.addEventListener('DOMContentLoaded', loadRecipes);