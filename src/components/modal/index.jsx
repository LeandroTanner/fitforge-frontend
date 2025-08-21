"use client"

import { useModal } from "../../contexts/ModalContext.jsx"
import "./style.css"

const Modal = () => {
  const { modal, hideModal } = useModal()

  if (!modal.isOpen) return null

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm()
    }
    hideModal()
  }

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel()
    }
    hideModal()
  }

  const getModalStatusClass = () => {
    switch (modal.status) {
      case "success":
        return "confirmation-modal-success"
      case "danger":
        return "confirmation-modal-danger"
      default:
        return "confirmation-modal-info"
    }
  }

  const getIcon = () => {
    switch (modal.status) {
      case "success":
        return "fas fa-check-circle"
      case "danger":
        return "fas fa-exclamation-triangle"
      default:
        return "fas fa-info-circle"
    }
  }

  return (
    <div id="confirmation-modal-overlay" onClick={hideModal}>
      <div className={`confirmation-modal-content ${getModalStatusClass()}`} onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-modal-header">
          <div className="confirmation-modal-icon">
            <i className={getIcon()}></i>
          </div>
          <h4 className="confirmation-modal-title">{modal.title}</h4>
        </div>

        <div className="confirmation-modal-body">
          <p className="confirmation-modal-message">{modal.message}</p>
        </div>

        <div className="confirmation-modal-footer">
          {modal.showCancel && (
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
          <button className="btn btn-primary" onClick={handleConfirm}>
            {modal.showCancel ? "Confirmar" : "OK"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal