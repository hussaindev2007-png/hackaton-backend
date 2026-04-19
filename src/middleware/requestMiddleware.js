// import Request from '../models/Request.js';

// // 1. Validation: Check karein ke data poora hai ya nahi
// export const validateRequestData = (req, res, next) => {
//     const { title, description } = req.body;

//     if (!title || title.trim().length < 5) {
//         return res.status(400).json({ 
//             success: false, 
//             message: "Title lazmi hai aur kam az kam 5 characters ka hona chahiye." 
//         });
//     }

//     if (!description || description.trim().length < 15) {
//         return res.status(400).json({ 
//             success: false, 
//             message: "Description thori lambi likhein taake AI sahi samajh sakay (min 15 chars)." 
//         });
//     }

//     next();
// };

// // 2. Ownership Check: Koi apni hi request khud accept na kare
// export const canAcceptRequest = async (req, res, next) => {
//     try {
//         const request = await Request.findById(req.params.requestId);

//         if (!request) {
//             return res.status(404).json({ success: false, message: "Request nahi mili!" });
//         }

//         // Agar seeker aur login user same hain toh block kar do
//         if (request.userId.toString() === req.user._id.toString()) {
//             return res.status(403).json({ 
//                 success: false, 
//                 message: "Aap apni hi post ki hui request accept nahi kar sakte." 
//             });
//         }

//         next();
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Middleware error", error: error.message });
//     }
// };


































import Request from '../models/Request.js';

// 1. Validation: Check karein ke data poora hai ya nahi
export const validateRequestData = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || title.trim().length < 5) {
        return res.status(400).json({ 
            success: false, 
            message: "Title lazmi hai (min 5 characters)." 
        });
    }

    if (!description || description.trim().length < 15) {
        return res.status(400).json({ 
            success: false, 
            message: "Description thori detail mein likhein (min 15 chars)." 
        });
    }

    next();
};

// 2. Ownership & Status Check
export const canAcceptRequest = async (req, res, next) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request nahi mili!" });
        }

        // --- SAFETY CHECK 1: Auth Middleware ---
        // Agar aapka protect middleware nahi chala, toh req.user nahi hoga
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorized, no user found" });
        }

        // --- SAFETY CHECK 2: Double Acceptance ---
        if (request.status === 'Solved') {
            return res.status(400).json({ success: false, message: "Ye request pehle hi solve ho chuki hai." });
        }

        // --- SAFETY CHECK 3: Ownership ---
        // request.userId (Seeker) aur req.user._id (Current Login User) match karein
        if (request.userId.toString() === req.user._id.toString()) {
            return res.status(403).json({ 
                success: false, 
                message: "Aap apni hi post ki hui request accept nahi kar sakte." 
            });
        }

        next();
    } catch (error) {
        console.error("Middleware Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Middleware internal error", 
            error: error.message 
        });
    }
};