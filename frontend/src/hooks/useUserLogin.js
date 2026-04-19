import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../services/AuthService"
import { validateEmail } from "../utils/ValidateEmail"
import { validateCPF } from "../utils/ValidateCPF"


export function useUserLogin (username, password, rememberMe) {

    // "useNavigate" para facilitar a navegação entre as páginas
    const navigate = useNavigate()

    const [credentialError, setCredentialError] = useState("");
    const [loginError, setLoginError] = useState("")
    
    
    // Salva autenticação
    const saveAuth = (data) => {
        if(rememberMe) {
            localStorage.setItem("token", data.token)//Fica salvo mesmo após fechar o navegador
        } else{
            sessionStorage.setItem("token", data.token)//Só dura na sessão (aba aberta)
        }
    }

    // Função para enviar o formulário de login
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        setCredentialError("")
        setLoginError("")

        const isEmail = validateEmail(username)
        const isCPF = validateCPF(username)
        const isValidCredential = isEmail || isCPF

        // Fazendo a validação email/cpf
        if (!isValidCredential) {
            setCredentialError("Por favor, insira um email ou CPF válido");
            return;
        } 

        try {
            const data = await loginUser(username, password)

            // Salvar token dependendo do "lembre de mim"
            saveAuth(data)

            // Redirecionado para home, caso válido.
            navigate("/")

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