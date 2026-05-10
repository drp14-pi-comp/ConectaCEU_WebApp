// Serviços para os usuários(Criar, atualizar, excluir e consultar)

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
  const token = localStorage.getItem("token")

  const response = await fetch(`${URL_API}/users/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar usuário")
  }

  return response.json()
}

// Desativa usuário
export const deleteUser = async (id) => {
  const deleteDate = new Date()
  deleteDate.setDate(deleteDate.getDate() + 2)

  const token = localStorage.getItem("token")

  const response = await fetch(`${URL_API}/users/${id}/schedule-delete`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify ({
      pending_delete: true,
      delete_at: deleteDate
    })
    
  })

  if(!response.ok){
    throw new Error("Erro ao desativar usuário")
  }

  return response.json()
}

// Reativa usuário
export const cancelDelete = async (id) => {
  const token = localStorage.getItem("token")

  const response = await fetch(`${URL_API}/users/${id}/cancel-delete`, {
    method:"PUT", 
    headers: { Authorization: `Bearer ${token}` }
  })

  if(!response.ok){
    throw new Error("Erro ao ativar o usuário")
  }

  return response.json()

}