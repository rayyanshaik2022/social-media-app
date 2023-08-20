const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        expires: "180d"
    }
})
module.exports = mongoose.model("Refresh", RefreshSchema);