const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  posts: { type: Schema.Types.Array, default: [] },
  liked: { type: Schema.Types.Array, default: [] },
  groups: { type: Schema.Types.Array, default: [] },
  friends: { type: Schema.Types.Array, default: [] },
  notifications: {type: Schema.Types.Array, default: []},
  location: {type: String, default: "Earth, Milky Way Galaxy"}
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
