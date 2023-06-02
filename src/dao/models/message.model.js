//const mongoose = require("mongoose")
const{Schema, model} = require("mongoose")

const messageCollection = "messages"

const messagesSchema = new Schema({
    message: String,
    user: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
})

/* const messagesSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}) */

const messageModel = model(messageCollection, messagesSchema)
//const messageModel = mongoose.model(messageCollection, messagesSchema)

module.exports = {messageModel}