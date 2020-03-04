const express = require('express');
const router = express.Router();
import classController from '../controllers/class'

router.post('/create', classController.create);

export default router
