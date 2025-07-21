// models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  title: String,
  author: String,
  price: String,
  date: String,
});

export default mongoose.model("Book", bookSchema);
