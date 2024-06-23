import { Book } from "../../../DataBase/Models/book.model.js";

const addBook = async (req, res) => {
  let { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(404).json({ message: "All fields required" });
  }
  let book = await Book.insertMany(req.body);
  res.status(201).json({ message: "Success", book });
};

const allBooks = async (req, res) => {
  let books = await Book.find().populate("author");
  res.status(200).json({ message: "Success", books });
};

const oneBook = async (req, res) => {
  let bookId = req.params.id;
  let book = await Book.findById({ _id: bookId }).populate("author");
  res.status(200).json({ message: "Success", book });
};

const updateBook = async (req, res) => {
  let book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Success", book });
};

const deleteBook = async (req, res) => {
  let book = await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Success", book });
};

const filterBooks = async (req, res) => {
  try {
    res.status(404).json({ message: "Query params are required" });
  } catch (err) {
    console.log(err);
  }

};

export { addBook, allBooks, oneBook, updateBook, deleteBook, filterBooks };
