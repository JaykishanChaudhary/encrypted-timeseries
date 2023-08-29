const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http').Server(app);
const io = require('socket.io-client');

const port = process.env.LISTENER_PORT || 5000;

const emitterServiceURL = 'http://localhost:8080'; // Replace with the emitter service address

const Socket = io(emitterServiceURL);

let EncryptedData;

Socket.on('connect', () => {
    console.log('Connected to emitter service');

    // Listen for the EncryptedString event and receive the hashValue
    Socket.on('EncryptedString', (hashValue) => {
        console.log('Received hashValue from emitter:', hashValue);
        // Here you can use the received hashValue as needed
        EncryptedData=hashValue;
    });
});

Socket.on('disconnect', () => {
    console.log('Disconnected from emitter service');
});

app.listen(port, () => {
    console.log(`Listener service is listening on port ${port}`);
});


module.exports=EncryptedData;