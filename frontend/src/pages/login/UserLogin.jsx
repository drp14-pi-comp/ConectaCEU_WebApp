import Profile from "../../assets/icons/user.svg?react"
import Eye from "../../assets/icons/eye.svg?react"
import EyeClosed from "../../assets/icons/eye-crossed.svg?react"

import { useUserLogin } from "../../hooks/useUserLogin"

import { Link } from "react-router-dom"
import { useState } from "react"

import "./UserLogin.css"


function UserLogin () {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberme] = useState(false)

    const {
        handleSubmit,
        credentialError,
        loginError
    } = useUserLogin (username, password, rememberMe)


    return(
        <div className="container-login">
            <form onSubmit={handleSubmit} aria-label="Formulário de login">
                <h1>Acessar Conta</h1>

                <div className="input-field">
                    <Profile className="icon-profile"/>
                    <input 
                        type="text" 
                        placeholder="CPF ou E-mail" 
                        name="username"
                        id="username"
                        autoComplete="username"
                        required 
                        aria-required="true"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-invalid={credentialError ? "true" : "false"}
                        aria-describedby={credentialError ? "emailError" : undefined}
                    />
                    {credentialError && (  
                        <p 
                            className="error-message" 
                            id="emailError" 
                            aria-live="assertive"
                        >
                            {credentialError}
                        </p>
                    )}
                </div>

                <div className="input-field">
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
                    <button 
                        className="button-showpassword" 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Eye className="icon-password"/> 
                            : <EyeClosed className="icon-password"/>
                        }
                    </button>
                    
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
                
                    <button className="button-entry" type="submit">
                        Entrar
                    </button>

                    {loginError && (
                        <p className="error-message" aria-live="polite">
                            {loginError}
                        </p>
                    )}

                <div className="signup-link">
                    <p>
                        Não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
                    </p>
                </div>

            </form>
        </div>
    
    )
}

export default UserLogin