import express from 'express';
import { onboardUser } from '../controllers/userController.js';
const router = express.Router();

router.put('/onboard/:id', onboardUser);

export default router;