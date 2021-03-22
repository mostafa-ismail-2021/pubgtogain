const soloPubgChampionshipModel = require('../models/soloPubgChampionship');
const soloHackersAndWinnersModel = require('../models/soloHackersAndWinners');
const soloRegisterFreeAdsModel = require('../models/soloRegisterFreeAds');
const soloRegisterHackersModel = require('../models/soloRegisterHackers');
const soloRegisterPlayersModel = require('../models/soloRegisterPlayers');
const soloSplitePlayersModel = require('../models/soloSplitePlayers');
const soloTempHackersAndWinnersModel = require('../models/soloTempHackersAndWinners');
const soloTempSplitePlayersModel = require('../models/soloTempSplitePlayers');
const soloCheckEmailModel = require('../models/soloCheckEmail');
const soloAcceptPhonesModel = require('../models/soloAcceptPhones');
const blackListModel = require('../models/blackList');
const adminSchema = require('../models/adminSchema');
const paidAds = require('../models/paidAds');
const charitableAdsModel = require('../models/charitableAds');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const geoip = require('geoip-lite');
var blackList = [];
var charityAds = {};
var freeAds = {};
var totalPlayers = 0;
var numberPlayers = 0;
var playersCountry = "EG";
var registerChampionshipType = false;
var registerFreeAdsType = false;
var registerReportHackerType = false;
var apperHackerAndWinners = false;
var splitPlayersType = false;
var existPaidAds = false;
var showAdsWillAppear = false;
var phonesAcceptPlayers = false;

function soloGetAdNoConnect(country){
    let sendData = {
      register : registerChampionshipType,
      videoId : null,
      videoType : "noType",
      adAppearanceCountry:null
    }
    if(Object.keys(freeAds).length > 0 != 0 && (freeAds.ALL != undefined || freeAds[country] != undefined)){
      if(freeAds.ALL != undefined && freeAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = freeAds[adAppearanceCountry][Math.floor(freeAds[adAppearanceCountry].length * Math.random())]
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:adAppearanceCountry
        }
      }
      else if(freeAds.ALL != undefined){
        let videoId = freeAds["ALL"][Math.floor(freeAds["ALL"].length * Math.random())];
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:"ALL"
        }
      }
      else{
        let videoId = freeAds[country][Math.floor(freeAds[country].length * Math.random())];
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:country
        }
      }
    }
    else{
      if(charityAds.ALL != undefined && charityAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = charityAds[adAppearanceCountry][Math.floor(charityAds[adAppearanceCountry].length * Math.random())]
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:adAppearanceCountry
        }
      }
      else if(charityAds.ALL != undefined){
        let videoId = charityAds["ALL"][Math.floor(charityAds["ALL"].length * Math.random())];
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:"ALL"
        }
      }
      else{
        let videoId = charityAds[country][Math.floor(charityAds[country].length * Math.random())];
        sendData={
          register : registerChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:country
        }
      }
    }
    if(playersCountry != country && playersCountry != "ALL"){
      sendData.register = false;
    }
    return sendData;
}

function sendEmailConfirm(email){
    let random = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000;
    try{
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pubgtogain@gmail.com',
          pass: '!20mos$tafa21&isma#il'
        }
      });
      
      var mailOptions = {
        from: 'pubgtogain@gmail.com',
        to: email,
        subject: 'pubg to gain',
        text: 'your confirmation code is : '+random
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
        }
      });
      return random;
    }
    catch(error)
    {
      return null;
    }
};

exports.increaseVideo = (req,res)=>{
    let videoType = req.body.videoType;
    let videoId = req.body.videoId;
    let adAppearanceCountry = req.body.adAppearanceCountry;
    if(videoType == 'paid')
    {
      paidAds.updateOne(
        {
          videoId:videoId ,
          adAppearanceCountry:adAppearanceCountry,
          $expr: { $gt: [ "$totalViews" , "$viewsNumber" ] } 
        },
        {
          $inc: { viewsNumber: 1}
        }
      ).then(e=>{res.status(200).json(true);}).catch(error => res.status(200).json(false));
    }
    else{
      res.status(200).json(false);
    }
}

exports.registerGetAd = (req,res)=>{
    let country;
    try{
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
          ip = req.connection.remoteAddress;
      } else {
          ip = req.ip;
      }
      country = geoip.lookup(ip).country;
    }
    catch{
      country = "ALL";
    }
    if(existPaidAds == true && (playersCountry == country || playersCountry == "ALL")){
      soloPubgChampionshipModel.aggregate([
        {
          $match: { endDate: "no date added" }
        },
        {
          $lookup: {
            from: "paidads",
            localField: "paidAds._id",
            foreignField: "_id",
            as: "paidVideos"
          }
        },
        {
          $project:{
            _id:0,
            filterPaidVideos:{
              $filter: {
                input: "$paidVideos",
                as: "paidVideo",
                cond: { 
                  $and: [
                    { 
                      $gt: [ "$$paidVideo.totalViews", "$$paidVideo.viewsNumber" ]
                    },
                    { 
                      $or: [
                        { $eq: [ "$$paidVideo.adAppearanceCountry" ,"ALL" ]},
                        { $eq: [ "$$paidVideo.adAppearanceCountry",  country ] } 
                      ]  
                    },
                  ]
                }
              }
            }
          }
        },
        {
          $project:{
            "filterPaidVideos.videoId":1,
            "filterPaidVideos.adAppearanceCountry":1,
          }
        },
        {
          $unwind: {path: "$filterPaidVideos"}
        },
        {
          $sample: { size: 1 }
        }
      ]).then(data =>{
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:phonesAcceptPlayers
        };
        if(data.length != 0){
          sendData={
            register : registerChampionshipType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
            phone:phonesAcceptPlayers
          }
        }
        else{
          sendData = soloGetAdNoConnect(country);
          sendData.phone = phonesAcceptPlayers;
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error solo register get ad");
        console.log(error);
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:phonesAcceptPlayers
        };
        sendData = soloGetAdNoConnect(country);
        sendData.phone = phonesAcceptPlayers;
        res.status(200).json(sendData);
      });
    }
    else{
      let sendData = {
        register : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        phone:phonesAcceptPlayers
      };
      sendData = soloGetAdNoConnect(country);
      sendData.phone = phonesAcceptPlayers;
      res.status(200).json(sendData);
    }
}

exports.checkPerson = (req,res)=>{
  if(phonesAcceptPlayers == false)
  {
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId
    soloRegisterPlayersModel.find({
      $or: [
        {
          email: gmailaccount
        }, 
        {
          pubgId: idPubg
        }
      ]
    },
    {
      _id:0,
      displayedAd:0
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false , existPhone:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.email == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.pubgId == idPubg){
          sendData.existIdPubg = true;
        }
      }
      if(sendData.existEmail == false && sendData.existIdPubg == false){
        for (let index = 0; index < blackList.length; index++) {
          const element = blackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const soloCheckEmail = new soloCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            soloCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in soloCheckEmail");
                console.log(error)
                res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
          }
        }
        else{
          res.status(200).json(sendData);
        }
      }
      else{
        res.status(200).json(sendData);
      }
    })
    .catch(error=>{
      console.log("error in checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
    });
  }
  else{
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId;
    let phonePlayer = req.body.playerPhone;
    soloRegisterPlayersModel.find({
      $or: [
        {
          email: gmailaccount
        }, 
        {
          pubgId: idPubg
        },
        {
          phone: phonePlayer
        }
      ]
    },
    {
      _id:0,
      displayedAd:0
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false , existPhone:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.email == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.pubgId == idPubg){
          sendData.existIdPubg = true;
        }
        if(element.phone == phonePlayer){
          sendData.existPhone = true;
        }
      }
      if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.existPhone == false){
        for (let index = 0; index < blackList.length; index++) {
          const element = blackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const soloCheckEmail = new soloCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            soloCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in soloCheckEmail");
                console.log(error)
                res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
          }
        }
        else{
          res.status(200).json(sendData);
        }
      }
      else{
        res.status(200).json(sendData);
      }
    })
    .catch(error=>{
      console.log("error in checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false , existPhone:false , random:null});
    });
  }
}

