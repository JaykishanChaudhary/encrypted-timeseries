const express=require('express');
const app=express();
require('dotenv').config();
const mogoose=require('mongoose');
const DecryptedData=require('../ListenerService/Listener');
console.log(DecryptedData);

const MongoDBString=process.env.MONGODB_CONNECTION_STRING;
mogoose.connect(MongoDBString,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to DB');
}).catch(err=>{
    console.error(err);
})



const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})