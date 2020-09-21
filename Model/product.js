const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    specification:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },date: {
        type: Date,
        default: Date.now(),
      },
});

module.exports = mongoose.model('product' , productSchema);