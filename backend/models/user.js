const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  posts: { type: Array, default: [] },
  liked: { type: Array, default: [] },
  groups: { type: Array, default: [] },
  friends: { type: Array, default: [] },
  notifications: {type: Array, default: []}
});

UserSchema.pre('save', async function () {
    try {
        const user = this;

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

module.exports = mongoose.model("User", UserSchema);
