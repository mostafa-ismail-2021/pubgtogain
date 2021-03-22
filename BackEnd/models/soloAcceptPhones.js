const mongoose = require('mongoose');

const soloAcceptPhones = mongoose.Schema({
    phone:{type : String , required : true ,unique: true ,validate: /^[0-9]{11}$/}
});

module.exports = mongoose.model('soloAcceptPhones',soloAcceptPhones);