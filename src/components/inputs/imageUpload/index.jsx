import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import './style.css';

const ImageUpload = ({ onImageUpload, currentImageUrl, className = '' }) => {
  const [preview, setPreview] = useState(currentImageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 5MB.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3000/upload/exercise-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = `http://localhost:3000${data.data.imageUrl}`;
        setPreview(imageUrl);
        onImageUpload(imageUrl);
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
    <div className={`image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {preview ? (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
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
          className="upload-area"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={48} />
          <p>Clique para selecionar uma imagem</p>
          <span>JPEG, PNG ou WebP (máx. 5MB)</span>
        </div>
      )}

      {uploading && (
        <div className="upload-loading">
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

export default ImageUpload;