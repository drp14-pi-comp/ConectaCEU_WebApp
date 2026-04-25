import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { loginUser } from "../services/AuthService"
import { validateEmail } from "../utils/ValidateEmail"
import { validateCPF } from "../utils/ValidateCPF"
import { AuthContext } from "../context/AuthContext"


export function useUserLogin (username, password, rememberMe) {

    // "useNavigate" para facilitar a navegação entre as páginas
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/"

    const [credentialError, setCredentialError] = useState("");
    const [loginError, setLoginError] = useState("")
    const { login } = useContext(AuthContext)
    

    // Função para enviar o formulário de login
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        setCredentialError("")
        setLoginError("")

        const isEmail = validateEmail(username)
        const isCPF = validateCPF(username)
        const isValidCredential = isEmail || isCPF

        // valida senha vazia
        if (!password) {
            setLoginError("Senha obrigatória")
            return
        }

        // Valida email/cpf.
        if (!isValidCredential) {
            setCredentialError("Por favor, insira um email ou CPF válido");
            return;
        } 

        try {
            // Dados enviados para API.
            const data = await loginUser(username, password)

            // Salva usuário no contexto.
            login(data, rememberMe)

            // Redirecionado para home.
            navigate(from)

        } catch (error) {
            setLoginError("Email/CPF ou senha inválidos")
            console.log(error)
        }
    }

    return{
        handleSubmit,
        credentialError,
        loginError
    }
}