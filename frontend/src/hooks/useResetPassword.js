import { changePassword } from '../services/AuthService'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

export function useResetPassword(password, passwordRepeat){

    const[error, setError]=useState("")
    const timerRef = useRef(null)
    const navigate = useNavigate()

    // Pega o token da URL
    const token = new URLSearchParams(window.location.search).get("token")

    const handleSubmit = async(e) => {
        e.preventDefault()

        setError("")

        if (password !== passwordRepeat){
            setError("As senhas não coincidem!")
            
            timerRef.current = setTimeout(() => {
                setError("")
            }, 4000) //3 segundos

            return
        }

        if(!token){
            toast.error("Link invalido")
            return
        }


        try {
            await changePassword(token, password)

            toast.success("Senha trocada com sucesso!")

            navigate("/login")

        } catch (error) {
            toast.error("Não foi possivel trocar a senha!")
            console.log(error)
        }
    }
    

    return{
        error,
        handleSubmit
    }
}