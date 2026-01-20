import { useState, useEffect } from 'react'
import { Header } from '../../components/header'
import { Card } from '../../components/mainCardapio/Card'
import { Footer } from '../../components/footer'
import './style.css'

export function Cardapio() {
  const [receitas, setReceitas] = useState([])
  const [busca, setBusca] = useState('')
  const [filtroAberto, setFiltroAberto] = useState(false)
  const [estoque, setEstoque] = useState([])
  const [todosIngredientes, setTodosIngredientes] = useState([])

  useEffect(() => {
    // Carrega receitas e extrai lista única de ingredientes
    fetch(`${import.meta.env.BASE_URL}data/recipes.json`)
      .then(res => res.json())
      .then(data => {
        setReceitas(data)
        const ingredientes = Array.from(new Set(data.flatMap(r => r.ingredientsNeeded))).sort()
        setTodosIngredientes(ingredientes)
      })
      
    // Carrega estoque salvo
    const estoqueSalvo = JSON.parse(localStorage.getItem('botequim_estoque')) || []
    setEstoque(estoqueSalvo)
  }, [])

  const toggleIngrediente = (ing) => {
    const novoEstoque = estoque.includes(ing) 
      ? estoque.filter(i => i !== ing)
      : [...estoque, ing]
    setEstoque(novoEstoque)
    localStorage.setItem('botequim_estoque', JSON.stringify(novoEstoque))
  }

  // Lógica de Filtragem: Busca + Estoque
  const receitasFiltradas = receitas.filter(receita => {
    const matchBusca = receita.name.toLowerCase().includes(busca.toLowerCase()) || 
                       receita.ingredientsNeeded.some(i => i.toLowerCase().includes(busca.toLowerCase()))
    
    // Se o estoque estiver vazio, mostra tudo. Se tiver itens, a receita deve conter TODOS os ingredientes selecionados.
    const matchEstoque = estoque.length === 0 || estoque.every(ing => receita.ingredientsNeeded.includes(ing))
    
    return matchBusca && matchEstoque
  })

  return (
    <div className="page-cardapio">
      <Header 
        comBusca={true} 
        aoMudarBusca={setBusca} 
        aoClicarFiltro={() => setFiltroAberto(!filtroAberto)} 
        mostrarVoltar={true}
      />
      
      {filtroAberto && (
        <section className="area-filtro">
          <div className="filtro-container">
            <h3>Filtrar por Ingredientes</h3>
            <p>Selecione os ingredientes para encontrar drinks que os contenham:</p>
            <div className="lista-ingredientes">
              {todosIngredientes.map(ing => (
                <button 
                  key={ing} 
                  className={`btn-ingrediente ${estoque.includes(ing) ? 'ativo' : ''}`}
                  onClick={() => toggleIngrediente(ing)}
                >
                  {ing}
                </button>
              ))}
            </div>
            {estoque.length > 0 && (
              <button className="btn-limpar" onClick={() => {setEstoque([]); localStorage.setItem('botequim_estoque', JSON.stringify([]))}}>Limpar Filtros</button>
            )}
          </div>
        </section>
      )}

      <main className="main-cardapio">
        <Card receitas={receitasFiltradas} />
      </main>
      
      <Footer />
    </div>
  )
}

export default Cardapio