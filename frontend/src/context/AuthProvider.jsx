import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'

export function AuthProvider({ children }) {

  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    try {
      const userStorage = localStorage.getItem('user')
      return userStorage ? JSON.parse(userStorage) : null
    } catch {
      return null
    }

  })

  
  const login = (data, rememberMe) => {
    setUser(data.user)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Salvar token dependendo do "lembre de mim"
    if(rememberMe) {
      localStorage.setItem("token", data.token)//Fica salvo mesmo após fechar o navegador
    }else{
      sessionStorage.setItem("token", data.token)//Só dura na sessão (aba aberta)
    }
  }

  // deslogar, apaga o localstorage/sessionstorage e redireciona para login
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    navigate("/login")
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}