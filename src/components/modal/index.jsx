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

  const getModalClass = () => {
    switch (modal.status) {
      case "success":
        return "modal-success"
      case "danger":
        return "modal-danger"
      default:
        return "modal-info"
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
    <div className="modal-overlay" onClick={hideModal}>
      <div className={`modal-content ${getModalClass()}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">
            <i className={getIcon()}></i>
          </div>
          <h4 className="modal-title">{modal.title}</h4>
        </div>

        <div className="modal-body">
          <p className="modal-message">{modal.message}</p>
        </div>

        <div className="modal-footer">
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
