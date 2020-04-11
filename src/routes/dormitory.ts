const express = require('express');
const router = express.Router();
import dormitoryControllers from '../controllers/dormitory'

router.post('/get', dormitoryControllers.get);
router.post('/get-student', dormitoryControllers.getStudentsById);

export default router
