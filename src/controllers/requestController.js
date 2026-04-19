// import Request from '../models/Request.js';

// export const createRequest = async (req, res) => {
//     try {
//         const { title, description, category, userId } = req.body;

//         // --- QUICK AI LOGIC (Mandatory Requirement) ---
//         const highUrgencyKeywords = ['urgent', 'emergency', 'help', 'deadline', 'now', 'exam'];
//         const isUrgent = highUrgencyKeywords.some(word => 
//             description.toLowerCase().includes(word) || title.toLowerCase().includes(word)
//         );
//         const urgency = isUrgent ? 'High' : 'Medium';

//         const newRequest = new Request({
//             userId,
//             title,
//             description,
//             category,
//             urgency // AI se detect kiya hua
//         });

//         const savedRequest = await newRequest.save();
//         res.status(201).json(savedRequest);
//     } catch (error) {
//         res.status(500).json({ message: "Request creation failed", error });
//     }
// };

// export const getAllRequests = async (req, res) => {
//     try {
//         const requests = await Request.find().populate('userId', 'name skills');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Fetching failed" });
//     }
// };








// ai









// import Request from '../models/Request.js';
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export const createRequest = async (req, res) => {
//     try {
//         const { title, description, userId } = req.body;

//         // --- 🤖 REAL AI LOGIC WITH GROQ ---
//         const completion = await groq.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "Analyze the help request and return ONLY a JSON object with: category (one word), urgency (High, Medium, or Low), and tags (array of 3 words)."
//                 },
//                 {
//                     role: "user",
//                     content: `Title: ${title}, Description: ${description}`
//                 }
//             ],
//             model: "llama-3.3-70b-versatile",
//             response_format: { type: "json_object" }
//         });

//         const aiAnalysis = JSON.parse(completion.choices[0].message.content);

//         const newRequest = new Request({
//             userId,
//             title,
//             description,
//             category: aiAnalysis.category || "General",
//             urgency: aiAnalysis.urgency || "Medium",
//             tags: aiAnalysis.tags || [] 
//         });

//         const savedRequest = await newRequest.save();
//         res.status(201).json({
//             success: true,
//             data: savedRequest,
//             aiSummary: "AI analyzed your request and assigned tags/urgency."
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "AI Request failed", error });
//     }
// };

// // Baaki getAllRequests same rahega...
// export const getAllRequests = async (req, res) => {
//     try {
//         const requests = await Request.find().populate('userId', 'name skills');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Fetching failed" });
//     }
// };





// updated




// import Request from '../models/Request.js';
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // 1. SEEKER: Create a new help request (with AI analysis)
// export const createRequest = async (req, res) => {
//     try {
//         const { title, description, userId } = req.body;

//         const completion = await groq.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "Analyze the help request and return ONLY a JSON object with: category (one word), urgency (High, Medium, or Low), and tags (array of 3 words)."
//                 },
//                 {
//                     role: "user",
//                     content: `Title: ${title}, Description: ${description}`
//                 }
//             ],
//             model: "llama-3.3-70b-versatile",
//             response_format: { type: "json_object" }
//         });

//         const aiAnalysis = JSON.parse(completion.choices[0].message.content);

//         const newRequest = new Request({
//             userId,
//             title,
//             description,
//             category: aiAnalysis.category || "General",
//             urgency: aiAnalysis.urgency || "Medium",
//             tags: aiAnalysis.tags || [],
//             status: 'Open' // Default status
//         });

//         const savedRequest = await newRequest.save();
//         res.status(201).json({
//             success: true,
//             data: savedRequest,
//             aiSummary: "AI analyzed your request and assigned tags/urgency."
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "AI Request failed", error });
//     }
// };

// // 2. HELPER: Get all OPEN requests to show on Explore Feed
// export const getAllRequests = async (req, res) => {
//     try {
//         // Sirf 'Open' status wali requests dikhayenge taake helpers ko kaam mile
//         const requests = await Request.find({ status: 'Open' }).populate('userId', 'name skills');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Fetching failed" });
//     }
// };

// // 3. HELPER: Accept/Solve a request
// // Is line ko thora aur detail mein likhte hain debugging ke liye
// export const acceptRequest = async (req, res) => {
//     try {
//         const id = req.params.requestId; // Make sure this matches router.put('/accept/:requestId', ...)
//         const { helperId } = req.body;

//         console.log("Updating ID:", id); // Check terminal if this prints correctly
//         console.log("Helper ID:", helperId);

//         const updatedRequest = await Request.findByIdAndUpdate(
//             id, 
//             { status: 'Solved', helperId: helperId },
//             { new: true, runValidators: true } // Validators on rakhein
//         );

//         if (!updatedRequest) {
//             return res.status(404).json({ message: "Request ID not found in DB" });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Help recorded successfully!",
//             data: updatedRequest
//         });
//     } catch (error) {
//         console.error("Database Error:", error); // Terminal mein asli error dikhega
//         res.status(500).json({ message: "Could not update request", error: error.message });
//     }
// };































// import Request from '../models/Request.js';
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // 1. SEEKER: Nayi help request create karna (AI Analysis ke saath)
// export const createRequest = async (req, res) => {
//     try {
//         const { title, description, userId } = req.body;

//         const completion = await groq.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "Analyze the help request and return ONLY a JSON object with: category (one word), urgency (High, Medium, or Low), and tags (array of 3 words)."
//                 },
//                 {
//                     role: "user",
//                     content: `Title: ${title}, Description: ${description}`
//                 }
//             ],
//             model: "llama-3.3-70b-versatile",
//             response_format: { type: "json_object" }
//         });

