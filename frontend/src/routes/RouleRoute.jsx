import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


// regras para o acesso da homepage
export default function RoleRoute({ children, roles }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!roles.includes(user.tipo)) {
    return <Navigate to="/home" />
  }

  return children
}