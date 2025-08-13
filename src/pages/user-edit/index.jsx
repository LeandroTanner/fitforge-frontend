"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUserById, createUser, updateUser } from "../../services/api/users.js"
import { useModal } from "../../contexts/ModalContext.jsx"
import Loading from "../../components/loader/index.jsx"
import "./style.css"

const UserEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showSuccess, showDanger } = useModal()
  const isEditing = id && id !== "new"

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    profilePicture: "",
  })

  useEffect(() => {
    if (isEditing) {
      fetchUser()
    }
  }, [id, isEditing])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await getUserById(id)
      setFormData(response.data)
    } catch (error) {
      showDanger("Erro", "Não foi possível carregar os dados do usuário")
      navigate("/users")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      showDanger("Erro", "Nome e email são obrigatórios")
      return
    }

    try {
      setSaving(true)

      if (isEditing) {
        await updateUser(id, formData)
        showSuccess("Sucesso", "Usuário atualizado com sucesso!")
      } else {
        await createUser(formData)
        showSuccess("Sucesso", "Usuário criado com sucesso!")
      }

      navigate("/users")
    } catch (error) {
      showDanger("Erro", `Não foi possível ${isEditing ? "atualizar" : "criar"} o usuário`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="user-edit-page">
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="page-title">
                <i className="fas fa-user-edit me-3"></i>
                {isEditing ? "Editar Usuário" : "Novo Usuário"}
              </h1>
              <p className="page-subtitle">
                {isEditing ? "Atualize as informações do usuário" : "Preencha os dados do novo usuário"}
              </p>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/users" className="btn btn-light btn-lg">
                <i className="fas fa-arrow-left me-2"></i>
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="age" className="form-label">
                        Idade
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="1"
                        max="120"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="weight" className="form-label">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        step="0.1"
                        min="1"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="height" className="form-label">
                        Altura (cm)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        min="50"
                        max="250"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="goal" className="form-label">
                      Objetivo
                    </label>
                    <select
                      className="form-select"
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione um objetivo</option>
                      <option value="perda_peso">Perda de Peso</option>
                      <option value="ganho_massa">Ganho de Massa Muscular</option>
                      <option value="definicao">Definição</option>
                      <option value="resistencia">Resistência</option>
                      <option value="forca">Força</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="profilePicture" className="form-label">
                      URL da Foto de Perfil
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="profilePicture"
                      name="profilePicture"
                      value={formData.profilePicture}
                      onChange={handleInputChange}
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>

                  <div className="d-flex gap-3 justify-content-end">
                    <Link to="/users" className="btn btn-secondary">
                      Cancelar
                    </Link>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>
                          {isEditing ? "Atualizando..." : "Criando..."}
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          {isEditing ? "Atualizar" : "Criar"} Usuário
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEdit
