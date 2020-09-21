const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("user" , userSchema)