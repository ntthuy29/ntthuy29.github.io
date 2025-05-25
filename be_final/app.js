import express from "express";
import mongoose from "mongoose";
import connectDB from'./src/database/database.connection.js'
const app = express();
const PORT =3000;
const user = [
    {
        id: 1,
        name: "Thùy",
        phone: "0334105228"

    },{
        id: 2,
        name: "Phú",
        phone: "0377612052"
    },
    {
        id: 3,
        name: "Na",
        phone: "0983242432"
    },
    {
        id: 4,
        name: "Phương",
        phone: "054587234"
    }
]
connectDB();
app.get("/",(req,res)=>{
    res.send(user);


});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});