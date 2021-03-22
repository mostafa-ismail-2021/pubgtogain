const mongoose = require('mongoose');

const duoPubgChampionship = mongoose.Schema({
    startDate:{type : String , required : true},
    endDate:{type : String , required : true , default: "no date added"  ,unique: true , index: true },
    totalPlayersNumber:{type : Number , required : true , default:0},
    playersCountry:{type : String , required : true ,default: "ALL" , validate: /^[A-Z]{2,3}$/},
    
    paidAds:[{ _id : mongoose.Types.ObjectId }],
    
    adsWillAppear:[{
        videoId:{type : String , required : true},
        email:{type : String , required : true ,validate: /^[a-z0-9]+@gmail.com$/},
        adAppearanceCountry:{type : String , required : true ,default: "ALL" , validate: /^[A-Z]{2,3}$/},
    }],

    charityAds:[{
        videoId:{type : String , required : true},
        adAppearanceCountry:{type : String , required : true ,default: "ALL" , validate: /^[A-Z]{2,3}$/},
    }],

    registerTeamLeaderChampionshipType:{type : Boolean , required : true , default: false},
    registerMemberChampionshipType:{type : Boolean , required : true , default: false},
    registerFreeAdsType:{type : Boolean , required : true , default: false},
    registerReportHackerType:{type : Boolean , required : true , default: false},
    appearHackerAndWinnersPubg:{type : Boolean , required : true , default: false},
    splitPlayersType:{type : Boolean , required : true , default: false},
    existPaidAds:{type : Boolean , required : true , default: false},
    showAdsWillAppear:{type : Boolean , required : true , default: false},
    phonesAcceptPlayers:{type : Boolean , required : true , default: false},
});

module.exports = mongoose.model('duoPubgChampionship',duoPubgChampionship);