import express from "express";
import { createServer } from "node:http";
import ConnectToSocket from '../src/controller/ConnectToSocket.js'
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from './routes/userroutes.js'

const app = express();
const server = createServer(app);

const io = ConnectToSocket(server);

app.set("port", (process.env.PORT || 8000));

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use('/api/v1/users', userRoutes);

const start = async () => {
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://vanshparmar:Vansh@cluster0.188os7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MONGO  connection Host : ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("server is running on the port 8000");
    });
}

start();