exports.sendData = (req ,res)=>{
    let country;
    try{
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
          ip = req.connection.remoteAddress;
      } else {
          ip = req.ip;
      }
      country = geoip.lookup(ip).country;
    }
    catch{
      country = "ALL";
    }
    if(registerChampionshipType == true && (playersCountry == country || playersCountry == "ALL"))
    {
      soloCheckEmailModel.findOne(
        {
          email:req.body.email,
          code:req.body.code
        },
        {
          _id:0,
          code:1
        }
      )
      .then(data => {
        if(data != null ){
          if(phonesAcceptPlayers == false)
          {
            const soloRegisterPlayers = new soloRegisterPlayersModel({
              email : req.body.email ,
              pubgId : req.body.pubgId ,
              displayedAd : req.body.videoId
            });
            soloRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              numberPlayers++;
              if(totalPlayers <= numberPlayers && totalPlayers != 0){
                soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { registerChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerChampionshipType" : 1 }
                }
                ).then(data=>{
                  if(data != null){
                    registerChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in  sendData in findOneAndUpdate');
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log('error in  sendData in insertMany');
              console.log(error);
              res.status(201).json({message:"error because overloads of server. register after some minutes"});
            });
          }
          else{
            const soloRegisterPlayers = new soloRegisterPlayersModel({
              email : req.body.email ,
              pubgId : req.body.pubgId ,
              phone : req.body.playerPhone ,
              displayedAd : req.body.videoId
            });
            soloRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              numberPlayers++;
              if(totalPlayers <= numberPlayers && totalPlayers != 0){
                soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { registerChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerChampionshipType" : 1 }
                }
                ).then(data=>{
                  if(data != null){
                    registerChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in  sendData in findOneAndUpdate');
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log('error in  sendData in insertMany');
              console.log(error);
              res.status(201).json({message:"error because overloads of server. register after some minutes"});
            });
          }
        }
        else{
          res.status(201).json({message:"your email confirm not valid please confirm again"});
        }
      })
      .catch(error=>{
        res.status(201).json({message:"error because overloads of server. register after some minutes"});
      });
    }
    else{
      res.status(201).json({message:"sorry, registration has finished"});
    }
  }

exports.dateGetAd = (req,res)=>{
    let country;
    try{
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
          ip = req.connection.remoteAddress;
      } else {
          ip = req.ip;
      }
      country = geoip.lookup(ip).country;
    }
    catch{
      country = "ALL";
    }
    if(existPaidAds == true && (playersCountry == country || playersCountry == "ALL")){
      soloPubgChampionshipModel.aggregate([
        {
          $match: { endDate: "no date added" }
        },
        {
          $lookup: {
            from: "paidads",
            localField: "paidAds._id",
            foreignField: "_id",
            as: "paidVideos"
          }
        },
        {
          $project:{
            _id:0,
            filterPaidVideos:{
              $filter: {
                input: "$paidVideos",
                as: "paidVideo",
                cond: { 
                  $and: [
                    { 
                      $gt: [ "$$paidVideo.totalViews", "$$paidVideo.viewsNumber" ]
                    },
                    { 
                      $or: [
                        { $eq: [ "$$paidVideo.adAppearanceCountry" ,"ALL" ]},
                        { $eq: [ "$$paidVideo.adAppearanceCountry",  country ] } 
                      ]  
                    },
                  ]
                }
              }
            }
          }
        },
        {
          $project:{
            "filterPaidVideos.videoId":1,
            "filterPaidVideos.adAppearanceCountry":1,
          }
        },
        {
          $unwind: {path: "$filterPaidVideos"}
        },
        {
          $sample: { size: 1 }
        }
      ]).then(data =>{
        let sendData = {
          dateAppearance : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null
        };
        if(data.length != 0){
          sendData={
            dateAppearance : splitPlayersType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
          }
        }
        else{
          let tempData = soloGetAdNoConnect(country);
            sendData = {
              dateAppearance : splitPlayersType,
              videoId : tempData.videoId,
              videoType : tempData.videoType,
              adAppearanceCountry:tempData.adAppearanceCountry
            }
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error solo dateGetAd");
        console.log(error);
        let tempData = soloGetAdNoConnect(country);
        let sendData = {
          dateAppearance : splitPlayersType,
          videoId : tempData.videoId,
          videoType : tempData.videoType,
          adAppearanceCountry:tempData.adAppearanceCountry
        }
        res.status(200).json(sendData);
      });
    }
    else{
      let tempData = soloGetAdNoConnect(country);
      let sendData = {
        dateAppearance : splitPlayersType,
        videoId : tempData.videoId,
        videoType : tempData.videoType,
        adAppearanceCountry:tempData.adAppearanceCountry
      }
      if(playersCountry != country && playersCountry != "ALL"){
        sendData.dateAppearance = false;
      }
      res.status(200).json(sendData);
    }
  }

exports.getPlayerDate = (req,res)=>{
    let idPubg = req.body.idpubg;
    soloSplitePlayersModel.findOne(
      {
        "groupPlayers.pubgId":idPubg
      },
      {
        _id:0,
        date:1,
        time:1
      }
    )
    .then(data => {
      let date  = {
        date : null,
        time:null,
        message:null
      }
      if(data != null ){
        date = {
          date:data.date,
          time:data.time,
          message:'your next round will start in'
        }
      }
      else{
        date = {
          date : null,
          time:null,
          message:'the idPubg not exist'
        }
      }
      res.status(200).json(date);
    })
    .catch(error=>{
      console.log('error in getsoloplayerdate');
      console.log(error);
      let date  = {
        date : null,
        time:null,
        message:'error because overloads of server'
      }
      res.status(200).json(date);
    })
  }

exports.freeAdGetAd = (req,res)=>{
    let country;
    try{
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
          ip = req.connection.remoteAddress;
      } else {
          ip = req.ip;
      }
      country = geoip.lookup(ip).country;
    }
    catch{
      country = "ALL";
    }
    if(showAdsWillAppear == false)
    {
      if(existPaidAds == true && (playersCountry == country || playersCountry == "ALL")){
        soloPubgChampionshipModel.aggregate([
          {
            $match: { endDate: "no date added" }
          },
          {
            $lookup: {
              from: "paidads",
              localField: "paidAds._id",
              foreignField: "_id",
              as: "paidVideos"
            }
          },
          {
            $project:{
              _id:0,
              filterPaidVideos:{
                $filter: {
                  input: "$paidVideos",
                  as: "paidVideo",
                  cond: { 
                    $and: [
                      { 
                        $gt: [ "$$paidVideo.totalViews", "$$paidVideo.viewsNumber" ]
                      },
                      { 
                        $or: [
                          { $eq: [ "$$paidVideo.adAppearanceCountry" ,"ALL" ]},
                          { $eq: [ "$$paidVideo.adAppearanceCountry",  country ] } 
                        ]  
                      },
                    ]
                  }
                }
              }
            }
          },
          {
            $project:{
              "filterPaidVideos.videoId":1,
              "filterPaidVideos.adAppearanceCountry":1,
            }
          },
          {
            $unwind: {path: "$filterPaidVideos"}
          },
          {
            $sample: { size: 1 }
          }
        ]).then(data =>{
          let sendData = {
            freeAdResgister : registerFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          if(data.length != 0){
            sendData={
              freeAdResgister : registerFreeAdsType,
              videoId : data[0].filterPaidVideos.videoId,
              videoType : "paid",
              adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
              adsWillAppear:[]
            }
          }
          else{
            let tempData = soloGetAdNoConnect(country);
            sendData.videoId = tempData.videoId;
            sendData.videoType = tempData.videoType;
            sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          }
          res.status(200).json(sendData);
        })
        .catch(error => {
          console.log("error solo freeAdGetAd");
          console.log(error);
          let sendData = {
            freeAdResgister : registerFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          let tempData = soloGetAdNoConnect(country);
          sendData.videoId = tempData.videoId;
          sendData.videoType = tempData.videoType;
          sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          res.status(200).json(sendData);
        });
      }
      else{
        let sendData = {
          freeAdResgister : registerFreeAdsType,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          adsWillAppear:[]
        };
        let tempData = soloGetAdNoConnect(country);
        sendData.videoId = tempData.videoId;
        sendData.videoType = tempData.videoType;
        sendData.adAppearanceCountry = tempData.adAppearanceCountry;
        if(playersCountry != country && playersCountry != "ALL"){
          sendData.freeAdResgister = false;
        }
        res.status(200).json(sendData);
      }
    }
    else{
      let sendData = {
        freeAdResgister : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        adsWillAppear:[]
      }
      let freeAdsWillAppear = [];
      let freeAdValues = Object.values(freeAds);
      for (let index = 0; index < freeAdValues.length; index++) {
        for (let subindex = 0; subindex < freeAdValues[index].length; subindex++) {
          freeAdsWillAppear.push(freeAdValues[index][subindex]);
        }
      }
      sendData.adsWillAppear = freeAdsWillAppear;
      res.status(200).json(sendData);
    }
  }

exports.checkPersonFreeAd = (req,res)=>{
    let gmailaccount = req.body.email;
    let youtubeVideoId = req.body.youtube
    soloRegisterFreeAdsModel.find({
      $or: [
        {
          email: gmailaccount
        }, 
        {
          videoId: youtubeVideoId
        }
      ]
    },
    {
      _id:0,
      displayedAd:0,
      adAppearanceCountry:0
    })
    .then(data => {
      let sendData = {existEmail:false , existyoutubeVideoId:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.email == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.videoId == youtubeVideoId){
          sendData.existyoutubeVideoId = true;
        }
      }
      if(sendData.existEmail == false && sendData.existyoutubeVideoId == false){
        sendData.random = sendEmailConfirm(gmailaccount);
        if(sendData.random != null)
        {
          const soloCheckEmail = new soloCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          soloCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
              console.log("error in addfreead in soloCheckEmail");
              console.log(error)
              res.status(200).json({existEmail:false , existyoutubeVideoId:false , random:null});
          });
        }
        else{
          res.status(200).json({existEmail:false , existyoutubeVideoId:false , random:null});
        }
      }
      else{
        res.status(200).json(sendData);
      }
    })
    .catch(error=>{
      console.log("error in checkPersonFreeAd");
      console.log(error);
      res.status(200).json({existEmail:false , existyoutubeVideoId:false , random:null});
    });
  }

