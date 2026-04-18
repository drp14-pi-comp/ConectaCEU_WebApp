import { useState } from "react"
import { createUser, updateUser } from "../services/userService"

// função responsável por montar o estado inicial
function getInitialFormData(user) {
    return {
        status: user?.status || "",
        tipo_documento: user?.tipo_documento || "",
        num_documento: user?.num_documento || "",
        nome_completo: user?.name_completo || "",
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

export function useUserForm(user) {
    const isEdit = !!user
    const role = user?.tipo_usuario || "aluno"

    const [formData, setFormData] = useState(() => getInitialFormData(user))

    // inputs normais + arquivos
    const handleChange = (e) => {
        const { name, value, type, files } = e.target

        if (type === "file") {
        setFormData(prev => ({
            ...prev,
            documentos: {
            ...prev.documentos,
            [name]: files[0]
            }
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
        novos[index][name] = value

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

        // validações antes de enviar pro backend
        if (formData.senha !== formData.repetir_senha) {
            return alert("Senhas não coincidem")
        }

        try {
        const form = new FormData()

        // dados simples (email, telefone, etc)
        Object.keys(formData).forEach((key) => {
            if (key !== "documentos" && key !== "responsaveis") {
            form.append(key, formData[key])
            }
        })

        // 
        if (role === "admin") {
            form.append("status", "ativo")
        }

        // responsáveis
        form.append("responsaveis", JSON.stringify(formData.responsaveis))

        // documentos principais
        form.append("doc_frente", formData.documentos.doc_frente)
        form.append("doc_verso", formData.documentos.doc_verso)
        form.append("doc_foto", formData.documentos.doc_foto)
        form.append("doc_atestado", formData.documentos.doc_atestado)

        // docs responsáveis
        formData.documentos.responsaveis.forEach((resp, index) => {
            if (resp.doc_responsavel) {
                form.append(`responsavel_${index}_doc`, resp.doc_responsavel)
            }
            if (resp.doc_autorizacao) {
                form.append(`responsavel_${index}_autorizacao`, resp.doc_autorizacao)
            }
        })

        // envio
        if (isEdit) {
            await updateUser(user.id, form)
            alert("Usuário atualizado!")
        } else {
            await createUser(form)
            alert("Usuário criado!")
        }

        } catch (error) {
            console.error(error)
            alert("Erro ao salvar usuário")
        }
    }

    return {
        formData,
        handleChange,
        handleResponsavelChange,
        handleResponsavelFileChange,
        handleSubmit,
        isEdit,
        role
    }
}