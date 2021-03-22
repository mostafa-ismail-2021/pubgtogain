const duoPubgChampionshipModel = require('../models/duoPubgChampionship');
const duoHackersAndWinnersModel = require('../models/duoHackersAndWinners');
const duoRegisterFreeAdsModel = require('../models/duoRegisterFreeAds');
const duoRegisterHackersModel = require('../models/duoRegisterHackers');
const duoRegisterPlayersModel = require('../models/duoRegisterPlayers');
const duoSplitePlayersModel = require('../models/duoSplitePlayers');
const duoTempHackersAndWinnersModel = require('../models/duoTempHackersAndWinners');
const duoTempSplitePlayersModel = require('../models/duoTempSplitePlayers');
const duoAcceptPhonesModel = require('../models/duoAcceptPhones');
const blackListModel = require('../models/blackList');
const adminSchema = require('../models/adminSchema');
const paidAds = require('../models/paidAds');
const duoCheckEmailModel = require('../models/duoCheckEmail');
const charitableAdsModel = require('../models/charitableAds');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const geoip = require('geoip-lite');
var duoBlackList = [];
var duoCharityAds = {};
var duoFreeAds = {};
var duoTotalPlayers = 0;
var duoNumberPlayers = 0;
var duoPlayersCountry = "EG";
var duoRegisterTeamLeaderChampionshipType = false;
var duoRegisterMemberChampionshipType = false;
var duoRegisterFreeAdsType = false;
var duoRegisterReportHackerType = false;
var duoApperHackerAndWinners = false;
var duoSplitPlayersType = false;
var duoExistPaidAds = false;
var duoShowAdsWillAppear = false;
var duoPhonesAcceptPlayers = false;

function duoGetAdNoConnect(country){
    let sendData = {
        register : false,
        videoId : null,
        videoType : "noType",
        adAppearanceCountry:null
    };
    if(Object.keys(duoFreeAds).length != 0 && (duoFreeAds.ALL != undefined || duoFreeAds[country] != undefined)){
        if(duoFreeAds.ALL != undefined && duoFreeAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = duoFreeAds[adAppearanceCountry][Math.floor(duoFreeAds[adAppearanceCountry].length * Math.random())]
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:adAppearanceCountry
        }
        }
        else if(duoFreeAds.ALL != undefined){
        let videoId = duoFreeAds["ALL"][Math.floor(duoFreeAds["ALL"].length * Math.random())];
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:"ALL"
        }
        }
        else{
        let videoId = duoFreeAds[country][Math.floor(duoFreeAds[country].length * Math.random())];
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:country
        }
        }
    }
    else{
        if(duoCharityAds.ALL != undefined && duoCharityAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = duoCharityAds[adAppearanceCountry][Math.floor(duoCharityAds[adAppearanceCountry].length * Math.random())]
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:adAppearanceCountry
        }
        }
        else if(duoCharityAds.ALL != undefined){
        let videoId = duoCharityAds["ALL"][Math.floor(duoCharityAds["ALL"].length * Math.random())];
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:"ALL"
        }
        }
        else{
        let videoId = duoCharityAds[country][Math.floor(duoCharityAds[country].length * Math.random())];
        sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : videoId,
            videoType : "noType",
            adAppearanceCountry:country
        }
        }
    }
    if(duoPlayersCountry != country && duoPlayersCountry != "ALL"){
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

exports.increaseVideoId = (req,res)=>{
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
      res.status(200).json(false)
    }
  }

exports.tLRegisterGetAd = (req,res)=>{
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
    if(duoExistPaidAds == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL")){
      duoPubgChampionshipModel.aggregate([
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
          phone:duoPhonesAcceptPlayers
        };
        if(data.length != 0){
          sendData={
            register : duoRegisterTeamLeaderChampionshipType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
            phone:duoPhonesAcceptPlayers
          }
        }
        else{
          sendData = duoGetAdNoConnect(country);
          sendData.phone = duoPhonesAcceptPlayers;
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error duo register get ad");
        console.log(error);
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:duoPhonesAcceptPlayers
        };
        sendData = duoGetAdNoConnect(country);
        sendData.phone = duoPhonesAcceptPlayers;
        res.status(200).json(sendData);
      });
    }
    else{
      let sendData = {
        register : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        phone:duoPhonesAcceptPlayers
      };
      sendData = duoGetAdNoConnect(country);
      sendData.phone = duoPhonesAcceptPlayers;
      res.status(200).json(sendData);
    }
  }

exports.checkPerson = (req,res)=>{
  if(duoPhonesAcceptPlayers == false)
  {
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId;
    let pubgIdMember = req.body.pubgIdMember;
    duoRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          pubgIdTeamLeader: idPubg
        }
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdMember:0,
      acceptPlayer:0
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false ,memberBlackList:false , existPhone:false, random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.emailTeamLeader == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.pubgIdTeamLeader == idPubg){
          sendData.existIdPubg = true;
        }
      }
      if(sendData.existEmail == false && sendData.existIdPubg == false){
        for (let index = 0; index < duoBlackList.length; index++) {
          const element = duoBlackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
          else if(element.pubgId == pubgIdMember){
            sendData.memberBlackList = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.memberBlackList == false ){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const duoCheckEmail = new duoCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            duoCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in duoCheckEmail");
                console.log(error)
                res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
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
      console.log("error in duo checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
    });
  }
  else{
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId;
    let pubgIdMember = req.body.pubgIdMember;
    let phonePlayer = req.body.playerPhone;
    duoRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          pubgIdTeamLeader: idPubg
        },
        {
          phoneTeamLeader: phonePlayer
        }
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdMember:0,
      acceptPlayer:0
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.emailTeamLeader == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.pubgIdTeamLeader == idPubg){
          sendData.existIdPubg = true;
        }
        if(element.phoneTeamLeader == phonePlayer){
          sendData.existPhone = true;
        }
      }
      if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.existPhone == false){
        for (let index = 0; index < duoBlackList.length; index++) {
          const element = duoBlackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
          else if(element.pubgId == pubgIdMember){
            sendData.memberBlackList = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.memberBlackList == false ){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const duoCheckEmail = new duoCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            duoCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in duoCheckEmail");
                console.log(error)
                res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
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
      console.log("error in duo checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false ,memberBlackList:false, existPhone:false , random:null});
    });
  }
}