exports.sendDataFreeAd = (req ,res)=>{
  let country;
  try{
    let ip;
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    country = geoip.lookup(ip).country;
  }
  catch{
    country = "ALL";
  }
  if(registerFreeAdsType == true && (playersCountry == country || playersCountry == "ALL"))
  {
    soloCheckEmailModel.findOne(
      {
        email:req.body.email,
        code:req.body.code
      },
      {
        _id:0,
        code:1
      }
    )
    .then(data => {
      if(data != null ){
        const soloRegisterFreeAds = new soloRegisterFreeAdsModel({
          videoId : req.body.Youtube,
          email : req.body.email,
          adAppearanceCountry:req.body.Country,
          displayedAd : req.body.videoId
        });
        soloRegisterFreeAds.save()
        .then(date1 => {
          res.status(201).json({message:"your registration in free ads done"});
        })
        .catch(error => {
          console.log('error in solo sendDataFreeAd in insertMany');
          console.log(error);
          res.status(201).json({message:"error because overloads of server. register after some minutes"});
        });
      }
      else{
        res.status(201).json({message:"your email confirm not valid please confirm again"});
      }
    })
    .catch(error=>{
      res.status(201).json({message:"error because overloads of server. register after some minutes"});
    });
  }
  else{
    res.status(201).json({message:"sorry, registration has finished"});
  }
}

exports.reportHackerRegister = (req,res)=>{
    let country;
    try{
      let ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
          ip = req.connection.remoteAddress;
      } else {
          ip = req.ip;
      }
      country = geoip.lookup(ip).country;
    }
    catch{
      country = "ALL";
    }
    let sendData = {
      reportHackerResgister : registerReportHackerType,
      apperHackerAndWinners : apperHackerAndWinners,
    };
    if(playersCountry != country && playersCountry != "ALL"){
      sendData.reportHackerResgister = false;
      sendData.apperHackerAndWinners = false;
    }
    res.status(200).json(sendData); 
  }

exports.checkPersonHacker = (req,res)=>{
    let gmailaccount = req.body.email;
    let googleDrive = req.body.googleDrive;
    soloRegisterHackersModel.find({
      $or: [
        {
          email: gmailaccount
        }, 
        {
          driveId: googleDrive
        }
      ]
    },
    {
      _id:0
    })
    .then(data => {
      let sendData = {existEmail:false , existGoogleDrive:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.email == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.driveId == googleDrive){
          sendData.existGoogleDrive = true;
        }
      }
      if(sendData.existEmail == false && sendData.existGoogleDrive == false){
        sendData.random = sendEmailConfirm(gmailaccount);
        if(sendData.random != null)
        {
          const soloCheckEmail = new soloCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          soloCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
            console.log("error in addhacker in soloCheckEmail");
            console.log(error)
            res.status(200).json({existEmail:false , existGoogleDrive:false , random:null});
          });
        }
        else{
          res.status(200).json({existEmail:false , existGoogleDrive:false , random:null});
        }
      }
      else{
        res.status(200).json(sendData);
      }
    })
    .catch(error=>{
      console.log("error in checkPersonReportHacker");
      console.log(error);
      res.status(200).json({existEmail:false , existGoogleDrive:false , random:null});
    });
  }

exports.sendDataHacker = (req ,res)=>{
  let country;
  try{
    let ip;
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    country = geoip.lookup(ip).country;
  }
  catch{
    country = "ALL";
  }
  if(registerReportHackerType == true && (playersCountry == country || playersCountry == "ALL"))
  {
    soloCheckEmailModel.findOne(
      {
        email:req.body.email,
        code:req.body.code
      },
      {
        _id:0,
        code:1
      }
    )
    .then(data => {
      if(data != null ){
        const soloRegisterHackers = new soloRegisterHackersModel({
          email : req.body.email,
          driveId : req.body.googleDrive
        });
        soloRegisterHackers.save()
        .then(date1 => {
          res.status(201).json({message:"your registration done"});
        })
        .catch(error => {
          console.log('error in solo SendDataHacker in insertMany');
          console.log(error);
          res.status(201).json({message:"error because overloads of server. visit us after some minutes"});
        });
      }
      else{
        res.status(201).json({message:"your email confirm not valid please confirm again"});
      }
    })
    .catch(error=>{
      res.status(201).json({message:"error because overloads of server. register after some minutes"});
    });
  }
  else{
    res.status(201).json({message:"sorry, registration has finished"});
  }
}

exports.getPlayerState = (req,res)=>{
    let idPubg = req.body.idpubg;
    soloHackersAndWinnersModel.findOne(
      {
        pubgId:idPubg
      },
      {
        _id:0,
        isWinner:1
      }
    )
    .then(data => {
      if(data != null){
        if(data.isWinner == true){
          res.status(200).json("congratulations you are the winner in your group");
        }
        else{
          res.status(200).json("you use hacker in last round");
        }
      }
      else{
        res.status(200).json("sorry you are not the winner in your group");
      }
    })
    .catch(error=>{
      console.log('error in getsoloplayerstate');
      console.log(error);
      res.status(200).json("error because overloads of server. visit us after some minutes");
    });
  }

