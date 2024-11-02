import sqlite3

class Database:
    def __init__(self, db_name="books.db"):
        self.connection = sqlite3.connect(db_name)
        self.cursor = self.connection.cursor()
        self.create_table()

    def create_table(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL
            )
        ''')
        self.connection.commit()

    def add_book(self, title):
        self.cursor.execute('INSERT INTO books (title) VALUES (?)', (title,))
        self.connection.commit()

    def get_books(self):
        self.cursor.execute('SELECT title FROM books')
        return [row[0] for row in self.cursor.fetchall()]

    def close(self):
        self.connection.close()


## Modificar BookStore para que utilize la clase Database para agregar y obtener libros.