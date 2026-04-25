import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast"

import AppRoute from "./routes/AppRoute.jsx"
import { AuthProvider } from "./context/AuthProvider"

import './index.css'


const toastStyle = {
  fontSize: '18px',
  padding: '16px 20px',
  minWidth: '280px',
  borderRadius: '10px',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster toastOptions={{ style: toastStyle }}/>
      <AppRoute />
    </AuthProvider>  
  </StrictMode>
)
