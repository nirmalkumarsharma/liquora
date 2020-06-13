const jwt = require('jsonwebtoken');

const applicationConfig = require('../application.json');

const SECRET = applicationConfig.env.SECRET_PHRASE;

module.exports = (request, response ,next) => {
    try {
        const verified = jwt.verify(request.headers.authorization.split(" ")[1], SECRET);
        request.userData = verified;
        next();
    } catch (error) {
        return response.status(401).json({
            errorMessage: "Unauthorized request"
        });
    }
};