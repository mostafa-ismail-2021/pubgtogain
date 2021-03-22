const mongoose = require('mongoose');

const duoRegisterPlayers = mongoose.Schema({
    emailTeamLeader:{type : String ,unique: true , required : true ,validate: /^[a-z0-9]+@gmail.com$/},
    pubgIdTeamLeader:{type : String , unique: true , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneTeamLeader:{type : String ,unique: true , sparse: true ,validate: /^[0-9]{11}$/},
    displayedAdTeamLeader:{type : String , required : true , default: "error occur"},

    emailMember:{type : String , validate: /^[a-z0-9]+@gmail.com$/ ,required:true , default:"test@gmail.com"},
    pubgIdMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneMember:{type : String ,validate: /^[0-9]{11}$/},
    displayedAdMember:{type : String ,required:true , default:"error occur"},
    acceptPlayer:{type : Boolean ,required:true , default:false}
});

module.exports = mongoose.model('duoRegisterPlayers',duoRegisterPlayers);