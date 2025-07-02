// const express = require('express')
import express from 'express'
import cuid from 'cuid'
// const cuid = require('cuid')
import {user} from './src/service/user.js'
const app = express()
const port = 3000
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname+ './views'));
app.use(express.static(__dirname + './public'));

app.set('view engine','pug');
app.set('views','./src/views');
app.get('/', (req, res) => {
 const use = user
  res.send(use)
})
app.get('/home',(req,res)=>{
    
 res.render('Home/home.pug',{users: user})
}
)
app.get('/product',(rep,res)=>{
    res.render('Home/products.pug')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
