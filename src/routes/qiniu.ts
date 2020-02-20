const express = require('express');
const router = express.Router();
import qiniuControllers from '../controllers/qiniu';

router.post('/getToken', qiniuControllers.getToken);

export default router