exports.addChampion = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no champion added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no champion added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
              message:"no champion added"
          });
        }
        else{
          const addNewSoloChampion = new soloPubgChampionshipModel({
              startDate:req.body.startDate,
              totalPlayersNumber:req.body.totalPlayersNumber,
              playersCountry:req.body.playerCountry
          });
          addNewSoloChampion.save()
          .then(data=>{
            totalPlayers = req.body.totalPlayersNumber;
            playersCountry = req.body.playerCountry;
            res.status(200).json({
              message:"championship added successfuly"
            });
          })
          .catch(error=>{
              console.log("error in admin in addChampion in save method");
              console.log(error)
              res.status(201).json({
                  message:"error occur"
              });
          });        
        }
    })
    .catch(error =>{
        console.log("error in admin in addChampion");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.deleteChampionShips = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloPubgChampionshipModel.deleteMany({})
          .then(data=>{
            totalPlayers = 0;
            numberPlayers = 0;
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteChampionShips in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });    
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteChampionShips");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

  exports.deleteEmails = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloCheckEmailModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in solo deleteEmails in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in solo deleteEmails");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.deleteHackersAndWinners = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          }); 
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteHackersAndWinners");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.deleteRegisterFreeAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloRegisterFreeAdsModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteRegisterFreeAds in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteRegisterFreeAds");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.deleteRegisterHackers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloRegisterHackersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteRegisterHackers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteRegisterHackers");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.getLastSplitPlayersTempRound = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloTempSplitePlayersModel.aggregate([{
             $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                soloTempSplitePlayersModel.find(
                  {
                    round:data[0].max
                  },
                  {
                    _id : 0,
                  }
                  ).then(data1=>{
                    if(data1.length != 0 ){
                        res.status(200).json(data1);              
                    }
                    else{
                        res.status(200).json([]);
                    }
                  })
                  .catch(error=>{console.log('error in  admin in find in getLastSplitPlayersTempRound');console.log(error);
                    res.status(201).json([]);
                });
              }
              else{
                  res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in aggregate in getLastSplitPlayersTempRound');console.log(error);
              res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getLastSplitPlayersTempRound");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.deleteRegisterPlayers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json({
            finish:false
          });
        }
        else{
          soloRegisterPlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteRegisterPlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteRegisterPlayers");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.deleteSplitePlayers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json({
            finish:false
          });
        }
        else{
          soloSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteSplitePlayers");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.deleteTempHackersAndWinners = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json({
            finish:false
          });
        }
        else{
          soloTempHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteTempHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteTempHackersAndWinners");
        console.log(error);
        res.status(201).json({
          finish:false
        });
    })
  }

