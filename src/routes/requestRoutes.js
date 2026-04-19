import express from 'express';
import { createRequest, getAllRequests, acceptRequest } from '../controllers/requestController.js';

const router = express.Router();


router.post('/', createRequest);      

router.get('/', getAllRequests);      


router.put('/accept/:requestId', acceptRequest); 

export default router;