const express = require('express');
const router = express.Router();
import userController from '../controllers/user/user'

router.post('/register', userController.register);
router.post('/activate', userController.ActivateAccount);
router.post('/login', userController.Login);
router.post('/get-verification-code', userController.getValidateCode);
router.post('/get', userController.getUserInfo);
router.post('/update', userController.setUserInfo);

export default router
