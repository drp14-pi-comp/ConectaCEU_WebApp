import { Link } from "react-router-dom"

import Logo from "../../assets/images/logo-ceusaorafael.png"
import Facebook from "../../assets/icons/facebook.svg?react"
import Instagram from "../../assets/icons/instagram.svg?react"

import "./Footer.css"


const Footer = () => {

  return (
    <footer className='container-footer'>
      <address>
        <div className="content-footer">

          <div className="info-ceu">
            <Link to="/" aria-label="Voltar para página inicial">
              <img
                src={Logo}
                alt="CEU São Rafael"
                className="logo-ceu"
              />
            </Link>

            <section aria-label="Informações de contato do CEU São Rafael">
              <ul className="contact-ceu" >
                <li><span>Telefone:</span>{" "} (11) 2752-1000</li>
                <li><span>Endereço:</span>{" "}
                  <a href="https://maps.app.goo.gl/nirbrcWF4UWX51MP6" target="_blank" rel="noreferrer">
                    R. Cinira Polônio, 100 - Conj. Promorar Rio Claro, São Paulo - SP, 08395-320
                  </a>
                </li>
              </ul>
            </section>
          </div>
          
          <section className="social-ceu" aria-label="Redes socias do CEU São Rafael">
            <p>Siga-nos:</p>
            <div className="icons-group">
              <a href="https://www.facebook.com/ceusaorafael/" target="_blank" rel="noreferrer">
                <Facebook className="icon-facebook"/>
              </a>
              <a href="https://www.instagram.com/ceu.saorafael/" target="_blank" rel="noreferrer">
                <Instagram className="icon-instagram"/>
              </a>
            </div>
          </section>

        </div>
      </address>
      <div className="copyright">
        <p>
          &copy; 2026 Todos os direitos reservados Projeto Integrador 1
        </p>
      </div>
      <div className="terms-privacy">
        <Link to="/termos-de-uso" className="link" target="_blank">Termos de Uso</Link>
        <p>|</p>
        <Link to="/politica-de-privacidade" className="link" target="_blank">Política de Privacidade</Link>
      </div>
      
    </footer>
  )
}

export default Footer
