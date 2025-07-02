// const express = require('express')
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import {getID,checkString, checkDataFromBody,checkDataForPut} from './api/middleware/getID.js'
const port = 3000
app.use(bodyParser.json());
import fs from 'fs'
// let users=[];
// try{
//    const data=  fs.readFileSync('./users.json','utf8');
//    users = JSON.parse(data);
// }
// catch{

// }
// //lay ra thong tin nguoi dung
// app.get('/',(rep,res)=>{
//     res.send(users);
//     res.status(200).send(users);
// })
// //lay ra thong tin nguoi dung theo thu tu
// app.get('/users/:default',checkString,(req,res)=>{
//     const order = req.params.default ;
//     const sortedUsers = users.sort((a, b) => (order === 'desc' ? a.id - b.id : b.id - a.id));
//     res.send(sortedUsers);
// }
// )

// app.get('/:id',getID,(req,res)=>{
//     const user = users.find(user=>user.id=== parseInt(req.params.id ));
//     res.status(200).send(user);
// }
// )
// //xóa người dùng
// app.delete('/users/:id',getID,(req,res)=>{
//     const id = parseInt(req.params.id);
//     users = users.filter(user=>user.id!= id);
//     const data = JSON.stringify(users);
//     fs.writeFileSync('./users.json',data,'utf8');
    
//     res.status(200).send(users);
// })
// // cập nhật người dùng
// app.put('/users/:id',getID,checkDataForPut,(req, res) => {
//     const userId = parseInt(req.params.id)
//     const updatedUser = req.body

//     const index = users.findIndex(user => user.id === userId)
//     if (index !== -1) {
//         users[index] = {  ...updatedUser }
//         const data = JSON.stringify(users);
//         fs.writeFileSync('./users.json',data,'utf8');
//         res.json(users[index])
//     } else {
//         res.status(404).json().send("Lỗi")
//     }
  
// });
// // thêm người dùng
// app.post('/users',checkDataFromBody,(req,res)=>{
//     const user = req.body;
//     users.push(user);
//     const data = JSON.stringify(users);
//     fs.writeFileSync('./users.json',data,'utf8');
//     res.json(user);
//     res.status(401);
// })
app.post('/register', (req,res)=>{
  
    
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})