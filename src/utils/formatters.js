// Formatadores de texto
export const formatText = {
  capitalize: (text) => {
    if (!text) return ""
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  capitalizeWords: (text) => {
    if (!text) return ""
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  },

  removeAccents: (text) => {
    if (!text) return ""
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  },

  slugify: (text) => {
    if (!text) return ""
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-")
  },

  truncate: (text, maxLength = 50) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  },
}

// Formatadores de números
export const formatNumber = {
  currency: (value, currency = "BRL") => {
    if (value === null || value === undefined) return ""
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(value)
  },

  decimal: (value, decimals = 2) => {
    if (value === null || value === undefined) return ""
    return Number(value).toFixed(decimals)
  },

  percentage: (value, decimals = 1) => {
    if (value === null || value === undefined) return ""
    return `${Number(value).toFixed(decimals)}%`
  },

  thousand: (value) => {
    if (value === null || value === undefined) return ""
    return new Intl.NumberFormat("pt-BR").format(value)
  },
}

// Formatadores de data
export const formatDate = {
  brazilian: (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("pt-BR")
  },

  americanToBrazilian: (dateString) => {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  },

  brazilianToAmerican: (dateString) => {
    if (!dateString) return ""
    const [day, month, year] = dateString.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  },

  relative: (date) => {
    if (!date) return ""
    const now = new Date()
    const targetDate = new Date(date)
    const diffTime = Math.abs(now - targetDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays < 7) return `${diffDays} dias atrás`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`
    return `${Math.floor(diffDays / 365)} anos atrás`
  },

  brazilianWithHour: (isoDateString) => {
    if (!isoDateString) {
      return 'Data inválida';
    }
  
    const date = new Date(isoDateString);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês de 0 a 11, por isso +1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // Exemplo de formato: "17/07/2025 às 18:02"
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  },
}

// Utilitários gerais
export const utils = {
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error("Erro ao copiar para clipboard:", err)
      return false
    }
  },

  downloadFile: (data, filename, type = "text/plain") => {
    const blob = new Blob([data], { type })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },
}