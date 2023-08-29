const express=require('express');
const { Socket } = require('socket.io');
const app=express();
require('dotenv').config();
const path=require('path');
// const HashValue=require('./src/RandomString');


const port=process.env.EMITTER_PORT;

const http=require('http').Server(app);

const io=require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('disconnect',()=>{
        console.log('A user disconnected');
    })


    socket.emit("server1",'messege from server1');
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'))
})

setInterval(()=>{
    const hashValue = require('./RandomString');
    console.log(hashValue)
    io.emit('EncryptedString',hashValue());
},10000)

http.listen(port,()=>{
    console.log(`server is listening on ${port}`);
})