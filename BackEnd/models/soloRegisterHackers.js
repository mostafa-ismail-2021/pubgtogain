const mongoose = require('mongoose');

const soloRegisterHackers = mongoose.Schema({
    email:{type : String , required : true , unique: true ,validate: /^[a-z0-9]+@gmail.com$/},
    driveId:{type : String , required : true , unique: true ,validate: /^https:\/\/drive.google.com\/+[a-zA-Z0-9/?=_-]+$/}
});

module.exports = mongoose.model('soloRegisterHackers',soloRegisterHackers);