import { Edit, Trash2, Plus } from 'lucide-react';
import './style.css';

const ExerciseList = ({ exercises, onEdit, onDelete, onAdd }) => {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="exercise-list-empty">
        <div className="empty-icon">
          <Plus size={48} />
        </div>
        <h3>Nenhum exercício adicionado</h3>
        <p>Adicione exercícios ao seu treino para começar</p>
        <button onClick={onAdd} className="btn-add-exercise">
          <Plus size={16} />
          Adicionar Exercício
        </button>
      </div>
    );
  }

  console.log('MEUS EXERCICIOS: ', exercises)

  return (
    <div className="exercise-list">
      <div className="exercise-list-header">
        <h3>Exercícios do Treino ({exercises.length})</h3>
        <button onClick={onAdd} className="btn-add-exercise">
          <Plus size={16} />
          Adicionar
        </button>
      </div>

      <div className="exercises-grid">
        {exercises.map((exercise, index) => (
          
          <div key={`${exercise.exerciseId}-${index}`} className="exercise-item">
            <div className="exercise-header">
              <h4 className="exercise-name">{exercise.name || `Exercício ${index + 1}`}</h4>
              <div className="exercise-actions">
                <button
                  onClick={() => onEdit(exercise, index)}
                  className="btn-edit"
                  title="Editar exercício"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="btn-delete"
                  title="Remover exercício"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="exercise-details">
              <div className="detail-item">
                <span className="detail-label">Séries:</span>
                <span className="detail-value">{exercise.sets}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Repetições:</span>
                <span className="detail-value">{exercise.reps}</span>
              </div>
              {exercise.weight > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Peso:</span>
                  <span className="detail-value">{exercise.weight} kg</span>
                </div>
              )}
            </div>

            {exercise.notes && (
              <div className="exercise-notes">
                <span className="notes-label">Notas:</span>
                <p className="notes-text">{exercise.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;