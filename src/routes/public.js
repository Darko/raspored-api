import express from 'express';
import publicRoutes from '../api/public';

const router = express.Router();

// Middleware
// router.use(limit());
router.use(express.json({ limit: '1mb' }));
router.use(express.urlencoded({ extended: false }));

// Sub routers
router.use('/faculties', publicRoutes.faculties);
router.use('/subscriptions', publicRoutes.subscriptions);

export default router;
