"use client"

import { useState, useEffect } from "react"
import { getAllExercises, deleteExercise } from "../../services/api/exercises.js"
import { useModal } from "../../contexts/ModalContext.jsx"
import Loading from "../../components/loader/index.jsx"
import "./style.css"
import InputSearch from "../../components/inputs/inputSearch/index.jsx"
import HeaderAdm from "../../components/page-header/header-adm/index.jsx"
import { BicepsFlexed } from "lucide-react"
import ExerciseCard from "../../components/cards/exercise/index.jsx"
import ExerciseModal from "../../components/modal/exerciseModal/index.jsx"

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const { showConfirm, showSuccess, showDanger } = useModal()
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    fetchExercises()
  }, [])

  const handleExerciseCreated = (newExercise) => {
    setExercises(prev => [...prev, newExercise]);
    showSuccess("Exercício Criado", `O exercício "${newExercise.name}" foi criado com sucesso.`);
  };

  const handleExerciseUpdated = (updatedExercise) => {
    setExercises(prev => prev.map(exercise => 
      exercise.id === updatedExercise.id ? updatedExercise : exercise
    ));
    showSuccess("Exercício Atualizado", `O exercício "${updatedExercise.name}" foi atualizado com sucesso.`);
  };

  const fetchExercises = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllExercises()
      const exercisesFromResponse = response.data?.data || []
      setExercises(exercisesFromResponse)
    } catch (err) {
      console.error("Erro ao buscar exercícios:", err)
      setError(err.message || "Erro ao carregar exercícios")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExercise = (exerciseId, exerciseName) => {
    showConfirm(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o exercício "${exerciseName}"? Esta ação não pode ser desfeita.`,
      async () => {
        try {
          await deleteExercise(exerciseId)
          setExercises(exercises.filter((exercise) => exercise.id !== exerciseId))
          showSuccess("Exercício Excluído", `O exercício "${exerciseName}" foi excluído com sucesso.`)
        } catch (err) {
          showDanger("Erro ao Excluir", `Não foi possível excluir o exercício "${exerciseName}". Tente novamente.`)
        }
      },
    )
  }

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise && // Garante que o objeto exercise não é null
      (exercise.name?.toLowerCase().includes(search.toLowerCase()) ||
        exercise.description?.toLowerCase().includes(search.toLowerCase())),
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erro ao carregar exercícios!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchExercises}>
            <i className="fas fa-redo me-2"></i>
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="exercises-page">
      {/* Header */}
      <HeaderAdm 
        title="Gerenciar Exercícios"
        description="Gerencie todos os exercícios disponíveis"
      />

      {/* Filter */}
      <InputSearch 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Buscar exercícios por nome ou descrição..." 
      />

      <div className="container mt-4">

        {/* Content */}
        {filteredExercises.length > 0 ? (
          <div className="exercises-grid">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                description={exercise.description}
                imageUrl={exercise.imageUrl}
                equipmentRequired={exercise.equipmentRequired}
                handleDeleteExercise={handleDeleteExercise}
                handleEditExercise={(exercise) => {
                  setEditingExercise(exercise);
                  setIsModalOpen(true);
                }}
              />
            ))}

            {/* Add New Exercise Card */}
            <div className="add-exercise-card">
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="add-exercise-link"
              >
                <div className="add-exercise-icon">
                  <i className="fas fa-plus"></i>
                </div>
                <h5>Adicionar Exercício</h5>
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-running"></i>
            </div>
            <h3>{search ? "Nenhum exercício encontrado" : "Nenhum exercício cadastrado"}</h3>
            <p>{search ? "Tente ajustar os filtros de busca" : "Comece adicionando o primeiro exercício"}</p>
            {!search && (
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-lg">
                <i className="fas fa-plus me-2"></i>
                Adicionar Primeiro Exercício
              </button>
            )}
          </div>
        )}
      </div>

        {/* Modal de Adicionar Exercício */}
        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingExercise(null);
          }}
          onExerciseCreated={handleExerciseCreated}
          onExerciseUpdated={handleExerciseUpdated}
          exerciseToEdit={editingExercise}
          isEditing={!!editingExercise}
        />

    </div>
  )
}

export default Exercises
