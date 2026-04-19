// Função para validar formato do cpf
export const validateRG = (rg) => {
    const regex = /^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]$/
    return regex.test(rg)
}