import axios from "axios"

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: api_base_url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`)
    return config
  },
  (error) => {
    console.error("Request Error: ", error)
    return Promise.reject(error)
  },
)

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.data)
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

export default api
