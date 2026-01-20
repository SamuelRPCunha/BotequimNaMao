import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/home/index'
import Cardapio from './pages/cardapio/'
import ReactDOM from 'react-dom/client'
import React from 'react'
import Padrao from './pages/'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Padrao />
    </HashRouter>
  </React.StrictMode>
)
