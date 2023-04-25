
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import jobRoutes from './routes/jobs.js';
import userRouter from "./routes/user.js";
import twoFactorRouter from "./routes/twofactor.js";

import eventRoutes from "./routes/eventRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";


const app = express();


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/jobs', jobRoutes);
app.use("/user", userRouter);
app.use("/two-factor", twoFactorRouter);
app.use('/events',eventRoutes);
app.use('/interview',interviewRoutes);


const CONNECTION_URL = "mongodb://localhost:27017/AgendaDB"
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
