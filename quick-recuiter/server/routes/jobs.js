import express from 'express';

import { getJobs, getJobsBySearch,filterByLocation, getJobsByCreator, getJob, createJob, updateJob, likeJob, commentJob, deleteJob } from '../controllers/jobs.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getJobsByCreator);
router.get('/search', getJobsBySearch);
router.get('/', getJobs);
router.get('/:id', getJob);


router.get('/filter/:localisation', filterByLocation);


router.post('/', auth,  createJob);
router.patch('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);
router.patch('/:id/likeJob', auth, likeJob);
router.post('/:id/commentJob', commentJob);

export default router;