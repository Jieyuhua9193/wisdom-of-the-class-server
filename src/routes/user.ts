const express = require('express');
const router = express.Router();
import userController from '../controllers/user'

router.post('/register', userController.register);
router.post('/activate', userController.ActivateAccount)
router.post('/login');

export default router