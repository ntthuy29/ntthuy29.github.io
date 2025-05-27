import express from "express";
import mongoose from "mongoose";
import connectDB from'./src/database/database.connection.js'
import taskRoute from "./src/api/tasks/tasks.router.js";
import subboardRoute from "./src/api/subboards/subboards.router.js";
const app = express();
app.use(express.json()); 
const PORT =3000;
import userRoute from "./src/api/users/users.router.js";

import { authToken } from "./src/middlewares/users.middlewares.js";
connectDB();
app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.use('/api/users',userRoute);
app.use('/api/tasks',authToken,taskRoute);
app.use('/api/subboards', authToken, subboardRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});