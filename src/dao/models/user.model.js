const mongoose = require("mongoose")

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
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
    github_login:{
        type: String,
        
    },
    role: {
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user",
        require: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        require: true
    },
    documents: {
        type: [
            {
                name: String,
                reference: String,
                doctype: {
                    type : String,
                    enum: ["id", "address", "account_status"]
                }
            }
        ]
    },
    status: {
        type:Boolean,
        default: false
    },
    last_connection: {
        type: Date
    }
})

//userSchema.plugin(mongoosePaginate)
const userModel = mongoose.model (userCollection, userSchema)

module.exports = userModel
