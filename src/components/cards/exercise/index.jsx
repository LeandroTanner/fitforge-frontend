import { getImageUrl } from '../../../services/api'
import defaultImage from '../../../assets/images/examples/_defaultExerciseImg.jpg'
import { SquarePen, Trash2 } from 'lucide-react'
import './style.css'

const ExerciseCard = ({ id, name, description, imageUrl, equipmentRequired, handleDeleteExercise, handleEditExercise }) => {
  return (
    <div key={id} className="exercise-card">
      <div className="exercise-card-image">
        <img className='exercise-image' src={getImageUrl(imageUrl) || defaultImage} alt={name} />
      </div>

      <div className="card-content-wrapper">
        <div className="exercise-card-header">
          <h5 className="exercise-name">{name}</h5>
          <span className="exercise-badge">{"Ativo"}</span>
        </div>

        <div className="exercise-card-body">
          <p className="exercise-description">{description || "Sem descrição"}</p>

          <div className="exercise-info">
            <div className="info-item">
              <p className='info-item-text'>Equipamento: </p>
              <span>{equipmentRequired || "Não tem"}</span>
            </div>
          </div>
        </div>

        <div className="exercise-card-actions">
        <button 
          onClick={() => handleEditExercise({ id, name, description, imageUrl, equipmentRequired })} 
          className="btn btn-outline-primary btn-sm btnActions"
        >
          <SquarePen size={18} />
          Editar
        </button>
          <button
            className="btn btn-outline-danger btn-sm btnActions"
            onClick={() => handleDeleteExercise(id, name)}
          >
            <Trash2 size={18} />
            Excluir
          </button>
        </div>
      </div> 
    </div>
  )
}

export default ExerciseCard