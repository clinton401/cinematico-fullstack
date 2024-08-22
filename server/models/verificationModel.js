const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    
  code: {
    type: String,
    default: null,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

module.exports = VerificationSchema;
