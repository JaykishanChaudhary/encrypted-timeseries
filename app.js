const express=require('express');
const { Socket } = require('socket.io');
const app=express();
require('dotenv').config();
const path=require('path');
// const HashValue=require('./src/RandomString');
const hashValue = require('./src/RandomString');


const port=process.env.PORT||8080;

const http=require('http').Server(app);

const io=require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
    })

    socket.on('messege',msg=>{
        console.log( msg);
    })

    socket.emit("server1",'messege from server1');
    socket.emit("server2",'messege from server2');
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'))
})

console.log(hashValue)
http.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})