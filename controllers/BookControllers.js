const Book = require("../models/bookModel");

// Method         GET
// Description    Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ count: books.length, books });
  } catch (error) {}
};

// Method         GET
// Description    Get one book from database by id
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({ message: "success", book });
    }
  } catch (error) {
    res.send(error);
  }
};

// Method         POST
// Description    Add new book
const addBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res
        .status(400)
        .send("Please fill all required fields: title, author, publishedYear");
    }
    const newBook = await Book.create({
      title,
      author,
      publishedYear,
    });
    res.status(201).json({ message: "success", newBook });
  } catch (error) {
    res.send(error);
  }
};

// Method         PUT
// Description    Update an existing book in database
const updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res
        .status(400)
        .send("Please fill all required fields: title, author, publishedYear");
    }

    const result = await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      publishedYear,
    });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Method         DELETE
// Description    Delete book by id
const removeBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addBook, getBooks, getBook, updateBook, removeBook };
