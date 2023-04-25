import express from 'express';
import { createUserInterview } from '../controllers/interview.js';

const router = express.Router();

router.post("/userInterview", createUserInterview);

export default router;