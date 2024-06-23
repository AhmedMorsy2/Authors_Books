import express from "express";
import cors from "cors";
import { db } from "./DataBase/dbConnection.js";
import authorRouter from "./src/Modules/Author/author.routes.js";
import booksRouter from "./src/Modules/Book/book.routes.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/author", authorRouter);
app.use("/books", booksRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
