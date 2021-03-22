const mongoose = require('mongoose');

const blackList = mongoose.Schema({
    email:{type : String , required : true ,validate: /^[a-z0-9]+@gmail.com$/},
    pubgId:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
});

module.exports = mongoose.model('blackList',blackList);