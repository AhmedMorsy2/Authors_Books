import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  publishedDate: Date,
});

export const Book = model("Book", schema);
