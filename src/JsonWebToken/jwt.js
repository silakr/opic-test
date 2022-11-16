const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


// access token을 secret key 기반으로 생성
exports.generateAccessToken = (payload) => {
    return jwt.sign({ payload }, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "30 days",
    });
};

// refersh token을 secret key  기반으로 생성
exports.generateRefreshToken = (payload) => {
    return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180 days",
    });
};

// access token의 유효성 검사
exports.authenticateAccessToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    // splittest = authHeader.split(" ");
    // let token = authHeader && authHeader.split(".")[1];

    // if (!token) {
    //     console.log("wrong token format or token is not sended");
    //     if(!res.headersSent)return res.sendStatus(400);
    // }

    jwt.verify(authHeader, process.env.ACCESS_SECRET_KEY, (error, data,) => {
        if (error) {
            console.log(error,true);
            if(!res.headersSent)return res.sendStatus(403);
        }
        
        req.body.user_sn = data.payload.user_sn;
        req.body.user_id = data.payload.user_id;
        req.body.user_name = data.payload.user_name;
        req.body.user_type = data.payload.user_type;
        next();
    });
};

