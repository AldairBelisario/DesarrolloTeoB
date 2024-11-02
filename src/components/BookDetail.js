import React, { useContext } from 'react';
import { BookContext } from '../Context/BookContext';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { books } = useContext(BookContext);
    const { id } = useParams();
    const book = books.find(b => b.id === parseInt(id));

    const handlePurchase = () => {
        alert(`Has comprado ${book.title} por $${book.price}`);
    };

    return (
        <div>
            {book ? (
                <>
                    <h2>{book.title}</h2>
                    <p>Autor: {book.author}</p>
                    <p>Precio: ${book.price}</p>
                    <button onClick={handlePurchase}>Comprar</button>
                </>
            ) : (
                <p>Libro no encontrado.</p>
            )}
        </div>
    );
};

export default BookDetail;

