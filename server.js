const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Lista de livros simulada
let books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" }
];

// Endpoint para recuperar todos os livros
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Endpoint para adicionar um novo livro
app.post('/api/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Endpoint para recuperar informações de um livro por ID
app.get('/api/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);
    const book = books.find(book => book.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found.' });
    }
});

// Endpoint para atualizar informações de um livro por ID
app.put('/api/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        res.json(books[index]);
    } else {
        res.status(404).json({ error: 'Book not found.' });
    }
});

// Endpoint para excluir um livro por ID
app.delete('/api/books/:book_id', (req, res) => {
    const bookId = parseInt(req.params.book_id);
    const index = books.findIndex(book => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Book not found.' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
