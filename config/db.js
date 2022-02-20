const mongoose = require('mongoose');
require('dotenv').config();
/** 
 * ConnectDB to connect atlas mongodb database
 * 
*/

function ConnectDB(){
    const url = process.env.MONGO_URI;
    mongoose.connect(url);  
    
    const connection = mongoose.connection;

    connection.once('open' , () => {
        console.log('DataBase connected');
    }).on('error' , (err) => {
        console.log('Connection Failed');
        console.log(err);
    })
}

module.exports = ConnectDB;