const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

//Sign token
function sign(data) {
    return jwt.sign(data, secret);
}

//Validate token
function verify(token) {
    return jwt.verify(token, secret)
}

//Check owner property
const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    
        if (decoded.id !== owner) {
            throw error('You can not do that', 401);
        }
    },
}

//Get authorization token
function getToken(auth) {
    if (!auth) {
        throw new Error('No token comes');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid format');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

//Decode token
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};