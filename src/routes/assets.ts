const express = require('express');
const router = express.Router();
import assetsControllers from '../controllers/assets'

router.post('/get', assetsControllers.get);
router.post('/change', assetsControllers.change);

export default router
