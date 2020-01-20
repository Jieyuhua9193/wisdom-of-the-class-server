const express = require('express');
const router = express.Router();
import userController from '../controllers/user'

router.post('/register', userController.register);
router.post('/activate', userController.ActivateAccount);
router.post('/login', userController.Login);
router.post('/get-verification-code',userController.getValidateCode);

export default router
