// // Request Schema update
// const requestSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Seeker
//   helperId: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Helper
//   title: String,
//   description: String,
//   category: String,
//   urgency: String,
//   status: { 
//     type: String, 
//     enum: ['Open', 'In Progress', 'Solved'], 
//     default: 'Open' 
//   }
// }, { timestamps: true });

// export default Request;

import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    helperId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    
    // --- AI GENERATED FIELDS ---
    category: { 
        type: String, 
        default: "General" 
    },
    urgency: { 
        type: String, 
        enum: ['High', 'Medium', 'Low'], 
        default: 'Medium' 
    },
    tags: { 
        type: [String], 
        default: [] 
    },
    aiSummary: { 
        type: String, 
        default: "" 
    },
    // ---------------------------

    status: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Solved'], 
        default: 'Open' 
    },

    // Bonus: Task completion time track karne ke liye
    solvedAt: { 
        type: Date, 
        default: null 
    }

}, { timestamps: true });

// Indexing for faster search (Optional but good for premium feel)
requestSchema.index({ title: 'text', tags: 'text' });

const Request = mongoose.model('Request', requestSchema);
export default Request;