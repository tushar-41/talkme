const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sendBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    receivedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
});

module.exports = mongoose.model("Message",messageSchema);