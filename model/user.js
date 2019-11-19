const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;


const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }]
});

UserScheme.virtual('password')
.set(function(password) {
    //Temp variable
    this._password = password;
    //salt
    this.salt = uuidv1();
    //encryptpassword
    this.hashed_password = this.encryptpassword(password);
})
.get(function() {
    return this._password;
});

UserScheme.methods = {

    authenciate: function(plaintext) {
        return this.encryptpassword(plaintext) === this.hashed_password;
    },

    encryptpassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest("hex");
        }catch(err) {
            return "";
        }
    }
}

module.exports = new mongoose.model("User", UserScheme);