import express from 'express';

import { register, logIn } from '../controllers/authController';

const router = express.Router();

router.post('/users', register);
router.post('/session', logIn);

export default router;
