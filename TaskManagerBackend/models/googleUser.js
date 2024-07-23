const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema(
    {
   googleId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
    },
    {timestamps:true}
)

module.exports = mongoose.model("GoogleUser", googleUserSchema);