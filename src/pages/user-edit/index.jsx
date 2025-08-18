"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getUserById, createUser, updateUser } from "../../services/api/users.js"
import ProfileImageUpload from '../../components/inputs/profileImageUpload/index.jsx';
import UserWorkouts from '../../components/userWorkouts/index.jsx';
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
      setFormData(response.data?.data)
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
        const filteredFormData = {
          name: formData.name,
          email: formData.email,
          profilePicture: formData.profilePicture,
        }
        await updateUser(id, filteredFormData)
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

                  <div className="mb-4">
                    <label className="form-label">
                      Foto de Perfil
                    </label>
                    <ProfileImageUpload
                      onImageUpload={(url) => setFormData(prev => ({ ...prev, profilePicture: url }))}
                      currentImageUrl={formData.profilePicture}
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

        {/* Seção de Treinos do Usuário */}
        {isEditing && (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">
                      <i className="fas fa-dumbbell me-2"></i>
                      Treinos do Usuário
                    </h4>
                    <button 
                      type="button" 
                      className="btn btn-success"
                      onClick={() => navigate(`/workouts/manage/new?userId=${id}`)}
                    >
                      <i className="fas fa-plus me-2"></i>
                      Criar Novo Treino
                    </button>
                  </div>
                  
                  <UserWorkouts userId={id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserEdit