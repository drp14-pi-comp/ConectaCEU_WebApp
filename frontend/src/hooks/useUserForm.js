import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { getAgeType } from "../utils/TypeAge"
import { validateEmail } from "../utils/ValidateEmail"
import { validateCPF } from "../utils/ValidateCPF"
import { validateRG } from "../utils/ValidateRG"

import { cancelDelete, createUser, deleteUser, updateUser } from "../services/userService"

import { useAuth } from "./useAuth"


// função responsável por montar o estado inicial dos dados
function getInitialFormData(user) {
    return {
        status: user?.status || "",
        tipo_documento: user?.tipo_documento || "",
        num_documento: user?.num_documento || "",
        nome_completo: user?.nome_completo || "",
        email: user?.email || "",
        telefone: user?.telefone || "",
        telefone2: user?.telefone2 || "",
        data_nascimento: user?.data_nascimento || "",
        genero: user?.genero || "",
        sexo: user?.sexo || "",
        escola: user?.escola || "",
        senha: "",
        repetir_senha: "",
        tipo_usuario: user?.tipo_usuario || "",
        cep: user?.cep || "",
        logradouro: user?.logradouro || "",
        num_residencia: user?.num_residencia || "",
        complemento: user?.complemento || "",
        bairro: user?.bairro || "",

        responsaveis: [
            {
                nome_completo_responsavel: user?.responsaveis?.[0]?.nome_completo_responsavel || "",
                grau: user?.responsaveis?.[0]?.grau || "",
                tipo_documento: user?.responsaveis?.[0]?.tipo_documento || "",
                num_documento: user?.responsaveis?.[0]?.num_documento || "",
            },
            {
                nome_completo_responsavel: user?.responsaveis?.[1]?.nome_completo_responsavel || "",
                grau: user?.responsaveis?.[1]?.grau || "",
                tipo_documento: user?.responsaveis?.[1]?.tipo_documento || "",
                num_documento: user?.responsaveis?.[1]?.num_documento || "",
            }
        ],

        documentos: {
            doc_frente: null,
            doc_verso: null,
            doc_foto: null,
            doc_atestado: null,
            responsaveis: [
                { doc_responsavel: null, doc_autorizacao: null },
                { doc_responsavel: null, doc_autorizacao: null }
            ]
        },
    }
}


// Função para validar campos do formulário antes de enviar ao backend
function validateForm(formData, ageType, role, isEdit) {

    const isEmail = validateEmail(formData.email)
    
    if (!isEmail) {
        return "E-mail inválido!"
    }
    if (formData.tipo_documento === "cpf") {
        const isCPF = validateCPF(formData.num_documento)
        
        if(!isCPF){
            return "CPF inválido!"
        }
    }else if(formData.tipo_documento === "rg"){
        const isRG = validateRG(formData.num_documento)
        if(!isRG){
            return "RG inválido!"
        }
    }else{
        return "Tipo de documento inválido!"
    }

    if (
        formData.senha ||
        formData.repetir_senha
    ) {
        if (formData.senha !== formData.repetir_senha) {
            return "Senhas não coincidem!"
        }
    }

    if (ageType === "minor") {

        const responsavel = formData.responsaveis[0]

        if (
            !responsavel.nome_completo_responsavel ||
            !responsavel.num_documento
        ) {
            return "Responsável obrigatório para menores!"
        }
    }

    if (ageType === "elderly" && !formData.documentos.doc_atestado && !isEdit) {
        return "Atestado obrigatório para maiores de 70 anos!"
    }

    if (role !== "admin" && formData.tipo_usuario && formData.tipo_usuario !== "aluno") {
        return "Você não pode definir esse tipo de usuário!"
    }

    return null
}


