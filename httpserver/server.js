const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

const mongoose = require('mongoose');
const TimeseriesModel = require('../ListenerService/Model/DataModel');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});


app.use(cors());


// Listen on a specific port (e.g., 3000)
const PORT = 4000;

server.listen(PORT, async () => {
  console.log(`WebSocket server is running on port ${PORT}`);

  try {

    // Connect to MongoDB
    mongoose.connect("mongodb+srv://jaykishanchaudhary678:3GYjW2yZr2aTmWvw@cluster0.1xz755a.mongodb.net/streamData",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
      console.log('connected to DB');
    }).catch(err=>{
      console.error(err);
    })

    // Handle WebSocket connections
    io.on('connection', (socket) => {
      console.log('A client connected');

      const changeStream = TimeseriesModel.DataModel.watch({ fullDocument: 'updateLookup' });

      changeStream.on('change', (change) => {
      // Emit an event or perform any desired action based on the change
      console.log('Change detected:', change.fullDocument);

      // Emit the changed document to connected clients
      socket.emit('documentChange', change.fullDocument);
      });

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});
