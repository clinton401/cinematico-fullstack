const bcrypt = require("bcrypt");
const {newError} = require("./utils")

const genPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Error during salt generation or password hashing:", error);
        const err = newError("Failed to generate salt or hash password", 500);
        throw err
    }
}
const validatePassword =async(password, hash) => {
    try {
        const isValid = await bcrypt.compare(password, hash);
    return isValid
    } catch (error) {
        console.error("Error during password validation", error);
        const err = newError("Failed to validate password", 500);
        throw err
    }

}

module.exports = {genPassword, validatePassword}