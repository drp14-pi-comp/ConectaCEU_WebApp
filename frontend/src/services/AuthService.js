
// Trocar a URL da API e colocar o caminho para cada serviço.
const URL_API = ""


// Validação de login
export const loginUser = async(username, password) => {
    const response = await fetch(`${URL_API}/`, {
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

    const response = await fetch(`${URL_API}/`, {
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