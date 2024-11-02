import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/about">Acerca de Nosotros</Link>
            <Link to="/books">Libros Disponibles</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/admin">Admin</Link>
        </nav>
    );
};

export default Navbar;
