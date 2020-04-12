const express = require('express');
const router = express.Router();
import activeControllers from '../controllers/active'

router.post('/get', activeControllers.get);
router.post('/create', activeControllers.create);

export default router
