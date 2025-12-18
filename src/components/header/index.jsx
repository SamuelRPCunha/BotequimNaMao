import './header.estilos.css'
import './ComBusca.estilos.css'
export function Header ({comBusca}) {
  return (
    <div className="login_e_nav">
      <div className="logo_header">
        <img className="logo_botequim_na_mao" src="/images/geral/header/logo_botequim_na_mao_1.png" alt="Logo Botequim na Mão"/>
        
        <div className="logo_texto">
          <h1>Botequim na Mão</h1>
          <p>Drinks disponíveis agora</p>
        </div>
      </div>

      <div className='barra_de_pesquisa'>
        {comBusca && (
          <div className='div_barra_pesquisa_e_filtro'>
            <input type="text" className='input_barra_de_pesquisa' placeholder='Buscar bebida...' />
            <button className='button_filtro_header'>
              <img src="/public/images/geral/header/garden_filter-stroke-12.svg" alt="" />
            </button>
          </div>
        )}
      </div>
      
      <nav className="nav">        
        <ul className="login_area">
          <li>
            <form action="">
              <button className="button_login"><img src="/images/geral/header/login.svg" alt="botão_login"/></button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  )
}