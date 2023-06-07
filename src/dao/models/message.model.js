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



const messageModel = model(messageCollection, messagesSchema)

module.exports = {messageModel}