exports.tLSendData = (req ,res)=>{
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
    if(duoRegisterTeamLeaderChampionshipType == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL"))
    {
      duoCheckEmailModel.findOne(
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
          if(duoPhonesAcceptPlayers == false)
          {
            const duoRegisterPlayers = new duoRegisterPlayersModel({
              emailTeamLeader : req.body.email , 
              pubgIdTeamLeader : req.body.pubgId , 
              pubgIdMember:req.body.memberPubgId , 
              displayedAdTeamLeader : req.body.videoId
            });
            duoRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              duoNumberPlayers++;
              if(duoTotalPlayers <= duoNumberPlayers && duoTotalPlayers != 0){
                duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { registerTeamLeaderChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerTeamLeaderChampionshipType" : 1 }
                }
                ).then(data=>{
                  if(data != null){
                    duoRegisterTeamLeaderChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in duo sendData in findOneAndUpdate');
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
            const duoRegisterPlayers = new duoRegisterPlayersModel({
              emailTeamLeader : req.body.email , 
              pubgIdTeamLeader : req.body.pubgId , 
              pubgIdMember:req.body.memberPubgId , 
              phoneTeamLeader:req.body.playerPhone,
              phoneMember:"00000000000",
              displayedAdTeamLeader : req.body.videoId
            });
            duoRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              duoNumberPlayers++;
              if(duoTotalPlayers <= duoNumberPlayers && duoTotalPlayers != 0){
                duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                  $set: { registerTeamLeaderChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerTeamLeaderChampionshipType" : 1 }
                }
                ).then(data=>{
                  if(data != null){
                    duoRegisterTeamLeaderChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in duo sendData in findOneAndUpdate');
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

exports.memberReGetAd = (req,res)=>{
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
    if(duoExistPaidAds == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL")){
      duoPubgChampionshipModel.aggregate([
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
          phone:duoPhonesAcceptPlayers
        };
        if(data.length != 0){
          sendData={
            register : duoRegisterMemberChampionshipType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
            phone:duoPhonesAcceptPlayers
          }
        }
        else{
          sendData = duoGetAdNoConnect(country);
          sendData.phone = duoPhonesAcceptPlayers;
          sendData.register = duoRegisterMemberChampionshipType;
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error duo register get ad");
        console.log(error);
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:duoPhonesAcceptPlayers
        };
        sendData = duoGetAdNoConnect(country);
        sendData.phone = duoPhonesAcceptPlayers;
        sendData.register = duoRegisterMemberChampionshipType;
        res.status(200).json(sendData);
      });
    }
    else{
      let sendData = {
        register : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        phone:duoPhonesAcceptPlayers
      };
      sendData = duoGetAdNoConnect(country);
      sendData.phone = duoPhonesAcceptPlayers;
      sendData.register = duoRegisterMemberChampionshipType;
      if(duoPlayersCountry != country && duoPlayersCountry != "ALL"){
        sendData.register = false;
      }
      res.status(200).json(sendData);
    } 
  }

exports.sendMemberEmailConfirm = (req ,res)=>{
  if(duoPhonesAcceptPlayers == false)
  {
    let pubgId = req.body.pubgId;
    let teamLeaderPubgId = req.body.teamLeaderIdpubg;
    let gmailaccount = req.body.Email;
    duoRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          emailMember: gmailaccount
        },
        {
          pubgIdTeamLeader: teamLeaderPubgId
        },
        {
          pubgIdMember: pubgId
        }
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdMember:0
    })
    .then(data => {
      let sendData = {random:null , checkEmail:false , checkIdPubg:true , checkTeamleaderIdPubg:true , checkExistsBefore:false , checkPhone:false , error:false};
      let getEmailConfirm = false;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdMember == pubgId && element.acceptPlayer == true){
          sendData.checkExistsBefore = true;
          break;
        }
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdMember == pubgId && element.acceptPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
        }
        if(element.emailTeamLeader == gmailaccount || element.emailMember == gmailaccount){
          sendData.checkEmail = true;
        }
        if(element.pubgIdMember == pubgId){
          sendData.checkIdPubg = false;
        }
      }
      if(getEmailConfirm == true && sendData.checkEmail == false){
        for (let index = 0; index < duoBlackList.length; index++) {
          const element = duoBlackList[index];
          if(element.email == gmailaccount){
            sendData.checkEmail = true;
            break;
          }
        }
        if(sendData.checkEmail == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const duoCheckEmail = new duoCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            duoCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in duoCheckEmail");
                console.log(error)
                res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true});
            });
          }
          else{
            res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true});
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
      let sendData = {random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true};
      console.log("error in duo sendMemberEmailConfirm");
      console.log(error);
      res.status(200).json(sendData);
    });
  }
  else{
    let pubgId = req.body.pubgId;
    let teamLeaderPubgId = req.body.teamLeaderIdpubg;
    let gmailaccount = req.body.Email;
    let phonePlayer = req.body.playerPhone;
    duoRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          emailMember: gmailaccount
        },
        {
          pubgIdTeamLeader: teamLeaderPubgId
        },
        {
          pubgIdMember: pubgId
        },
        {
          phoneTeamLeader: phonePlayer
        },
        {
          phoneMember: phonePlayer
        }
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdMember:0
    })
    .then(data => {
      let sendData = {random:null , checkEmail:false , checkIdPubg:true , checkTeamleaderIdPubg:true , checkExistsBefore:false , checkPhone:false , error:false};
      let getEmailConfirm = false;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdMember == pubgId && element.acceptPlayer == true){
          sendData.checkExistsBefore = true;
          break;
        }
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdMember == pubgId && element.acceptPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
        }
        if(element.emailTeamLeader == gmailaccount || element.emailMember == gmailaccount){
          sendData.checkEmail = true;
        }
        if(element.pubgIdMember == pubgId){
          sendData.checkIdPubg = false;
        }
        if(element.phoneTeamLeader == phonePlayer || element.phoneMember == phonePlayer){
          sendData.checkPhone = true;
        }
      }
      if(getEmailConfirm == true && sendData.checkEmail == false && sendData.checkPhone == false){
        for (let index = 0; index < duoBlackList.length; index++) {
          const element = duoBlackList[index];
          if(element.email == gmailaccount){
            sendData.checkEmail = true;
            break;
          }
        }
        if(sendData.checkEmail == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const duoCheckEmail = new duoCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            duoCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in duoCheckEmail");
                console.log(error)
                res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true});
            });
          }
          else{
            res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true});
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
      let sendData = {random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true};
      console.log("error in duo sendMemberEmailConfirm");
      console.log(error);
      res.status(200).json(sendData);
    });
  }
}

