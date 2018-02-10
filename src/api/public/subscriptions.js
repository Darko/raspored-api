import express from 'express';

import * as controller from '../../controllers/public/subscriptions';
const router = express.Router();

router.get('/', controller.index);
router.get('/:subscriptionId', controller.show);
router.post('/', controller.subscribe);
router.delete('/:subscriptionId', controller.unsubscribe);

export default router;
