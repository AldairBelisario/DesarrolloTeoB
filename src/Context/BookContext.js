import React, { createContext, useState } from 'react';
import Book from '../models/Book';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([
        new Book(1, 'El Alquimista', 'Paulo Coelho', 10.99),
        new Book(2, 'Cien Años de Soledad', 'Gabriel García Márquez', 12.99),
        new Book(3, '1984', 'George Orwell', 15.99)
    ]);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const updateBook = (updatedBook) => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    };

    const deleteBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    );
};
