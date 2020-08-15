const express = require('express');
const router = express.Router();
import trajectoryController from '../controllers/trace'

router.post('/get', trajectoryController.get);

export default router
