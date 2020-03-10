const express = require('express');
const router = express.Router();
import miniController from '../controllers/mini'

router.post('/login', miniController.login);
router.post('/bind', miniController.bind);

export default router
