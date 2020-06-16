import { Router } from 'express';
import appointmentRoute from './appointments.route';
import userRoutes from './users.route';
import sessionRoutes from './session.route';

const router = Router();

router.use('/appointments', appointmentRoute);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);

export default router;
