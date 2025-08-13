"use client"
import { useForm, ValidationError } from "@formspree/react"
import { BrushCleaning } from "lucide-react"

/**
 * Componente de formulário de contato que utiliza Formspree para submissão.
 */
export default function ContactForm({ onSuccess }) {
  const [state, handleSubmit] = useForm("xnnzbqkw")

  if (state.succeeded) {
    onSuccess()
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form p-4 p-md-5 rounded shadow-lg">
      <input type="hidden" name="_template" value="box" />

      <div className="row mb-3">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="firstName" className="form-label fw-bold">
            Nome:
          </label>
          <input type="text" className="form-control" id="firstName" placeholder="Seu nome" name="firstName" required />
          <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label fw-bold">
            Sobrenome:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Seu sobrenome"
            name="lastName"
            required
          />
          <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Digite seu melhor email"
          name="email"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-3">
        <label htmlFor="subject" className="form-label fw-bold">
          Assunto:
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          placeholder="Assunto da mensagem"
          name="subject"
          required
        />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label fw-bold">
          Descrição:
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="5"
          name="description"
          placeholder="Descreva sua dúvida ou mensagem aqui..."
          required
        ></textarea>
        <ValidationError prefix="Description" field="description" errors={state.errors} />
      </div>

      <div className="d-flex gap-3 w-100">
        <button type="submit" className="btn btn-primary btn-lg" disabled={state.submitting}>
          {state.submitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
        <button
          type="reset"
          title="Limpar Campos"
          className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center"
        >
          <BrushCleaning />
        </button>
      </div>

      {state.errors && state.errors.length > 0 && (
        <div className="text-danger mt-3">Ocorreu um erro ao enviar o formulário. Por favor, verifique os campos.</div>
      )}
    </form>
  )
}
