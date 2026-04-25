import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


// regra para rota privada
export default function PrivateRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // se não estiver logado é redirecionado para página de login.
  // location serve para o usuário retornar a página que tentou acessar inicialmente.
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }}/>
  }

  return children
}