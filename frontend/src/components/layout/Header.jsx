import Logo from "../../assets/images/connectCEU-logo.jpeg"
import Logout from "../../assets/icons/user-logout.svg?react"

import { Link } from "react-router-dom"
import { useContext, useState } from "react"

import { AuthContext } from "../../context/AuthContext"
import { useAuth } from "../../hooks/useAuth"

import "./Header.css"


const Navbar = () => {
  
  const { user } = useAuth()
  const [modalLogout, setModalLogout] = useState(false)
  const { logout } = useContext(AuthContext)
  

  return (
    <header className="header">
      <Link to="/" aria-label="Voltar para página inicial">
          <img src={Logo} alt="CEU São Rafael" className="logo-ceu" />
      </Link>

      {user && (
        <>
          <button onClick={() => setModalLogout(true)} aria-label="Sair da conta">
            <Logout className="icon-logout"/>
          </button>

          {modalLogout && (
            <div className="modal-logout">
              <button type="logout" onClick={logout}>Sair</button>
              <button type="cancel" onClick={() => setModalLogout(false)}>Cancelar</button>
            </div>
          )}
        </>
      )}

    </header>
  )
}

export default Navbar
