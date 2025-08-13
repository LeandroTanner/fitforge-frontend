"use client"

import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPen, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons"

const User = ({ id, name, email, profilePicture, onDelete }) => {
  const editUser = (idUser) => {
    // Navegar para página de edição
    window.location.href = `/users/${idUser}`
  }

  const deleteUser = (idUser, username) => {
    if (onDelete) {
      onDelete(idUser, username)
    } else {
      // Fallback para o comportamento antigo
      const confirm = window.confirm("Tem certeza que deseja excluir esse usuário? A ação não pode ser desfeita.")
      if (confirm) alert(`[ID: ${idUser}] Você excluiu ${username} definitivamente.`)
    }
  }

  // Gera as iniciais do nome
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    /* ------ Div do card geral de usuários */
    <div className="user-card">
      {/* ------ Seção da foto de perfil do usuário */}
      <div className="user-card-avatar">
        {profilePicture ? (
          <img src={profilePicture || "/placeholder.svg"} alt={`Foto de ${name}`} />
        ) : (
          <div className="user-card-avatar-fallback">{getInitials(name)}</div>
        )}
      </div>
      {/* ------ FINAL da seção da foto de perfil do usuário */}
      {/* ------ Seção de informações básicas do usuário */}
      <div className="user-card-info">
        <div className="user-card-row">
          {" "}
          {/* --- Nome */}
          <FontAwesomeIcon icon={faUser} className="user-card-icon" />
          <span className="user-card-name">{name}</span>
        </div>
        <div className="user-card-row">
          {" "}
          {/* --- Email */}
          <FontAwesomeIcon icon={faEnvelope} className="user-card-icon" />
          <span className="user-card-email">{email}</span>
        </div>
      </div>
      {/* ------ FINAL da seção de informações básicas do usuário */}
      <span className="user-card-badge">Ativo</span> {/* ----- Status de ativo */}
      {/* ------ Seção dos botoões de ação { editar - excluir } */}
      <div className="user-card-actions">
        <button className="user-card-btn user-card-btn-edit" onClick={() => editUser(id)} title="Editar usuário">
          <FontAwesomeIcon icon={faPen} /> Editar
        </button>{" "}
        {/* ------ Botão de editar */}
        <button
          className="user-card-btn user-card-btn-delete"
          onClick={() => deleteUser(id, name)}
          title="Excluir usuário"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Excluir
        </button>{" "}
        {/* ------ Botão de excluir */}
      </div>
      {/* ------ FINAL da seção dos botoões de ação { editar - excluir } */}
      {/* ------ FINAL DO CARD GERAL */}
    </div>
  )
}

export default User
