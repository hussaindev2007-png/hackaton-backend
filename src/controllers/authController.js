import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Register new user
// @route   POST /api/auth/signup
export const registerUser = async (req, res) => {
    try {
        const { name, company, email, password } = req.body;

        // Validation logic
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            company,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "Account created successfully!" });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
};
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        const resetToken = "mock-reset-token-123"; 

        console.log(`***********************************************`);
        console.log(`RESET LINK FOR: ${email}`);
        console.log(`LINK: http://localhost:3000/reset-password/${resetToken}`);
        console.log(`***********************************************`);

        res.status(200).json({ message: "Reset link sent to your email" });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
};