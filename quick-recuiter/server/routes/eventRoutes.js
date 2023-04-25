import express from 'express';
import { getEvents, findEventById, addEvent, updateEvent, deleteEvent}from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id/show', findEventById);
router.post("/addEvent", addEvent);
router.put("/:id/update", updateEvent );
router.delete("/:id/delete",deleteEvent );


export default router;