export function useUserForm(user) {

    const [isEdit, setIsEdit] = useState(false)
    const isView = !!user && !isEdit
    
    const { user: authUser } = useAuth()
    const role = authUser?.tipo_usuario || "aluno"
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState(() => getInitialFormData(user))
    const [error, setError] = useState(null) // mensagem de erro fixa
    const [loading, setLoading] = useState(false)
    const [userDisable, setUserDisable] = useState(
        user ? user.status !== "ativo" : false
    )

    const ageType = getAgeType(formData.data_nascimento)


    // Habilita edição
    const handleEdit = (mode) => (e) => {
        e.preventDefault()

        setIsEdit(mode)
    }

    // inputs normais + arquivos
    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target

        setError(null)

        if (type === "file") {

            setFormData(prev => ({
                ...prev,
                documentos: {
                ...prev.documentos,
                [name]: files[0]
                }
            }))

        } else if(type === "checkbox"){

            setFormData(prev => ({
                ...prev, 
                [name]: checked
            }))

        } else {

            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // responsáveis (dados)
    const handleResponsavelChange = (index, e) => {
        const { name, value } = e.target

        const novos = [...formData.responsaveis]

        novos[index] = {
            ...novos[index],
            [name]: value
        }

        setFormData(prev => ({
            ...prev,
            responsaveis: novos
        }))
    }

    // responsáveis (arquivos)
    const handleResponsavelFileChange = (index, e) => {
        const { name, files } = e.target

        const novosDocs = [...formData.documentos.responsaveis]

        novosDocs[index] = {
            ...novosDocs[index],
            [name]: files[0]
        }

        setFormData(prev => ({
            ...prev,
            documentos: {
                ...prev.documentos,
                responsaveis: novosDocs
            }
        }))
    }

    // submit (criar ou atualizar)
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(null)

        const validationError = validateForm(formData, ageType, role, isEdit)

        if(validationError){
            setError(validationError)
            toast.error(validationError)
            return
        }


        try {
        
            setLoading(true)
            const form = new FormData()


            // dados simples (email, telefone, etc)
            Object.keys(formData).forEach((key) => {

                // ignora campos especiais
                if (
                    key === "documentos" ||
                    key === "responsaveis" ||
                    key === "repetir_senha"
                ) {
                    return
                }

                // evita enviar senha vazia
                if (key === "senha" && !formData.senha) {
                    return
                }

                // admin criando usuário = ativo
                if (key === "status" && role === "admin" && !isEdit) {
                    form.append("status", "ativo")
                    return
                }

                form.append(key, formData[key])
            })

            // responsáveis
            form.append("responsaveis", JSON.stringify(formData.responsaveis))

            // documentos principais
            if(formData.documentos.doc_frente){
                form.append("doc_frente", formData.documentos.doc_frente)
            }
            if(formData.documentos.doc_verso){
                form.append("doc_verso", formData.documentos.doc_verso)
            }
            if(formData.documentos.doc_foto){
                form.append("doc_foto", formData.documentos.doc_foto)
            }
            if(formData.documentos.doc_atestado){
                form.append("doc_atestado", formData.documentos.doc_atestado)
            }

            // docs responsáveis
            formData.documentos.responsaveis.forEach((resp, index) => {
                if (resp.doc_responsavel) {
                    form.append(`responsavel_${index}_doc`, resp.doc_responsavel)
                }
                if (resp.doc_autorizacao) {
                    form.append(`responsavel_${index}_autorizacao`, resp.doc_autorizacao)
                }
            })

            
            if (isEdit) {
                await updateUser(user.id, form)
                setError(null)
                toast.success("Usuário atualizado!")
            } else {
                await createUser(form)
                setError(null)
                toast.success("Usuário criado!")
                
                navigate("/login", {replace: true})
                
            }

        } catch (error) {
            console.error(error)
            setError("Erro ao salvar o usuário!")
            toast.error("Erro ao salvar o usuário!")
        }finally{
            setLoading(false)
        }
    }

    // Desativar conta
    const handleDelete = async (e) => {
        e.preventDefault()

        setError(null)  

        try {
            setLoading(true)
            await deleteUser(user.id)

            setUserDisable(true)
            toast.success("Conta desativada!")

        } catch (error) {
            console.error(error)
            setError("Erro ao desativar a conta")
            toast.error("Erro ao desativar a conta")
        }finally{
            setLoading(false)
        }
    }

    //Reativa usuário
    const handleCancelDelete = async (e) => {
        e.preventDefault()

        setError(null)

        try {
            await cancelDelete(user.id)

            setUserDisable(false)
            toast.success("Usuário reativado!")

        } catch (error) {
            console.error(error)
            setError("Erro ao reativar usuário")
            toast.error("Erro ao reativar usuário")
        }
    }

    return {
        formData,
        handleEdit,
        handleChange,
        handleResponsavelChange,
        handleResponsavelFileChange,
        handleSubmit,
        handleDelete,
        handleCancelDelete,
        isEdit,
        isView,
        role,
        error,
        loading,
        userDisable
    }
}