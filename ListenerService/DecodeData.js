const crypto=require('crypto');
const EncryptedData=require('../ListenerService/Listener');
const secretKey=process.env.SCERET_KEY

function DecryptData(EncryptedData){
    const combinedBuffer = Buffer.from(EncryptedData, 'base64');
    const IV=combinedBuffer.slice(0,16);
    const ecryptedPayload=combinedBuffer.slice(16);

    const Decipher=crypto.createCipheriv('aes-256-ctr',)
}

