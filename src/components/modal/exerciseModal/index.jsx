import { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import {
  createExercise,
  updateExercise,
} from "../../../services/api/exercises.js";
import ImageUpload from "../../inputs/imageUpload/index.jsx";
import { getImageUrl } from "../../../services/api.js";
import "./style.css";

const ExerciseModal = ({
  isOpen,
  onClose,
  onExerciseCreated,
  exerciseToEdit,
  isEditing = false,
  onExerciseUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    equipmentRequired: "",
  });
  const [imageExerciseUrl, setImageExerciseUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (exerciseToEdit) {
      setFormData({
        name: exerciseToEdit.name || "",
        description: exerciseToEdit.description || "",
        equipmentRequired: exerciseToEdit.equipmentRequired || "",
      });
      let imageUrlFromExercise = getImageUrl(exerciseToEdit.imageUrl);
      setImageExerciseUrl(imageUrlFromExercise);
      console.log("Url imagem: ", imageUrlFromExercise);
    }
  }, [exerciseToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }

    if (!formData.equipmentRequired.trim()) {
      newErrors.equipmentRequired = "Equipamento é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const exerciseData = {
        ...formData,
        imageUrl: imageExerciseUrl,
      };

      let response;
      if (isEditing && exerciseToEdit) {
        response = await updateExercise(exerciseToEdit.id, exerciseData);
      } else {
        response = await createExercise(exerciseData);
      }

      if (response.success) {
        setFormData({
          name: "",
          description: "",
          equipmentRequired: "",
        });
        setImageExerciseUrl(null);
        setErrors({});

        onClose();

        if (isEditing) {
          onExerciseUpdated(response.data.data);
        } else {
          onExerciseCreated(response.data.data);
        }
      }
    } catch (error) {
      console.error("Erro ao salvar exercício:", error);
      setErrors({ submit: error.message || "Erro ao salvar exercício" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: "",
        description: "",
        equipmentRequired: "",
      });
      setImageExerciseUrl(null);
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ex-modal-overlay" onClick={handleClose}>
      <div className="ex-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ex-modal-header">
          <h3>{isEditing ? "Editar Exercício" : "Adicionar Novo Exercício"}</h3>
          <button
            type="button"
            className="ex-modal-close-button"
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ex-modal-form">
          <div className="ex-modal-form-group">
            <label htmlFor="name">Nome do Exercício *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              placeholder="Ex: Flexão de Braço"
              disabled={loading}
            />
            {errors.name && (
              <span className="ex-modal-error-message">{errors.name}</span>
            )}
          </div>

          <div className="ex-modal-form-group">
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "error" : ""}
              placeholder="Descreva como realizar o exercício..."
              rows="4"
              disabled={loading}
            />
            {errors.description && (
              <span className="ex-modal-error-message">
                {errors.description}
              </span>
            )}
          </div>

          <div className="ex-modal-form-group">
            <label htmlFor="equipmentRequired">Equipamento Necessário *</label>
            <input
              type="text"
              id="equipmentRequired"
              name="equipmentRequired"
              value={formData.equipmentRequired}
              onChange={handleInputChange}
              className={errors.equipmentRequired ? "error" : ""}
              placeholder="Ex: Halteres, Barra, Nenhum"
              disabled={loading}
            />
            {errors.equipmentRequired && (
              <span className="ex-modal-error-message">
                {errors.equipmentRequired}
              </span>
            )}
          </div>

          <div className="ex-modal-form-group">
            <label>Imagem do Exercício</label>
            <ImageUpload
              onImageUpload={setImageExerciseUrl}
              currentImageUrl={imageExerciseUrl}
            />
          </div>

          {errors.submit && (
            <div className="ex-modal-submit-error">
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="ex-modal-actions">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spinning" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEditing ? "Salvar Alterações" : "Salvar Exercício"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;
