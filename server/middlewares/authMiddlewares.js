const jwt = require("jsonwebtoken");
const {newError, verifyRefreshToken} = require("../lib/utils");
const dotenv = require("dotenv");
dotenv.config();





const requireAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return verifyRefreshToken(req, res, next);
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return verifyRefreshToken(req, res, next);
            }
            return next(newError("Invalid access token", 401));
        }
        req.userId = user.id;
        next();
    });
}


module.exports = {requireAuth}