const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        googleUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "GoogleUser",
        },
        email:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            maxLength:25,
        },
        description:{
            type:String,
            required:true,
            maxLength:150,
        },
        status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' },
    },
    {timestamps:true}
)

module.exports = mongoose.model("Todo", todoSchema);