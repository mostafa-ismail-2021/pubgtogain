const mongoose = require('mongoose');

const duoHackersAndWinners = mongoose.Schema({
    round:{type : Number , required : true },
    pubgIdTeamLeader:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    pubgIdMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    email:{type : String , required : true  ,validate: /^[a-z0-9]+@gmail.com$/},
    isWinner:{type : Boolean , required : true}
});

module.exports = mongoose.model('duoHackersAndWinners',duoHackersAndWinners);