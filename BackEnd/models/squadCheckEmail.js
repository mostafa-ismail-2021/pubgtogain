const mongoose = require('mongoose');

const squadCheckEmail = mongoose.Schema({
    email:{type : String , required : true  ,validate: /^[a-z0-9]+@gmail.com$/},
    code:{type : Number , required : true }
});

module.exports = mongoose.model('squadCheckEmail',squadCheckEmail);