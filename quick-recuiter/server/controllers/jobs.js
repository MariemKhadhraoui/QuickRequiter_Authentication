import express from 'express';
import mongoose from 'mongoose';

import JobMessage from '../models/job.js';

const router = express.Router();

export const getJobs = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT =3;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await JobMessage.countDocuments({});
        const jobs = await JobMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: jobs, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getJobsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const jobs = await JobMessage.find({ title });

        res.json({ data: jobs });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getJobsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const jobs = await JobMessage.find({ name });

        res.json({ data: jobs });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getJob = async (req, res) => { 
    const { id } = req.params;

    try {
        const job = await JobMessage.findById(id);
        
        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createJob = async (req, res) => {
    const job = req.body;

    const newJobMessage = new JobMessage({ ...job, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newJobMessage.save();

        res.status(201).json(newJobMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, jobType, localisation, message, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job with id: ${id}`);

    const updatedJob = { creator, title, jobType, localisation, message, selectedFile, _id: id };

    await JobMessage.findByIdAndUpdate(id, updatedJob, { new: true });

    res.json(updatedJob);
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job with id: ${id}`);

    await JobMessage.findByIdAndRemove(id);

    res.json({ message: "Job deleted successfully." });
}

export const likeJob = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No job with id: ${id}`);
    
    const job = await JobMessage.findById(id);

    const index = job.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      job.likes.push(req.userId);
    } else {
      job.likes = job.likes.filter((id) => id !== String(req.userId));
    }

    const updatedJob = await JobMessage.findByIdAndUpdate(id, job, { new: true });

    res.status(200).json(updatedJob);
}

export const commentJob = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const job = await JobMessage.findById(id);

    job.comments.push(value);

    const updatedJob = await JobMessage.findByIdAndUpdate(id, job, { new: true });

    res.json(updatedJob);
};



//filter jobs By Location
export const filterByLocation = async (req, res) => {
   
    const { localisation } = req.params;
    
    

  try {
    const jobs = await JobMessage.find({ localisation });
    if (!jobs) {
      res.status(404).json({ message: "Aucun job n'a été trouvé avec cette localisation." });
    } else {
      res.status(200).json(jobs);
    }
  } catch (err) {
    res.status(500).send(err);
  }
  };
export default router;