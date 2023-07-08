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
    githubLogin:{
        type: String,
        
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        require: true
    }
})

//userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model (userCollection, userSchema)

module.exports = userModel
