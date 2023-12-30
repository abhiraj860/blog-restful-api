const jwt = require('jsonwebtoken');
const secret = require('../jwt/jwt');

function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        const words = token.split(' ');
        const jwtToken = words[1];
        const decode = jwt.verify(jwtToken, secret);
        req.username = decode.username;
        next();
    } catch(error) {
        res.status(405).json({
            msg: 'User not authenticated'
        });
    }
    
} 

module.exports = userMiddleware;