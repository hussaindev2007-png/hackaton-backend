
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const registerUser = async (req, res) => {
    try {
        const { name, company, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            company,
            email,
            password: hashedPassword,
            role: role || 'seeker'
        });

        await user.save();
        res.status(201).json({ message: "Account created successfully!" });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                role: user.role 
            }
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

        res.status(200).json({ message: "Reset link sent to your email" });

    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
};