exports.deleteTempSplitePlayers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json({
            finish:false
          });
        }
        else{
          soloTempSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteTempSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteTempSplitePlayers");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.setAllServerRefFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json({
            finish:false
          });
        }
        else{
          registerChampionshipType = false;
          registerFreeAdsType = false;
          registerReportHackerType = false;
          apperHackerAndWinners = false;
          splitPlayersType = false;
          existPaidAds = false;
          showAdsWillAppear = false;
          res.status(201).json({
            finish:true
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in setAllServerRefFalse");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.getCharityAdsTable = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(201).json([]);
        }
        else{
          charitableAdsModel.find({})
          .then(data=>{
            if(data.length != 0){
              res.status(201).json(data);
            }
            else{
              res.status(201).json([]);
            }
          })
          .catch(error=>{
            console.log("error in admin in getCharityAdsTable in find");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getCharityAdsTable");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addCharityAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
              message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          let addCharityAds = req.body.charityAds;
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { charityAds : addCharityAds}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  let setCharityAds = {};
                  for (let index = 0; index < addCharityAds.length; index++) {
                    const element = addCharityAds[index];
                    if(setCharityAds.hasOwnProperty(element.adAppearanceCountry)){
                      setCharityAds[element.adAppearanceCountry].push(element.videoId)
                    }
                    else{
                      setCharityAds[element.adAppearanceCountry] = [element.videoId]
                    }
                  }
                  charityAds = setCharityAds;
                  res.status(200).json({
                      message:"charity ads added successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in addCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addCharityAds");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.getCharityAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloPubgChampionshipModel.findOne(
              { endDate: 'no date added' },
              {   _id: 0, 
                  charityAds: 1, 
              }
              ).then(data=>{
                if(data != null){
                    res.status(200).json(data.charityAds);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findOne in getCharityAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getCharityAds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getCharityAdsServer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              ads:{}
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            ads:{}
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            ads:{}
          });
        }
        else{
          res.status(200).json(charityAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in getCharityAdsServer");
        console.log(error);
        res.status(201).json({
          ads:{}
        });
    })
  }

exports.deleteCharityAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { charityAds : []}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  charityAds = {};
                  res.status(200).json({
                      message:"delete ads successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"error occur"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in deleteCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteCharityAds");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.getPaidAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            paidAds.find(
              { $expr: { $gt: [ "$totalViews" , "$viewsNumber" ] } },
              {   _id: 1 }
              ).then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPaidAds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addPaidAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
              message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
            let paidAds = req.body.paidAds;
            for (let index = 0; index < paidAds.length; index++) {
              paidAds[index] = {_id : mongoose.Types.ObjectId(paidAds[index])} 
            }
            soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { paidAds : paidAds }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  res.status(200).json({
                      message:"add paid ads successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"error occur"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in addPaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addPaidAds");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.getNumberPaidAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            paidAds.find(
              { $expr: { $gt: [ "$totalViews" , "$viewsNumber" ] } },
              {   _id: 1 }
              ).limit(parseInt(req.body.paidAdsNumbers))
              .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getNumberPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getNumberPaidAds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addPaidAd = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
              {
                endDate:"no date added",
              },
              {
                $push: { paidAds: { $each: [ { _id : mongoose.Types.ObjectId(req.body.paidAd)} ] } }
              },
              {
                runValidators: true,
                projection: { "_id" : 0, "endDate" : 1 }
              }
              ).then(data=>{
                if(data!= null){
                  res.status(200).json({
                    message:"added paid ad successfuly"
                  });
                }
                else{
                  res.status(200).json({
                    message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in addPaidAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addPaidAd");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

  exports.getSoloPaidAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloPubgChampionshipModel.findOne(
              { endDate: 'no date added' },
              { _id: 0, 
                paidAds: 1, 
              }
              ).then(data=>{
                if(data != null){
                  res.status(200).json(data.paidAds);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findOne in getSoloPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getSoloPaidAds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.deletePaidAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
              message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { paidAds : []}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  res.status(200).json({
                      message:"paid ads deleted successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in deletePaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deletePaidAds");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.deletePaidAd = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
              {
                endDate:"no date added",
              },
              { $pull: { paidAds: { _id: req.body.deletePaidAd} } },
              {
                projection: { "_id" : 0, "endDate" : 1 }
              }
              ).then(data=>{
                if(data != null){
                  res.status(200).json({
                      message:"paid ad deleted successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in deletePaidAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deletePaidAd");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.getRandomAddBlackList = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          blackListModel.find(
            {},
            {
              "_id" : 0,
              "email" : 1,
              "pubgId" : 1,
            }
            ).limit(parseInt(req.body.numberPlayers)).then(data=>{
                if(data.length != 0){
                  blackList = data;
                  res.status(200).json({
                      message:"black list added successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                    message:"no data in black list"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in getRandomAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getRandomAddBlackList");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.getAllAddBlackList = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({message:"error occur"});
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({message:"error occur"});
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          blackListModel.find(
            {},
            {
              "_id" : 0,
              "email" : 1,
              "pubgId" : 1,
            }
            ).then(data=>{
                if(data.length != 0){
                  blackList = data;
                  res.status(200).json({
                    message:"black list added successfuly"
                  });            
                }
                else{
                  res.status(200).json({message:"no data in black list"});
                }
              })
              .catch(error=>{console.log('error in admin in aggregate in getAllAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getAllAddBlackList");
        console.log(error);
        res.status(201).json({message:"error occur"});
    })
  }

exports.getAllBlackList = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          res.status(200).json(blackList);
        }
    })
    .catch(error =>{
        console.log("error in admin in getAllBlackList");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.deleteAllBlackList = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({message:"error occur"});
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({message:"error occur"});
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({message:"error occur"});
        }
        else{
          blackList = [];
          res.status(200).json({message:"data deleted successfuly"});
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteAllBlackList");
        console.log(error);
        res.status(201).json({message:"error occur"});
    })
  }

exports.getPagesState = (req,res)=>{
    soloPubgChampionshipModel.findOne(
        { endDate: 'no date added' },
        {   _id: 0, 
            registerChampionshipType: 1, 
            registerFreeAdsType: 1 , 
            registerReportHackerType:1,
            appearHackerAndWinnersPubg:1,
            splitPlayersType:1,
            existPaidAds:1,
            showAdsWillAppear:1,
            phonesAcceptPlayers:1
        }
    ).then(data => {
        if(data == null ){
          res.status(200).json({
                exist:false,
                error:false,
                registerChampionshipType:false,
                registerFreeAdsType:false,
                registerReportHackerType:false,
                appearHackerAndWinnersPubg:false,
                splitPlayersType:false,
                existPaidAds:false,
                showAdsWillAppear:false,
                phonesAcceptPlayers:false
          });
        }else{
            res.status(200).json({
                exist:true,
                error:false,
                registerChampionshipType:data.registerChampionshipType,
                registerFreeAdsType:data.registerFreeAdsType,
                registerReportHackerType:data.registerReportHackerType,
                appearHackerAndWinnersPubg:data.appearHackerAndWinnersPubg,
                splitPlayersType:data.splitPlayersType,
                existPaidAds:data.existPaidAds,
                showAdsWillAppear:data.showAdsWillAppear,
                phonesAcceptPlayers:data.phonesAcceptPlayers
            });
        }
      })
    .catch(error=>{console.log("error in admin getSoloPagesState");console.log(error); 
        res.status(200).json({
            exist:false,
            error:true,
            registerChampionshipType:false,
            registerFreeAdsType:false,
            registerReportHackerType:false,
            appearHackerAndWinnersPubg:false,
            splitPlayersType:false,
            existPaidAds:false,
            showAdsWillAppear:false,
            phonesAcceptPlayers:false
        });
    });
  }

exports.getPagesStateServer = (req,res)=>{ 
    res.status(200).json({
      registerChampionshipType:registerChampionshipType,
      registerFreeAdsType:registerFreeAdsType,
      registerReportHackerType:registerReportHackerType,
      appearHackerAndWinnersPubg:apperHackerAndWinners,
      splitPlayersType:splitPlayersType,
      existPaidAds:existPaidAds,
      showAdsWillAppear:showAdsWillAppear,
      phonesAcceptPlayers:phonesAcceptPlayers
    });
  }

exports.setChampionshipTypeTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerChampionshipType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerChampionshipType = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setChampionshipTypeTrue');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setChampionshipTypeTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

  exports.setFreeAdsTypeTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerFreeAdsType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerFreeAdsType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerFreeAdsType = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in registerFreeAdsTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in registerFreeAdsTypeTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setReportHackerTypeTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
              message:"no change added"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerReportHackerType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerReportHackerType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerReportHackerType = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in registerReportHackerTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in registerReportHackerTypeTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setAppearHackerAndWinnersTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { appearHackerAndWinnersPubg : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "appearHackerAndWinnersPubg" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  apperHackerAndWinners = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in appearHackerAndWinnersPubgTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in appearHackerAndWinnersPubgTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setSplitPlayersTypeTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { splitPlayersType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "splitPlayersType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  splitPlayersType = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in splitPlayersTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in splitPlayersTypeTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setExistPaidAdsTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { existPaidAds : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "existPaidAds" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  existPaidAds = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setExistPaidAdsTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setShowAdsWillAppearTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { showAdsWillAppear : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "showAdsWillAppear" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  showAdsWillAppear = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setExistPaidAdsTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setPhonesAcceptPlayersTrue = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { phonesAcceptPlayers : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "phonesAcceptPlayers" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  phonesAcceptPlayers = true;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setExistPaidAdsTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setChampionshipTypeFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerChampionshipType = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setChampionshipTypeFalse');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setChampionshipTypeFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setFreeAdsTypeFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerFreeAdsType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerFreeAdsType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerFreeAdsType = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in registerFreeAdsTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in registerFreeAdsTypeFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setReportHackerTypeFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerReportHackerType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerReportHackerType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  registerReportHackerType = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in registerReportHackerTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in registerReportHackerTypeFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setAppearHackerAndWinnersFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { appearHackerAndWinnersPubg : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "appearHackerAndWinnersPubg" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  apperHackerAndWinners = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in appearHackerAndWinnersPubgFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in appearHackerAndWinnersPubgFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setSplitPlayersTypeFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { splitPlayersType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "splitPlayersType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  splitPlayersType = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in splitPlayersTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in splitPlayersTypeFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setExistPaidAdsFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
            {
              endDate:"no date added",
            },
            {
                $set: { existPaidAds : false}
            },
            {
              runValidators: true,
              projection: { "_id" : 0, "existPaidAds" : 1 }
            }
          ).then(data=>{
            if(data != null){
              existPaidAds = false;
              res.status(200).json({
                message:"data change successfuly"
              });                
            }
            else{
              res.status(200).json({
                  message:"no change added"
              });
            }
          })
          .catch(error=>{console.log('error in  admin in findOneAndUpdate in setExistPaidAdsFalse');console.log(error);
            res.status(201).json({message:"error occure try again"});
          });
        }
    })
    .catch(error =>{
      console.log("error in admin in setExistPaidAdsFalse");
      console.log(error);
      res.status(201).json({
        message:"error occure try again"
      });
    })
  }

exports.setShowAdsWillAppearFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
      if(data.length == 0)
      {
        res.status(200).json({
            message:"no change added"
        });
      }
      else if(data[0].email == "noemail@email.com"){
        res.status(200).json({
            message:"no change added"
        });
      }
      else if(data[0].email != req.body.adminData){
        res.status(200).json({
          message:"no change added"
        });
      }
      else{
        soloPubgChampionshipModel.findOneAndUpdate(
          {
            endDate:"no date added",
          },
          {
            $set: { showAdsWillAppear : false}
          },
          {
            runValidators: true,
            projection: { "_id" : 0, "showAdsWillAppear" : 1 }
          }
        ).then(data=>{
          if(data != null){
            showAdsWillAppear = false;
            res.status(200).json({
                message:"data change successfuly"
            });                
          }
          else{
              res.status(200).json({
                  message:"no change added"
              });
          }
        })
        .catch(error=>{console.log('error in  admin in findOneAndUpdate in setShowAdsWillAppearFalse');console.log(error);
          res.status(201).json({message:"error occure try again"});
        });
      }
    })
    .catch(error =>{
        console.log("error in admin in setShowAdsWillAppearFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setPhonesAcceptPlayersFalse = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"no change added"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"no change added"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { phonesAcceptPlayers : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "phonesAcceptPlayers" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  phonesAcceptPlayers = false;
                  res.status(200).json({
                      message:"data change successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"no change added"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in setExistPaidAdsTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.getAddPagesStates = (req,res)=>{
    soloPubgChampionshipModel.findOne(
      { endDate: 'no date added' },
      {   _id: 0, 
          totalPlayersNumber:1,
          playersCountry:1,
          registerChampionshipType: 1, 
          registerFreeAdsType: 1 , 
          registerReportHackerType:1,
          appearHackerAndWinnersPubg:1,
          splitPlayersType:1,
          existPaidAds:1,
          showAdsWillAppear:1,
          phonesAcceptPlayers:1
      }
    ).then(data => {
        if(data == null ){
          res.status(200).json({
            message:"no change added"
        });
        }else{
          numberPlayers = data.totalPlayersNumber;
          playersCountry = data.playersCountry;
          registerChampionshipType = data.registerChampionshipType;
          registerFreeAdsType = data.registerFreeAdsType;
          registerReportHackerType = data.registerReportHackerType;
          apperHackerAndWinners = data.appearHackerAndWinnersPubg;
          splitPlayersType = data.splitPlayersType;
          existPaidAds = data.existPaidAds;
          showAdsWillAppear = data.showAdsWillAppear;
          phonesAcceptPlayers = data.phonesAcceptPlayers;
          res.status(200).json({
            message:"data added successfully"
        });
        }
      })
    .catch(error=>{console.log("error in admin getAddPagesStates");console.log(error); 
      res.status(200).json({
        message:"error occure"
      });
    });
  }

exports.getRegisterAds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloRegisterFreeAdsModel.find(
            {},
            {
              "_id" : 0,
              "videoId" : 1,
              "email" : 1,
              "adAppearanceCountry" : 1,
            }
            ).then(data=>{
                if(data != null){
                    res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in admin in find in getRegisterAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getRegisterAds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getAdsWillAppear = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            let adsNumber = parseInt(req.body.adsnumber);
            soloRegisterFreeAdsModel.aggregate([
              {
                $sample: { size: adsNumber }
              },
              {
                $project:{
                  _id:0,
                  displayedAd:0
                }
              }]
              ).then(data=>{
                if(data.length != 0){
                    res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in aggregate in getAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getAdsWillAppear");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addAdsWillAppear = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
            let adsAppear = req.body.ads;
            soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { "adsWillAppear": adsAppear }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  let setFreeAds = {};
                  for (let index = 0; index < adsAppear.length; index++) {
                    const element = adsAppear[index];
                    if(setFreeAds.hasOwnProperty(element.adAppearanceCountry)){
                      setFreeAds[element.adAppearanceCountry].push(element.videoId)
                    }
                    else{
                      setFreeAds[element.adAppearanceCountry] = [element.videoId]
                    }
                  }
                  freeAds = setFreeAds;
                  res.status(200).json({
                      message:"add ads successfuly"
                  });                
                }
                else{
                    res.status(200).json({
                        message:"error occur"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in addAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addAdsWillAppear");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.addFreeAd = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          let videoId = req.body.videoId;
          let email = req.body.email ;
          let adCountry = req.body.adCountry;
          soloPubgChampionshipModel.findOneAndUpdate(
              {
                endDate:"no date added",
              },
              {
                $push: { "adsWillAppear": { $each: [ {videoId:videoId ,email:email ,adAppearanceCountry:adCountry} ] } }
              },
              {
                runValidators: true,
                projection: { "_id" : 0, "endDate" : 1 }
              }
              ).then(data=>{
                if(data!= null){
                  if(freeAds.hasOwnProperty(adCountry)){
                    freeAds[adCountry].push(videoId);
                  }
                  else{
                    freeAds[adCountry] = [videoId];
                  }
                  res.status(200).json({
                    message:"added free ad successfuly"
                  });
                }
                else{
                  res.status(200).json({
                    message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in admin in findOneAndUpdate in addFreeAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addFreeAd");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getRealAdsWillAppear = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloPubgChampionshipModel.findOne(
              {
                endDate:"no date added",
              },
              {
                "_id" : 0,
                "adsWillAppear" : 1 
              }
              ).then(data=>{
                if(data.length != 0){
                    res.status(200).json(data.adsWillAppear);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findone in getRealAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getRealAdsWillAppear");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getAdsWillAppearserver = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              ads:{}
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
              ads:{}
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            ads:{}
          });
        }
        else{
          res.status(200).json(freeAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in getAdsWillAppearserver");
        console.log(error);
        res.status(201).json({
          ads:{}
        });
    })
  }

exports.deleteAdsWillAppear = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            ads:{}
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { "adsWillAppear" : []}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "endDate" : 1 }
                }
              ).then(data=>{
                if(data != null){
                    freeAds = {};
                    res.status(200).json({
                        message:"delete ads successfuly"
                    });                
                }
                else{
                    res.status(200).json({
                        message:"error occur"
                    });
                }
              })
              .catch(error=>{console.log('error in  admin in findOneAndUpdate in deleteAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteAdsWillAppear");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.deleteFreeAd = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json({
                message:"error occur"
            });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOneAndUpdate(
              {
                endDate:"no date added",
              },
              { $pull: { "adsWillAppear": { _id: req.body.deleteFreeAd} } },
              {
                returnOriginal : false,
                projection: { "_id" : 0, "adsWillAppear" : 1 }
              }
              ).then(data=>{
                let adsWillAppearArray = data.adsWillAppear;
                let setFreeAds = {};
                for (let index = 0; index < adsWillAppearArray.length; index++) {
                  const element = adsWillAppearArray[index];
                  if(setFreeAds.hasOwnProperty(element.adAppearanceCountry)){
                    setFreeAds[element.adAppearanceCountry].push(element.videoId)
                  }
                  else{
                    setFreeAds[element.adAppearanceCountry] = [element.videoId]
                  }
                }
                freeAds = setFreeAds;
                if(data != null){
                  res.status(200).json({
                      message:"free ad deleted successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in admin in findOneAndUpdate in deleteFreeAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteFreeAd");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }

exports.adsFromDatabaseToServer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloPubgChampionshipModel.findOne(
              { endDate: 'no date added' },
              {  
                _id: 0, 
                adsWillAppear: 1, 
              }
              ).then(data=>{
                if(data != null){
                  let setFreeAds = {};
                  for (let index = 0; index < data.adsWillAppear.length; index++) {
                    const element = data.adsWillAppear[index];
                    if(setFreeAds.hasOwnProperty(element.adAppearanceCountry)){
                      setFreeAds[element.adAppearanceCountry].push(element.videoId)
                    }
                    else{
                      setFreeAds[element.adAppearanceCountry] = [element.videoId]
                    }
                  }
                  freeAds = setFreeAds;
                  res.status(200).json({
                    message:"data added to server successful"
                  });             
                }
                else{
                  res.status(200).json({
                    message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in findone in adsFromDatabaseToServer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in adsFromDatabaseToServer");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.addPlayer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
            let pubgId = req.body.pubgId;
            let email = req.body.email;
            soloRegisterPlayersModel.insertMany([
              {
                email:email,
                pubgId:pubgId ,
                displayedAd:"adminData"
              }
            ]).then(data=>{
                res.status(200).json({
                  message:"data added successfuly"
                });
              })
              .catch(error=>{console.log('error in  admin in insertMany in addPlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in addPlayer");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.deletePlayer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
            let pubgId = req.body.pubgId;
            soloRegisterPlayersModel.deleteOne(
              {
                pubgId: pubgId
              }
              ).then(data=>{
                  res.status(200).json({
                    message:"data deleted successfuly"
                  });
              })
              .catch(error=>{console.log('error in  admin in deleteOne in deletePlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deletePlayer");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getPubgIds = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloRegisterPlayersModel.find(
            {},
            {
              _id:0,
              pubgId:1
            }
          ).then(data => {
            if(data.length != 0 ){
              res.status(200).json(data);
            }
            else{
              res.status(201).json([]);
            }
          })
          .catch(error=>{
            console.log('error in  admin in findOne in getPubgIds');console.log(error);
            res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPubgIds");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.splitPlayers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({
              finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          let playersData = req.body.data;
          soloSplitePlayersModel.insertMany(playersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in splitPlayer in insertMany");
            console.log(error);
            res.status(200).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
      console.log("error in admin in splitPlayer");
      console.log(error);
      res.status(200).json({
        finish:false
      });
    })
  }

exports.deleteTempSplitPlayersLR = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              finish:false
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
            soloTempSplitePlayersModel.aggregate([{
              $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                soloTempSplitePlayersModel.deleteMany(
                  {
                    round:data[0].max
                  }
                  ).then(data1=>{
                    res.status(200).json({
                      finish:true
                    });
                  })
                 .catch(error=>{console.log('error in  admin in deleteMany in deleteTempSplitPlayersLR');console.log(error);
                  res.status(200).json({
                    finish:false
                  });
               });
             }
             else{
                res.status(200).json({
                  finish:false
                });
             }
            })
            .catch(error=>{console.log('error in  admin in aggregate in deleteTempSplitPlayersLR');console.log(error);
            res.status(200).json({
              finish:false
            });
         });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteTempSplitPlayersLR");
        console.log(error);
        res.status(200).json({
          finish:false
        });
    })
  }

exports.getLastWinnersRound = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloHackersAndWinnersModel.find(
            {
              isWinner:true
            },
            {
              _id:0,
              pubgId:1
            }
          ).then(data => {
            if(data.length != 0 ){
              res.status(200).json(data);
            }
            else{
              res.status(201).json([]);
            }
          })
          .catch(error=>{
            console.log('error in  admin in find in getLastWinnersRound');console.log(error);
            res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getLastWinnersRound");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getSplitPlayer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloSplitePlayersModel.find(
            {},
            {
              _id:0
            }
            ).then(data=>{
              if(data.length != 0 ){
                  res.status(200).json(data);              
              }
              else{
                res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in find in getSplitPlayer');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getSplitPlayer");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.addTempSplitPlayer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          let tempSplitPlayersData = req.body.splitPlayers;
          soloTempSplitePlayersModel.insertMany(tempSplitPlayersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in addTempSplitPlayer in insertMany");
            console.log(error);
            res.status(201).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in addTempSplitPlayer");
        console.log(error);
        res.status(201).json({
          finish:false
        });
    })
  }

exports.getSplitPlayerDate = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloSplitePlayersModel.find(
            {
              date:req.body.date
            },
            {
              _id:0
            }
            ).then(data=>{
              if(data.length != 0 ){
                  res.status(200).json(data);              
              }
              else{
                res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in find in getSplitPlayerDate');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getSplitPlayerDate");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.getRegisterHackers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            soloRegisterHackersModel.find(
              {},
              {
                _id : 0,
                driveId : 1 
              }
              ).then(data=>{
                if(data.length != 0 ){
                    res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findOne in getRegisterHackers');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getRegisterHackers");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getEmailHacker = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloRegisterPlayersModel.findOne(
            {
              pubgId:req.body.idPubg
            },
            {
              _id:0,
              email:1
            }
          ).then(data=>{
              if(data != null){
                res.status(200).json({
                  message:data.email
                });
              }
              else{
                res.status(200).json({
                  message:"this id not exist in championship"
                });
              }
            })
            .catch(error=>{console.log('error in  admin in findOne in getEmailHacker');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getEmailHacker");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.addHackers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloHackersAndWinnersModel.insertMany(req.body.hackers).then(data=>{
            res.status(200).json({
              message:"data added successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in insertMany in addHackers');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addHackers");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getLastHackersRound = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            soloHackersAndWinnersModel.find(
              {
                isWinner:false
              },
              {
                _id : 0,
                isWinner : 0 
              }
              ).then(data=>{
                if(data.length != 0 ){
                    res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findOne in getLastHackersRound');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getLastHackersRound");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.deleteReportHacker = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloHackersAndWinnersModel.deleteOne(
            {
              isWinner:false,
              pubgId:req.body.id
            }
          ).then(data=>{
              res.status(200).json({
                message:"data deleted successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in deleteOne in deleteReportHacker');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteReportHacker");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.addWinners = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloHackersAndWinnersModel.insertMany(req.body.winners).then(data=>{
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in insertMany in addWinners');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addWinners");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.deleteWinner = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloHackersAndWinnersModel.deleteOne(
            {
              isWinner:true,
              pubgId:req.body.id
            }
          ).then(data=>{
              res.status(200).json({
                message:"data deleted successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in deleteOne in deleteWinner');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteWinner");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getLastHackersAndWinnersRound = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
            soloHackersAndWinnersModel.find(
              {},
              {
                _id : 0,
              }
              ).then(data=>{
                if(data.length != 0 ){
                    res.status(200).json(data);              
                }
                else{
                    res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in findOne in getLastHackersAndWinnersRound');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getLastHackersAndWinnersRound");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addTempHackersAndWinners = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          let HackersAndWinnersData = req.body.HackersAndWinnersData;
          soloTempHackersAndWinnersModel.insertMany(HackersAndWinnersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in addTempHackersAndWinners in insertMany");
            console.log(error);
            res.status(201).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in addTempHackersAndWinners");
        console.log(error);
        res.status(201).json({
          finish:false
        });
    })
  }

exports.getLastHackersAndWinnersTempRound = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloTempHackersAndWinnersModel.aggregate([{
             $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                soloTempHackersAndWinnersModel.find(
                  {
                    round:data[0].max
                  },
                  {
                    _id : 0,
                  }
                  ).then(data1=>{
                    if(data1.length != 0 ){
                        res.status(200).json(data1);              
                    }
                    else{
                        res.status(200).json([]);
                    }
                  })
                  .catch(error=>{console.log('error in  admin in find in getLastHackersAndWinnersTempRound');console.log(error);
                    res.status(201).json([]);
                });
              }
              else{
                  res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in aggregate in getLastHackersAndWinnersTempRound');console.log(error);
              res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getLastHackersAndWinnersTempRound");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addHackersAndWinners = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              finish:false
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloHackersAndWinnersModel.insertMany(req.body.HackersAndWinners).then(data=>{
              res.status(200).json({
                finish:true
              });
            })
            .catch(error=>{console.log('error in  admin in insertMany in addHackersAndWinners');console.log(error);
            res.status(200).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addHackersAndWinners");
        console.log(error);
        res.status(200).json({
          finish:false
        });
    })
  }

exports.deleteTempHackersAndWinnersLR = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              finish:false
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
            soloTempHackersAndWinnersModel.aggregate([{
              $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                soloTempHackersAndWinnersModel.deleteMany(
                  {
                    round:data[0].max
                  }
                  ).then(data1=>{
                    res.status(200).json({
                      finish:true
                    }); 
                  })
                 .catch(error=>{console.log('error in  admin in find in deleteTempHackersAndWinnersLR');console.log(error);
                  res.status(200).json({
                    finish:false
                  });
               });
             }
             else{
                res.status(200).json({
                  finish:false
                });
             }
            })
            .catch(error=>{console.log('error in  admin in aggregate in deleteTempHackersAndWinnersLR');console.log(error);
            res.status(200).json({
              finish:false
            });
         });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteTempHackersAndWinnersLR");
        console.log(error);
        res.status(200).json({
          finish:false
        });
    })
  }

exports.getAllTempHackers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloTempHackersAndWinnersModel.find(
            {
              isWinner:false
            },
            {
              _id:0,
              pubgId:1,
              email:1
            }
          )
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error =>{
            console.log("error in admin in find in getAllTempHackers");
            console.log(error);
            res.status(201).json([]);
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in getAllTempHackers");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getAllHackers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
            res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloHackersAndWinnersModel.find(
            {
              isWinner:false
            },
            {
              _id:0,
              pubgId:1,
              email:1
            }
          )
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error =>{
            console.log("error in admin in find in getAllHackers");
            console.log(error);
            res.status(201).json([]);
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in getAllHackers");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addSubBlackList = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          blackListModel.insertMany(req.body.data)
            .then(data=>{
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in insertmany in addSubBlackList');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addSubBlackList");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.addPhones = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          soloAcceptPhonesModel.insertMany(req.body.phones).then(data=>{
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in insertMany in addPhones');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addPhones");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getAllPhonesNumbers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloAcceptPhonesModel.find(
            {},
            {
              _id:0
            }
            ).then(data=>{
              if(data.length != 0 ){
                  res.status(200).json(data);              
              }
              else{
                res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in find in getAllPhonesNumbers');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getAllPhonesNumbers");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.getPhoneNumberPhones = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({message:"error occur" , phone:"no phone"});
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({message:"error occur" , phone:"no phone"});
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({message:"error occur" , phone:"no phone"});
        }
        else{
          soloAcceptPhonesModel.findOne(
            {
              phone:req.body.PhoneNumber
            },
            {
              _id:0,
            }
          ).then(data=>{
              if(data != null){
                res.status(200).json({message:"phone exist" , phone:data.phone});
              }
              else{
                res.status(200).json({message:"phone not exist" , phone:"no phone"});
              }
            })
            .catch(error=>{console.log('error in  admin in findOne in getEmailHacker');console.log(error);
            res.status(200).json({message:"error occur" , phone:"no phone"});
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPhoneNumberPhones");
        console.log(error);
        res.status(200).json({message:"error occur" , phone:"no phone"});
    })
  }

exports.getPhoneNumberRegister = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({message:"error occur" , email:"error occur" , pubgId:"error occur" , phone:"error occur" , displayedAd:"error occur"});
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({message:"error occur" , email:"error occur" , pubgId:"error occur" , phone:"error occur" , displayedAd:"error occur"});
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({message:"error occur" , email:"error occur" , pubgId:"error occur" , phone:"error occur" , displayedAd:"error occur"});
        }
        else{
          soloRegisterPlayersModel.findOne(
            {
              phone:req.body.PhoneNumber
            },
            {
              _id:0,
            }
          ).then(data=>{
              if(data != null){
                res.status(200).json({message:"phone exist" , email:data.email , pubgId:data.pubgId , phone:data.phone , displayedAd:data.displayedAd});
              }
              else{
                res.status(200).json({message:"phone not exist" , email:"not exist" , pubgId:"not exist" , phone:"not exist" , displayedAd:"not exist"});
              }
            })
            .catch(error=>{console.log('error in  admin in findOne in getPhoneNumberRegister');console.log(error);
            res.status(200).json({message:"error occur" , email:"error occur" , pubgId:"error occur" , phone:"error occur" , displayedAd:"error occur"});
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPhoneNumberRegister");
        console.log(error);
        res.status(200).json({message:"error occur" , email:"error occur" , pubgId:"error occur" , phone:"error occur" , displayedAd:"error occur"});
    })
  }

exports.getRegisterPlayersData = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloRegisterPlayersModel.find(
            {},
            {
              _id:0
            }
            ).then(data=>{
              if(data.length != 0 ){
                  res.status(200).json(data);              
              }
              else{
                res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in find in getRegisterPlayersData');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getRegisterPlayersData");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.deletePhoneNumber = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
            soloAcceptPhonesModel.deleteOne(
              {
                phone: req.body.PhoneNumber
              }
              ).then(data=>{
                  res.status(200).json({
                    message:"data deleted successfuly"
                  });
              })
              .catch(error=>{console.log('error in  admin in deleteOne in deletePlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deletePlayer");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.deleteAllPhonesNumbers = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({
            finish:false
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            finish:false
          });
        }
        else{
          soloAcceptPhonesModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in deleteAllPhonesNumbers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteAllPhonesNumbers");
        console.log(error);
        res.status(201).json({
            finish:false
        });
    })
  }

exports.getSpecificRamadan = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloSplitePlayersModel.find({
            date:req.body.date,
            time:req.body.time
          },
          {
            _id:0
          })
          .then(data=>{
            res.status(201).json(data);
          })
          .catch(error=>{
            console.log("error in admin in getSpecificRamadan in find");
            console.log(error)
            res.status(201).json([]);
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in getSpecificRamadan");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.addSpecificRamadan = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json("no change added");
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json("no change added");
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json("no change added");
        }
        else{
          soloSplitePlayersModel.insertMany(req.body.groupsRamadan)
          .then(data=>{
            res.status(201).json("data added successfully");
          })
          .catch(error=>{
            console.log("error in admin in addSpecificRamadan in insertmany");
            console.log(error)
            res.status(201).json("no change added");
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in addSpecificRamadan");
        console.log(error);
        res.status(201).json("no change added");
    })
  }

exports.deleteSpecificRamadan = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json("no change deleted");
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json("no change deleted");
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json("no change deleted");
        }
        else{
          soloSplitePlayersModel.deleteMany({
            date:req.body.date,
            time:req.body.time
          })
          .then(data=>{
            res.status(201).json("data deleted successfully");
          })
          .catch(error=>{
            console.log("error in admin in addSpecificRamadan in insertmany");
            console.log(error)
            res.status(201).json("no change deleted");
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in addSpecificRamadan");
        console.log(error);
        res.status(201).json("no change deleted");
    })
  }

exports.getTimeSpecificRamadan = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json([]);
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json([]);
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json([]);
        }
        else{
          soloSplitePlayersModel.find({
            time:req.body.time
          })
          .then(data=>{
            res.status(201).json(data);
          })
          .catch(error=>{
            console.log("error in admin in getTimeSpecificRamadan in find");
            console.log(error)
            res.status(201).json([]);
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in getTimeSpecificRamadan");
        console.log(error);
        res.status(201).json([]);
    })
  }

exports.getAllPlayersData = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
          res.status(201).json({message:"error occur"});
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(201).json({message:"error occur"});
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({message:"error occur"});
        }
        else{
          soloRegisterPlayersModel.countDocuments({})
          .then(data=>{
            res.status(201).json({
              numbersPlayersDatabase:data,
              numbersPlayersServer:numberPlayers,
              countryPlayersServer:playersCountry,
              totalPlayersServer:totalPlayers
            });
          })
          .catch(error=>{
            console.log("error in admin in getTimeSpecificRamadan in find");
            console.log(error)
            res.status(201).json({message:"error occur"});
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in getTimeSpecificRamadan");
        console.log(error);
        res.status(201).json({message:"error occur"});
    })
  }

exports.addTotalPlayersServer = (req,res)=>{
    adminSchema.find()
    .then(data => {
        if(data.length == 0)
        {
            res.status(200).json({
              message:"error occur"
            });
        }
        else if(data[0].email == "noemail@email.com"){
          res.status(200).json({
            message:"error occur"
          });
        }
        else if(data[0].email != req.body.adminData){
          res.status(200).json({
            message:"error occur"
          });
        }
        else{
          let numberRegister = req.body.numberRegister;
          soloPubgChampionshipModel.findOne(
            {
              endDate:"no date added",
            },
            {
              _id:0,
              totalPlayersNumber:1
            }
          )
            .then(data=>{
              totalPlayers = data.totalPlayersNumber;
              numberPlayers = numberRegister;
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in findone in addTotalPlayersServer');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addTotalPlayersServer");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }




/*test*/

exports.addPlayersForTest = (req,res)=>{
  adminSchema.find()
  .then(data => {
      if(data.length == 0)
      {
          res.status(200).json({
            message:"error occur"
          });
      }
      else if(data[0].email == "noemail@email.com"){
        res.status(200).json({
          message:"error occur"
        });
      }
      else if(data[0].email != req.body.adminData){
        res.status(200).json({
          message:"error occur"
        });
      }
      else{
        let players = [];
        for (let index = 0; index < 5000; index++) {
          players.push({
            email:index+"@gmail.com",
            pubgId:"1111111"+index
          })
        }
        soloRegisterPlayersModel.insertMany(players)
          .then(data=>{
            res.status(200).json({
              message:"data added successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in findone in addTotalPlayersServer');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in addTotalPlayersServer");
      console.log(error);
      res.status(200).json({
        message:"error occur"
      });
  })
}