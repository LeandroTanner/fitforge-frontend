"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllUsers, deleteUser } from "../../services/api/users.js"
import { useModal } from "../../contexts/ModalContext.jsx"
import User from "../../components/cards/user/index.jsx"
import Loading from "../../components/loader/index.jsx"
import "./style.css"
import HeaderAdm from "../../components/page-header/header-adm/index.jsx"
import { Users2Icon } from "lucide-react"
import InputSearch from "../../components/inputs/inputSearch/index.jsx"
import UserModal from "../../components/modal/userModal/index.jsx"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const { showConfirm, showSuccess, showDanger } = useModal()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUserCreated = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    showSuccess("Usuário criado", `O usuário "${newUser.name}" foi criado com sucesso.`);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === user.id ? updatedUser : user
    ));
    showSuccess("Usuário atualizado", `O usuário "${updatedUser.name}" foi atualizado com sucesso.`);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllUsers()
      const usersFromResponse = response.data?.data || []
      setUsers(usersFromResponse)
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
      setError(err.message || "Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = (userId, userName) => {
    showConfirm(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o usuário "${userName}"? Esta ação não pode ser desfeita.`,
      async () => {
        try {
          await deleteUser(userId)
          setUsers(users.filter((user) => user.id !== userId))
          showSuccess("Usuário Excluído", `O usuário "${userName}" foi excluído com sucesso.`)
        } catch (err) {
          showDanger("Erro ao Excluir", `Não foi possível excluir o usuário "${userName}". Tente novamente.`)
        }
      },
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erro ao carregar usuários!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={fetchUsers}>
            <i className="fas fa-redo me-2"></i>
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="users-page">
      {/* Header */}
      <HeaderAdm 
        title="Controle de usuários"
        description="Gerencie os usuários do sistema, adicione novos, edite ou exclua conforme necessário."
        icon={<Users2Icon className="me-2 mb-2" size={35} />}
      />

      {/* Search Input */}
      <InputSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuários por nome ou email..."
      />

      

      {/* Content */}
      <div className="container mt-4">
        {filteredUsers.length > 0 ? (
          <div className="container-users-cards">
            {filteredUsers.map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                profilePicture={user.profilePicture}
                onDelete={handleDeleteUser}
              />
            ))}

            {/* Add New User Card */}
            <div className="add-user-card">
              <button onClick={() => setIsModalOpen(true)} className="add-user-link">
                <div className="add-user-icon">
                  <i className="fas fa-plus"></i>
                </div>
                <h5>Adicionar Novo Usuário</h5>
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>{search ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}</h3>
            <p>{search ? "Tente buscar por outro nome ou email." : "Crie um novo usuário."}</p>
            {!search && (
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-lg">
              <i className="fas fa-plus me-2"></i>
              Adicionar Primeiro Usuário
              </button>
            )}
          </div>
        )}
      </div>

      {/* ====== Modal de criação de usuário ====== */}
      <UserModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onUserCreated={handleUserCreated}
        onUserUpdated={handleUserUpdated}
        userToEdit={editingUser}
        isEditing={!!editingUser} 
      />

    </div>
  )
}

export default Users
