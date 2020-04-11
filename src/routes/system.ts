const express = require('express');
const router = express.Router();
import systemControllers from '../controllers/system'

router.post('/clear', systemControllers.clear);

export default router
