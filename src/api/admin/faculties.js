import express from 'express';

import * as controller from '../../controllers/admin/faculties';
const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);

export default router;
