import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [book, setBook] = useState({
    name: initialData?.name ?? '',
    author: initialData?.author ?? '',
    price: initialData?.price ?? '',
    quantity: initialData?.quantity ?? '', // Nuevo campo de cantidad
  });

  useEffect(() => {
    setBook({
      name: initialData?.name ?? '',
      author: initialData?.author ?? '',
      price: initialData?.price ?? '',
      quantity: initialData?.quantity ?? ''
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ name: '', author: '', price: '', quantity: '' }); // Resetear el formulario
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h2 className="mb-4">Agregar/Editar Libro</h2>
      <div className="mb-3">
        <label className="form-label">Nombre del libro:</label>
        <input
          type="text"
          name="name"
          value={book.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Autor:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio:</label>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Cantidad:</label>
        <input
          type="number"
          name="quantity"
          value={book.quantity}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default BookForm;
