const router = require("express").Router();
const User = require("../models/user"); // Ensure the model name is correct
const bcrypt = require("bcryptjs"); // Add bcrypt for password hashing
const jwt = require("jsonwebtoken");
//const book = require("../models/book");
const { authenticateToken } = require("./userAuth");


//Sign-Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Check if the username length is more than 3
        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password length should be greater than 5" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds, adjust as needed

        // Create new user with hashed password
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,  // Store the hashed password
            address: address,
        });

        await newUser.save();
        return res.status(200).json({ message: "SignUp Successfully" });
    } catch (error) {
        console.error("Error during sign-up:", error);  // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});
//sign IN
// Sign-In Route
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user and include the password
        const existingUser = await User.findOne({ username }).select('+password');
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            // Correctly assign authClaims based on actual user data
            const authClaims = {
                name: existingUser.username,
                role: existingUser.role, // This should retrieve the actual role
            };

            const token = jwt.sign({ authClaims }, "bookStore123", {
                expiresIn: "120d",
            });

            return res.status(200).json({
                id: existingUser._id,
                role: existingUser.role,
                token: token,
            });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get user information

router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id);
        return res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//router  address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address updated sucessfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
