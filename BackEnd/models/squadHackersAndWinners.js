const mongoose = require('mongoose');

const squadHackersAndWinners = mongoose.Schema({
    round:{type : Number , required : true },
    pubgIdTeamLeader:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    pubgIdFirstMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    pubgIdSecondMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    pubgIdThirdMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    email:{type : String , required : true  ,validate: /^[a-z0-9]+@gmail.com$/},
    isWinner:{type : Boolean , required : true}
});

module.exports = mongoose.model('squadHackersAndWinners',squadHackersAndWinners);