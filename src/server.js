











// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import dashboardRoutes from './routes/dashboard.js';

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Health Check Route
// app.get('/', (req, res) => {
//     res.status(200).json({ 
//         status: 'success', 
//         message: 'API is running smoothly on Render' 
//     });
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode).json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// });

// // 404 Handler
// app.use((req, res) => {
//     res.status(404).json({ message: "Route not found" });
// });

// // Port & Server Start Logic
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         // Pehle DB connect hoga, phir server start hoga
//         await connectDB();
//         console.log('MongoDB Connected Successfully');

//         app.listen(PORT, '0.0.0.0', () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.error(`Database Connection Error: ${error.message}`);
//         // Render par foran exit nahi karenge taake logs dekh saken
//         setTimeout(() => process.exit(1), 5000); 
//     }
// };

// startServer();

// // Global Rejection Handling
// process.on('unhandledRejection', (err) => {
//     console.log(`Unhandled Rejection: ${err.message}`);
// });


















import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Pehle wale routes
import authRoutes from './routes/auth.js';


// --- NAYE ROUTES (INHE ADD KARO) ---
import userRoutes from './routes/userRoutes.js'; // Onboarding ke liye
import requestRoutes from './routes/requestRoutes.js'; // Help posts ke liye

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Registration
app.use('/api/auth', authRoutes);


// --- NAYE ROUTES REGISTER KARO ---
app.use('/api/users', userRoutes);      // Postman path: /api/users/onboard/:id
app.use('/api/requests', requestRoutes); // Postman path: /api/requests

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'API is running smoothly' 
    });
});

// Error Handling & 404 (Wahi purana logic)
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        setTimeout(() => process.exit(1), 5000); 
    }
};

startServer();