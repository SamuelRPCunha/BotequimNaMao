import './footer.estilos.css'
import { ItemContato } from "./ItemContato";

export function Footer () {
  return (
    <section className="footer">
      <section className="footer_logo_contato_redes">
        <section className="logo_texto">
          <h1>Botequim na Mão</h1>
          <p>
            Seu cardápio digital inteligente. Veja apenas os drinks que estão disponíveis no momento e escolha seus ingredientes favoritos.
          </p>
        </section>

        <section className="footer_contatos">
          <h2>Contatos</h2>
          
          <ItemContato 
            src="/images/geral/footer/contatos/solar_phone-bold.svg"
            alt="telefone"
            p="(63) 93245-3249"
          />
          
          <ItemContato 
            src="/images/geral/footer/contatos/material-symbols_mail.svg"
            alt="email"
            p="drinks@botequimnamao.com.br"
          />

          <ItemContato
            src="/images/geral/footer/contatos/si_pin-fill.svg"
            alt="endereço"
            p="Rua dos Drinks, 123 - Luzivegas, TO"
          />
        </section>

        <section>
          <h2>Autor:</h2>
          <p>Samuel R. P. Cunha</p>
        </section>
        </section>

        <div className="footer_divisoria"></div>

        <section className="footer_direitos">
          <p>© 2025 Botequim na Mão. Todos os direitos reservados.</p>
      </section>
    </section>
  )
}