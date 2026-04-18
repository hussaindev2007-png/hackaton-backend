
export const getDashboardStats = async (req, res) => {
    try {
        
        res.status(200).json({
            welcomeMessage: `Welcome back, ${req.user.name}!`,
            userStats: {
                totalProjects: 5, 
                lastLogin: new Date().toLocaleString(),
                company: req.user.company || "Not specified"
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};