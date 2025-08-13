"use client"

import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider")
  }
  return context
}

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    status: "info", // success, info, danger
    onConfirm: null,
    onCancel: null,
    showCancel: false,
  })

  const showModal = ({ title, message, status = "info", onConfirm, onCancel, showCancel = false }) => {
    setModal({
      isOpen: true,
      title,
      message,
      status,
      onConfirm,
      onCancel,
      showCancel,
    })
  }

  const hideModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  const showSuccess = (title, message, onConfirm) => {
    showModal({ title, message, status: "success", onConfirm })
  }

  const showInfo = (title, message, onConfirm) => {
    showModal({ title, message, status: "info", onConfirm })
  }

  const showDanger = (title, message, onConfirm) => {
    showModal({ title, message, status: "danger", onConfirm })
  }

  const showConfirm = (title, message, onConfirm, onCancel) => {
    showModal({
      title,
      message,
      status: "info",
      onConfirm,
      onCancel,
      showCancel: true,
    })
  }

  const value = {
    modal,
    showModal,
    hideModal,
    showSuccess,
    showInfo,
    showDanger,
    showConfirm,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
