import Logo from "../../assets/images/connectCEU-logo.jpeg"
import Logout from "../../assets/icons/user-logout.svg?react"

import { NavLink } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../../context/AuthContext"
// import { useAuth } from "../../hooks/useAuth"

import "./Header.css"


const Navbar = () => {
  
  // const { user } = useAuth()
  const user = true
  const { logout } = useContext(AuthContext)

  return (
    <header className="header">
      <NavLink to="/" aria-label="Voltar para página inicial">
          <img src={Logo} alt="CEU São Rafael" className="logo-ceu" />
      </NavLink>

      {user && (
        <>
          <NavLink to="/login" aria-label="Voltar para página de login">
            <button onClick={logout} aria-label="Sair da conta">
              <Logout className="icon-logout"/>
            </button>
          </NavLink>
        </>
      )}

    </header>
  )
}

export default Navbar
