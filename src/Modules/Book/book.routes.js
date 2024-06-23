import { Router } from "express";
import {
  addBook,
  allBooks,
  oneBook,
  updateBook,
  deleteBook,
  filterBooks,
} from "./book.controller.js";
import { filter } from "../../Middlewares/book.middleware.js";

const booksRouter = Router();

booksRouter.post("/add", addBook);
booksRouter.get("/", allBooks);
booksRouter.get("/:id", oneBook);
booksRouter.put("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);
booksRouter.get("/search/filter", filter, filterBooks);
export default booksRouter;
