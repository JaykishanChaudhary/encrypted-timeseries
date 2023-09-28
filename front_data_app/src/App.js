import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

function App() {

  const [Document,setDocument]=useState([]);
  useEffect(() => {
    // Establish a WebSocket connection
    const socket = io('http://localhost:4000');

    // Log when the connection is established
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for the 'initialDocuments' event
    socket.on('documentChange', (documents) => {
      console.log('Received documents:', documents);
      setDocument(documents.Data);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
}, []);

  return (
    <div className="App">
      <table>
        <thead>
              <tr>
              <th>ID</th>
               <th>Name</th> 
               <th>Origin</th> 
               <th>Destination</th>
               <th>Secret Key</th> 
              </tr>          
        </thead>
        <tbody>
          {Document.map((Data)=>{
           return (<tr>
                      <th>{Data._id}</th>
                      <th>{Data.name}</th>
                      <th>{Data.origin}</th>
                      <th>{Data.destination}</th>
                      <th>{Data.secretKey}</th>
                  </tr>)
          })}
            
        </tbody>
      </table>
    </div>
  );
}

export default App;

