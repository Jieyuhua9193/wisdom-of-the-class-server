const express = require('express');
const router = express.Router();
import studentController from '../controllers/student'

router.post('/get', studentController.get);

export default router
