const express = require('express');
const router = express.Router();
const books = require('./data.json');

let bookIdCounter = books.length; 

router.get('/', (req, res) => {
  res.json(books);
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(books.filter((ele) => ele.id === parseInt(id)));
});

router.post('/', (req, res) => {
  const body = req.body;
  const newBook = {
    id: ++bookIdCounter,
    title: body.title,
    author: body.author
  };
  books.push(newBook);
  res.json({ message: 'The book has been added', book: newBook });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  books.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      books[index] = body;
    }
  });
  res.json({ message: `The book has been updated` });
});

router.delete('/:id', (req, res) => {
  try{const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `Book has been deleted` });
  } else {
    res.status(404).json({ message: `Book not found` });
  }}
  catch(err){
    console.log(err);
    res.status(500).json(err)}
});

module.exports = router;
