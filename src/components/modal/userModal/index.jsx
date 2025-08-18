import './style.css'
import { useEffect, useState } from 'react' 
import { createUser, updateUser } from '../../../services/api/users'
import ProfileImageUpload from '../../inputs/profileImageUpload/index.jsx'
import { X, Loader2, Save } from 'lucide-react'

const UserModal = ({ isOpen, onClose, onUserCreated, userToEdit, isEditing = false, onUserUpdated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
      });
      const [profilePicture, setProfilePicture] = useState(null);
      const [loading, setLoading] = useState(false);
      const [errors, setErrors] = useState({});

      useEffect(() => {
        if (userToEdit) {
          setFormData({
            name: userToEdit.name || '',
            email: userToEdit.email || '',
          });
          setProfilePicture(userToEdit.profilePicture || null);
        }
      }, [userToEdit])



      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: ''
          }));
        }
      };



      const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
          newErrors.name = 'Nome é obrigatório';
        }
        
        if (!formData.email.trim()) {
          newErrors.email = 'Email é obrigatório';
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
          const userData = {
            ...formData,
            profilePicture: profilePicture
          };
      
          let response;
          if (isEditing && userToEdit) {
            response = await updateUser(userToEdit.id, userData);
          } else {
            response = await createUser(userData);
          }
          
          if (response.success) {
            setFormData({
              name: '',
              email: '',
            });
            setProfilePicture(null);
            setErrors({});
            
            onClose();
            
            if (isEditing) {
              onUserUpdated(response.data.data);
            } else {
              onUserCreated(response.data.data);
            }
          }
        } catch (error) {
          console.error('Erro ao salvar usuário:', error);
          setErrors({ submit: error.message || 'Erro ao salvar usuário' });
        } finally {
          setLoading(false);
        }
      };


      const handleClose = () => {
        if (!loading) {
          setFormData({
            name: '',
            email: '',
          });
          setProfilePicture(null);
          setErrors({});
          onClose();
        }
      };


      if (!isOpen) return null;
      

    return (
        <div className="user-modal-overlay" onClick={handleClose}>
            <div className="user-modal" onClick={(e) => e.stopPropagation()}>
                <div className="user-modal-header">
                <h3>{isEditing ? 'Editar usuário' : 'Adicionar novo usuário'}</h3>
                <button 
                    type="button" 
                    className="user-close-button" 
                    onClick={handleClose}
                    disabled={loading}
                >
                    <X size={20} />
                </button>
                </div>

                <form onSubmit={handleSubmit} className="user-modal-form">
                <div className="form-group">
                    <label htmlFor="name">Nome do usuário *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Insira o nome do novo usuário..."
                        disabled={loading}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Insira o email desse usuário..."
                        disabled={loading}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Imagem de perfil</label>
                    <ProfileImageUpload
                        onImageUpload={setProfilePicture}
                        currentImageUrl={profilePicture}
                    />
                </div>

                {errors.submit && (
                    <div className="submit-error">
                    <span>{errors.submit}</span>
                    </div>
                )}

                <div className="user-modal-actions">
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
                            {isEditing ? 'Salvar alterações' : 'Salvar usuário'}
                            </>
                    )}
                    </button>
                </div>
                </form>
            </div>

            </div>
    )
}

export default UserModal