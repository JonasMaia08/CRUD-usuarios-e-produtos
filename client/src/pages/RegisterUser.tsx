import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "../components/Form-user";  // Change to your user form component
import UserTable from "../components/UserTable";
import { userRegister } from "../components/schema";
import useNavigateTo from "../components/useNavigateTo";

const RegisterUser = () => {
    const [users, setUsers] = useState<userRegister[]>([]);
    const [editingUser, setEditingUser] = useState<userRegister | null>(null);
    const GoTo = useNavigateTo();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8800/user/');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("Error fetching users");
        }
    };

    const handleEdit = (id: number) => {
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            console.log("Editing user:", userToEdit); // Debugging line
            setEditingUser(userToEdit);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8800/user/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting user');
            }

            setUsers(users.filter(user => user.id !== id));
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    const addOrUpdateUser = async (user: userRegister) => {
        try {
            const method = editingUser ? 'PUT' : 'POST';
            const url = editingUser ? `http://localhost:8800/user/${editingUser.id}` : 'http://localhost:8800/user/';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                throw new Error(editingUser ? 'Error updating user' : 'Error adding user');
            }
    
            toast.success(editingUser ? "User updated successfully" : "User added successfully");
            setEditingUser(null); // Reset editing state
            fetchUsers(); // Refresh user list
        } catch (error) {
            toast.error(editingUser ? "Error updating user" : "Error adding user");
        }
    };

    return (
        <>
            <header>
                <button
                    onClick={() => GoTo("/")}
                    className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center">
                    Voltar
                </button>
            </header>
            <div>
                <Form 
                    onAddUser={addOrUpdateUser}  // Adjust if the form prop name differs
                    editingUser={editingUser} 
                    setEditingUser={setEditingUser} 
                />
                <UserTable
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
};

export default RegisterUser;
