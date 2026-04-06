import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import AppRoute from "./routes/AppRoute.jsx"
import { AuthProvider } from "./context/AuthContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>  
  </StrictMode>
)
