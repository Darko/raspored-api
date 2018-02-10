import express from 'express';
import adminRoutes from '../api/admin';
import * as Auth from '../middleware/auth';

const router = express.Router();

router.use(Auth.isAuthenticated);
router.use(Auth.isAdmin);
router.use(express.json({ limit: '1mb' }));
router.use(express.urlencoded({ extended: false }));

router.use('/faculties', adminRoutes.faculties);

export default router;
