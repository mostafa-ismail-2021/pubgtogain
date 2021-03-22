const mongoose = require('mongoose');

const soloSplitePlayers = mongoose.Schema({
    round:{type : Number , required : true },
    groupNumber:{type : Number , required : true },
    groupPlayers:[{
        pubgId:{type : String , required : true ,validate: /^[0-9]+$/ , minlength: 7 ,
            maxlength: 15}
    }],
    date:{type : String , required : true ,validate: /^\d{1,2}\/\d{1,2}\/\d{4}$/},
    time:{type : Number , required : true , min:1, max: 24},
});

module.exports = mongoose.model('soloSplitePlayers',soloSplitePlayers);