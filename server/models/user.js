
const mongoose = require('mongoose');
const FavoriteItemSchema = require("./favoritesModel");
const VerificationSchema = require("./verificationModel");
const {newError} = require("../lib/utils")
const {genPassword} = require("../lib/passwordUtils");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'], 
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    favorites: {
        type: [FavoriteItemSchema],
        default: [],
    },
    verification: {
        type: VerificationSchema,
        required: true,
      }
}, { collection: 'users-data' });

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      try {
        const hashedPassword = await genPassword(this.password);
        this.password = hashedPassword;
      } catch (err) {
        return next(newError(err.message, 500));
      }
    }
    next();
  });
 
  
  

module.exports = mongoose.model('User', UserSchema);
