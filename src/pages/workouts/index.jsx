"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllWorkouts, deleteWorkout } from "../../services/api/workouts.js"
import { useModal } from "../../contexts/ModalContext.jsx"
import Loading from "../../components/loader/index.jsx"
import "./style.css"
import InputSearch from "../../components/inputs/inputSearch/index.jsx"
import HeaderAdm from "../../components/page-header/header-adm/index.jsx"
import { Dumbbell, Plus, Filter } from "lucide-react"
import WorkoutCard from '../../components/cards/workout/index.jsx'
import { getAllUsersBasic } from "../../services/api/users.js"

const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("all")
  const { showConfirm, showSuccess, showDanger } = useModal()

  useEffect(() => {
    fetchWorkouts()
    fetchUsers()
  }, [])

  const fetchWorkouts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllWorkouts()
      const workoutsFromResponse = response.data?.data || []
      setWorkouts(workoutsFromResponse)
    } catch (err) {
      console.error("Erro ao buscar treinos:", err)
      setError(err.message || "Erro ao carregar treinos")
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await getAllUsersBasic()
      setUsers(response.data?.data || [])
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
    }
  }

  const handleDeleteWorkout = (workoutId, workoutName) => {
    showConfirm(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o treino "${workoutName}"? Esta ação não pode ser desfeita.`,
      async () => {
        try {
          await deleteWorkout(workoutId)
          setWorkouts(workouts.filter((workout) => workout.id !== workoutId))
          showSuccess("Treino Excluído", `O treino "${workoutName}" foi excluído com sucesso.`)
        } catch (err) {
          showDanger("Erro ao Excluir", `Não foi possível excluir o treino "${workoutName}". Tente novamente.`)
        }
      },
    )
  }

  // Filtra os treinos com base no usuário selecionado
  const getFilteredWorkouts = () => {
    let filtered = workouts

    // Filtro por usuário
    if (selectedUser !== "all") {
      if (selectedUser === "standard") {
        filtered = filtered.filter(workout => workout.isStandard)
      } else {
        filtered = filtered.filter(workout => workout.userId === selectedUser)
      }
    }

    // Filtro por busca
    if (search) {
      filtered = filtered.filter(
        (workout) =>
          workout.name.toLowerCase().includes(search.toLowerCase()) ||
          workout.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filtered
  }

  const filteredWorkouts = getFilteredWorkouts()

  const getUserName = (userId) => {
    if (!userId) return "Padrão"
    const user = users.find(u => u.id === userId)
    return user ? user.name : "Usuário não encontrado"
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erro ao carregar treinos!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchWorkouts}>
            <i className="fas fa-redo me-2"></i>
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="workouts-page">
      {/* Header */}
      <HeaderAdm 
        title="Gerenciamento de Treinos"
        description="Crie e gerencie treinos personalizados"
        buttonText="treino"
        icon={<Dumbbell className="me-2 mb-2" size={35} />}
        route='/workouts/manage/new'
      />

      {/* Filters */}
      <div className="filters-section">

        <div className="user-filter">
          <div className="filter-label">
            <Filter size={16} />
            <span>Filtrar por usuário:</span>
          </div>
          <select 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)}
            className="user-select"
          >
            <option value="all">Todos os treinos</option>
            <option value="standard">Treinos Padrão</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="search-filter">
          <InputSearch 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar treinos por nome ou descrição..."
          />
        </div>
        
        
      </div>

      {/* Content */}
      <div className="container mt-4 pt-2 pb-5">
        {filteredWorkouts.length > 0 ? (
          <div className="workouts-grid">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard 
                key={workout.id}
                id={workout.id}
                name={workout.name}
                description={workout.description}
                exercises={workout.exercises}
                isStandard={workout.isStandard}
                userId={workout.userId}
                userName={getUserName(workout.userId)}
                handleDeleteWorkout={handleDeleteWorkout}
              />
            ))}

            {/* Add New Workout Card */}
            <div className="add-workout-card">
              <Link to="/workouts/manage/new" className="add-workout-link">
                <div className="add-workout-icon">
                  <Plus size={32} />
                </div>
                <h5>Criar Novo Treino</h5>
                <p>Adicione um novo treino personalizado</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Dumbbell size={64} />
            </div>
            <h3>{search || selectedUser !== "all" ? "Nenhum treino encontrado" : "Nenhum treino cadastrado"}</h3>
            <p>
              {search || selectedUser !== "all" 
                ? "Tente ajustar os filtros ou buscar por outro termo." 
                : "Crie seu primeiro treino personalizado."
              }
            </p>
            {!search && selectedUser === "all" && (
              <Link to="/workouts/manage/new" className="btn btn-primary btn-lg">
                <Plus size={16} className="me-2" />
                Criar Primeiro Treino
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Workouts