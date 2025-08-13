import { useState, useEffect } from 'react';
import { getAllExercises } from '../../services/api/exercises.js';
import { X, Save } from 'lucide-react';
import './style.css';

const ExerciseForm = ({ exercise, onSave, onCancel, isEditing = false }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    exerciseId: exercise?.exerciseId || '',
    name: exercise?.name || '',
    sets: exercise?.sets || 3,
    reps: exercise?.reps || 10,
    weight: exercise?.weight || 0,
    notes: exercise?.notes || ''
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await getAllExercises();
      setExercises(response.data?.data || []);
    } catch (err) {
      console.error("Erro ao buscar exercícios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseChange = (exerciseId) => {
    const selectedExercise = exercises.find(ex => ex.id === exerciseId);
    setFormData(prev => ({
      ...prev,
      exerciseId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, ...exerciseDataToSave } = formData;
    onSave(exerciseDataToSave);
  };

  if (loading) {
    return <div className="exercise-form-loading">Carregando exercícios...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="exercise-form">
      <div className="form-header">
        <h3>{isEditing ? 'Editar Exercício' : 'Adicionar Exercício'}</h3>
        <button type="button" onClick={onCancel} className="close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="exercise-select">Exercício</label>
          <select
            id="exercise-select"
            value={formData.exerciseId}
            onChange={(e) => handleExerciseChange(e.target.value)}
            required
          >
            <option value="">Selecione um exercício</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="sets">Séries</label>
          <input
            type="number"
            id="sets"
            value={formData.sets}
            onChange={(e) => setFormData(prev => ({ ...prev, sets: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reps">Repetições</label>
          <input
            type="number"
            id="reps"
            value={formData.reps}
            onChange={(e) => setFormData(prev => ({ ...prev, reps: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Peso (kg)</label>
          <input
            type="number"
            id="weight"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
            min="0"
            step="0.5"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Observações sobre o exercício..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-save">
          <Save size={16} />
          {isEditing ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
};

export default ExerciseForm;