const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: "User" }
        }
    ]
});

module.exports = new mongoose.model("Post", PostScheme);

