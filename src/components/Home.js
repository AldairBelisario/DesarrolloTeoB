import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Bienvenido a LibroHub</h1>
            <Link to="/books">Ver Libros</Link>
            <Link to="/login">Iniciar Sesión</Link>
        </div>
    );
};

export default Home;
