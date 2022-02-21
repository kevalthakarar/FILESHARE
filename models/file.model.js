const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({

    filename : {type : String , require : true},
    path : {type : String , require : true},
    size : {type : Number , require : true},
    uuid : {type : String , require : true},
    sender : {type : String , require : false},
    receiver : {type : String , require : false},
    FileData : {type : Buffer , require : true},
} , {timestamps : true});

module.exports = mongoose.model('FileShare' , FileSchema);      // FileShare collection name
