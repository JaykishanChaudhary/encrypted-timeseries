const crypto = require('crypto');
const fs = require('fs');
// const {socket}=require('socket.io');

// Define your secret key
// const secretKey = process.env.SECRET_KEY

function encryptAES(data, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

    // Convert data to string if needed
    const dataAsString = typeof data === 'string' ? data : JSON.stringify(data);

    let encryptedData = cipher.update(dataAsString, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    return Buffer.concat([iv, Buffer.from(encryptedData, 'base64')]).toString('base64');
}


function GenerateHashString(){

// const hash = crypto.createHash('sha256');
const DataFromFile = fs.readFileSync('data.json');
const Data = JSON.parse(DataFromFile);
// console.log(Data);

function getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const SelectData = {
    name: getRandomElementFromArray(Data.names),
    origin: getRandomElementFromArray(Data.cities),
    destination: getRandomElementFromArray(Data.cities)
};
console.log('SelectData', SelectData);

const objectJson = JSON.stringify(SelectData);

// Hash the JSON string using SHA-256
const hash = crypto.createHash('sha256');
hash.update(objectJson);
const hashValue = hash.digest('hex');

// Use the hash value as the secret key
const secretKey = hashValue;
// const secretKey = hashValue.slice(0, 32); 
console.log('Secret Key:', secretKey);
SelectData.secretKey=secretKey;
console.log('SelectData', SelectData);


console.log('passkey',process.env.PASS_KEY);
// Passphrase (string) and salt (random value)
const passphrase = process.env.PASS_KEY;
const salt = crypto.randomBytes(16); // 16 bytes

// Derive a 256-bit key using PBKDF2
const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256');

console.log('Derived Key:', key.toString('hex'));

const encryptedHashValue = encryptAES(SelectData, key);
console.log('Encrypted Hash Value:', encryptedHashValue);

return encryptedHashValue;
}


const hashValue=GenerateHashString();
console.log(hashValue);
module.exports=GenerateHashString;
// module.exports = hmacHashValue;
