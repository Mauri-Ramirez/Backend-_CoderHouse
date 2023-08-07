const{Schema, model} = require("mongoose")

const messageCollection = "messages"

const messagesSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    }
})



const messageModel = model(messageCollection, messagesSchema)

module.exports = {messageModel}