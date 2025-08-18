import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById, createWorkout, updateWorkout } from '../../services/api/workouts';
import { getAllUsersBasic } from '../../services/api/users.js';
import Loading from '../../components/loader';
import { formatDate } from '../../utils/formatters';
import UserSelector from '../../components/user-selector/index.jsx';
import ExerciseList from '../../components/exercise-list/index.jsx';
import ExerciseForm from '../../components/exercise-form/index.jsx';
import { useModal } from '../../contexts/ModalContext.jsx';
import { useSearchParams } from 'react-router-dom';
import './style.css';
import { Save, X, Dumbbell, ArrowLeft } from 'lucide-react';

const WorkoutManage = () => {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showDanger } = useModal();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchParams] = useSearchParams();
    const userIdFromUrl = searchParams.get('userId');
    
    const [workoutData, setWorkoutData] = useState({
        createdAt: null,
        description: '',
        name: '',
        id: '',
        userId: '',
        isActive: true,
        updatedAt: null,
        isStandard: false,
    });
    
    const [exercises, setExercises] = useState([]);
    const [users, setUsers] = useState([]);
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [editingExercise, setEditingExercise] = useState(null);
    const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);

    // Estado local para os campos de input
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState(userIdFromUrl || 'standard');

    // Detectar se é criação ou edição
    useEffect(() => {
        setIsCreating(!workoutId || workoutId === 'new');
    }, [workoutId]);

    // Mapeia o estado para a UI
    useEffect(() => {
        if (isCreating) {
            // Durante criação, usar valores padrão
            setWorkoutName('');
            setWorkoutDescription('');
            setSelectedUser(userIdFromUrl || 'standard');
        } else if (workoutData.name) {
            // Durante edição, usar dados do treino
            setWorkoutName(workoutData.name);
            setWorkoutDescription(workoutData.description);
            setSelectedUser(workoutData.isStandard ? 'standard' : workoutData.userId);
        }
    }, [workoutData, isCreating]);

    // Busca os dados do treino e dos usuários ao carregar o componente
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Busca os dados dos usuários
                const usersResponse = await getAllUsersBasic();
                setUsers(usersResponse.data?.data || []);
                
                // Se não for criação, busca os dados do treino
                if (!isCreating && workoutId !== 'new') {
                    const workoutResponse = await getWorkoutById(workoutId);
                    const workoutDataFromResponse = workoutResponse.data?.data;
                    setWorkoutData(workoutDataFromResponse);
                    setExercises(workoutDataFromResponse.exercises || []);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError(err.message || "Erro ao carregar dados.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
    }, [workoutId, isCreating]);

    useEffect(() => {
        if(userIdFromUrl){
            setSelectedUser(userIdFromUrl)
        }
    }, [userIdFromUrl])

    const handleSave = async () => {
        try {
            const workoutPayload = {
                name: workoutName,
                description: workoutDescription,
                userId: selectedUser === 'standard' ? null : selectedUser,
                isStandard: selectedUser === 'standard',
                exercises: exercises,
                isActive: true
            };

            if (isCreating) {
                await createWorkout(workoutPayload);
                showSuccess("Treino Criado", "Treino criado com sucesso!");
            } else {
                await updateWorkout(workoutId, workoutPayload);
                showSuccess("Treino Atualizado", "Treino atualizado com sucesso!");
            }
            
            if(userIdFromUrl){
                navigate(`/users/${userIdFromUrl}`);
            } else {
                navigate('/workouts');
            }
        } catch (err) {
            showDanger("Erro", "Erro ao salvar treino. Tente novamente.");
        }
    };

    const handleCancel = () => {
        navigate('/workouts');
    };

    const handleAddExercise = () => {
        setEditingExercise(null);
        setEditingExerciseIndex(null);
        setShowExerciseForm(true);
    };

    const handleEditExercise = (exercise, index) => {
        setEditingExercise(exercise);
        setEditingExerciseIndex(index);
        setShowExerciseForm(true);
    };

    const handleDeleteExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const handleSaveExercise = (exerciseData) => {
        if (editingExerciseIndex !== null) {
            // Editando exercício existente
            const newExercises = [...exercises];
            newExercises[editingExerciseIndex] = exerciseData;
            setExercises(newExercises);
        } else {
            // Adicionando novo exercício
            setExercises([...exercises, exerciseData]);
        }
        
        setShowExerciseForm(false);
        setEditingExercise(null);
        setEditingExerciseIndex(null);
    };

    const handleCancelExercise = () => {
        setShowExerciseForm(false);
        setEditingExercise(null);
        setEditingExerciseIndex(null);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Erro ao carregar dados!</h4>
                    <p>{error}</p>
                    <hr />
                    <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    const { createdAt, updatedAt } = workoutData;
    let createdAtFormated = createdAt ? formatDate.brazilian(createdAt) : 'Não disponível';
    let updatedAtFormated = updatedAt ? formatDate.brazilian(updatedAt) : 'Não atualizado';

    return (
        <div className="workout-manage-container">
            {/* Modal do formulário de exercício */}
            {showExerciseForm && (
                <div className="modal-overlay">
                    <div className="content-add-exercise">
                        <ExerciseForm
                            exercise={editingExercise}
                            onSave={handleSaveExercise}
                            onCancel={handleCancelExercise}
                            isEditing={editingExerciseIndex !== null}
                        />
                    </div>
                </div>
            )}

            <header className="header-workout-manage">
                <div className="header-left">
                    <button onClick={handleCancel} className="btn-back">
                        <ArrowLeft size={20} />
                        Voltar
                    </button>
                    <h1 className="main-title">
                        {isCreating ? 'Criar Novo Treino' : 'Gerenciar Treino'}
                    </h1>
                </div>
                
                <div className="info-badges">
                    <div className="badge primary">
                        <Dumbbell size={16} />
                        <span>{exercises.length} exercícios</span>
                    </div>
                    <button className="btn-action save" onClick={handleSave}>
                        <Save size={16} /> Salvar
                    </button>
                    <button className="btn-action cancel" onClick={handleCancel}>
                        <X size={16} /> Cancelar
                    </button>
                </div>
            </header>

            <div className="form-section">
                <div className="form-group">
                    <label htmlFor="workout-name">Nome do Treino</label>
                    <input
                        type="text"
                        id="workout-name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Nome do treino"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="workout-description">Descrição</label>
                    <textarea
                        id="workout-description"
                        value={workoutDescription}
                        onChange={(e) => setWorkoutDescription(e.target.value)}
                        placeholder="Descrição do treino"
                        rows="3"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="user-select">Atribuir a usuário</label>
                    <UserSelector
                        selectedUser={selectedUser}
                        onUserChange={setSelectedUser}
                    />
                </div>
            </div>

            <ExerciseList
                exercises={exercises}
                onEdit={handleEditExercise}
                onDelete={handleDeleteExercise}
                onAdd={handleAddExercise}
            />
            
            {!isCreating && (
                <footer className="footer-workout-manage">
                    <p>Criado em: {createdAtFormated}</p>
                    <p>Atualizado em: {updatedAtFormated}</p>
                </footer>
            )}
        </div>
    );
};

export default WorkoutManage;