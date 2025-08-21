import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_PUBLIC_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Adiciona a chave da API nos headers das requisições
    config.headers['x-api-key'] = API_KEY;
    return config;
  },
  (error) => {
    console.error("Request Error: ", error)
    return Promise.reject(error)
  },
)

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("API Error: ", error.response?.data || error.message)

    // Tratamento de erros específicos
    if (error.response?.status === 404) {
      console.error("Recurso não encontrado")
    } else if (error.response?.status === 500) {
      console.error("Erro interno do servidor")
    } else if (error.code === "ECONNABORTED") {
      console.error("Timeout da requisição")
    }

    return Promise.reject(error)
  },
)

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
};

export default api
