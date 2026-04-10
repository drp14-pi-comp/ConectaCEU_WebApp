import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userStorage = localStorage.getItem('user')
    //const tokenStorage = localStorage.getItem('token')
    return userStorage ? JSON.parse(userStorage): null
  })

  
  // fazer o login e salvar no localstorage
  // depois incuir o token nos metodos login e logout
  const login = (dadosUsuario) => {
    setUser(dadosUsuario)
    localStorage.setItem('user', JSON.stringify(dadosUsuario))
  }


  // deslogar e apaga o localstorage
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}