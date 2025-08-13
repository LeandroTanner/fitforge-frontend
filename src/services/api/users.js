import api from "../api.js"

// Buscar todos os usuários
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users")
    return {
      data: response.data,
    }
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error)
    throw {
      success: false,
      message: "Erro ao buscar usuários",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Busca todos os nomes e ids dos usuários
export const getAllUsersBasic = async () => {
  try {
    const response = await api.get("/users/name")
    return {
      data: response.data,
    }
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error)
    throw {
      success: false,
      message: "Erro ao buscar usuários",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Buscar usuário por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Usuário carregado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar usuário: ", error)
    throw {
      success: false,
      message: "Erro ao buscar usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

export const getUserNameById = async (id) => {
  try {
    const response = await api.get(`/users/name/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Usuário carregado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar usuário: ", error)
    throw {
      success: false,
      message: "Erro ao buscar usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Criar novo usuário
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData)
    return {
      success: true,
      data: response.data,
      message: "Usuário criado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao criar usuário: ", error)
    throw {
      success: false,
      message: "Erro ao criar usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Atualizar usuário
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData)
    return {
      success: true,
      data: response.data,
      message: "Usuário atualizado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário: ", error)
    throw {
      success: false,
      message: "Erro ao atualizar usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Deletar usuário
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/delete/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Usuário deletado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao deletar usuário: ", error)
    throw {
      success: false,
      message: "Erro ao deletar usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}
