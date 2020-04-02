const express = require('express');
const router = express.Router();
import commonControllers from '../controllers/common'

router.post('/get-email-tpls', commonControllers.getEmailTpls);
router.post('/get-email-tpl-detail', commonControllers.getEmailTplDetail);

export default router