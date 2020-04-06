const express = require('express');
const router = express.Router();
import userController from '../controllers/user'

router.post('/register', userController.register);
router.post('/activate', userController.activateAccount);
router.post('/login', userController.login);
router.post('/get-verification-code', userController.getValidateCode);
router.post('/get-by-email', userController.getByEmail);
router.post('/get', userController.get);
router.post('/update', userController.update);
router.get('/downloadTpl', userController.downloadTpl);
router.post('/importUsers', userController.importUsers)

export default router
