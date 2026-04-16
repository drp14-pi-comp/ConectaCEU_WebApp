// Página de login. Sera a primeira página ao acessar o site.

import Profile from "../../assets/icons/user.svg?react"
import Eye from "../../assets/icons/eye.svg?react"
import EyeClosed from "../../assets/icons/eye-crossed.svg?react"

import { loginUser } from "../../services/AuthService"

import "./UserLogin.css"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


function UserLogin () {

    // "useNavigate" para facilitar a navegação entre as páginas
    const navigate = useNavigate()

    // Estado que controla se a senha será exibida ou ocultada no input.
    const [showPassword, setShowPassword] = useState(false)

    // Estados para armazenar as entradas do usuário
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    // Estado para os erros de login
    const [credentialError, setCredentialError] = useState("");
    const [loginError, setLoginError] = useState("")

    const [rememberMe, setRememberme] = useState(false)


    // Funções para validar email e cpf a partir da ordem do caracteres.
    // Evita digitar qualquer coisa no input.
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    const validateCPF = (cpf) => {
        const cleancpf = cpf.replace(/\D/g, "")
        return cleancpf.length === 11
    }
    
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
        e.preventDefault()// Impede que a página seja recarregada
        
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


    return(
        <div className="container-login">
            <form onSubmit={handleSubmit} aria-label="Formulário de login">
                <h1>Acessar Conta</h1>

                <div className="input-field">
                    <Profile className="icon"/>
                    <input 
                        type="text" 
                        placeholder="CPF ou E-mail" 
                        name="text"
                        id="text"
                        autoComplete="username"
                        required 
                        aria-required="true"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        aria-invalid={credentialError ? "true" : "false"}
                        aria-describedby={credentialError ? "emailError" : undefined}
                    />
                    {credentialError && (
                        <p className="error-message" id="emailError" aria-live="assertive">
                            {credentialError}
                        </p>
                    )}
                </div>

                <div className="input-field">
                    <button className="button-showpassword" type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye className="icon"/> : <EyeClosed className="icon"/>}
                    </button>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        aria-required="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>

                <div className="recall-forget">
                    <label>
                        <input 
                            className="checkbox-remember"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberme(e.target.checked)}
                        />
                        Lembre de mim
                    </label>
                    <Link to="/recuperar-senha">Esqueceu a senha?</Link>
                </div>
                
                    <button className="button-entry" type="submit">Entrar</button>

                    {loginError && (
                        <p className="error-message" aria-live="polite">
                            {loginError}
                        </p>
                    )}

                <div className="signup-link">
                    <p>
                        Não tem uma conta? <a href="/criar-conta">Criar conta</a>
                    </p>
                </div>

            </form>
        </div>
    
    )
}

export default UserLogin