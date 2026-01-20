import { Link, useNavigate } from 'react-router-dom'
import './header.estilos.css'
import './ComBusca.estilos.css'
export function Header ({comBusca, aoMudarBusca, aoClicarFiltro, mostrarVoltar}) {
  const navigate = useNavigate()
  return (
    <header className="header">
      {mostrarVoltar && (
        <button className="botao_voltar_header" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    <div className="login_e_nav">
      <div className="logo_header">
        <img className="logo_botequim_na_mao" src={`${import.meta.env.BASE_URL}images/geral/header/logo_botequim_na_mao_1.png`} alt="Logo Botequim na Mão"/>
        
        <div className="logo_texto">
          <h1>Botequim na Mão</h1>
          <p>Drinks disponíveis agora</p>
        </div>
      </div>

      <div className='barra_de_pesquisa'>
        {comBusca && (
          <div className='div_barra_pesquisa_e_filtro'>
            <input 
              type="text" 
              className='input_barra_de_pesquisa' 
              placeholder='Buscar bebida...' 
              onChange={(e) => aoMudarBusca && aoMudarBusca(e.target.value)}
            />
            <button className='button_filtro_header' onClick={aoClicarFiltro}>
              <img src={`${import.meta.env.BASE_URL}images/geral/header/garden_filter-stroke-12.svg`} alt="" />
            </button>
          </div>
        )}
      </div>
      
      <nav className="nav">        
        <ul className="login_area">
          <li>
            <Link to="/login" className="button_login">
              <img src={`${import.meta.env.BASE_URL}images/geral/header/login.svg`} alt="botão_login" style={{ width: '42px' }}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </header>
  )
}