import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { BookContext } from '../Context/BookContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const { books, deleteBook } = useContext(BookContext);

    return (
        <div>
            <h2>Bienvenido, {user} (Administrador)</h2>
            <button onClick={logout}>Cerrar Sesión</button>
            <h3>Gestión de Libros</h3>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} - <button onClick={() => deleteBook(book.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <Link to="/">Volver a Inicio</Link>
        </div>
    );
};

export default Dashboard;

