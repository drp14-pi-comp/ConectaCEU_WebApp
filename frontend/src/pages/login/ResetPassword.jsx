import { useState } from 'react'

import Eye from "../../assets/icons/eye.svg?react"
import EyeClosed from "../../assets/icons/eye-crossed.svg?react"

import { useResetPassword } from '../../hooks/useResetPassword'

import './ResetPassword.css'


const ResetPassword = () => {

    const [password, setPassword]=useState()
    const [passwordRepeat, setPasswordRepeat]=useState()
    const [showPassword, setShowPassword]=useState(false)
    const [showPasswordRepeat, setShowPasswordRepeat]=useState(false)
    const {
        error,
        handleSubmit
    } = useResetPassword(password, passwordRepeat)


    return (
        <div className='container-resetpassword'>
            <form 
                onSubmit={handleSubmit} 
                className='box-form' 
                aria-label='Formulário de redefinir senha'
            >
                <h1>Trocar senha</h1>

                <div className='input-field'>
                    <label>Nova senha:</label>
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="senha"
                        id='senha'
                        placeholder='********'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className="btn-showpassword" 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Eye className="icon-password"/> 
                            : <EyeClosed className="icon-password"/>
                        }
                    </button>
                </div>
                
                <div className='input-field'>
                    <p>Deve conter: </p>
                    <ul>
                        <li>Entre 8 a 128 caracteres;</li>
                        <li>Pelo menos uma letra maiúscula e uma minúscula;</li>
                        <li>Pelo menos um número (0,1,2,3);</li>
                        <li>Pelo menos um caractere especial (!, @, $, &, %).</li>
                    </ul>
                </div>
                    
                <div className='input-field'>
                    <label>Repetir senha:</label>
                    <input 
                        type={showPasswordRepeat ? "text" : "password"}
                        name="repetir_senha"
                        id='repetir_senha'
                        placeholder='********'
                        required
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                    <button 
                        className="btn-showpassword" 
                        type="button" 
                        onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                    >
                        {showPasswordRepeat ? <Eye className="icon-password"/> 
                            : <EyeClosed className="icon-password"/>
                        }
                    </button>
                </div>

                {error && (
                    <>
                        <p aria-live='polite' className='error-msg'>{error}</p>
                    </>
                )}
                        
                <button type='submit' className='btn-send'>Enviar</button>

            </form>
        </div>
    )
}

export default ResetPassword
