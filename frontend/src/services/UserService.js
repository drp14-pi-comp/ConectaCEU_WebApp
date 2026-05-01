// Serviços para os usuários(Criar, atualizar, excluir e consultar)
// Secretaria, professor e admin

const URL_API = import.meta.env.VITE_API_URL


// Novo usuário (aluno, coordenador, professor, etc)
export const createUser = async (formData) => {
  const response = await fetch(`${URL_API}/create-user`, {
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
  const response = await fetch(`${URL_API}/users/${id}`, {
    method: "PUT",
    body: formData
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar usuário")
  }

  return response.json()
}