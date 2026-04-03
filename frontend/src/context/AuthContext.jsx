import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // recuperar login ao iniciar
  // depois incluir o token no if e setuser()
  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    const tokenStorage = localStorage.getItem('token')

    if (userStorage) {
      setUser(JSON.parse(userStorage))
    }
  }, [])

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

export const useAuth = () => useContext(AuthContext)