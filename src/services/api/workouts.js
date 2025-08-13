import api from "../api.js"

// Buscar todos os treinos
export const getAllWorkouts = async () => {
  try {
    const response = await api.get("/workouts")
    return {
      data: response.data,
    }
  } catch (error) {
    console.error("Erro ao buscar treinos: ", error)
    throw {
      success: false,
      message: "Erro ao buscar treinos",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Buscar treino por ID
export const getWorkoutById = async (id) => {
  try {
    const response = await api.get(`/workouts/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Treino carregado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar treino: ", error)
    throw {
      success: false,
      message: "Erro ao buscar treino",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Criar novo treino
export const createWorkout = async (workoutData) => {
  try {
    const response = await api.post("/workouts", workoutData)
    return {
      success: true,
      data: response.data,
      message: "Treino criado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao criar treino: ", error)
    throw {
      success: false,
      message: "Erro ao criar treino",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Atualizar treino
export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await api.put(`/workouts/${id}`, workoutData)
    return {
      success: true,
      data: response.data,
      message: "Treino atualizado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao atualizar treino: ", error)
    throw {
      success: false,
      message: "Erro ao atualizar treino",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Deletar treino
export const deleteWorkout = async (id) => {
  try {
    const response = await api.delete(`/workouts/delete/${id}`)
    return {
      success: true,
      data: response.data,
      message: "Treino deletado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao deletar treino: ", error)
    throw {
      success: false,
      message: "Erro ao deletar treino",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Buscar treinos por usuário
export const getWorkoutsByUser = async (userId) => {
  try {
    const response = await api.get(`/workouts/user/${userId}`)
    return {
      success: true,
      data: response.data,
      message: "Treinos do usuário carregados com sucesso",
    }
  } catch (error) {
    console.error("Erro ao buscar treinos do usuário: ", error)
    throw {
      success: false,
      message: "Erro ao buscar treinos do usuário",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}


// Adicionar exercício ao treino
export const addExerciseToWorkout = async (workoutId, exerciseData) => {
  try {
    const response = await api.post(`/workouts/${workoutId}/exercises`, exerciseData)
    return {
      success: true,
      data: response.data,
      message: "Exercício adicionado com sucesso",
    }
  } catch (error) {
    console.error("Erro ao adicionar exercício: ", error)
    throw {
      success: false,
      message: "Erro ao adicionar exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Remover exercício do treino
export const removeExerciseFromWorkout = async (workoutId, exerciseId) => {
  try {
    const response = await api.delete(`/workouts/${workoutId}/exercises/${exerciseId}`)
    return {
      success: true,
      data: response.data,
      message: "Exercício removido com sucesso",
    }
  } catch (error) {
    console.error("Erro ao remover exercício: ", error)
    throw {
      success: false,
      message: "Erro ao remover exercício",
      status: error.response?.status || 500,
      error: error.message,
    }
  }
}

// Atualizar exercício no treino
export const updateExerciseInWorkout = async (workoutId, exerciseId, exerciseData) => {
  try {
    const response = await api.put(`/workouts/${workoutId}/exercises/${exerciseId}`, exerciseData)
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