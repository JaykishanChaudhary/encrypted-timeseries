const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const TimeseriesModel = require('../ListenerService/Model/DataModel');
const cors = require('cors')

const app = express();
app.use(cors()); // Add this line to enable CORS

const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect("mongodb+srv://jaykishanchaudhary678:3bEiKRQSCWiGJdpd@cluster0.1xz755a.mongodb.net/streamData",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to DB');
}).catch(err=>{
    console.error(err);
})


// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');

  // Send all documents to the frontend on initial connection
  TimeseriesModel.DataModel.find({}, (err, documents) => {
    if (err) {
      console.error(err);
      return;
    }
    socket.emit('initialDocuments', documents);
  });

  // MongoDB change stream to listen for upsert actions (insert or update)
  const changeStream = TimeseriesModel.DataModel.watch();
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert' || change.operationType === 'update') {
      const updatedDocument = change.fullDocument;
      socket.emit('updatedDocument', updatedDocument);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
