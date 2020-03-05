const express = require('express');
const router = express.Router();
import classController from '../controllers/class'

router.post('/create', classController.create);
router.post('/getInvitationCode', classController.createInvitationCode);

export default router
