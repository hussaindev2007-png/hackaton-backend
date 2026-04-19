import User from '../models/User.js';
import Request from '../models/Request.js';

export const getCommunityStats = async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. Total Requests on Platform (for "Community Stats" requirement)
        const totalPlatformRequests = await Request.countDocuments();
        const totalSolvedRequests = await Request.countDocuments({ status: 'Solved' });

        // 2. User Specific Stats
        const user = await User.findById(userId);
        
        // 3. Simple Ranking Logic: Jitne zyada solved, utna behtar rank
        // Hum un users ko count karenge jinka 'totalSolved' is user se zyada hai
        const higherRankedUsers = await User.countDocuments({ 
            totalSolved: { $gt: user.totalSolved || 0 } 
        });
        const currentRank = higherRankedUsers + 1;

        res.status(200).json({
            success: true,
            stats: {
                totalSolved: user.totalSolved || 0,
                totalRequests: user.totalRequests || 0,
                trustScore: user.trustScore || 85,
                globalRanking: currentRank,
                platformActivity: {
                    total: totalPlatformRequests,
                    solved: totalSolvedRequests,
                    activeHelpers: await User.countDocuments({ totalSolved: { $gt: 0 } })
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Stats fetch failed", error: error.message });
    }
};