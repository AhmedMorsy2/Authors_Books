import { Author } from "../../DataBase/Models/author.model.js";
import bcrypt from "bcrypt";

const emailExist = async (req, res, next) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  let isFound = await Author.findOne({ email: req.body.email });
  if (isFound) return res.status(409).json({ message: "Email Already Exist" });
  req.body.password = await bcrypt.hash(req.body.password, 8);

  next();
};

const checkAuthor = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  let author = await Author.findOne({ email: req.body.email });

  if (!author || !bcrypt.compareSync(req.body.password, author.password))
    return res.status(404).json({ message: "Incorrect email or password" });

  next();
};

const filter = async (req, res, next) => {
  let { name, bio } = req.query;
  if (name) {
    let author = await Author.find({ name: req.query.name });
    if (author.length == 0)
      return res
        .status(404)
        .json({ message: "No author found with the provided name " });
    res.status(200).json({ message: "Success", author });
  } else if (bio) {
    let author = await Author.find({ bio: req.query.bio });
    if (author.length == 0)
      return res
        .status(404)
        .json({ message: "No author found with the provided bio" });
    res.status(200).json({ message: "Success", author });
  }
  next();
};

export { emailExist, checkAuthor, filter };
