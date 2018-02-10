import express from 'express';
import * as auth from '../../middleware/auth';

import * as controller from '../../controllers/public/subscriptions';
const router = express.Router();

router.use(auth.isAuthenticated);

router.get('/', controller.index);
router.get('/:subscriptionId', controller.show);
router.post('/', controller.subscribe);
router.delete('/:subscriptionId', controller.unsubscribe);

export default router;
