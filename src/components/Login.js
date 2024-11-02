import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('cliente'); // Por defecto es cliente
    const navigate = useNavigate(); // Cambié "history" a "navigate"

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, role);
        navigate(role === 'admin' ? '/dashboard' : '/books'); // Usé navigate en lugar de Navigate
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
            </select>
            <button type="submit">Entrar</button>
        </form>
    );
};

export default Login;
