import { Dumbbell, Pencil, Trash2, User, Calendar, Clock } from 'lucide-react';
import './style.css'
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/formatters';

const WorkoutCard = ({ id, name, description, exercises, isStandard, handleDeleteWorkout, userName, createdAt, updatedAt }) => {
    const formatDateShort = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    };

    return (
        <div className="workout-card">
            <div className="workout-card-header">
                <div className="workout-title-section">
                    <h5 className="workout-name">{name}</h5>
                    <span className={`workout-badge ${isStandard ? 'standard' : 'user'}`}>
                        {isStandard ? 'Padrão' : `Treino de ${userName}`}
                    </span>
                </div>
                
                <div className="workout-actions">
                    <Link to={`/workouts/manage/${id}`} className="btn-edit" title="Editar treino">
                        <Pencil size={16} />
                    </Link>
                    <button
                        className="btn-delete"
                        onClick={() => handleDeleteWorkout(id, name)}
                        title="Excluir treino"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="workout-card-body"> 
                <p className="workout-description">
                    {description || "Sem descrição"}
                </p>

                <div className="workout-info">
                    <div className="info-item">
                        <Dumbbell size={18} />
                        <span>{exercises?.length || 0} exercícios</span>
                    </div>
                    
                    {userName && !isStandard && (
                        <div className="info-item">
                            <User size={18} />
                            <span>{userName}</span>
                        </div>
                    )}
                </div>

                <div className="workout-meta">
                    {createdAt && (
                        <div className="meta-item">
                            <Calendar size={14} />
                            <span>Criado: {formatDateShort(createdAt)}</span>
                        </div>
                    )}
                    {updatedAt && updatedAt !== createdAt && (
                        <div className="meta-item">
                            <Clock size={14} />
                            <span>Atualizado: {formatDateShort(updatedAt)}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="workout-card-footer">
                <Link to={`/workouts/manage/${id}`} className="btn-manage">
                    <Pencil size={16} />
                    Gerenciar Treino
                </Link>
            </div>
        </div>
    )
} 

export default WorkoutCard;