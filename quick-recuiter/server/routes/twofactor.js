import express from 'express';
import { generateTwoFactor, validateTwoFactor } from '../controllers/twoFactor.js';

const router = express.Router();
router.post("/generateTwoFactor", generateTwoFactor);
router.post("/validateTwoFactor", validateTwoFactor)
export default router;