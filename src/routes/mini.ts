const express = require('express');
const router = express.Router();
import miniController from '../controllers/mini'

router.post('/login', miniController.login);

export default router
