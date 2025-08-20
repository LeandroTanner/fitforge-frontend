// Validadores de texto
export const validateText = {
  required: (value, fieldName = "Campo") => {
    if (!value || value.trim() === "") {
      return `${fieldName} é obrigatório`
    }
    return null
  },

  minLength: (value, min, fieldName = "Campo") => {
    if (value && value.length < min) {
      return `${fieldName} deve ter pelo menos ${min} caracteres`
    }
    return null
  },

  maxLength: (value, max, fieldName = "Campo") => {
    if (value && value.length > max) {
      return `${fieldName} deve ter no máximo ${max} caracteres`
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return "Email inválido"
    }
    return null
  },

  noSpecialChars: (value, fieldName = "Campo") => {
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/
    if (value && specialCharsRegex.test(value)) {
      return `${fieldName} não pode conter caracteres especiais`
    }
    return null
  },
}

// Validadores de números
export const validateNumber = {
  required: (value, fieldName = "Campo") => {
    if (value === null || value === undefined || value === "") {
      return `${fieldName} é obrigatório`
    }
    return null
  },

  isNumber: (value, fieldName = "Campo") => {
    if (value !== null && value !== undefined && value !== "" && isNaN(Number(value))) {
      return `${fieldName} deve ser um número válido`
    }
    return null
  },

  min: (value, min, fieldName = "Campo") => {
    if (value !== null && value !== undefined && Number(value) < min) {
      return `${fieldName} deve ser maior ou igual a ${min}`
    }
    return null
  },

  max: (value, max, fieldName = "Campo") => {
    if (value !== null && value !== undefined && Number(value) > max) {
      return `${fieldName} deve ser menor ou igual a ${max}`
    }
    return null
  },

  positive: (value, fieldName = "Campo") => {
    if (value !== null && value !== undefined && Number(value) <= 0) {
      return `${fieldName} deve ser um número positivo`
    }
    return null
  },

  integer: (value, fieldName = "Campo") => {
    if (value !== null && value !== undefined && !Number.isInteger(Number(value))) {
      return `${fieldName} deve ser um número inteiro`
    }
    return null
  },
}

// Função para validar múltiplos campos
export const validateForm = (data, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field]
    const fieldValue = data[field]

    for (const rule of fieldRules) {
      const error = rule(fieldValue)
      if (error) {
        errors[field] = error
        break // Para na primeira validação que falhar
      }
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}