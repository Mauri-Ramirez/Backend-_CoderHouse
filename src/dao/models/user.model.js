const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const userCollection = "users"

const userSchema = new mongoose.Schema({
    firtName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number
    },
    password:{
        type: String
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        default: "user"
    }
})

userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model (userCollection, userSchema)

module.exports = userModel
