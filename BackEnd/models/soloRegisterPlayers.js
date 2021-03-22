const mongoose = require('mongoose');

const soloRegisterPlayers = mongoose.Schema({
    email:{type : String , required : true , unique: true ,validate: /^[a-z0-9]+@gmail.com$/ },
    pubgId:{type : String , required : true ,unique: true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15},
    phone:{type : String ,unique: true , sparse: true ,validate: /^[0-9]{11}$/},
    displayedAd:{type : String },
});

module.exports = mongoose.model('soloRegisterPlayers',soloRegisterPlayers);