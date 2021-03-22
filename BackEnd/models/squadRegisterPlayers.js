const mongoose = require('mongoose');

const squadRegisterPlayers = mongoose.Schema({
    emailTeamLeader:{type : String ,unique: true , required : true ,validate: /^[a-z0-9]+@gmail.com$/},
    pubgIdTeamLeader:{type : String ,unique: true , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneTeamLeader:{type : String ,unique: true , sparse: true ,validate: /^[0-9]{11}$/},
    displayedAdTeamLeader:{type : String , required : true , default: "error occur"},

    emailFirstMember:{type : String , validate: /^[a-z0-9]+@gmail.com$/ ,required:true , default:"test@gmail.com"},
    pubgIdFirstMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneFirstMember:{type : String ,validate: /^[0-9]{11}$/},
    displayedAdFirstMember:{type : String ,required:true , default:"error occur"},
    acceptFirstPlayer:{type : Boolean ,required:true , default:false},

    emailSecondMember:{type : String  , validate: /^[a-z0-9]+@gmail.com$/ ,required:true , default:"test@gmail.com"},
    pubgIdSecondMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneSecondMember:{type : String ,validate: /^[0-9]{11}$/},
    displayedAdSecondMember:{type : String ,required:true , default:"error occur"},
    acceptSecondPlayer:{type : Boolean ,required:true , default:false},

    emailThirdMember:{type : String , validate: /^[a-z0-9]+@gmail.com$/ ,required:true , default:"test@gmail.com"},
    pubgIdThirdMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
        maxlength: 15},
    phoneThirdMember:{type : String ,validate: /^[0-9]{11}$/},
    displayedAdThirdMember:{type : String ,required:true , default:"error occur"},
    acceptThirdPlayer:{type : Boolean ,required:true , default:false},
});

module.exports = mongoose.model('squadRegisterPlayers',squadRegisterPlayers);