const { newError, errorHandler, mongooseError, otpGenerator, cookiesResponse } = require("../lib/utils");
const User = require("../models/user");
const mongoose = require("mongoose");
const { cloneDeep } = require("lodash")
const { genPassword, validatePassword } = require("../lib/passwordUtils");
const sendEmail = require("../lib/nodemailer");
const NewPasswordOtp = require("../models/forgotPasswordOtpModel");
const register = async (req, res, next) => {
    const { username, email, password, verifiedRedirects } = req.body;

    let error;
    try {
        if (!username || !email || !password) {
            const error = newError(
                "Incomplete credentials. Please provide all required fields.",
                400
            );
            return next(error);
        }
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPassword = password.toLowerCase().trim();
        const { verificationCode, expiresAt } = otpGenerator();
        const user = new User({
            username: username.trim(),
            email: normalizedEmail,
            password: normalizedPassword,
            verification: {
                code: verificationCode,
                expiresAt
            }
        });
        const hashedCode = await genPassword(verificationCode);
        user.verification.code = hashedCode;

        await user.save();
        const subject = 'Please verify your email';
        const text = `Thank you for registering with us. Your verification code is: ${verificationCode}. This code will expire in 1 hour. If you did not register for an account, please ignore this message or contact support.`;

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .container h2 {
                    color: #007bff;
                }
                .container p {
                    font-size: 16px;
                    margin: 15px 0;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                }
                .expiry {
                    font-size: 16px;
                    color: #ff0000;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Email Verification</h2>
                <p>Thank you for registering with us. Please use the verification code below to complete your registration:</p>
                <p class="code">${verificationCode}</p>
                <p class="expiry">This code will expire in 1 hour.</p>
                <p class="footer">If you did not register for an account, please ignore this email.</p>
            </div>
        </body>
        </html>
        `;



        await sendEmail(normalizedEmail, subject, text, html);
        return res.status(201).json({
            redirectUrl: `/verify-otp/${user._id}${verifiedRedirects
                    ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                    : ""
                }`,
            _id: user._id,
            msg: "User registered successfully",
            date: user.date
        });
    } catch (err) {
        const errObj = mongooseError(err)
        if (errObj) {
            error = newError("Validation error", 400, errObj);
            return next(error)
        }

        error = newError(err.message || "Server error", err.status || 500)
        return next(newError(error))



    }

}
const generateNewVerificationOtp = async (req, res, next) => {
    try {
        const _id = req.params.userId.trim(); // Trim the ID here

        if (!_id) return next(newError('User ID is required for verification', 400));
        if (!mongoose.Types.ObjectId.isValid(_id)) return next(newError('Invalid User ID', 400));

        const user = await User.findById(_id);
        if (!user) return next(newError("User not found", 404));
        if (user.verification.verified) {
            return next(newError("User already verified", 400))
        }

        const { verificationCode, expiresAt } = otpGenerator();
        const hashedCode = await genPassword(verificationCode);

        user.verification.code = hashedCode;
        user.verification.expiresAt = expiresAt;
        await user.save();

        const subject = 'Please verify your email';
        const text = `Thank you for registering with us. Your verification code is: ${verificationCode}. This code will expire in 1 hour. If you did not register for an account, please ignore this message or contact support.`;

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .container h2 {
                    color: #007bff;
                }
                .container p {
                    font-size: 16px;
                    margin: 15px 0;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                }
                .expiry {
                    font-size: 16px;
                    color: #ff0000;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Email Verification</h2>
                <p>Thank you for registering with us. Please use the verification code below to complete your registration:</p>
                <p class="code">${verificationCode}</p>
                <p class="expiry">This code will expire in 1 hour.</p>
                <p class="footer">If you did not register for an account, please ignore this email.</p>
            </div>
        </body>
        </html>
        `;

        await sendEmail(user.email, subject, text, html);

        return res.status(201).json({
            _id: user._id,
            msg: "OTP sent successfully",
        });

    } catch (err) {
        console.error(err);
        next(newError(err.message || "Server error", err.status || 500));
    }
};


const verifyOtp = async (req, res, next) => {
    const { otp, _id, verifiedRedirects } = req.body;

    try {
        if (!otp || !_id) return next(newError('OTP and user ID are required for verification', 400));

        const trimmedId = _id.trim();
        if (!mongoose.Types.ObjectId.isValid(trimmedId)) return next(newError('Invalid User ID', 400));

        const user = await User.findById(trimmedId);
        if (!user) return next(newError("User not found", 404));

        if (user.verification.verified === true) {


            cookiesResponse(res, user._id);
            return res.status(200).json({
                redirectUrl: `${verifiedRedirects
                        ? verifiedRedirects
                        : ""
                    }`,
                status: "success",
                msg: "Email has already been verified",
                _id: trimmedId,
            });
        }

        // Verify if the OTP has expired
        if (user.verification.expiresAt < Date.now()) return next(newError("Expired OTP", 400));

        // Validate the provided OTP
        const isValid = await validatePassword(otp.toUpperCase(), user.verification.code);
        if (!isValid) return next(newError("Invalid OTP", 400));

        // Mark the user as verified
        user.verification.code = null;
        user.verification.expiresAt = null;
        user.verification.verified = true;

        await user.save();

        cookiesResponse(res, user._id);

        return res.status(200).json({
            redirectUrl: `${verifiedRedirects
                    ? verifiedRedirects
                    : "/"
                }`,
            status: "success",
            msg: "Email verified successfully",
            _id: trimmedId,
        });

    } catch (err) {
        return next(newError(err.message || "Server error", err.status || 500));
    }
};




const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email) return next(newError('Email is required', 400));

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return next(newError('User not found', 404));

        const { verificationCode, expiresAt } = otpGenerator();
        const hashedCode = await genPassword(verificationCode);

        const passwordOtp = await NewPasswordOtp.findOneAndUpdate(
            { userId: user._id }, // Query to find the document by userId
            {
                $set: {
                    code: hashedCode,
                    expiresAt
                }
            },
            {
                new: true, 
                upsert: true
            }
        );

        if (!passwordOtp) return next(newError("Server error", 500))

        const subject = 'Password Reset Request';
        const text = `We received a request to reset your password. Your reset code is: ${verificationCode}. This code will expire in 1 hour. If you did not request a password reset, please ignore this email or contact support.`;

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .container h2 {
                    color: #007bff;
                }
                .container p {
                    font-size: 16px;
                    margin: 15px 0;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                }
                .expiry {
                    font-size: 16px;
                    color: #ff0000;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Reset Your Password</h2>
                <p>We received a request to reset your password. Please use the code below to proceed:</p>
                <p class="code">${verificationCode}</p>
                <p class="expiry">This code will expire in 1 hour.</p>
                <p class="footer">If you did not request a password reset, please ignore this email or contact support.</p>
            </div>
        </body>
        </html>
        `;

        await sendEmail(normalizedEmail, subject, text, html);

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            date: user.date
        });

    } catch (err) {
        next(newError(err.message || "Server error", err.status || 500));
    }
};

const resetPassword = async (req, res, next) => {
    const { otp, newPassword, userId, verifiedRedirects } = req.body;
    try {
        if (!otp || !newPassword || !userId) return next(newError('All fields are required', 400));
        if (!mongoose.Types.ObjectId.isValid(userId)) return next(newError('Invalid User ID ', 400));
        const normalizedPassword = newPassword.toLowerCase().trim();
        const otpRecord = await NewPasswordOtp.findOne({ userId });
        if (!otpRecord) return next(newError("User not found", 404));


        if (otpRecord.expiresAt < Date.now()) return next(newError("Expired OTP", 400));


        const isValid = await validatePassword(otp.toUpperCase(), otpRecord.code);
        if (!isValid) return next(newError("Invalid OTP", 400));
        if (newPassword.length < 6) return next(newError("Password must be at least 6 characters long", 400))
        const user = await User.findById(userId);
        if (!user) return next(newError("User not found", 404));

const isPasswordTheSameAsLastOne = await validatePassword(newPassword, user.password);
if(isPasswordTheSameAsLastOne)  return next(newError("New password cannot be the same as the current one.", 400));
        user.password = normalizedPassword;
        await user.save();


        await NewPasswordOtp.findByIdAndDelete(otpRecord._id);

        res.status(200).json({
            redirectUrl: `/login${verifiedRedirects
                ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                : ""
            }`,
            status: "success",
            msg: "Password reset successfully",
            _id: user._id,
        });
        

    } catch (err) {
        next(newError(err.message || "Server error", err.status || 500));
    }
};

const login = async (req, res, next) => {
    const { email, password, verifiedRedirects } = req.body;
    try {
        if (!email || !password) return next(newError("Email and password are required", 400));
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPassword = password.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return next(newError("User not found. Check email and try again", 404));
        const isPasswordValid = await validatePassword(normalizedPassword, user.password);
        if (!isPasswordValid) return next(newError("Password is incorrect. Please try again", 400));


        cookiesResponse(res, user._id);
        return res.status(200).json({
            redirectUrl: `${verifiedRedirects
                    ? verifiedRedirects
                    : "/"
                }`, msg: 'Login successful'
        });
        // res.redirect("/")

    } catch (err) {
        next(newError(err.message || "Server error", err.status || 500));
    }
}
const logout = (req, res, next) => {
    res.cookie("accessToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    })
    res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    });
    res.cookie("isAuthenticated", "", {
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    });
    
    return res.status(200).json({ msg: 'Logout successful' });
};

const getUser = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) return next(newError("No user id", 400));

    const user = await User.findById(userId);
    if (!user) return next(newError("No user found", 404));
    const data = cloneDeep(user.toObject());

    // delete data.verification;
    delete data.password;
    delete data.favorites;
    delete __v



    cookiesResponse(res, user._id);
    return res.status(200).json({
        status: "success",
        data
    })

}
const editDetails = async (req, res, next) => {
    const userId = req.userId;
    const { email, password, username } = req.body;
    const updateFields = {};

    try {
        if (!userId) return next(newError("User ID is required", 400));
        if (!mongoose.Types.ObjectId.isValid(userId)) return next(newError('Invalid User ID ', 400));
        if (!email && !password && !username) return next(newError("No details provided. Please provide at least one of the following: email, password, or username.", 400));

        if (email) {
            const normalizedEmail = email.toLowerCase().trim();
            updateFields.email = normalizedEmail;
        }
        if (password) {
            const normalizedPassword = password.toLowerCase().trim();
            updateFields.password = normalizedPassword;
        }
        if (username) {
            updateFields.username = username;
        }

        const user = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true, runValidators: true });
        if (!user) return next(newError("User not found", 404));

        return res.status(200).json({
            status: "success",
            msg: "User details updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        const errObj = mongooseError(err);
        let error;
        if (errObj) {
            error = newError("Validation error", 400, errObj);
            return next(error)
        }

        error = newError(err.message || "Server error", err.status || 500)
        return next(newError(error))
    }
};
const checkAuth = async (req, res, next) => {
res.status(200).json({
    authenticated: true,
})
}
const deleteAccount = async(req, res, next) => {
    const userId = req.userId;
    if(!userId) return  next(newError("User ID is required", 400));

    const user = await User.findByIdAndDelete(userId);
    if(!user) return next(newError("User not found", 404));
    res.cookie("accessToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    })
    res.cookie("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    });
    res.cookie("isAuthenticated", "", {
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "None"
    });
    res.status(200).json({ msg: 'User account deleted successfully' });
}




module.exports = { register, verifyOtp, forgotPassword, resetPassword, login, logout, editDetails, generateNewVerificationOtp, getUser, checkAuth, deleteAccount };