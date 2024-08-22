const jwt = require("jsonwebtoken")
const crypto = require("node:crypto");
const dotenv = require("dotenv")
dotenv.config();


const errorHandler = (msg, code) => {
    return {
        error: {
            timestamp: Date.now(),
            msg,
            code,
        },
    };
};
function isObject(item) {
    return Object.prototype.toString.call(item) === '[object Object]';
}
const newError = (message, status, errObj) => {
    const error = new Error(message);
    if (errObj) {
        error.message = errObj;
    }

    error.status = status;

    return error;
};

const mongooseError = (err) => {
    console.log(`Error code: ${err.code}`)
    console.log(`Error message: ${err.message}`);
    console.log(err.errors)
    let errors = {
        username: null,
        email: null,
        password: null
    };


    // errors for duplicate emails 
    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }


    // validation errors
    if (err.message.includes("validation failed") || err.message.includes("Validation failed")) {
  
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.message;
        });

        return errors
    }
    return;

}

const otpGenerator = () => {
    const verificationCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = Date.now() + 3600000;
    return { verificationCode, expiresAt }
}

const tokenMaxAge = 30 * 60;
const refreshMaxAge = 7 * 24 * 60 * 60;
const createRefreshToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: refreshMaxAge })
}
const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: tokenMaxAge });
}
const cookiesResponse = (res, id) => {

        const accessToken = createAccessToken(id);
        const refreshToken = createRefreshToken(id);

 
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: tokenMaxAge * 1000,
           sameSite: "None",    // allows the cookie to be sent cross-site
//     domain: 'cinematico.vercel.app',
//   path: '/'
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: refreshMaxAge * 1000,
           sameSite: "None",    // allows the cookie to be sent cross-site
//     domain: 'cinematico.vercel.app',
//   path: '/'
        });
        res.cookie("isAuthenticated", "true", { 
            secure: true,
           sameSite: "None",    // allows the cookie to be sent cross-site
//     domain: 'cinematico.vercel.app',
//   path: '/',
            maxAge: refreshMaxAge * 1000
        })
}
const clearCookies = (res) => {
    res.cookie("accessToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: true,
        sameSite: "None",   
//     domain: 'cinematico.vercel.app',
//   path: '/'
    })
    res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: true,
        sameSite: "None",   
//     domain: 'cinematico.vercel.app',
//   path: '/'
    });
    res.cookie("isAuthenticated", "", {
        maxAge: 0,
        secure: true,
        sameSite: "None",    // allows the cookie to be sent cross-site
//     domain: 'cinematico.vercel.app',
//   path: '/'
    });
}
const verifyRefreshToken = (req, res, next) => {
    const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN;
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return next(newError("Unauthorized user. Please login to access this resource", 401));
    jwt.verify(refreshToken , refreshTokenSecret, (err, user) => {
        if(err) return next(newError("Invalid refresh token", 401));
        
    req.userId = user.id;
    cookiesResponse(res, user.id);
    next()
    })
}


module.exports = { errorHandler, newError, mongooseError, otpGenerator, createAccessToken, createRefreshToken,  tokenMaxAge, refreshMaxAge, verifyRefreshToken, cookiesResponse, clearCookies }