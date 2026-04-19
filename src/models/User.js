// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     company: { type: String },

//     // --- PROJECT SPECIFIC FIELDS (MANDATORY) ---
    
//     // Role selection: User madad chahta hai ya karna chahta hai
//     role: { 
//         type: String, 
//          enum: ['seeker', 'helper', 'both'], 
       
//     },

//     // Skills aur Interests (Onboarding Page ke liye)
//     skills: { type: [String], default: [] },
//     interests: { type: [String], default: [] },

//     // Location (Requirement check)
//     location: { type: String, default: "Remote" },

//     // Trust score & Badges (Gamification/Bonus logic)
//     trustScore: { type: Number, default: 0 },
//     badges: { type: [String], default: [] },

//     // Tracking: Taake pata chale user ne onboarding form bhar diya hai
//     isOnboarded: { type: Boolean, default: false }

// }, { timestamps: true });

// const User = mongoose.model('User', UserSchema);
// export default User;






































import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String },

    // Role selection
    role: { 
        type: String, 
        enum: ['seeker', 'helper', 'both'],
        default: 'both'
    },

    // Skills aur Interests (AI Matching ke liye ye "skills" array ka hona lazmi hai)
    skills: { type: [String], default: [] },
    interests: { type: [String], default: [] },

    location: { type: String, default: "Remote" },

    // --- RANKING & GAMIFICATION (Ye fields Dashboard ko "Real" banayengi) ---
    trustScore: { type: Number, default: 85 }, // Default score 85 rakhte hain premium feel ke liye
    badges: { type: [String], default: [] },
    
    // Tracking for Leaderboard
    totalSolved: { type: Number, default: 0 }, // Kitni requests solve kin
    totalRequests: { type: Number, default: 0 }, // Kitni help maangi
    ranking: { type: Number, default: 0 }, // Global rank position
    
    // Profile Identity
    bio: { type: String, default: "" }, 
    isOnboarded: { type: Boolean, default: false }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;