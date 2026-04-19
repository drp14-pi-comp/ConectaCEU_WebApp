import { useRef, useState } from 'react'
import { recoverPassword } from '../../services/AuthService'
import { validateEmail } from "../../utils/ValidateEmail"

import "./RecoverPassword.css"


const RecoverPassword = () => {

  const[email, setEmail] = useState("")
  const[status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)


  //função para sumir mensagem de envio/erro
  const showStatus = (msg) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setStatus(msg)

    timerRef.current = setTimeout(() => {
      setStatus("")
    }, 3000) //3 segundos
  }

  // Função para envio do formulário de recuperar senha
  const  handleSubmit = async (e) => {
    e.preventDefault()

    if(loading) return

    setStatus("")

    if (!validateEmail(email)) {
      showStatus("E-mail inválido!")
      return
    }

    try {
      setLoading(true)

      const data = await recoverPassword(email)
      console.log(data)

      showStatus("E-mail enviado com sucesso!")

      // Limpar o campo email
      setEmail("")

    } catch (error) {
      console.error(error)
      showStatus("Erro ao enviar o e-mail.")
    }finally {
      setLoading(false)
    }
  }


  return (
    <div className='container-password'>
      <form onSubmit={handleSubmit} aria-label='Formulário de recuperação de senha'>
        <h1>Esqueceu a senha?</h1>
        
        <div className='content'>
          <p>
            Não se preocupe! Informe o e-mail cadastrado
            na sua conta e enviaremos um link com instruções para redefinir sua senha.
          </p>
        </div>

        <div className='field'>
          <input 
            type="email"
            placeholder='exemplo@gmail.com' 
            id='email' 
            required
            aria-required="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {status &&
          <p 
            aria-live="polite" 
            className={`${ status === "E-mail enviado com sucesso!"? "success" : "error"}`}
          >
            {status}
          </p>
        }

        <div className='link'>
          <a href="/login">Cancelar</a>
        </div>
        
      </form>
    </div>
  )
}

export default RecoverPassword
