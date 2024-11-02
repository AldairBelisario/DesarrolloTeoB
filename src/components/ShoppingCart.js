import React, { useState } from 'react';

const ShoppingCart = ({ cart, onUpdateQuantity, onRemoveFromCart, onPurchase }) => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerSignature, setCustomerSignature] = useState('');

  const total = cart.reduce((acc, book) => acc + parseFloat(book.price) * book.quantity, 0);

  const handlePurchase = () => {
    setShowCustomerForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (customerName && customerAddress && customerSignature) {
      onPurchase({ customerName, customerAddress, customerSignature });
      setPurchaseComplete(true);
      setShowCustomerForm(false);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="container my-4">
      <h2>Carrito de Compras</h2>
      {purchaseComplete ? (
        <div className="text-center">
          <h4>¡Compra exitosa!</h4>
          <p>Gracias por su compra en LibroHub. Esperamos que disfrute su lectura.</p>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((book) => (
              <li key={book.code} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{book.name}</h5>
                  <p>Precio: ${book.price}</p>
                  <div className="d-flex align-items-center">
                    <label htmlFor={`quantity-${book.code}`} className="me-2">Cantidad:</label>
                    <input
                      id={`quantity-${book.code}`}
                      type="number"
                      min="1"
                      value={book.quantity}
                      onChange={(e) => onUpdateQuantity(book.code, parseInt(e.target.value))}
                      className="form-control"
                      style={{ width: '70px' }}
                    />
                  </div>
                </div>
                <button onClick={() => onRemoveFromCart(book.code)} className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button onClick={handlePurchase} className="btn btn-primary">Comprar</button>
          
          {showCustomerForm && (
            <form onSubmit={handleFormSubmit} className="mt-4">
              <h4>Detalles del Cliente</h4>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">Nombre:</label>
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerAddress" className="form-label">Dirección:</label>
                <input
                  id="customerAddress"
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerSignature" className="form-label">Teléfono:</label>
                <input
                  id="customerSignature"
                  type="text"
                  value={customerSignature}
                  onChange={(e) => setCustomerSignature(e.target.value)}
                  className="form-control"
                  placeholder="Escriba su Teléfono"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Confirmar Compra</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
