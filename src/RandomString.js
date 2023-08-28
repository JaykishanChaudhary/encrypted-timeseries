const crypto = require('crypto');
const fs = require('fs');

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
    city: getRandomElementFromArray(Data.cities)
};
console.log('SelectData', SelectData);

const objectJson = JSON.stringify(SelectData);

// Hash the JSON string using SHA-256
const hash = crypto.createHash('sha256');
hash.update(objectJson);
const hashValue = hash.digest('hex');

// Use the hash value as the secret key
// const secretKey = hashValue;
const secretKey = hashValue.slice(0, 32); 
console.log('Secret Key:', secretKey);
SelectData.secretKey=secretKey;
console.log('SelectData', SelectData);

// .............................................................
// const StringSelectedData = JSON.stringify(SelectData);


// const hmac = crypto.createHmac('sha256', secretKey);


// hmac.update(StringSelectedData);


// const hmacHashValue = hmac.digest('hex');
// return ('HMAC Hash Value:', hmacHashValue);
const encryptedHashValue = encryptAES(SelectData, secretKey);
console.log('Encrypted Hash Value:', encryptedHashValue);

return encryptedHashValue;
}



setInterval(()=>{
    const hashValue=GenerateHashString();
    console.log(hashValue);
    module.exports=hashValue;
},10000)
// module.exports = hmacHashValue;
