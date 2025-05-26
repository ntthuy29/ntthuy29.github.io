import express from "express";
import mongoose from "mongoose";
import connectDB from'./src/database/database.connection.js'
const app = express();
const PORT =3000;
import userRoute from "./src/api/users/users.router.js";
import { authToken } from "./src/middlewares/users.middlewares.js";
connectDB();
app.get("/",(req,res)=>{
    res.send(user);


});
app.use('/api/users',userRoute);


app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});