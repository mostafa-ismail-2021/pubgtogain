const mongoose = require('mongoose');

const soloCheckEmail = mongoose.Schema({
    email:{type : String , required : true  ,validate: /^[a-z0-9]+@gmail.com$/},
    code:{type : Number , required : true }
});

module.exports = mongoose.model('soloCheckEmail',soloCheckEmail);