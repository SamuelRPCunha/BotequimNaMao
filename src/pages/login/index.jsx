import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

export function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="container-login">
      <div className="box-login">
        <div className="header-login">
          <button className="btn-voltar" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </button>
          <img src={`${import.meta.env.BASE_URL}images/geral/header/logo_botequim_na_mao_1.png`} alt="Logo" className="logo-login" />
        </div>

        <h2>{isLogin ? 'Acesse sua conta' : 'Crie sua conta'}</h2>
        <p className="subtitulo">{isLogin ? 'Bem-vindo de volta! Por favor, insira seus dados.' : 'Preencha os dados abaixo para começar.'}</p>

        <form className="form-login" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="input-group">
              <label>Nome completo</label>
              <input type="text" placeholder="Ex: Samuel Cunha" />
            </div>
          )}
          
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" placeholder="exemplo@email.com" />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="********" />
          </div>

          <button type="submit" className="btn-entrar">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="footer-login">
          <p>
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button className="btn-toggle" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
