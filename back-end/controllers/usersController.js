import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import 'dotenv/config.js'

/************************  Create JWT Token *************************/
const createToken = (_id, role) => {
    return jwt.sign({_id, role}, process.env.SECRET, { expiresIn: "10h" });
}

/************************  Register User *************************/
const registerUser = async (req, res) => {
    //  Grab data from request body
    const {email, password, role} = req.body;

    // Check the fields are not empty
    console.log(req.body)
    if (!email || !password || !role) {
        return res.status(400).json({error: "All fields are required."});
    }

    // Check if email already exist
    const exist = await User.findOne({ email})
    if (exist) {
        return res.status(400).json({error: 'Email already exists'});
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
        // Register the user
        const user = await User.create({email, password : hashed, role: role || "user"});
        // Create th JsonWebToken
        const token = createToken(user._id, user.role)
        // Send the response
        res.status(200).json({email, role: user.role, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/************************  Login User *************************/
const loginUser = async (req, res) => {
    //  Grab data from request body
    const {email, password} = req.body;

    // Check the fields are not empty
    if (!email || !password) {
        return res.status(400).json({error: "All fields are required."});
    }

    // Check if email already exist
    const user = await User.findOne({ email})
    if (!user) {
        return res.status(400).json({error: 'Incorrect email.'});
    }

    // Check Password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(400).json({error: 'Incorrect password'});
    }

    try {
        // Create th JsonWebToken
        const token = createToken(user._id, user.role)

        res.status(200).json({
            email: user.email,
            books: user.books || [],
            role: user.role,
            token
        })
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

/************************  Logout User *************************/
const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/************************  User cart  *************************/
const userLogin = async  (req, res) => {
    res.json({ message: "Welcome back!" , user: req.user })
}



/************************  Admin Dashboard  *************************/
const adminLogin =   (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard"})
}

export {registerUser, loginUser, logoutUser, userLogin, adminLogin };