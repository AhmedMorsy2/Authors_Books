import { Book } from "../../DataBase/Models/book.model.js";

const filter = async (req, res, next) => {
  let { title, author } = req.query;

  if (title) {
    let book = await Book.find({ title: req.query.title });
    if (book.length == 0)
      return res
        .status(404)
        .json({ message: "No books found with the provided title" });
    res.status(200).json({ message: "Success", book });
  } else if (author) {
    let book = await Book.find({ author: req.query.author });
    if (book.length == 0)
      return res
        .status(404)
        .json({ message: "No books found for the provided author" });
    res.status(200).json({ message: "Success", book });
  }
  next();
};

export { filter };
