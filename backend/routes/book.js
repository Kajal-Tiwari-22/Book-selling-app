// routes/book.js
const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");

// Route for adding a book
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Create a new book entry
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        // Save the book to the database
        await book.save();
        
        // Send a success response
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update book
router.put("/update-book", authenticateToken,async (req,res) =>{
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({
            message:"Book updated successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//delete-book
router.delete("/delete-book", authenticateToken,async (req,res) =>{
    try{
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            message:"Book deleted Successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get all books
router.get("/get-all-books", async (req, res) =>{
    try{
        const books = await Book.find().sort({ createdAt: -1});
        return res.json({
            status:"Success",
            data:books,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get recent 4 books
router.get("/get-recent-books", async (req, res) =>{
    try{
        const books = await Book.find().sort({ createdAt: -1}).limit(4);
        return res.json({
            status:"Success",
            data:books,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.json({
            status:"Success",
            data:books,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
})
module.exports = router;
