import React, { useState } from 'react';

const BookList = ({ books, onAddToCart }) => {
  const [quantities, setQuantities] = useState({}); // Estado para cantidades de cada libro

  const handleQuantityChange = (code, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: Math.max(1, value), // Asegura que la cantidad mínima sea 1
    }));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Lista de Libros</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.code} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{book.name}</h5>
              <p className="mb-1">Autor: {book.author}</p>
              <p className="mb-1">Precio: ${book.price}</p>
              <p className="mb-1">Cantidad disponible: {book.quantity}</p>
              <p className="mb-1">Código: {book.code}</p>
            </div>
            <div>
              <input
                type="number"
                min="1"
                max={book.quantity}
                value={quantities[book.code] || 1} // Valor de cantidad seleccionado
                onChange={(e) => handleQuantityChange(book.code, parseInt(e.target.value))}
                className="form-control mb-2"
                style={{ width: '70px' }}
              />
              <button
                onClick={() => onAddToCart(book, quantities[book.code] || 1)}
                className="btn btn-primary btn-sm"
              >
                Agregar al Carrito
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
