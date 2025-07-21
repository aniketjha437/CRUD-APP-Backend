import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a book
app.post("/api/books", async (req, res) => {
  const { name, title, author, price, date } = req.body;
  try {
    const newBook = new Book({ name, title, author, price, date });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to add book" });
  }
});

// Delete a book
app.delete("/api/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Update a book
app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { name, title, author, price, date } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, title, author, price, date },
      { new: true } // returns updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to update book" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
