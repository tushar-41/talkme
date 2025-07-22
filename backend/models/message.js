const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sendBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receivedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        default:"text",
        enum:[
            "text","image","file"
        ],
        required:true,
    },
},{timestamps:true}); 

module.exports = mongoose.model("Message",messageSchema);