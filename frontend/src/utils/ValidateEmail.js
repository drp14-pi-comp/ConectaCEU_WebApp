// Funções para validar email e cpf a partir da ordem do caracteres.
// Evita digitar qualquer coisa no input.
export const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }