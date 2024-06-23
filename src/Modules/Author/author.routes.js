import { Router } from "express";
import {
  checkAuthor,
  emailExist,
  filter,
} from "../../Middlewares/author.middleware.js";
import {
  allAuthors,
  deleteAuthor,
  filterAuthors,
  oneAuthor,
  signin,
  signup,
  updateAuthor,
} from "./author.controller.js";

const authorRouter = Router();

authorRouter.post("/signup", emailExist, signup);
authorRouter.post("/signin", checkAuthor, signin);
authorRouter.get("/", allAuthors);
authorRouter.get("/:id", oneAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

authorRouter.get("/search/filter", filter, filterAuthors);

export default authorRouter;
