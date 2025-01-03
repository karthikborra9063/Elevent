import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'


import connectMongoDb from './db/connectMongoDb.js';
import authRouter from './routes/authRoutes.js';
import organizerRouter from './routes/organizerRouter.js';
import adminRouter from './routes/adminRouter.js';

const app = express()
dotenv.config();



app.use(express.urlencoded({extended:true}));
const port=8000
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/organizer',organizerRouter);
app.use('/api/admin',adminRouter)

app.listen(port,()=>{
    console.log(`listening to the post with the port number ${port}`);
    connectMongoDb();
})
