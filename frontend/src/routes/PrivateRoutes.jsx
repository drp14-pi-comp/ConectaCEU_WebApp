import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


// regra para rota privada
export default function PrivateRoute({ children }) {
  const { user } = useAuth()

  // se não estiver logado é redirecionado para página de login.
  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}