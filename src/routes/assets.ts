const express = require('express');
const router = express.Router();
import assetsControllers from '../controllers/assets'

router.post('/get', assetsControllers.get);
router.post('/change', assetsControllers.change);
router.post('/get-record', assetsControllers.getRecord);

export default router
