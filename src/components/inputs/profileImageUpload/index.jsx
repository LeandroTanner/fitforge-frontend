import { useState, useRef, useEffect } from 'react';
import { Upload, X, User } from 'lucide-react';
import { getImageUrl } from '../../../services/api.js';
import './style.css';

const ProfileImageUpload = ({ onImageUpload, currentImageUrl, className = '' }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Atualizar preview quando currentImageUrl mudar
  useEffect(() => {
    if (currentImageUrl) {
      setPreview(getImageUrl(currentImageUrl));
    } else {
      setPreview(null);
    }
  }, [currentImageUrl]);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.');
      return;
    }

    // Validar tamanho (2MB para fotos de perfil)
    if (file.size > 2 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 2MB.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload/profile-image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data?.data.imageUrl; // URL relativa do backend
        setPreview(getImageUrl(imageUrl)); // Preview com URL completa
        onImageUpload(imageUrl); // Salva URL relativa no banco
      } else {
        setError(data.message || 'Erro ao fazer upload');
      }
    } catch (err) {
      setError('Erro ao fazer upload da imagem');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`profile-image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {preview ? (
        <div className="profile-image-preview">
          <img src={preview} alt="Foto de perfil" />
          <button
            type="button"
            className="remove-image"
            onClick={removeImage}
            disabled={uploading}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="profile-upload-area"
          onClick={() => fileInputRef.current?.click()}
        >
          <User size={48} />
          <p>Clique para selecionar uma foto</p>
          <span>JPEG, PNG ou WebP (máx. 2MB)</span>
        </div>
      )}

      {uploading && (
        <div className="profile-upload-loading">
          <Upload size={20} className="spinning" />
          <span>Fazendo upload...</span>
        </div>
      )}

      {error && (
        <div className="upload-error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;