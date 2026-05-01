
const URL_API = import.meta.env.VITE_API_URL


// Validação de login
export const loginUser = async(username, password) => {
    const response = await fetch(`${URL_API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},

        // Ajustar os nomes dos campos do body no front para bater com os da API
        body: JSON.stringify({ login: username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Erro no login");
    }

    return data;
}
    
// Validação de recuperação de senha
export const recoverPassword = async (email) => {

    const response = await fetch(`${URL_API}/recover-password`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({email}),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao recuperar senha")
    }

    return data
}

// Validação de Trocar senha
export const changePassword = async(token, password) =>{
    const response = await fetch (`${URL_API}/change-password`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({token: token, senha: password}),
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || "Erro ao trocar senha")
    }

    return data
}