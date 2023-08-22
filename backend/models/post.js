const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: { type: String, required: true},
    authorId: {type: Schema.Types.ObjectId, required: true},
    datePosted: { type: Date, default: Date.now},
    textContent: { type: String, required: true },
    likes: { type: Number, default: 0}

})

PostSchema.virtual("url").get(function() {
    return `/posts/find/${this._id}`
});

module.exports = mongoose.model("Post", PostSchema)