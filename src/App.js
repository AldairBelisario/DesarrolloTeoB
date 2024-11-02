import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/App.css';
import jsPDF from 'jspdf';
import Home from './pages/Home';
import About from './pages/About';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ShoppingCart from './components/ShoppingCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const API_URL = 'http://localhost:5000/api/books';

const App = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error al cargar los libros:", error);
    }
  };

  const saveBooks = async (updatedBooks) => {
    try {
      await axios.post(API_URL, { books: updatedBooks });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error al guardar los libros:", error);
    }
  };

  const addBook = (newBook) => {
    const maxId = books.length > 0 ? Math.max(...books.map((book) => book.id)) : 0;
    const updatedBooks = [
      ...books,
      { ...newBook, id: maxId + 1 },
    ];
    saveBooks(updatedBooks);
  };

  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    saveBooks(updatedBooks);
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    saveBooks(updatedBooks);
  };

  const addToCart = (book, quantity) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.code === book.code);
      if (existingBook) {
        return prevCart.map((item) =>
          item.code === book.code
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...book, quantity }];
    });
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setActionType("edit");
    setShowPasswordModal(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setActionType("delete");
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (tempPassword === "password") {
      if (actionType === "edit") {
        setEditingBook(selectedBook);
      } else if (actionType === "delete") {
        deleteBook(selectedBook.id);
      }
      handleCloseModal();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setTempPassword("");
    setSelectedBook(null);
    setActionType("");
  };

  const onUpdateQuantity = (code, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.code === code ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  
  const onRemoveFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((item) => item.code !== code));
  };
  
  const handlePurchase = (customerInfo) => {
    const updatedBooks = books.map((book) => {
      const cartItem = cart.find((item) => item.code === book.code);
      if (cartItem) {
        return { ...book, quantity: book.quantity - cartItem.quantity };
      }
      return book;
    });
  
    saveBooks(updatedBooks);
    generatePDF(customerInfo);
    setCart([]);
  };
  
  const generatePDF = ({ customerName, customerAddress, customerSignature }) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("LibroHub", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text("Boleta de Compra", 105, 25, { align: "center" });
    doc.setFontSize(10);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);  
    doc.text("Nombre del Cliente:", 10, 35);
    doc.text(customerName, 60, 35);
    doc.text("Dirección:", 10, 40);
    doc.text(customerAddress, 60, 40);
    doc.text("Teléfono:", 10, 45);
    doc.text(customerSignature, 60, 45);
    doc.line(10, 50, 200, 50);  
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("Detalle de la Compra", 10, 60);
    doc.setFontSize(10);
    doc.text("Producto", 10, 70);
    doc.text("Cantidad", 90, 70);
    doc.text("Precio Unitario", 120, 70);
    doc.text("Subtotal", 160, 70);
    doc.line(10, 75, 200, 75);  
    let yOffset = 80;
    doc.setFont("Helvetica", "normal");
    cart.forEach((book, index) => {
      const price = parseFloat(book.price);
      const subtotal = price * book.quantity;
      doc.text(`${index + 1}. ${book.name}`, 10, yOffset);
      doc.text(`${book.quantity}`, 90, yOffset);
      doc.text(`$${price.toFixed(2)}`, 120, yOffset);
      doc.text(`$${subtotal.toFixed(2)}`, 160, yOffset);
      yOffset += 10;
    });
  
    const total = cart.reduce((acc, book) => acc + parseFloat(book.price) * book.quantity, 0);
    doc.line(10, yOffset, 200, yOffset);  
    doc.setFont("Helvetica", "bold");
    doc.text("Total:", 120, yOffset + 10);
    doc.text(`$${total.toFixed(2)}`, 160, yOffset + 10);
    doc.line(10, yOffset + 15, 200, yOffset + 15);  
  
    doc.setFontSize(12);
    doc.setFont("Helvetica", "italic");
    doc.text("Gracias por su compra en LibroHub.", 105, yOffset + 30, { align: "center" });
    doc.save("boleta_librohub.pdf");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/books"
            element={
              <BookList
                books={books}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/add-book"
            element={
              <BookForm
                onSubmit={editingBook ? updateBook : addBook}
                initialData={editingBook}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCart
                cart={cart}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
                onPurchase={handlePurchase}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Modal de contraseña */}
      <Modal show={showPasswordModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ingresar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default App;

