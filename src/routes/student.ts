const express = require('express');
const router = express.Router();
import studentController from '../controllers/student'

router.post('/get', studentController.get);
router.post('/search', studentController.search);

export default router
