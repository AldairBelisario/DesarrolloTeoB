import reflex as rx
from database import Database

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements

class BookStore:
    def __init__(self):
        self.books = LinkedList()

    def add_book(self, title):
        if title:
            self.books.append(title)

    def get_books(self):
        return self.books.display()

# Definir book_title como una variable normal
book_title = ""  # Inicializa como una cadena vacía

book_store = BookStore()

def mostrar_datos():
    libros = book_store.get_books()
    if not libros:
        return "No hay libros en la tienda."
    return "\n".join(libros)

def index():
    global book_title  # Asegúrate de usar la variable global

    return rx.vstack(
        rx.text("Bienvenido a LibroHub"),
        rx.input(
            placeholder="Título del libro",
            on_change=lambda e: update_book_title(e)  # Llama a la función para actualizar el título
        ),
        rx.button("Agregar libro", on_click=lambda: book_store.add_book(book_title)),
        rx.button("Mostrar libros", on_click=lambda: rx.set_value("book_list", mostrar_datos())),
        rx.box(mostrar_datos(), id="book_list"),
        spacing="20px",
        padding="20px",
        background="rgba(240, 240, 240, 0.8)",
        border_radius="10px",
        shadow="md"
    )

def update_book_title(e):
    global book_title
    book_title = e.target.value  # Accede al valor del input correctamente

app = rx.App()
app.add_page(index)

if __name__ == "__main__":
    app.run()