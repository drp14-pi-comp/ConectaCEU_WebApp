// Trocar a URL da API e colocar o caminho para cada serviço.
const URL_API = ""


// Novo usuário (aluno, coordenador, professor, etc)
export const createUser = async (formData) => {
  const response = await fetch(`${URL_API}/`, {
    method: "POST",
    body: formData
  })

  if (!response.ok) {
    throw new Error("Erro ao criar usuário")
  }

  return response.json()
}

// Atualiza dados do usuário 
export const updateUser = async (id, formData) => {
  const response = await fetch(`${URL_API}/{path_aqui}/${id}`, {
    method: "PUT",
    body: formData
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar usuário")
  }

  return response.json()
}