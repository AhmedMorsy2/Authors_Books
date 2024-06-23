import { Author } from "../../../DataBase/Models/author.model.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    let author = await Author.insertMany(req.body);
    author[0].password = undefined;
    res.status(201).json({ message: "Success", author });
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res) => {
  try {
    jwt.sign({ authEmail: req.body.email }, "Morsy", (err, token) => {
      res.status(200).json({ message: "Success", token });
    });
  } catch (err) {
    console.log(err);
  }
};

const allAuthors = async (req, res) => {
  try {
    let authors = await Author.find().populate("books");
    res.status(200).json({ message: "Success", authors });
  } catch (err) {
    console.log(err);
  }
};

const oneAuthor = async (req, res) => {
  try {
    let authorId = req.params.id;
    let author = await Author.findById({ _id: authorId }).populate("book");
    res.status(200).json({ message: "Success", author });
  } catch (err) {
    console.log(err);
  }
};

const updateAuthor = async (req, res) => {
  try {
    let { token } = req.headers;
    jwt.verify(token, "Morsy", async (err, decode) => {
      if (err) return res.status(401).json({ message: "Not Authorized" });
      let authorId = req.params.id;
      let updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Success", updatedAuthor });
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    let { token } = req.headers;
    jwt.verify(token, "Morsy", async (err, decode) => {
      if (err) return res.status(401).json({ message: "Not Authorized" });

      let authorId = req.params.id;
      let deletedAuthor = await Author.findByIdAndDelete(authorId);

      res.status(200).json({ message: "Success", deletedAuthor });
    });
  } catch (err) {
    console.log(err);
  }
};

const filterAuthors = async (req, res) => {
  try {
    res.status(404).json({ message: "Query params are required" });
  } catch (err) {
    console.log(err);
  }
};

export {
  signup,
  signin,
  allAuthors,
  oneAuthor,
  updateAuthor,
  deleteAuthor,
  filterAuthors,
};
