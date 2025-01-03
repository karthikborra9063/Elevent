import express from 'express';

import {adminSignup,adminLogin} from '../controller/adminAuthController.js';

const router = express.Router();

router.post('/signup',adminSignup);
router.post('/login',adminLogin);

export default router;