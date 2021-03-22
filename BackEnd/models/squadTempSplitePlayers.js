const mongoose = require('mongoose');

const squadTempSplitePlayers = mongoose.Schema({
    round:{type : Number , required : true },
    groupNumber:{type : Number , required : true },
    groupPlayers:[{
        pubgIdTeamLeader:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15},
        pubgIdFirstMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15},
        pubgIdSecondMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15},
        pubgIdThirdMember:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15},
    }],
    date:{type : String , required : true ,validate: /^\d{1,2}\/\d{1,2}\/\d{4}$/},
    time:{type : Number , required : true , min:1, max: 24},
});

module.exports = mongoose.model('squadTempSplitePlayers',squadTempSplitePlayers);