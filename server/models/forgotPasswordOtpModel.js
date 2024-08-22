const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    code: {
        type: String,
        default: null
    },
    expiresAt: {
        type: Date,
        default: null
    },
}, { collection: 'forgot-password-otps' });

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);
