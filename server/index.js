import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connect.js";
import postRoutes from './routes/PostRoutes.js'
import GImageRoutes from './routes/GImageRoutes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/g-image', GImageRoutes);
app.use('/',(req,res)=>{
    res.send('Welcome to G-Image')
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URL);
        app.listen(3000, () => {
            console.log(`Server is running on port http://localhost:3000`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();