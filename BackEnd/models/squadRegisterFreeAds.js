const mongoose = require('mongoose');

const squadRegisterFreeAds = mongoose.Schema({
    videoId:{type : String , required : true , unique: true , validate: /^[a-zA-Z0-9_-]+$/},
    email:{type : String ,  required : true , unique: true ,validate: /^[a-z0-9]+@gmail.com$/},
    adAppearanceCountry:{type : String , required : true , default: "ALL" , validate: /^[A-Z]{2,3}$/},
    displayedAd:{type : String , required : true, default: "error occur"},
});

module.exports = mongoose.model('squadRegisterFreeAds',squadRegisterFreeAds);