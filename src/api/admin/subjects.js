import express from 'express';

import * as controller from '../../controllers/admin/subjects';
import * as auth from '../../middleware/auth';

const router = express.Router();

router.use(auth.isAuthenticated);
router.use(auth.isAdmin);

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/:subject/exam', controller.createExam);
router.put('/:subject/exam/:exam', controller.updateExam)
router.delete('/:subject/exam/:exam', controller.removeExam)

export default router;
