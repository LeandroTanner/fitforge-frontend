import api from "../api.js"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_PUBLIC_KEY;

// Buscar todos os exercícios
export const getAllExercises = async () => {
  try {
    const response = await api.get("/exercises")
    return {
      success: true,
      data: response.data,
      message: "Exercícios carregados com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar exercícios: ", error)
    throw {
      success: false,
      message: "Erro ao buscar exercícios",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Buscar exercício por ID
export const getExerciseById = async (id) => {
  try {
    const response = await api.get(`/exercises/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Exercício carregado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar exercício: ", error)
    throw {
      success: false,
      message: "Erro ao buscar exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Criar novo exercício
export const createExercise = async (exerciseData) => {
  try {
    const response = await api.post("/exercises", exerciseData)
    return {
      success: true,
      data: response.data,
      message: "Exercício criado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao criar exercício: ", error)
    throw {
      success: false,
      message: "Erro ao criar exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Atualizar exercício
export const updateExercise = async (id, exerciseData) => {
  try {
    const response = await api.put(`/exercises/${id}`, exerciseData)
    return {
      success: true,
      data: response.data,
      message: "Exercício atualizado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao atualizar exercício: ", error)
    throw {
      success: false,
      message: "Erro ao atualizar exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Deletar exercício
export const deleteExercise = async (id) => {
  try {
    const response = await api.delete(`/exercises/delete/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Exercício deletado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao deletar exercício: ", error)
    throw {
      success: false,
      message: "Erro ao deletar exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}


// Upload de imagem
export const uploadExerciseImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/upload/exercise-image`, {
      method: 'POST',
      headers:{
        'x-api-key': API_KEY, // Adiciona a chave da API nos headers da requisição
      },
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        data: `${API_BASE_URL}${data.data.imageUrl}`,
        message: "Imagem enviada com sucesso",
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Erro ao fazer upload da imagem: ", error);
    throw {
      success: false,
      message: "Erro ao fazer upload da imagem",
      error: error.message,
    };
  }
};