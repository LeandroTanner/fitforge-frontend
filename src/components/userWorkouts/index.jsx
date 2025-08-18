import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllWorkouts, deleteWorkout } from '../../services/api/workouts.js';
import { useModal } from '../../contexts/ModalContext.jsx';
import Loading from '../loader/index.jsx';
import './style.css';

const UserWorkouts = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showConfirm, showSuccess, showDanger } = useModal();

  useEffect(() => {
    fetchUserWorkouts();
  }, [userId]);

  const fetchUserWorkouts = async () => {
    try {
      setLoading(true);
      const response = await getAllWorkouts();
      const allWorkouts = response.data?.data || [];
      
      // Filtrar treinos do usuário específico
      const userWorkouts = allWorkouts.filter(workout => workout.userId === userId);
      setWorkouts(userWorkouts);
    } catch (err) {
      console.error("Erro ao buscar treinos do usuário:", err);
      setError(err.message || "Erro ao carregar treinos");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = (workoutId, workoutName) => {
    showConfirm(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o treino "${workoutName}"? Esta ação não pode ser desfeita.`,
      async () => {
        try {
          await deleteWorkout(workoutId);
          setWorkouts(workouts.filter(workout => workout.id !== workoutId));
          showSuccess("Treino Excluído", `O treino "${workoutName}" foi excluído com sucesso.`);
        } catch (err) {
          showDanger("Erro ao Excluir", `Não foi possível excluir o treino "${workoutName}".`);
        }
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Erro ao carregar treinos!</h4>
        <p>{error}</p>
        <hr />
        <button className="btn btn-outline-danger" onClick={fetchUserWorkouts}>
          <i className="fas fa-redo me-2"></i>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="user-workouts">
      {workouts.length > 0 ? (
        <div className="workouts-grid">
          {workouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <div className="workout-header">
                <h5 className="workout-name">{workout.name}</h5>
                <span className={`workout-badge ${workout.isStandard ? 'standard' : 'user'}`}>
                  {workout.isStandard ? 'Padrão' : 'Personalizado'}
                </span>
              </div>
              
              <div className="workout-content">
                <p className="workout-description">
                  {workout.description || "Sem descrição"}
                </p>
                
                <div className="workout-stats">
                  <span className="stat">
                    <i className="fas fa-dumbbell me-1"></i>
                    {workout.exercises?.length || 0} exercícios
                  </span>
                  <span className="stat">
                    <i className="fas fa-calendar me-1"></i>
                    {new Date(workout.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              
              <div className="workout-actions">
                <Link 
                  to={`/workouts/manage/${workout.id}`} 
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="fas fa-edit me-1"></i>
                  Editar
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteWorkout(workout.id, workout.name)}
                >
                  <i className="fas fa-trash me-1"></i>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-workouts">
          <div className="empty-icon">
            <i className="fas fa-dumbbell"></i>
          </div>
          <h5>Nenhum treino encontrado</h5>
          <p>Este usuário ainda não possui treinos personalizados.</p>
          <Link 
            to={`/workouts/manage/new?userId=${userId}`}
            className="btn btn-primary"
          >
            <i className="fas fa-plus me-2"></i>
            Criar Primeiro Treino
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserWorkouts;