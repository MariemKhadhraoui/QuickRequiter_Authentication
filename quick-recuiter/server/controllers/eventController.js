import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
import handleError from '../middleware/eventErrors.js'



// fin all event
export const getEvents = async(req, res)=>{
    const events = await Event.find({});
     try{
              res.status(200).json(events)
      
    }catch(err){
        handleError(err, res)
    }
};

// find event by id
export const findEventById = async(req, res)=>{
    const id =   req.params.id
    const event = await Event.findById(id);
 
    try{
       res.status(200).json(event)

      
    }catch(err){
        handleError(err, res)
    }
};

// add event
 export const addEvent =  async(req, res)=>{
   
    const newEvent = await new Event(req.body)
 
    try{
       await newEvent.save((err, event)=>{
            if(err){
                handleError(err, res)
            }else{
                res.status(200).json(event)
            }
        })
    }catch(err){
        handleError(err, res)
    }
}

//update event
export const updateEvent = async (req, res)=>{
    const id = req.params.id
     try{
        const event = await Event.findOne({_id : id})
        if(event){
            Object.assign(event, req.body);
             event.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
        })
    }   
        if(!event){
            res.status(404).json({error: "event is not found"})
        }
     }catch (err){
       console.log(err)
       handleError(err,res)
    }
 }
//delete event
export const deleteEvent = async(req, res)=>{
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

}