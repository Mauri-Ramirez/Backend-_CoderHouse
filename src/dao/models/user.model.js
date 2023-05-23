///esquema
const {Schema, model} = require("mongoose")

const collection = "usuarios"

const userSchema = new Schema({
    firt_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userModel = model (collection, userSchema)

module.exports = {
    userModel
}