//         const aiAnalysis = JSON.parse(completion.choices[0].message.content);

//         const newRequest = new Request({
//             userId,
//             title,
//             description,
//             category: aiAnalysis.category || "General",
//             urgency: aiAnalysis.urgency || "Medium",
//             tags: aiAnalysis.tags || [],
//             status: 'Open'
//         });

//         const savedRequest = await newRequest.save();
//         res.status(201).json({
//             success: true,
//             data: savedRequest,
//             aiSummary: "AI analyzed your request and assigned tags/urgency."
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "AI Request failed", error });
//     }
// };

// // 2. HELPER: Explore Feed (Saari 'Open' requests dekhna)
// export const getAllRequests = async (req, res) => {
//     try {
//         const requests = await Request.find({ status: 'Open' }).populate('userId', 'name skills');
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ message: "Fetching failed" });
//     }
// };

// // 3. HELPER: Request accept/solve karna
// export const acceptRequest = async (req, res) => {
//     try {
//         const id = req.params.requestId;
//         // Agar body mein helperId nahi hai, toh isko optional rakhein ya req.user se lein
//         const helperId = req.body.helperId || null; 
// console.log(helperId);

//         const updatedRequest = await Request.findByIdAndUpdate(
//             id, 
//             { 
//                 status: 'Solved', // Status update
//                 helper: helperId  // Make sure aapke Schema mein 'helper' hi naam hai
//             },
//             { new: true, runValidators: true }
//         );

//         if (!updatedRequest) {
//             return res.status(404).json({ message: "Request ID not found in DB" });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Help recorded successfully!",
//             data: updatedRequest
//         });
//     } catch (error) {
//         console.error("Database Error:", error);
//         res.status(500).json({ message: "Could not update request", error: error.message });
//     }
// };

// // 4. BOTH: User ki apni history (Requests created OR helped)
// export const getMyRequests = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         // User ne jo mangi wo bhi, aur jo solve ki wo bhi
//         const myRequests = await Request.find({
//             $or: [{ userId: userId }, { helperId: userId }]
//         }).sort({ createdAt: -1 });

//         res.status(200).json({ success: true, data: myRequests });
//     } catch (error) {
//         res.status(500).json({ message: "History fetch failed", error: error.message });
//     }
// };




























import Request from '../models/Request.js';
import User from '../models/User.js'; // Skills check karne ke liye
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1. CREATE REQUEST (With Auto-Categorization & AI Summary)
export const createRequest = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Analyze the help request. Return ONLY a JSON object with: 
                    category (one word), 
                    urgency (High, Medium, or Low based on context), 
                    tags (array of 3 specific technical words),
                    aiSummary (max 15 words summary for a quick glance).`
                },
                { role: "user", content: `Title: ${title}, Description: ${description}` }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const ai = JSON.parse(completion.choices[0].message.content);

        const newRequest = new Request({
            userId,
            title,
            description,
            category: ai.category || "General",
            urgency: ai.urgency || "Medium",
            tags: ai.tags || [],
            aiSummary: ai.aiSummary, // Frontend par helper ko dikhane ke liye
            status: 'Open'
        });

        await newRequest.save();
        res.status(201).json({ success: true, data: newRequest });

    } catch (error) {
        res.status(500).json({ message: "AI Analysis failed", error: error.message });
    }
};


export const getAllRequests = async (req, res) => {
    try {
        const { helperId } = req.query; // Query se helper ki ID lein
        const requests = await Request.find({ status: 'Open' }).populate('userId', 'name skills');
        
        let recommendedRequests = requests;

        if (helperId) {
            const helper = await User.findById(helperId);
            if (helper && helper.skills) {
                recommendedRequests = requests.map(req => {
                    // Check if any tag matches helper skills
                    const isMatch = req.tags.some(tag => 
                        helper.skills.some(skill => skill.toLowerCase().includes(tag.toLowerCase()))
                    );
                    return { ...req._doc, aiRecommended: isMatch };
                });
            }
        }

        res.status(200).json(recommendedRequests);
    } catch (error) {
        res.status(500).json({ message: "Fetching failed" });
    }
};

export const getAIOnboardingSuggestions = async (req, res) => {
    try {
        const { interests } = req.body; // e.g., "I like web development and coding"

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Based on user interests, suggest 3 professional skills they can offer and 3 areas they might need help with. Return JSON: { canHelp: [], needHelp: [] }"
                },
                { role: "user", content: interests }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const suggestions = JSON.parse(completion.choices[0].message.content);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: "AI Suggestions failed" });
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { helperId } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId, 
            { status: 'Solved', helper: helperId },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedRequest });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const markAsSolved = async (req, res) => {
    try {
        // Frontend se hum requestId aur helperId bhejenge
        const { requestId, helperId } = req.body;

        if (!requestId || !helperId) {
            return res.status(400).json({ message: "Request ID and Helper ID are required" });
        }

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId, 
            { status: 'Solved' },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        await User.findByIdAndUpdate(helperId, {
            $inc: { 
                totalSolved: 1, 
                trustScore: 5 
            }
        });

        res.status(200).json({ 
            success: true, 
            message: "Stats updated & Task solved!",
            data: updatedRequest 
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating stats", error: error.message });
    }
};