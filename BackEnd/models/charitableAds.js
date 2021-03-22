const mongoose = require('mongoose');

const charitableAds = mongoose.Schema({
    videoId:{type : String , require : true},
    adAppearanceCountry:{type : String , require : true ,default: "ALL"},
});

module.exports = mongoose.model('charitableAds',charitableAds);