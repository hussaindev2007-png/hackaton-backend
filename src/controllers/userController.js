import User from '../models/User.js';

export const onboardUser = async (req, res) => {
    try {
        const { role, skills, location } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role, skills, location, isOnboarded: true },
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};