const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
app.use(bodyParser.json());
const fs = require('fs');
let users=[];
try{
   const data=  fs.readFileSync('./users.json','utf8');
   users = JSON.parse(data);
}
catch{

}
//lay ra thong tin nguoi dung
app.get('/users',(rep,res)=>{
    res.send(users);
})
//lay ra thong tin nguoi dung theo thu tu giam gian
app.get('/users/desc',(req,res)=>{
    const order = req.query.order || 'asc';
    const sortedUsers = users.sort((a, b) => (order === 'desc' ? a.id - b.id : b.id - a.id));
    res.send(sortedUsers);
}
)
//lay ra thong tin nguoi dung theo thu tu tang dan
app.get('/users/asc',(req,res)=>{
    const order = req.query.order || 'asc';
    const sortedUsers = users.sort((a, b) => (order === 'asc' ? a.id - b.id : b.id - a.id));
    res.send(sortedUsers);
}
)
// lấy ra chi tiết người dùng
app.get('/users/:id',(rep,res)=>{
    const id = parseInt(rep.params.id);
    const user = users.find(user=>user.id===id);
    res.send(user);
})
//xóa người dùng
app.delete('/users/:id',(rep,res)=>{
    const id = parseInt(rep.params.id);
    users = users.filter(user=>user.id!=id);
    const data = JSON.stringify(users);
    fs.writeFileSync('./users.json',data,'utf8');
    res.send(users)
})
// cập nhật người dùng
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const updatedUser = req.body

    const index = users.findIndex(user => user.id === userId)
    if (index !== -1) {
        users[index] = {  ...updatedUser }
        const data = JSON.stringify(users);
        fs.writeFileSync('./users.json',data,'utf8');
        res.json(users[index])
    } else {
        res.status(404).json()
    }
  
});
// thêm người dùng
app.post('/users',(rep,res)=>{
    const user = rep.body;
    users.push(user);
    const data = JSON.stringify(users);
    fs.writeFileSync('./users.json',data,'utf8');
    res.json(user);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})