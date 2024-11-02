import React from 'react';
import BookList from '../components/BookList';

const Books = ({ books, onDelete }) => {
    return (
        <div>
            <h1>Libros Disponibles</h1>
            <BookList books={books} onDelete={onDelete} />
        </div>
    );
};

export default Books;
