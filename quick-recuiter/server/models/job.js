import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    jobType: String,
    localisation:String,
    creator: String,
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var JobMessage = mongoose.model('JobMessage', jobSchema);

export default JobMessage;