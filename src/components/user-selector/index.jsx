import { useState, useEffect } from 'react';
import { getAllUsersBasic } from '../../services/api/users.js';
import './style.css';

const UserSelector = ({ selectedUser, onUserChange, disabled = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsersBasic();
      setUsers(response.data?.data || []);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="user-selector-loading">Carregando usuários...</div>;
  }

  if (error) {
    return <div className="user-selector-error">Erro ao carregar usuários</div>;
  }

  return (
    <div className="user-selector">
      <select
        value={selectedUser}
        onChange={(e) => onUserChange(e.target.value)}
        disabled={disabled}
        className="user-select"
      >
        <option value="standard">Treino Padrão</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;