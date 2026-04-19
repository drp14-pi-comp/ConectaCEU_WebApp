// Função para validar formato do cpf
export const validateCPF = (cpf) => {
        if(cpf.length !== 11) return false
        const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
        return regex.test(cpf)
    }