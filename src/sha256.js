const dotenv = require("dotenv");
dotenv.config();

const crypto = require('crypto');
const secret = process.env.hashkey;

exports.gethash = (pw) =>{
    return crypto.createHmac('sha256', secret).update(pw).digest('hex');
}