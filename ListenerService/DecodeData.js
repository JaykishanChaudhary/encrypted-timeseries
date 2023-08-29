const crypto=require('crypto');
require('dotenv').config();

let salt =process.env.SALT;
console.log(salt);




function DecryptData(EncryptedData,secretKey){
    const combinedBuffer = Buffer.from(EncryptedData, 'base64');
    const IV=combinedBuffer.slice(0,16);
    const encryptedPayload=combinedBuffer.slice(16);
    // console.log(secretKey);
    console.log('secretKey:', secretKey);
    const key = crypto.pbkdf2Sync(secretKey, salt, 100000, 32, 'sha256');

    console.log('Derived Key:', key.toString('hex'));
    //  key=Buffer.from(secretKey,'hex');

    const Decipher=crypto.createCipheriv('aes-256-ctr',key,IV)

    let decryptData=Decipher.update(encryptedPayload,'base64','utf-8');
    decryptData+=Decipher.final('utf-8');

    return decryptData
}

module.exports=DecryptData;

