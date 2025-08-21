
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Send, Loader2, BrushCleaning } from 'lucide-react'; 

function ContactForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  const GETFORM_ENDPOINT_URL = import.meta.env.VITE_GETFORM_ENDPOINT; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);

    try {
      const response = await axios.post(GETFORM_ENDPOINT_URL, formData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.data.success) {
        onSuccess();
        formRef.current.reset();
      } else {
        setError("Ocorreu um erro ao enviar a mensagem.");
      }
    } catch (err) {
      console.error("Erro no envio do formulário:", err);
      setError("Ocorreu um erro ao enviar. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-form p-4 p-md-5 rounded shadow-lg"
    >
      <div className="row mb-3">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="firstName" className="form-label fw-bold">Nome:</label>
          <input type="text" className="form-control" id="firstName" placeholder="Seu nome" name="firstName" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label fw-bold">Sobrenome:</label>
          <input type="text" className="form-control" id="lastName" placeholder="Seu sobrenome" name="lastName" required />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">Email:</label>
        <input type="email" className="form-control" id="email" placeholder="Digite seu melhor email" name="email" required />
      </div>

      <div className="mb-3">
        <label htmlFor="subject" className="form-label fw-bold">Assunto:</label>
        <input type="text" className="form-control" id="subject" placeholder="Assunto da mensagem" name="subject" required />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label fw-bold">Descrição:</label>
        <textarea className="form-control" id="description" rows="5" name="description" placeholder="Descreva sua dúvida ou mensagem aqui..." required></textarea>
      </div>

      <div className="d-flex gap-3 w-100">
        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spinning me-2" />
              Enviando...
            </>
          ) : (
            "Enviar Mensagem"
          )}
        </button>
        <button type="reset" title="Limpar Campos" className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center">
          <BrushCleaning />
        </button>
      </div>

      {error && (
        <div className="text-danger mt-3">
          {error}
        </div>
      )}
    </form>
  );
}

export default ContactForm;