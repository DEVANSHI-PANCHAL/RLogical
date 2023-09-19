import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as leaveRequestController from '../controllers/leaveRequestController.js';

const leaveRoutes = express.Router();

leaveRoutes.post('/apply', protect, leaveRequestController.createLeaveRequest);

leaveRoutes.get('/get-all-leaves', protect, leaveRequestController.getAllLeaveRequests);

leaveRoutes.get('/get-leave/:id', protect, leaveRequestController.getLeaveRequestById);

leaveRoutes.put('/update-leave/:id', protect, leaveRequestController.updateLeaveRequest);

leaveRoutes.delete('/:id', protect, leaveRequestController.deleteLeaveRequest);

export default leaveRoutes;