exports.mSendData = (req ,res)=>{
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
  if(duoRegisterMemberChampionshipType == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL"))
    {
      duoCheckEmailModel.findOne(
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
          if(duoPhonesAcceptPlayers == false)
          {
            duoRegisterPlayersModel.findOneAndUpdate(
            {
              pubgIdTeamLeader:req.body.memberPubgId,
              pubgIdMember:req.body.pubgId,
              acceptPlayer:false
            },
            {
              $set: { 
                emailMember:req.body.email,
                displayedAdMember:req.body.videoId,
                acceptPlayer:true
              }
            },
            {
              runValidators: true,
              projection: { "_id" : 0, "acceptPlayer" : 1 }
            }
            ).then(data=>{
              if(data != null){
                res.status(201).json({message:"your registration done"});              
              }
              else{
                res.status(201).json({message:"error occur"});
              }
            })
            .catch(error=>{
              console.log('error in duo mSendData in findOneAndUpdate');
              console.log(error);
              res.status(201).json({message:"error because overloads of server. register after some minutes"});
            });
          }
          else{
            duoRegisterPlayersModel.findOneAndUpdate(
            {
              pubgIdTeamLeader:req.body.memberPubgId,
              pubgIdMember:req.body.pubgId,
              acceptPlayer:false
            },
            {
              $set: { 
                emailMember:req.body.email,
                phoneMember:req.body.playerPhone ,
                displayedAdMember:req.body.videoId,
                acceptPlayer:true
              }
            },
            {
              runValidators: true,
              projection: { "_id" : 0, "acceptPlayer" : 1 }
            }
            ).then(data=>{
              if(data != null){
                res.status(201).json({message:"your registration done"});              
              }
              else{
                res.status(201).json({message:"error occur"});
              }
            })
            .catch(error=>{
              console.log('error in duo mSendData in findOneAndUpdate');
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
    if(duoExistPaidAds == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL")){
      duoPubgChampionshipModel.aggregate([
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
            dateAppearance : duoSplitPlayersType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
          }
        }
        else{
          let tempData = duoGetAdNoConnect(country);
            sendData = {
              dateAppearance : duoSplitPlayersType,
              videoId : tempData.videoId,
              videoType : tempData.videoType,
              adAppearanceCountry:tempData.adAppearanceCountry
            }
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error duo dateGetAd");
        console.log(error);
        let tempData = duoGetAdNoConnect(country);
        let sendData = {
          dateAppearance : duoSplitPlayersType,
          videoId : tempData.videoId,
          videoType : tempData.videoType,
          adAppearanceCountry:tempData.adAppearanceCountry
        }
        res.status(200).json(sendData);
      });
    }
    else{
      let tempData = duoGetAdNoConnect(country);
      let sendData = {
        dateAppearance : duoSplitPlayersType,
        videoId : tempData.videoId,
        videoType : tempData.videoType,
        adAppearanceCountry:tempData.adAppearanceCountry
      }
      if(duoPlayersCountry != country && duoPlayersCountry != "ALL"){
        sendData.dateAppearance = false;
      }
      res.status(200).json(sendData);
    }
  }

exports.getPlayerDate = (req,res)=>{
    let idPubg = req.body.idpubg;
    duoSplitePlayersModel.findOne(
      {
        $or: [
          {
            "groupPlayers.pubgIdTeamLeader": idPubg
          }, 
          {
            "groupPlayers.pubgIdMember": idPubg
          }
        ]
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
      console.log('error in duo getPlayerDate');
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
    if(duoShowAdsWillAppear == false)
    {
      if(duoExistPaidAds == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL")){
        duoPubgChampionshipModel.aggregate([
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
            freeAdResgister : duoRegisterFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          if(data.length != 0){
            sendData={
              freeAdResgister : duoRegisterFreeAdsType,
              videoId : data[0].filterPaidVideos.videoId,
              videoType : "paid",
              adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
              adsWillAppear:[]
            }
          }
          else{
            let tempData = duoGetAdNoConnect(country);
            sendData.videoId = tempData.videoId;
            sendData.videoType = tempData.videoType;
            sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          }
          res.status(200).json(sendData);
        })
        .catch(error => {
          console.log("error duo freeAdGetAd");
          console.log(error);
          let sendData = {
            freeAdResgister : duoRegisterFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          let tempData = duoGetAdNoConnect(country);
          sendData.videoId = tempData.videoId;
          sendData.videoType = tempData.videoType;
          sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          res.status(200).json(sendData);
        });
      }
      else{
        let sendData = {
          freeAdResgister : duoRegisterFreeAdsType,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          adsWillAppear:[]
        };
        let tempData = duoGetAdNoConnect(country);
        sendData.videoId = tempData.videoId;
        sendData.videoType = tempData.videoType;
        sendData.adAppearanceCountry = tempData.adAppearanceCountry;
        if(duoPlayersCountry != country && duoPlayersCountry != "ALL"){
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
      let freeAdValues = Object.values(duoFreeAds);
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
    duoRegisterFreeAdsModel.find({
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
          const duoCheckEmail = new duoCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          duoCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
              console.log("error in add in duoCheckEmail");
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
      console.log("error in duo checkPersonFreeAd");
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
  if(duoRegisterFreeAdsType == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL"))
  {
    duoCheckEmailModel.findOne(
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
        const duoRegisterFreeAds = new duoRegisterFreeAdsModel({
          videoId : req.body.Youtube,
          email : req.body.email,
          adAppearanceCountry:req.body.Country,
          displayedAd : req.body.videoId
        });
        duoRegisterFreeAds.save()
        .then(data1 =>{
          res.status(201).json({message:"your registration in free ads done"});
        })
        .catch(error=>{
          console.log('error in duo sendDataFreeAd in insertMany');
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
      reportHackerResgister : duoRegisterReportHackerType,
      apperHackerAndWinners : duoApperHackerAndWinners,
    };
    if(duoPlayersCountry != country && duoPlayersCountry != "ALL"){
      sendData.reportHackerResgister = false;
      sendData.apperHackerAndWinners = false;
    }
    res.status(200).json(sendData); 
  }

exports.checkPersonHacker = (req,res)=>{
    let gmailaccount = req.body.email;
    let googleDrive = req.body.googleDrive;
    duoRegisterHackersModel.find({
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
          const duoCheckEmail = new duoCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          duoCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
              console.log("error in add in duoCheckEmail");
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
      console.log("error in duo checkPersonReportHacker");
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
  if(duoRegisterReportHackerType == true && (duoPlayersCountry == country || duoPlayersCountry == "ALL"))
  {
    duoCheckEmailModel.findOne(
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
        const duoRegisterHackers = new duoRegisterHackersModel({
          email : req.body.email,
          driveId : req.body.googleDrive
        });
        duoRegisterHackers.save()
        .then(data1 =>{
          res.status(201).json({message:"your registration done"});
        })
        .catch(error=>{
          console.log('error in duo SendDataHacker in insertMany');
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
    duoHackersAndWinnersModel.findOne(
      {
        $or: [
          {
            pubgIdTeamLeader: idPubg
          }, 
          {
            pubgIdMember: idPubg
          }
        ]
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
      console.log('error in getduoplayerstate');
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
          const addNewDuoChampion = new duoPubgChampionshipModel({
              startDate:req.body.startDate,
              totalPlayersNumber:req.body.totalPlayersNumber,
              playersCountry:req.body.playerCountry
          });
          addNewDuoChampion.save()
          .then(data=>{
            duoTotalPlayers = req.body.totalPlayersNumber;
            duoPlayersCountry = req.body.playerCountry;
            res.status(200).json({
                message:"championship added successfuly"
            });
          })
          .catch(error=>{
              console.log("error in admin in duo addChampion in save method");
              console.log(error)
              res.status(201).json({
                  message:"error occur"
              });
          });        
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addChampion");
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
          res.status(201).json({
            finish:false
          });
        }
        else{
          duoPubgChampionshipModel.deleteMany({})
          .then(data=>{
            duoTotalPlayers = 0;
            duoNumberPlayers = 0;
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteChampionShips in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });    
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteChampionShips");
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
          res.status(201).json({
            finish:false
          });
        }
        else{
          duoCheckEmailModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteEmails in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteEmails");
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
          res.status(201).json({
            finish:false
          });
        }
        else{
          duoHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          }); 
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteHackersAndWinners");
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
          res.status(201).json({
            finish:false
          });
        }
        else{
          duoRegisterFreeAdsModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteRegisterFreeAds in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteRegisterFreeAds");
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
          res.status(201).json({
            finish:false
          });
        }
        else{
          duoRegisterHackersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteRegisterHackers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteRegisterHackers");
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
          duoTempSplitePlayersModel.aggregate([{
             $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                duoTempSplitePlayersModel.find(
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
                  .catch(error=>{console.log('error in  admin in duo find in getLastSplitPlayersTempRound');console.log(error);
                    res.status(201).json([]);
                });
              }
              else{
                  res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in duo aggregate in getLastSplitPlayersTempRound');console.log(error);
              res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getLastSplitPlayersTempRound");
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
          duoRegisterPlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteRegisterPlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteRegisterPlayers");
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
          duoSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteSplitePlayers");
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
          duoTempHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteTempHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteTempHackersAndWinners");
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
          duoTempSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in duo deleteTempSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteTempSplitePlayers");
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
          duoRegisterTeamLeaderChampionshipType = false;
          duoRegisterMemberChampionshipType = false;
          duoRegisterFreeAdsType = false;
          duoRegisterReportHackerType = false;
          duoApperHackerAndWinners = false;
          duoSplitPlayersType = false;
          duoExistPaidAds = false;
          duoShowAdsWillAppear = false;
          res.status(201).json({
            finish:true
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setAllServerRefFalse");
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
            console.log("error in admin in duo getCharityAdsTable in find");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getCharityAdsTable");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoCharityAds = setCharityAds;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in addCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addCharityAds");
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
          duoPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in duo findOne in getCharityAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getCharityAds");
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
          res.status(200).json(duoCharityAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getCharityAdsServer");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoCharityAds = {};
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in deleteCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteCharityAds");
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
              .catch(error=>{console.log('error in  admin in duo find in getPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getPaidAds");
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
            duoPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in addPaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addPaidAds");
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
              .catch(error=>{console.log('error in  admin in duo find in getNumberPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getNumberPaidAds");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in addPaidAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addPaidAd");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getDuoPaidAds = (req,res)=>{
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
          duoPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in duo findOne in getDuoPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getDuoPaidAds");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in deletePaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deletePaidAds");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in deletePaidAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deletePaidAd");
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
                  duoBlackList = data;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in getRandomAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getRandomAddBlackList");
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
                  duoBlackList = data;
                  res.status(200).json({
                    message:"black list added successfuly"
                  });            
                }
                else{
                  res.status(200).json({message:"no data in black list"});
                }
              })
              .catch(error=>{console.log('error in admin in duo aggregate in getAllAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getAllAddBlackList");
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
          res.status(200).json(duoBlackList);
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getAllBlackList");
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
          duoBlackList = [];
          res.status(200).json({message:"data deleted successfuly"});
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteAllBlackList");
        console.log(error);
        res.status(201).json({message:"error occur"});
    })
  }

exports.getPagesState = (req,res)=>{
    duoPubgChampionshipModel.findOne(
      { endDate: 'no date added' },
      {   _id: 0, 
        registerTeamLeaderChampionshipType: 1,
        registerMemberChampionshipType: 1, 
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
            registerTeamLeaderChampionshipType:false,
            registerMemberChampionshipType:false,
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
            registerTeamLeaderChampionshipType:data.registerTeamLeaderChampionshipType,
            registerMemberChampionshipType:data.registerMemberChampionshipType,
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
    .catch(error=>{console.log("error in admin in duo in getPagesState");console.log(error); 
      res.status(200).json({
        exist:false,
        error:false,
        registerTeamLeaderChampionshipType:false,
        registerMemberChampionshipType:false,
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
      registerTeamLeaderChampionshipType:duoRegisterTeamLeaderChampionshipType,
      registerMemberChampionshipType:duoRegisterMemberChampionshipType,
      registerFreeAdsType:duoRegisterFreeAdsType,
      registerReportHackerType:duoRegisterReportHackerType,
      appearHackerAndWinnersPubg:duoApperHackerAndWinners,
      splitPlayersType:duoSplitPlayersType,
      existPaidAds:duoExistPaidAds,
      showAdsWillAppear:duoShowAdsWillAppear,
      phonesAcceptPlayers:duoPhonesAcceptPlayers
    });
  }

exports.setTeamLeaderTypeTrue = (req,res)=>{
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
          duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerTeamLeaderChampionshipType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerTeamLeaderChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  duoRegisterTeamLeaderChampionshipType = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setTeamLeaderTypeTrue');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setTeamLeaderTypeTrue");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setMemberTypeTrue = (req,res)=>{
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
          duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerMemberChampionshipType : true}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerMemberChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  duoRegisterMemberChampionshipType = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setMemberTypeTrue');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setMemberTypeTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoRegisterFreeAdsType = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in registerFreeAdsTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo registerFreeAdsTypeTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoRegisterReportHackerType = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in registerReportHackerTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo registerReportHackerTypeTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoApperHackerAndWinners = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in appearHackerAndWinnersPubgTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo appearHackerAndWinnersPubgTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoSplitPlayersType = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in splitPlayersTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo splitPlayersTypeTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoExistPaidAds = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setExistPaidAdsTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoShowAdsWillAppear = true;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setExistPaidAdsTrue");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoPhonesAcceptPlayers = true;
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

exports.setTeamLeaderTypeFalse = (req,res)=>{
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
          duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerTeamLeaderChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerTeamLeaderChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  duoRegisterTeamLeaderChampionshipType = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setTeamLeaderTypeFalse');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setTeamLeaderTypeFalse");
        console.log(error);
        res.status(201).json({
            message:"error occure try again"
        });
    })
  }

exports.setMemberTypeFalse = (req,res)=>{
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
          duoPubgChampionshipModel.findOneAndUpdate(
                {
                  endDate:"no date added",
                },
                {
                    $set: { registerMemberChampionshipType : false}
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "registerMemberChampionshipType" : 1 }
                }
              ).then(data=>{
                if(data != null){
                  duoRegisterMemberChampionshipType = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setMemberTypeFalse');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo setMemberTypeFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoRegisterFreeAdsType = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in registerFreeAdsTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
      console.log("error in admin in duo registerFreeAdsTypeFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoRegisterReportHackerType = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in registerReportHackerTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo registerReportHackerTypeFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoApperHackerAndWinners = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in appearHackerAndWinnersPubgFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo appearHackerAndWinnersPubgFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoSplitPlayersType = false;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in splitPlayersTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo splitPlayersTypeFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
              duoExistPaidAds = false;
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
          .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setExistPaidAdsFalse');console.log(error);
            res.status(201).json({message:"error occure try again"});
          });
        }
    })
    .catch(error =>{
      console.log("error in admin in duo setExistPaidAdsFalse");
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
        duoPubgChampionshipModel.findOneAndUpdate(
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
            duoShowAdsWillAppear = false;
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
        .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in setShowAdsWillAppearFalse');console.log(error);
          res.status(201).json({message:"error occure try again"});
        });
      }
    })
    .catch(error =>{
      console.log("error in admin in duo setShowAdsWillAppearFalse");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoPhonesAcceptPlayers = false;
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
    duoPubgChampionshipModel.findOne(
      { endDate: 'no date added' },
      {   _id: 0, 
        totalPlayersNumber:1,
        playersCountry:1,
        registerTeamLeaderChampionshipType: 1,
        registerMemberChampionshipType: 1, 
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
          duoNumberPlayers = data.totalPlayersNumber;
          duoPlayersCountry = data.playersCountry;
          duoRegisterTeamLeaderChampionshipType = data.registerTeamLeaderChampionshipType;
          duoRegisterMemberChampionshipType = data.registerMemberChampionshipType;
          duoRegisterFreeAdsType = data.registerFreeAdsType;
          duoRegisterReportHackerType = data.registerReportHackerType;
          duoApperHackerAndWinners = data.appearHackerAndWinnersPubg;
          duoSplitPlayersType = data.splitPlayersType;
          duoExistPaidAds = data.existPaidAds;
          duoShowAdsWillAppear = data.showAdsWillAppear;
          duoPhonesAcceptPlayers = data.phonesAcceptPlayers;
          res.status(200).json({
            message:"data added successfully"
        });
        }
      })
    .catch(error=>{console.log("error in duo admin getAddPagesStates");console.log(error); 
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
          duoRegisterFreeAdsModel.find(
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
              .catch(error=>{console.log('error in admin in duo find in getRegisterAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getRegisterAds");
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
            duoRegisterFreeAdsModel.aggregate([
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
              .catch(error=>{console.log('error in  admin in aggregate in duo getAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getAdsWillAppear");
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
            duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in addAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addAdsWillAppear");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  if(duoFreeAds.hasOwnProperty(adCountry)){
                    duoFreeAds[adCountry].push(videoId);
                  }
                  else{
                    duoFreeAds[adCountry] = [videoId];
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
              .catch(error=>{console.log('error in admin in duo findOneAndUpdate in addFreeAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addFreeAd");
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
          duoPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in duo findone in getRealAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getRealAdsWillAppear");
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
          res.status(200).json(duoFreeAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in duo getAdsWillAppearserver");
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
            message:"error occur"
          });
        }
        else{
          duoPubgChampionshipModel.findOneAndUpdate(
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
                  duoFreeAds = {};
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
              .catch(error=>{console.log('error in  admin in duo findOneAndUpdate in deleteAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteAdsWillAppear");
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
          duoPubgChampionshipModel.findOneAndUpdate(
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
                duoFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in admin in duo findOneAndUpdate in deleteFreeAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo deleteFreeAd");
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
          duoPubgChampionshipModel.findOne(
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
                  duoFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in  admin in duo findone in adsFromDatabaseToServer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo adsFromDatabaseToServer");
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
            duoRegisterPlayersModel.insertMany(req.body.data).then(data=>{
                res.status(200).json({
                  message:"data added successfuly"
                });
              })
              .catch(error=>{console.log('error in  admin in duo insertMany in addPlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in duo addPlayer");
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
          duoRegisterPlayersModel.deleteOne(
            {
              $or: [
                {
                  pubgIdTeamLeader: pubgId
                }, 
                {
                  pubgIdMember: pubgId
                }
              ]
            }
            ).then(data=>{
                res.status(200).json({
                  message:"data deleted successfuly"
                });
            })
            .catch(error=>{console.log('error in  admin in duo deleteOne in deletePlayer');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo deletePlayer");
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
        duoRegisterPlayersModel.find(
          {
            acceptPlayer:true
          },
          {
            _id:0,
            pubgIdTeamLeader:1,
            pubgIdMember:1
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
          console.log('error in  admin in duo findOne in getPubgIds');console.log(error);
          res.status(201).json([]);
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getPubgIds");
      console.log(error);
      res.status(201).json([]);
  })
}

exports.getIdsPubgRegister = (req,res)=>{
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
        duoRegisterPlayersModel.find(
          {},
          {
            _id:0,
            acceptPlayer:1
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
          console.log('error in  admin in duo findOne in getIdsPubgRegister');console.log(error);
          res.status(201).json([]);
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getIdsPubgRegister");
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
        duoSplitePlayersModel.insertMany(playersData)
        .then(data =>{
          res.status(200).json({
            finish:true
          });
        })
        .catch(error =>{
          console.log("error in admin in duo splitPlayer in insertMany");
          console.log(error);
          res.status(200).json({
            finish:false
          });
        })
      }
  })
  .catch(error =>{
    console.log("error in admin in duo splitPlayer");
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
          duoTempSplitePlayersModel.aggregate([{
            $group : { _id: null, max: { $max : "$round" }}
          }])
          .then(data=>{
            if(data.length != 0 ){
              duoTempSplitePlayersModel.deleteMany(
                {
                  round:data[0].max
                }
                ).then(data1=>{
                  res.status(200).json({
                    finish:true
                  });
                })
               .catch(error=>{console.log('error in  admin in duo deleteMany in deleteTempSplitPlayersLR');console.log(error);
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
          .catch(error=>{console.log('error in  admin in aggregate in duo deleteTempSplitPlayersLR');console.log(error);
          res.status(200).json({
            finish:false
          });
       });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo deleteTempSplitPlayersLR");
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
        duoHackersAndWinnersModel.find(
          {
            isWinner:true
          },
          {
            _id:0,
            pubgIdTeamLeader:1,
            pubgIdMember:1
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
          console.log('error in  admin in find in duo getLastWinnersRound');console.log(error);
          res.status(201).json([]);
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getLastWinnersRound");
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
        duoSplitePlayersModel.find(
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
          .catch(error=>{console.log('error in  admin in duo find in getSplitPlayer');console.log(error);
            res.status(200).json([]);
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getSplitPlayer");
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
        duoTempSplitePlayersModel.insertMany(tempSplitPlayersData)
        .then(data =>{
          res.status(200).json({
            finish:true
          });
        })
        .catch(error =>{
          console.log("error in admin in duo addTempSplitPlayer in insertMany");
          console.log(error);
          res.status(201).json({
            finish:false
          });
        })
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addTempSplitPlayer");
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
        duoSplitePlayersModel.find(
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
          .catch(error=>{console.log('error in  admin in duo find in getSplitPlayerDate');console.log(error);
            res.status(200).json([]);
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getSplitPlayerDate");
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
          duoRegisterHackersModel.find(
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
            .catch(error=>{console.log('error in  admin in duo findOne in getRegisterHackers');console.log(error);
              res.status(201).json([]);
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getRegisterHackers");
      console.log(error);
      res.status(201).json([]);
  })
}

exports.getDataDebendId = (req,res)=>{
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
        duoRegisterPlayersModel.find(
          {
            $or: [
              {
                pubgIdTeamLeader: req.body.idPubg
              }, 
              {
                pubgIdMember: req.body.idPubg
              }
            ]
          },
          {
            _id:0,
            displayedAdTeamLeader:0,
            displayedAdMember:0,
          }
        ).then(data=>{
            if(data.length != 0){
              res.status(200).json(data);
            }
            else{
              res.status(200).json([]);
            }
          })
          .catch(error=>{console.log('error in  admin in duo findOne in getEmailHacker');console.log(error);
          res.status(200).json([]);
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getEmailHacker");
      console.log(error);
      res.status(200).json([]);
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
        duoHackersAndWinnersModel.insertMany(req.body.hackers).then(data=>{
          res.status(200).json({
            message:"data added successfuly"
          });
        })
        .catch(error=>{console.log('error in  admin in duo insertMany in addHackers');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addHackers");
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
          duoHackersAndWinnersModel.find(
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
            .catch(error=>{console.log('error in  admin in duo findOne in getLastHackersRound');console.log(error);
              res.status(201).json([]);
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getLastHackersRound");
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
        duoHackersAndWinnersModel.deleteOne(
          {
            isWinner:false,
            $or: [
              {
                pubgIdTeamLeader: req.body.id
              }, 
              {
                pubgIdMember: req.body.id
              }
            ]
          }
        ).then(data=>{
            res.status(200).json({
              message:"data deleted successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in duo deleteOne in deleteReportHacker');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo deleteReportHacker");
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
        duoHackersAndWinnersModel.insertMany(req.body.winners).then(data=>{
            res.status(200).json({
              message:"data added successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in duo insertMany in addWinners');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addWinners");
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
        duoHackersAndWinnersModel.deleteOne(
          {
            isWinner:true,
            $or: [
              {
                pubgIdTeamLeader: req.body.id
              }, 
              {
                pubgIdMember: req.body.id
              }
            ]
          }
        ).then(data=>{
            res.status(200).json({
              message:"data deleted successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in duo deleteOne in deleteWinner');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo deleteWinner");
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
          duoHackersAndWinnersModel.find(
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
            .catch(error=>{console.log('error in  admin in duo findOne in getLastHackersAndWinnersRound');console.log(error);
              res.status(201).json([]);
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getLastHackersAndWinnersRound");
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
        duoTempHackersAndWinnersModel.insertMany(HackersAndWinnersData)
        .then(data =>{
          res.status(200).json({
            finish:true
          });
        })
        .catch(error =>{
          console.log("error in admin in duo addTempHackersAndWinners in insertMany");
          console.log(error);
          res.status(201).json({
            finish:false
          });
        })
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addTempHackersAndWinners");
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
        duoTempHackersAndWinnersModel.aggregate([{
           $group : { _id: null, max: { $max : "$round" }}
          }])
          .then(data=>{
            if(data.length != 0 ){
              duoTempHackersAndWinnersModel.find(
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
                .catch(error=>{console.log('error in  admin in duo find in getLastHackersAndWinnersTempRound');console.log(error);
                  res.status(201).json([]);
              });
            }
            else{
                res.status(200).json([]);
            }
          })
          .catch(error=>{console.log('error in  admin in duo aggregate in getLastHackersAndWinnersTempRound');console.log(error);
            res.status(201).json([]);
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getLastHackersAndWinnersTempRound");
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
        duoHackersAndWinnersModel.insertMany(req.body.HackersAndWinners).then(data=>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error=>{console.log('error in  admin in duo insertMany in addHackersAndWinners');console.log(error);
          res.status(200).json({
            finish:false
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addHackersAndWinners");
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
          duoTempHackersAndWinnersModel.aggregate([{
            $group : { _id: null, max: { $max : "$round" }}
          }])
          .then(data=>{
            if(data.length != 0 ){
              duoTempHackersAndWinnersModel.deleteMany(
                {
                  round:data[0].max
                }
                ).then(data1=>{
                  res.status(200).json({
                    finish:true
                  }); 
                })
               .catch(error=>{console.log('error in  admin in duo find in deleteTempHackersAndWinnersLR');console.log(error);
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
          .catch(error=>{console.log('error in  admin in duo aggregate in deleteTempHackersAndWinnersLR');console.log(error);
          res.status(200).json({
            finish:false
          });
       });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo deleteTempHackersAndWinnersLR");
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
        duoTempHackersAndWinnersModel.find(
          {
            isWinner:false
          },
          {
            _id:0,
            pubgIdTeamLeader:1,
            pubgIdMember:1,
            email:1
          }
        )
        .then(data => {
          res.status(200).json(data);
        })
        .catch(error =>{
          console.log("error in admin in duo find in getAllTempHackers");
          console.log(error);
          res.status(201).json([]);
        })
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getAllTempHackers");
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
        duoHackersAndWinnersModel.find(
          {
            isWinner:false
          },
          {
            _id:0,
            pubgIdTeamLeader:1,
            pubgIdMember:1,
            email:1
          }
        )
        .then(data => {
          res.status(200).json(data);
        })
        .catch(error =>{
          console.log("error in admin in duo find in getAllHackers");
          console.log(error);
          res.status(201).json([]);
        })
      }
  })
  .catch(error =>{
      console.log("error in admin in duo getAllHackers");
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
          .catch(error=>{console.log('error in  admin in duo insertmany in addSubBlackList');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addSubBlackList");
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
        duoAcceptPhonesModel.insertMany(req.body.phones).then(data=>{
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
        duoAcceptPhonesModel.find(
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
        duoAcceptPhonesModel.findOne(
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
          res.status(200).json({message:"error occur" , player:{}});
      }
      else if(data[0].email == "noemail@email.com"){
        res.status(200).json({message:"error occur" , player:{}});
      }
      else if(data[0].email != req.body.adminData){
        res.status(200).json({message:"error occur" , player:{}});
      }
      else{
        duoRegisterPlayersModel.findOne(
          {
            $or: [
              {
                phoneTeamLeader:req.body.PhoneNumber
              }, 
              {
                phoneMember: req.body.PhoneNumber
              }
            ]
          },
          {
            _id:0,
          }
        ).then(data=>{
            if(data != null){
              res.status(200).json({message:"phone exist" , player:data});
            }
            else{
              res.status(200).json({message:"phone not exist" , player:{}});
            }
          })
          .catch(error=>{console.log('error in  admin in findOne in getPhoneNumberRegister');console.log(error);
          res.status(200).json({message:"error occur" , player:{}});
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in getPhoneNumberRegister");
      console.log(error);
      res.status(200).json({message:"error occur" , player:{}});
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
        duoRegisterPlayersModel.find(
          {
            acceptPlayer:true
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
          duoAcceptPhonesModel.deleteOne(
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
        duoAcceptPhonesModel.deleteMany({})
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
        duoSplitePlayersModel.find({
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
        duoSplitePlayersModel.insertMany(req.body.groupsRamadan)
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
        duoSplitePlayersModel.deleteMany({
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
        duoSplitePlayersModel.find({
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
        duoRegisterPlayersModel.countDocuments({})
        .then(data=>{
          res.status(201).json({
            numbersPlayersDatabase:data,
            numbersPlayersServer:duoNumberPlayers,
            countryPlayersServer:duoPlayersCountry,
            totalPlayersServer:duoTotalPlayers
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
        duoPubgChampionshipModel.findOne(
          {
            endDate:"no date added",
          },
          {
            _id:0,
            totalPlayersNumber:1
          }
        )
          .then(data=>{
            duoTotalPlayers = data.totalPlayersNumber;
            duoNumberPlayers = numberRegister;
            res.status(200).json({
              message:"data added successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in duo findone in addTotalPlayersServer');console.log(error);
          res.status(200).json({
            message:"error occur"
          });
        });
      }
  })
  .catch(error =>{
      console.log("error in admin in duo addTotalPlayersServer");
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
            emailTeamLeader:index+"@gmail.com",
            pubgIdTeamLeader:"1111111"+index,
            emailMember:index+"5@gmail.com",
            pubgIdMember:"2222222"+index,
            acceptPlayer:true
          })
        }
        duoRegisterPlayersModel.insertMany(players)
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