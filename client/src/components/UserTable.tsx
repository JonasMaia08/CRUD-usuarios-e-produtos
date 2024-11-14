import React, { useState } from "react";
import { userRegister } from "./schema";

interface UserTableProps {
  users: userRegister[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [visibleItems, setVisibleItems] = useState(10);
  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 5);
  };

  return (
    <div className="mt-4">
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">E-mail</th>
            <th className="border p-2">Telefone</th>
            <th className="border p-2">Data de Nascimento</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, visibleItems).map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.nome}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.telefone}</td>
              <td className="border p-2">{user.data_nascimento}</td>
              <td className="border p-2">
                <button onClick={() => onEdit(user.id!)} className="mr-2 text-blue-500">
                  Edit
                </button>
                <button onClick={() => onDelete(user.id!)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {visibleItems < users.length && (
        <button onClick={loadMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Carregar mais
        </button>
      )}
    </div>
  );
};

export default UserTable;
