const squadPubgChampionshipModel = require('../models/squadPubgChampionship');
const squadHackersAndWinnersModel = require('../models/squadHackersAndWinners');
const squadRegisterFreeAdsModel = require('../models/squadRegisterFreeAds');
const squadRegisterHackersModel = require('../models/squadRegisterHackers');
const squadRegisterPlayersModel = require('../models/squadRegisterPlayers');
const squadSplitePlayersModel = require('../models/squadSplitePlayers');
const squadTempHackersAndWinnersModel = require('../models/squadTempHackersAndWinners');
const squadTempSplitePlayersModel = require('../models/squadTempSplitePlayers');
const squadAcceptPhonesModel = require('../models/squadAcceptPhones');
const blackListModel = require('../models/blackList');
const adminSchema = require('../models/adminSchema');
const squadCheckEmailModel = require('../models/squadCheckEmail');
const paidAds = require('../models/paidAds');
const charitableAdsModel = require('../models/charitableAds');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const geoip = require('geoip-lite');
var squadBlackList = [];
var squadCharityAds = {};
var squadFreeAds = {};
var squadTotalPlayers = 0;
var squadNumberPlayers = 0;
var squadPlayersCountry = "EG";
var squadRegisterTeamLeaderChampionshipType = false;
var squadRegisterMemberChampionshipType = false;
var squadRegisterFreeAdsType = false;
var squadRegisterReportHackerType = false;
var squadApperHackerAndWinners = false;
var squadSplitPlayersType = false;
var squadExistPaidAds = false;
var squadShowAdsWillAppear = false;
var squadPhonesAcceptPlayers = false;

function squadGetAdNoConnect(country){
    let sendData = {
      register : false,
      videoId : null,
      videoType : "noType",
      adAppearanceCountry:null
    };
    if(Object.keys(squadFreeAds).length != 0 && (squadFreeAds.ALL != undefined || squadFreeAds[country] != undefined)){
      if(squadFreeAds.ALL != undefined && squadFreeAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = squadFreeAds[adAppearanceCountry][Math.floor(squadFreeAds[adAppearanceCountry].length * Math.random())]
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:adAppearanceCountry
        }
      }
      else if(squadFreeAds.ALL != undefined){
        let videoId = squadFreeAds["ALL"][Math.floor(squadFreeAds["ALL"].length * Math.random())];
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:"ALL"
        }
      }
      else{
        let videoId = squadFreeAds[country][Math.floor(squadFreeAds[country].length * Math.random())];
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:country
        }
      }
    }
    else{
      if(squadCharityAds.ALL != undefined && squadCharityAds[country] != undefined){
        let AllCountery = ["ALL" , country];
        let adAppearanceCountry = AllCountery[Math.floor(AllCountery.length * Math.random())];
        let videoId = squadCharityAds[adAppearanceCountry][Math.floor(squadCharityAds[adAppearanceCountry].length * Math.random())]
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:adAppearanceCountry
        }
      }
      else if(squadCharityAds.ALL != undefined){
        let videoId = squadCharityAds["ALL"][Math.floor(squadCharityAds["ALL"].length * Math.random())];
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:"ALL"
        }
      }
      else{
        let videoId = squadCharityAds[country][Math.floor(squadCharityAds[country].length * Math.random())];
        sendData={
          register : squadRegisterTeamLeaderChampionshipType,
          videoId : videoId,
          videoType : "noType",
          adAppearanceCountry:country
        }
      }
    }
    if(squadPlayersCountry != country && squadPlayersCountry != "ALL"){
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
    if(squadExistPaidAds == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL")){
      squadPubgChampionshipModel.aggregate([
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
          phone:squadPhonesAcceptPlayers
        };
        if(data.length != 0){
          sendData={
            register : squadRegisterTeamLeaderChampionshipType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
            phone:squadPhonesAcceptPlayers
          }
        }
        else{
          sendData = squadGetAdNoConnect(country);
          sendData.phone = squadPhonesAcceptPlayers;
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error squad register get ad");
        console.log(error);
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:squadPhonesAcceptPlayers
        };
        sendData = squadGetAdNoConnect(country);
        sendData.phone = squadPhonesAcceptPlayers;
        res.status(200).json(sendData);
      });
    }
    else{
      let sendData = {
        register : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        phone:squadPhonesAcceptPlayers
      };
      sendData = squadGetAdNoConnect(country);
      sendData.phone = squadPhonesAcceptPlayers;
      res.status(200).json(sendData);
    }
  }

exports.checkPerson = (req,res)=>{
  if(squadPhonesAcceptPlayers == false)
  {
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId;
    let pubgIdFirstMember = req.body.pubgIdFirstMember;
    let pubgIdSecondMember = req.body.pubgIdSecondMember;
    let pubgIdThirdMember = req.body.pubgIdThirdMember;
    squadRegisterPlayersModel.find({
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
      emailTeamLeader:1,
      pubgIdTeamLeader:1,
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null};
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
        for (let index = 0; index < squadBlackList.length; index++) {
          const element = squadBlackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
          else if(element.pubgId == pubgIdFirstMember){
            sendData.firstBlackList = true;
          }
          else if(element.pubgId == pubgIdSecondMember){
            sendData.secondBlackList = true;
          }
          else if(element.pubgId == pubgIdThirdMember){
            sendData.thirdBlackList = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.firstBlackList == false && sendData.secondBlackList == false && sendData.thirdBlackList == false ){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const squadCheckEmail = new squadCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            squadCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in squadCheckEmail");
                console.log(error)
                res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
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
      console.log("error in squad checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
    });
  }
  else{
    let gmailaccount = req.body.email;
    let idPubg = req.body.pubgId;
    let pubgIdFirstMember = req.body.pubgIdFirstMember;
    let pubgIdSecondMember = req.body.pubgIdSecondMember;
    let pubgIdThirdMember = req.body.pubgIdThirdMember;
    let phonePlayer = req.body.playerPhone;
    squadRegisterPlayersModel.find({
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
      emailTeamLeader:1,
      pubgIdTeamLeader:1,
      phoneTeamLeader:1
    })
    .then(data => {
      let sendData = {existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null};
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.emailTeamLeader == gmailaccount){
          sendData.existEmail = true;
        }
        if(element.pubgIdTeamLeader == idPubg){
          sendData.existIdPubg = true;
        }
        if(element.phoneTeamLeader == idPubg){
          sendData.existPhone = true;
        }
      }
      if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.existPhone == false){
        for (let index = 0; index < squadBlackList.length; index++) {
          const element = squadBlackList[index];
          if(element.email == gmailaccount){
            sendData.existEmail = true;
          }
          else if(element.pubgId == idPubg){
            sendData.existIdPubg = true;
          }
          else if(element.pubgId == pubgIdFirstMember){
            sendData.firstBlackList = true;
          }
          else if(element.pubgId == pubgIdSecondMember){
            sendData.secondBlackList = true;
          }
          else if(element.pubgId == pubgIdThirdMember){
            sendData.thirdBlackList = true;
          }
        }
        if(sendData.existEmail == false && sendData.existIdPubg == false && sendData.firstBlackList == false && sendData.secondBlackList == false && sendData.thirdBlackList == false ){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const squadCheckEmail = new squadCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            squadCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in squadCheckEmail");
                console.log(error);
                res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
            });
          }
          else{
            res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
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
      console.log("error in squad checkPerson");
      console.log(error);
      res.status(200).json({existEmail:false , existIdPubg:false ,firstBlackList:false,secondBlackList:false,thirdBlackList:false , existPhone:false , random:null});
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
  if(squadRegisterTeamLeaderChampionshipType == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL"))
    {
      squadCheckEmailModel.findOne(
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
          if(squadPhonesAcceptPlayers == false)
          {
            const squadRegisterPlayers = new squadRegisterPlayersModel({ 
              emailTeamLeader : req.body.email ,
              pubgIdTeamLeader : req.body.pubgId , 
              pubgIdFirstMember:req.body.firstMemberPubgId , 
              pubgIdSecondMember:req.body.secondMemberPubgId ,
              pubgIdThirdMember:req.body.thirdMemberPubgId ,
              displayedAdTeamLeader : req.body.videoId
            });
            squadRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              squadNumberPlayers++;
              if(squadTotalPlayers <= squadNumberPlayers && squadTotalPlayers != 0){
                squadPubgChampionshipModel.findOneAndUpdate(
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
                    squadRegisterTeamLeaderChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in squad sendData in findOneAndUpdate');
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log('error in squad sendData in insertMany');
              console.log(error);
              res.status(201).json({message:"error because overloads of server. register after some minutes"});
            })
          }
          else{
            const squadRegisterPlayers = new squadRegisterPlayersModel({ 
              emailTeamLeader : req.body.email ,
              pubgIdTeamLeader : req.body.pubgId , 
              pubgIdFirstMember:req.body.firstMemberPubgId , 
              pubgIdSecondMember:req.body.secondMemberPubgId ,
              pubgIdThirdMember:req.body.thirdMemberPubgId ,
              phoneTeamLeader:req.body.playerPhone ,
              phoneFirstMember:"00000000000" ,
              phoneSecondMember:"00000000000" ,
              phoneThirdMember:"00000000000" ,
              displayedAdTeamLeader : req.body.videoId
            });
            squadRegisterPlayers.save()
            .then(date1 => {
              res.status(201).json({message:"your registration done"});
              squadNumberPlayers++;
              if(squadTotalPlayers <= squadNumberPlayers && squadTotalPlayers != 0){
                squadPubgChampionshipModel.findOneAndUpdate(
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
                    squadRegisterTeamLeaderChampionshipType = false;              
                  }
                })
                .catch(error=>{
                  console.log('error in squad sendData in findOneAndUpdate');
                  console.log(error);
                });
              }
            })
            .catch(error => {
              console.log('error in squad sendData in insertMany');
              console.log(error);
              res.status(201).json({message:"error because overloads of server. register after some minutes"});
            })
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
    if(squadExistPaidAds == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL")){
      squadPubgChampionshipModel.aggregate([
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
          phone:squadPhonesAcceptPlayers
        };
        if(data.length != 0){
          sendData={
            register : squadRegisterMemberChampionshipType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
            phone:squadPhonesAcceptPlayers
          }
        }
        else{
          sendData = squadGetAdNoConnect(country);
          sendData.phone = squadPhonesAcceptPlayers;
          sendData.register = squadRegisterMemberChampionshipType;
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error squad register get ad");
        console.log(error);
        let sendData = {
          register : false,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          phone:squadPhonesAcceptPlayers
        };
        sendData = squadGetAdNoConnect(country);
        sendData.phone = squadPhonesAcceptPlayers;
        sendData.register = squadRegisterMemberChampionshipType;
        res.status(200).json(sendData);
      });
    }
    else{
      let sendData = {
        register : false,
        videoId : null,
        videoType : null,
        adAppearanceCountry:null,
        phone:squadPhonesAcceptPlayers
      };
      sendData = squadGetAdNoConnect(country);
      sendData.phone = squadPhonesAcceptPlayers;
      sendData.register = squadRegisterMemberChampionshipType;
      if(squadPlayersCountry != country && squadPlayersCountry != "ALL"){
        sendData.register = false;
      }
      res.status(200).json(sendData);
    } 
  }

exports.sendMemberEmailConfirm = (req ,res)=>{
  if(squadPhonesAcceptPlayers == false)
  {
    let pubgId = req.body.pubgId;
    let teamLeaderPubgId = req.body.teamLeaderIdpubg;
    let gmailaccount = req.body.Email;
    squadRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          emailFirstMember: gmailaccount
        },
        {
          emailSecondMember: gmailaccount
        },
        {
          emailThirdMember: gmailaccount
        },
        {
          pubgIdTeamLeader: teamLeaderPubgId
        },
        {
          pubgIdFirstMember: pubgId
        },
        {
          pubgIdSecondMember: pubgId
        },
        {
          pubgIdThirdMember: pubgId
        }
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdFirstMember:0,
      displayedAdSecondMember:0,
      displayedAdThirdMember:0
    })
    .then(data => {
      let sendData = {random:null , checkEmail:false , checkIdPubg:true , checkTeamleaderIdPubg:true , checkExistsBefore:false , checkPhone:false , error:false ,PlaceIdPubg:null};
      let getEmailConfirm = false;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.pubgIdTeamLeader == teamLeaderPubgId && (
          (element.pubgIdFirstMember == pubgId && element.acceptFirstPlayer == true) ||
          (element.pubgIdSecondMember == pubgId && element.acceptSecondPlayer == true ||
          (element.pubgIdThirdMember == pubgId && element.acceptThirdPlayer == true)
          ))
        ){
          sendData.checkExistsBefore = true;
          break;
        }
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdFirstMember == pubgId && element.acceptFirstPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "first";
        }
        else if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdSecondMember == pubgId && element.acceptSecondPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "second";
        }
        else if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdThirdMember == pubgId && element.acceptThirdPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "third";
        }
        if(element.emailTeamLeader == gmailaccount || element.emailFirstMember == gmailaccount || element.emailSecondMember == gmailaccount || element.emailThirdMember == gmailaccount){
          sendData.checkEmail = true;
        }
        if(element.pubgIdFirstMember == pubgId){
          sendData.checkIdPubg = false;
        }
        else if(element.pubgIdSecondMember == pubgId){
          sendData.checkIdPubg = false;
        }
        else if(element.pubgIdThirdMember == pubgId){
          sendData.checkIdPubg = false;
        }
      }
      if(getEmailConfirm == true && sendData.checkEmail == false){
        for (let index = 0; index < squadBlackList.length; index++) {
          const element = squadBlackList[index];
          if(element.email == gmailaccount){
            sendData.checkEmail = true;
            break;
          }
        }
        if(sendData.checkEmail == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const squadCheckEmail = new squadCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            squadCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in squadCheckEmail");
                console.log(error)
                res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null});
            });
          }
          else{
            res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null});
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
      let sendData = {random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null};
      console.log("error in squad sendMemberEmailConfirm");
      console.log(error);
      res.status(200).json(sendData);
    });
  }
  else{
    let pubgId = req.body.pubgId;
    let teamLeaderPubgId = req.body.teamLeaderIdpubg;
    let gmailaccount = req.body.Email;
    let phonePlayer = req.body.playerPhone;
    squadRegisterPlayersModel.find({
      $or: [
        {
          emailTeamLeader: gmailaccount
        }, 
        {
          emailFirstMember: gmailaccount
        },
        {
          emailSecondMember: gmailaccount
        },
        {
          emailThirdMember: gmailaccount
        },
        {
          pubgIdTeamLeader: teamLeaderPubgId
        },
        {
          pubgIdFirstMember: pubgId
        },
        {
          pubgIdSecondMember: pubgId
        },
        {
          pubgIdThirdMember: pubgId
        },
        {
          phoneTeamLeader: phonePlayer
        }, 
        {
          phoneFirstMember: phonePlayer
        },
        {
          phoneSecondMember: phonePlayer
        },
        {
          phoneThirdMember: phonePlayer
        },
      ]
    },
    {
      _id:0,
      displayedAdTeamLeader:0,
      displayedAdFirstMember:0,
      displayedAdSecondMember:0,
      displayedAdThirdMember:0
    })
    .then(data => {
      let sendData = {random:null , checkEmail:false , checkIdPubg:true , checkTeamleaderIdPubg:true , checkExistsBefore:false , checkPhone:false , error:false ,PlaceIdPubg:null};
      let getEmailConfirm = false;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.pubgIdTeamLeader == teamLeaderPubgId && (
          (element.pubgIdFirstMember == pubgId && element.acceptFirstPlayer == true) ||
          (element.pubgIdSecondMember == pubgId && element.acceptSecondPlayer == true ||
          (element.pubgIdThirdMember == pubgId && element.acceptThirdPlayer == true)
          ))
        ){
          sendData.checkExistsBefore = true;
          break;
        }
        if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdFirstMember == pubgId && element.acceptFirstPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "first";
        }
        else if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdSecondMember == pubgId && element.acceptSecondPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "second";
        }
        else if(element.pubgIdTeamLeader == teamLeaderPubgId && element.pubgIdThirdMember == pubgId && element.acceptThirdPlayer == false){
          getEmailConfirm = true;
          sendData.checkTeamleaderIdPubg = false;
          sendData.PlaceIdPubg = "third";
        }
        if(element.emailTeamLeader == gmailaccount || element.emailFirstMember == gmailaccount || element.emailSecondMember == gmailaccount || element.emailThirdMember == gmailaccount){
          sendData.checkEmail = true;
        }
        if(element.pubgIdFirstMember == pubgId){
          sendData.checkIdPubg = false;
        }
        else if(element.pubgIdSecondMember == pubgId){
          sendData.checkIdPubg = false;
        }
        else if(element.pubgIdThirdMember == pubgId){
          sendData.checkIdPubg = false;
        }
        if(element.phoneTeamLeader == phonePlayer || element.phoneFirstMember == phonePlayer || element.phoneSecondMember == phonePlayer || element.phoneThirdMember == phonePlayer){
          sendData.checkPhone = true;
        }
      }
      if(getEmailConfirm == true && sendData.checkEmail == false && sendData.checkPhone == false){
        for (let index = 0; index < squadBlackList.length; index++) {
          const element = squadBlackList[index];
          if(element.email == gmailaccount){
            sendData.checkEmail = true;
            break;
          }
        }
        if(sendData.checkEmail == false){
          sendData.random = sendEmailConfirm(gmailaccount);
          if(sendData.random != null)
          {
            const squadCheckEmail = new squadCheckEmailModel({
              email: gmailaccount,
              code:sendData.random,
            });
            squadCheckEmail.save()
            .then(data=>{
              res.status(200).json(sendData);
            })
            .catch(error=>{
                console.log("error in add in squadCheckEmail");
                console.log(error)
                res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null});
            });
          }
          else{
            res.status(200).json({random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null});
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
      let sendData = {random:null , checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:true,PlaceIdPubg:null};
      console.log("error in squad sendMemberEmailConfirm");
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
  if(squadRegisterMemberChampionshipType == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL"))
    {
      squadCheckEmailModel.findOne(
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
          if(squadPhonesAcceptPlayers == false)
          {
            let idPubg = req.body.pubgId;
            let memberPubgId = req.body.memberPubgId;
            let placeIdPubg = req.body.placeIdPubg;
            if(placeIdPubg == 'first')
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdFirstMember:idPubg,
                  acceptFirstPlayer:false
                },
                {
                  $set: { 
                    emailFirstMember:req.body.email,
                    displayedAdFirstMember:req.body.videoId,
                    acceptFirstPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptFirstPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            }
            else if(placeIdPubg == 'second')
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdSecondMember:idPubg,
                  acceptSecondPlayer:false
                },
                {
                  $set: { 
                    emailSecondMember:req.body.email,
                    displayedAdSecondMember:req.body.videoId,
                    acceptSecondPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptSecondPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            } 
            else if(placeIdPubg == 'third') 
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdThirdMember:idPubg,
                  acceptThirdPlayer:false
                },
                {
                  $set: { 
                    emailThirdMember:req.body.email,
                    displayedAdThirdMember:req.body.videoId,
                    acceptThirdPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptThirdPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            }
            else{
              console.log("error mSquadSendData in  not exist");
              res.status(201).json({message:"an error occur please register again"});
            }
          }
          else{
            let idPubg = req.body.pubgId;
            let memberPubgId = req.body.memberPubgId;
            let phone = req.body.playerPhone;
            let placeIdPubg = req.body.placeIdPubg;
            if(placeIdPubg == 'first')
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdFirstMember:idPubg,
                  acceptFirstPlayer:false
                },
                {
                  $set: { 
                    emailFirstMember:req.body.email,
                    phoneFirstMember:phone,
                    displayedAdFirstMember:req.body.videoId,
                    acceptFirstPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptFirstPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            }
            else if(placeIdPubg == 'second')
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdSecondMember:idPubg,
                  acceptSecondPlayer:false
                },
                {
                  $set: { 
                    emailSecondMember:req.body.email,
                    phoneSecondMember:phone,
                    displayedAdSecondMember:req.body.videoId,
                    acceptSecondPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptSecondPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            } 
            else if(placeIdPubg == 'third') 
            {
              squadRegisterPlayersModel.findOneAndUpdate(
                {
                  pubgIdTeamLeader:memberPubgId,
                  pubgIdThirdMember:idPubg,
                  acceptThirdPlayer:false
                },
                {
                  $set: { 
                    emailThirdMember:req.body.email,
                    phoneThirdMember:phone,
                    displayedAdThirdMember:req.body.videoId,
                    acceptThirdPlayer:true
                  }
                },
                {
                  runValidators: true,
                  projection: { "_id" : 0, "acceptThirdPlayer" : 1 }
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
                  console.log('error in squad mSendData in findOneAndUpdate');
                  console.log(error);
                  res.status(201).json({message:"error because overloads of server. register after some minutes"});
                });
            }
            else{
              console.log("error mSquadSendData in  not exist");
              res.status(201).json({message:"an error occur please register again"});
            }
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
    if(squadExistPaidAds == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL")){
      squadPubgChampionshipModel.aggregate([
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
            dateAppearance : squadSplitPlayersType,
            videoId : data[0].filterPaidVideos.videoId,
            videoType : "paid",
            adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
          }
        }
        else{
          let tempData = squadGetAdNoConnect(country);
            sendData = {
              dateAppearance : squadSplitPlayersType,
              videoId : tempData.videoId,
              videoType : tempData.videoType,
              adAppearanceCountry:tempData.adAppearanceCountry
            }
        }
        res.status(200).json(sendData);
      })
      .catch(error => {
        console.log("error squad dateGetAd");
        console.log(error);
        let tempData = squadGetAdNoConnect(country);
        let sendData = {
          dateAppearance : squadSplitPlayersType,
          videoId : tempData.videoId,
          videoType : tempData.videoType,
          adAppearanceCountry:tempData.adAppearanceCountry
        }
        res.status(200).json(sendData);
      });
    }
    else{
      let tempData = squadGetAdNoConnect(country);
      let sendData = {
        dateAppearance : squadSplitPlayersType,
        videoId : tempData.videoId,
        videoType : tempData.videoType,
        adAppearanceCountry:tempData.adAppearanceCountry
      }
      if(squadPlayersCountry != country && squadPlayersCountry != "ALL"){
        sendData.dateAppearance = false;
      }
      res.status(200).json(sendData);
    }
  }

exports.getPlayerDate = (req,res)=>{
    let idPubg = req.body.idpubg;
    squadSplitePlayersModel.findOne(
      {
        $or: [
          {
            "groupPlayers.pubgIdTeamLeader": idPubg
          }, 
          {
            "groupPlayers.pubgIdFirstMember": idPubg
          },
          {
            "groupPlayers.pubgIdSecondMember": idPubg
          },
          {
            "groupPlayers.pubgIdThirdMember": idPubg
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
      console.log('error in squad getPlayerDate');
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
    if(squadShowAdsWillAppear == false)
    {
      if(squadExistPaidAds == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL")){
        squadPubgChampionshipModel.aggregate([
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
            freeAdResgister : squadRegisterFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          if(data.length != 0){
            sendData={
              freeAdResgister : squadRegisterFreeAdsType,
              videoId : data[0].filterPaidVideos.videoId,
              videoType : "paid",
              adAppearanceCountry:data[0].filterPaidVideos.adAppearanceCountry,
              adsWillAppear:[]
            }
          }
          else{
            let tempData = squadGetAdNoConnect(country);
            sendData.videoId = tempData.videoId;
            sendData.videoType = tempData.videoType;
            sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          }
          res.status(200).json(sendData);
        })
        .catch(error => {
          console.log("error squad freeAdGetAd");
          console.log(error);
          let sendData = {
            freeAdResgister : squadRegisterFreeAdsType,
            videoId : null,
            videoType : null,
            adAppearanceCountry:null,
            adsWillAppear:[]
          };
          let tempData = squadGetAdNoConnect(country);
          sendData.videoId = tempData.videoId;
          sendData.videoType = tempData.videoType;
          sendData.adAppearanceCountry = tempData.adAppearanceCountry;
          res.status(200).json(sendData);
        });
      }
      else{
        let sendData = {
          freeAdResgister : squadRegisterFreeAdsType,
          videoId : null,
          videoType : null,
          adAppearanceCountry:null,
          adsWillAppear:[]
        };
        let tempData = squadGetAdNoConnect(country);
        sendData.videoId = tempData.videoId;
        sendData.videoType = tempData.videoType;
        sendData.adAppearanceCountry = tempData.adAppearanceCountry;
        if(squadPlayersCountry != country && squadPlayersCountry != "ALL"){
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
      let freeAdValues = Object.values(squadFreeAds);
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
    squadRegisterFreeAdsModel.find({
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
          const squadCheckEmail = new squadCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          squadCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
              console.log("error in add in squadCheckEmail");
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
      console.log("error in squad checkPersonFreeAd");
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
  if(squadRegisterFreeAdsType == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL"))
  {
    squadCheckEmailModel.findOne(
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
        const squadRegisterFreeAds = new squadRegisterFreeAdsModel({
          videoId : req.body.Youtube,
          email : req.body.email,
          adAppearanceCountry:req.body.Country,
          displayedAd : req.body.videoId
        });
        squadRegisterFreeAds.save()
        .then(data1 =>{
          res.status(201).json({message:"your registration in free ads done"});
        })
        .catch(error=>{
          console.log('error in squad sendDataFreeAd in insertMany');
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
      reportHackerResgister : squadRegisterReportHackerType,
      apperHackerAndWinners : squadApperHackerAndWinners,
    };
    if(squadPlayersCountry != country && squadPlayersCountry != "ALL"){
      sendData.reportHackerResgister = false;
      sendData.apperHackerAndWinners = false;
    }
    res.status(200).json(sendData); 
  }

exports.checkPersonHacker = (req,res)=>{
    let gmailaccount = req.body.email;
    let googleDrive = req.body.googleDrive;
    squadRegisterHackersModel.find({
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
          const squadCheckEmail = new squadCheckEmailModel({
            email: gmailaccount,
            code:sendData.random,
          });
          squadCheckEmail.save()
          .then(data=>{
            res.status(200).json(sendData);
          })
          .catch(error=>{
              console.log("error in add in squadCheckEmail");
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
      console.log("error in squad checkPersonReportHacker");
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
  if(squadRegisterReportHackerType == true && (squadPlayersCountry == country || squadPlayersCountry == "ALL"))
  {
    squadCheckEmailModel.findOne(
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
        const squadRegisterHackers = new squadRegisterHackersModel({
          email : req.body.email,
          driveId : req.body.googleDrive
        });
        squadRegisterHackers.save()
        .then(data1 =>{
          res.status(201).json({message:"your registration done"});
        })
        .catch(error=>{
          console.log('error in squad SendDataHacker in insertMany');
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
    squadHackersAndWinnersModel.findOne(
      {
        $or: [
          {
            pubgIdTeamLeader: idPubg
          }, 
          {
            pubgIdFirstMember: idPubg
          },
          {
            pubgIdSecondMember: idPubg
          },
          {
            pubgIdThirdMember: idPubg
          },
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
      console.log('error in getsquadplayerstate');
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
          const addNewSquadChampion = new squadPubgChampionshipModel({
              startDate:req.body.startDate,
              totalPlayersNumber:req.body.totalPlayersNumber,
              playersCountry:req.body.playerCountry
          });
          addNewSquadChampion.save()
          .then(data=>{
            squadTotalPlayers = req.body.totalPlayersNumber;
            squadPlayersCountry = req.body.playerCountry;
            res.status(200).json({
                message:"championship added successfuly"
            });
          })
          .catch(error=>{
              console.log("error in admin in squad addChampion in save method");
              console.log(error)
              res.status(201).json({
                  message:"error occur"
              });
          });        
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addChampion");
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
          squadPubgChampionshipModel.deleteMany({})
          .then(data=>{
            squadTotalPlayers = 0;
            squadNumberPlayers = 0;
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteChampionShips in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });    
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteChampionShips");
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
          squadCheckEmailModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteEmails in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteEmails");
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
          squadHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          }); 
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteHackersAndWinners");
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
          squadRegisterFreeAdsModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteRegisterFreeAds in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });   
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteRegisterFreeAds");
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
          squadRegisterHackersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteRegisterHackers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteRegisterHackers");
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
          squadTempSplitePlayersModel.aggregate([{
             $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                squadTempSplitePlayersModel.find(
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
                  .catch(error=>{console.log('error in  admin in squad find in getLastSplitPlayersTempRound');console.log(error);
                    res.status(201).json([]);
                });
              }
              else{
                  res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in squad aggregate in getLastSplitPlayersTempRound');console.log(error);
              res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getLastSplitPlayersTempRound");
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
          squadRegisterPlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteRegisterPlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteRegisterPlayers");
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
          squadSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });  
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteSplitePlayers");
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
          squadTempHackersAndWinnersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteTempHackersAndWinners in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteTempHackersAndWinners");
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
          squadTempSplitePlayersModel.deleteMany({})
          .then(data=>{
            res.status(201).json({
              finish:true
            });
          })
          .catch(error=>{
            console.log("error in admin in squad deleteTempSplitePlayers in deleteMany");
            console.log(error)
            res.status(201).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteTempSplitePlayers");
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
          squadRegisterTeamLeaderChampionshipType = false;
          squadRegisterMemberChampionshipType = false;
          squadRegisterFreeAdsType = false;
          squadRegisterReportHackerType = false;
          squadApperHackerAndWinners = false;
          squadSplitPlayersType = false;
          squadExistPaidAds = false;
          squadShowAdsWillAppear = false;
          res.status(201).json({
            finish:true
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setAllServerRefFalse");
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
            console.log("error in admin in squad getCharityAdsTable in find");
            console.log(error)
            res.status(201).json({
                message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getCharityAdsTable");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadCharityAds = setCharityAds;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in addCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addCharityAds");
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
          squadPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in squad findOne in getCharityAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getCharityAds");
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
          res.status(200).json(squadCharityAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getCharityAdsServer");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadCharityAds = {};
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in deleteCharityAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteCharityAds");
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
              .catch(error=>{console.log('error in  admin in squad find in getPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getPaidAds");
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
            squadPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in addPaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addPaidAds");
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
              .catch(error=>{console.log('error in  admin in squad find in getNumberPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getNumberPaidAds");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in addPaidAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addPaidAd");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getSquadPaidAds = (req,res)=>{
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
          squadPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in squad findOne in getSquadPaidAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getSquadPaidAds");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in deletePaidAds');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deletePaidAds");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in deletePaidAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deletePaidAd");
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
                  squadBlackList = data;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in getRandomAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getRandomAddBlackList");
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
                  squadBlackList = data;
                  res.status(200).json({
                    message:"black list added successfuly"
                  });            
                }
                else{
                  res.status(200).json({message:"no data in black list"});
                }
              })
              .catch(error=>{console.log('error in admin in squad aggregate in getAllAddBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAllAddBlackList");
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
          res.status(200).json(squadBlackList);
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAllBlackList");
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
          squadBlackList = [];
          res.status(200).json({message:"data deleted successfuly"});
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteAllBlackList");
        console.log(error);
        res.status(201).json({message:"error occur"});
    })
  }

exports.getPagesState = (req,res)=>{
    squadPubgChampionshipModel.findOne(
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
    .catch(error=>{console.log("error in admin in squad in getPagesState");console.log(error); 
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
      registerTeamLeaderChampionshipType:squadRegisterTeamLeaderChampionshipType,
      registerMemberChampionshipType:squadRegisterMemberChampionshipType,
      registerFreeAdsType:squadRegisterFreeAdsType,
      registerReportHackerType:squadRegisterReportHackerType,
      appearHackerAndWinnersPubg:squadApperHackerAndWinners,
      splitPlayersType:squadSplitPlayersType,
      existPaidAds:squadExistPaidAds,
      showAdsWillAppear:squadShowAdsWillAppear,
      phonesAcceptPlayers:squadPhonesAcceptPlayers
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterTeamLeaderChampionshipType = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setTeamLeaderTypeTrue');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setTeamLeaderTypeTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterMemberChampionshipType = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setMemberTypeTrue');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setMemberTypeTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterFreeAdsType = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in registerFreeAdsTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad registerFreeAdsTypeTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterReportHackerType = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in registerReportHackerTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad registerReportHackerTypeTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadApperHackerAndWinners = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in appearHackerAndWinnersPubgTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad appearHackerAndWinnersPubgTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadSplitPlayersType = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in splitPlayersTypeTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad splitPlayersTypeTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadExistPaidAds = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setExistPaidAdsTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadShowAdsWillAppear = true;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setExistPaidAdsTrue');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setExistPaidAdsTrue");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadPhonesAcceptPlayers = true;
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterTeamLeaderChampionshipType = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setTeamLeaderTypeFalse');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setTeamLeaderTypeFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterMemberChampionshipType = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setMemberTypeFalse');
                    console.log(error);
                    res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad setMemberTypeFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterFreeAdsType = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in registerFreeAdsTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
      console.log("error in admin in squad registerFreeAdsTypeFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadRegisterReportHackerType = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in registerReportHackerTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad registerReportHackerTypeFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadApperHackerAndWinners = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in appearHackerAndWinnersPubgFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad appearHackerAndWinnersPubgFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadSplitPlayersType = false;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in splitPlayersTypeFalse');console.log(error);
                res.status(201).json({message:"error occure try again"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad splitPlayersTypeFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
              squadExistPaidAds = false;
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
          .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setExistPaidAdsFalse');console.log(error);
            res.status(201).json({message:"error occure try again"});
          });
        }
    })
    .catch(error =>{
      console.log("error in admin in squad setExistPaidAdsFalse");
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
        squadPubgChampionshipModel.findOneAndUpdate(
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
            squadShowAdsWillAppear = false;
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
        .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in setShowAdsWillAppearFalse');console.log(error);
          res.status(201).json({message:"error occure try again"});
        });
      }
    })
    .catch(error =>{
      console.log("error in admin in squad setShowAdsWillAppearFalse");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadPhonesAcceptPlayers = false;
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
    squadPubgChampionshipModel.findOne(
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
          squadNumberPlayers = data.totalPlayersNumber;
          squadPlayersCountry = data.playersCountry;
          squadRegisterTeamLeaderChampionshipType = data.registerTeamLeaderChampionshipType;
          squadRegisterMemberChampionshipType = data.registerMemberChampionshipType;
          squadRegisterFreeAdsType = data.registerFreeAdsType;
          squadRegisterReportHackerType = data.registerReportHackerType;
          squadApperHackerAndWinners = data.appearHackerAndWinnersPubg;
          squadSplitPlayersType = data.splitPlayersType;
          squadExistPaidAds = data.existPaidAds;
          squadShowAdsWillAppear = data.showAdsWillAppear;
          squadPhonesAcceptPlayers = data.phonesAcceptPlayers;
          res.status(200).json({
            message:"data added successfully"
        });
        }
      })
    .catch(error=>{console.log("error in squad admin getAddPagesStates");console.log(error); 
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
          squadRegisterFreeAdsModel.find(
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
              .catch(error=>{console.log('error in admin in squad find in getRegisterAds');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getRegisterAds");
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
            squadRegisterFreeAdsModel.aggregate([
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
              .catch(error=>{console.log('error in  admin in aggregate in squad getAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAdsWillAppear");
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
            squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in addAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addAdsWillAppear");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  if(squadFreeAds.hasOwnProperty(adCountry)){
                    squadFreeAds[adCountry].push(videoId);
                  }
                  else{
                    squadFreeAds[adCountry] = [videoId];
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
              .catch(error=>{console.log('error in admin in squad findOneAndUpdate in addFreeAd');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addFreeAd");
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
          squadPubgChampionshipModel.findOne(
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
              .catch(error=>{console.log('error in  admin in squad findone in getRealAdsWillAppear');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getRealAdsWillAppear");
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
          res.status(200).json(squadFreeAds);
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAdsWillAppearserver");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                  squadFreeAds = {};
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
              .catch(error=>{console.log('error in  admin in squad findOneAndUpdate in deleteAdsWillAppear');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteAdsWillAppear");
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
          squadPubgChampionshipModel.findOneAndUpdate(
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
                squadFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in admin in squad findOneAndUpdate in deleteFreeAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteFreeAd");
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
          squadPubgChampionshipModel.findOne(
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
                  squadFreeAds = setFreeAds;
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
              .catch(error=>{console.log('error in  admin in squad findone in adsFromDatabaseToServer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad adsFromDatabaseToServer");
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
          squadRegisterPlayersModel.insertMany(req.body.data).then(data=>{
                res.status(200).json({
                  message:"data added successfuly"
                });
              })
              .catch(error=>{console.log('error in  admin in squad insertMany in addPlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addPlayer");
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
            squadRegisterPlayersModel.deleteOne(
              {
                $or: [
                  {
                    pubgIdTeamLeader: pubgId
                  }, 
                  {
                    pubgIdFirstMember: pubgId
                  },
                  {
                    pubgIdSecondMember: pubgId
                  },
                  {
                    pubgIdThirdMember: pubgId
                  }
                ]
              }
              ).then(data=>{
                  res.status(200).json({
                    message:"data deleted successfuly"
                  });
              })
              .catch(error=>{console.log('error in  admin in squad deleteOne in deletePlayer');console.log(error);
              res.status(200).json({
                message:"error occur"
              });
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deletePlayer");
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
          squadRegisterPlayersModel.find(
            {
              acceptFirstPlayer:true ,
              acceptSecondPlayer:true,
              acceptThirdPlayer:true
            },
            {
              _id:0,
              pubgIdTeamLeader:1,
              pubgIdFirstMember:1,
              pubgIdSecondMember:1,
              pubgIdThirdMember:1
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
            console.log('error in  admin in squad findOne in getPubgIds');console.log(error);
            res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getPubgIds");
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
          squadRegisterPlayersModel.find(
            {},
            {
              _id:0,
              acceptFirstPlayer:1
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
            console.log('error in  admin in squad findOne in getIdsPubgRegister');console.log(error);
            res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getIdsPubgRegister");
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
          squadSplitePlayersModel.insertMany(playersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in squad splitPlayer in insertMany");
            console.log(error);
            res.status(200).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
      console.log("error in admin in squad splitPlayer");
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
          squadTempSplitePlayersModel.aggregate([{
              $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                squadTempSplitePlayersModel.deleteMany(
                  {
                    round:data[0].max
                  }
                  ).then(data1=>{
                    res.status(200).json({
                      finish:true
                    });
                  })
                 .catch(error=>{console.log('error in  admin in squad deleteMany in deleteTempSplitPlayersLR');console.log(error);
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
            .catch(error=>{console.log('error in  admin in aggregate in squad deleteTempSplitPlayersLR');console.log(error);
            res.status(200).json({
              finish:false
            });
         });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteTempSplitPlayersLR");
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
          squadHackersAndWinnersModel.find(
            {
              isWinner:true
            },
            {
              _id:0,
              pubgIdTeamLeader:1,
              pubgIdFirstMember:1,
              pubgIdSecondMember:1,
              pubgIdThirdMember:1
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
            console.log('error in  admin in find in squad getLastWinnersRound');console.log(error);
            res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getLastWinnersRound");
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
          squadSplitePlayersModel.find(
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
            .catch(error=>{console.log('error in  admin in squad find in getSplitPlayer');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getSplitPlayer");
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
          squadTempSplitePlayersModel.insertMany(tempSplitPlayersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in squad addTempSplitPlayer in insertMany");
            console.log(error);
            res.status(201).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addTempSplitPlayer");
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
          squadSplitePlayersModel.find(
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
            .catch(error=>{console.log('error in  admin in squad find in getSplitPlayerDate');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getSplitPlayerDate");
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
          squadRegisterHackersModel.find(
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
              .catch(error=>{console.log('error in  admin in squad findOne in getRegisterHackers');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getRegisterHackers");
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
          let id = req.body.idPubg;
          squadRegisterPlayersModel.find(
            {
              $or: [
                {
                  pubgIdTeamLeader: id
                }, 
                {
                  pubgIdFirstMember: id
                },
                {
                  pubgIdSecondMember: id
                },
                {
                  pubgIdThirdMember: id
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
            .catch(error=>{console.log('error in  admin in squad findOne in getEmailHacker');console.log(error);
            res.status(200).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getEmailHacker");
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
          squadHackersAndWinnersModel.insertMany(req.body.hackers).then(data=>{
            res.status(200).json({
              message:"data added successfuly"
            });
          })
          .catch(error=>{console.log('error in  admin in squad insertMany in addHackers');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addHackers");
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
          squadHackersAndWinnersModel.find(
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
              .catch(error=>{console.log('error in  admin in squad findOne in getLastHackersRound');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getLastHackersRound");
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
          let id = req.body.id;
          squadHackersAndWinnersModel.deleteOne(
            {
              isWinner:false,
              $or: [
                {
                  pubgIdTeamLeader: id
                }, 
                {
                  pubgIdFirstMember: id
                },
                {
                  pubgIdSecondMember: id
                },
                {
                  pubgIdThirdMember: id
                }
              ]
            }
          ).then(data=>{
              res.status(200).json({
                message:"data deleted successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in squad deleteOne in deleteReportHacker');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteReportHacker");
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
          squadHackersAndWinnersModel.insertMany(req.body.winners).then(data=>{
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in squad insertMany in addWinners');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addWinners");
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
          let id = req.body.id
          squadHackersAndWinnersModel.deleteOne(
            {
              isWinner:true,
              $or: [
                {
                  pubgIdTeamLeader: id
                }, 
                {
                  pubgIdFirstMember: id
                },
                {
                  pubgIdSecondMember: id
                },
                {
                  pubgIdThirdMember: id
                }
              ]
            }
          ).then(data=>{
              res.status(200).json({
                message:"data deleted successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in squad deleteOne in deleteWinner');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteWinner");
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
          squadHackersAndWinnersModel.find(
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
              .catch(error=>{console.log('error in  admin in squad findOne in getLastHackersAndWinnersRound');console.log(error);
                res.status(201).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getLastHackersAndWinnersRound");
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
          squadTempHackersAndWinnersModel.insertMany(HackersAndWinnersData)
          .then(data =>{
            res.status(200).json({
              finish:true
            });
          })
          .catch(error =>{
            console.log("error in admin in squad addTempHackersAndWinners in insertMany");
            console.log(error);
            res.status(201).json({
              finish:false
            });
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addTempHackersAndWinners");
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
          squadTempHackersAndWinnersModel.aggregate([{
             $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                squadTempHackersAndWinnersModel.find(
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
                  .catch(error=>{console.log('error in  admin in squad find in getLastHackersAndWinnersTempRound');console.log(error);
                    res.status(201).json([]);
                });
              }
              else{
                  res.status(200).json([]);
              }
            })
            .catch(error=>{console.log('error in  admin in squad aggregate in getLastHackersAndWinnersTempRound');console.log(error);
              res.status(201).json([]);
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getLastHackersAndWinnersTempRound");
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
          squadHackersAndWinnersModel.insertMany(req.body.HackersAndWinners).then(data=>{
              res.status(200).json({
                finish:true
              });
            })
            .catch(error=>{console.log('error in  admin in squad insertMany in addHackersAndWinners');console.log(error);
            res.status(200).json({
              finish:false
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addHackersAndWinners");
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
          squadTempHackersAndWinnersModel.aggregate([{
              $group : { _id: null, max: { $max : "$round" }}
            }])
            .then(data=>{
              if(data.length != 0 ){
                squadTempHackersAndWinnersModel.deleteMany(
                  {
                    round:data[0].max
                  }
                  ).then(data1=>{
                    res.status(200).json({
                      finish:true
                    }); 
                  })
                 .catch(error=>{console.log('error in  admin in squad find in deleteTempHackersAndWinnersLR');console.log(error);
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
            .catch(error=>{console.log('error in  admin in squad aggregate in deleteTempHackersAndWinnersLR');console.log(error);
            res.status(200).json({
              finish:false
            });
         });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad deleteTempHackersAndWinnersLR");
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
          squadTempHackersAndWinnersModel.find(
            {
              isWinner:false
            },
            {
              _id:0,
              pubgIdTeamLeader:1,
              pubgIdFirstMember:1,
              pubgIdSecondMember:1,
              pubgIdThirdMember:1,
              email:1
            }
          )
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error =>{
            console.log("error in admin in squad find in getAllTempHackers");
            console.log(error);
            res.status(201).json([]);
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAllTempHackers");
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
          squadHackersAndWinnersModel.find(
            {
              isWinner:false
            },
            {
              _id:0,
              pubgIdTeamLeader:1,
              pubgIdFirstMember:1,
              pubgIdSecondMember:1,
              pubgIdThirdMember:1,
              email:1
            }
          )
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error =>{
            console.log("error in admin in squad find in getAllHackers");
            console.log(error);
            res.status(201).json([]);
          })
        }
    })
    .catch(error =>{
        console.log("error in admin in squad getAllHackers");
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
            .catch(error=>{console.log('error in  admin in squad insertmany in addSubBlackList');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addSubBlackList");
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
          squadAcceptPhonesModel.insertMany(req.body.phones).then(data=>{
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
          squadAcceptPhonesModel.find(
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
          squadAcceptPhonesModel.findOne(
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
          squadRegisterPlayersModel.findOne(
            {
              $or: [
                {
                  phoneTeamLeader:req.body.PhoneNumber
                }, 
                {
                  phoneFirstMember: req.body.PhoneNumber
                },
                {
                  phoneSecondMember:req.body.PhoneNumber
                }, 
                {
                  phoneThirdMember: req.body.PhoneNumber
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
          squadRegisterPlayersModel.find(
            {
              acceptFirstPlayer:true,
              acceptSecondPlayer:true,
              acceptThirdPlayer:true
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
            squadAcceptPhonesModel.deleteOne(
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
          squadAcceptPhonesModel.deleteMany({})
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
          squadSplitePlayersModel.find({
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
          squadSplitePlayersModel.insertMany(req.body.groupsRamadan)
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
          squadSplitePlayersModel.deleteMany({
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
          squadSplitePlayersModel.find({
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
          squadRegisterPlayersModel.countDocuments({})
          .then(data=>{
            res.status(201).json({
              numbersPlayersDatabase:data,
              numbersPlayersServer:squadNumberPlayers,
              countryPlayersServer:squadPlayersCountry,
              totalPlayersServer:squadTotalPlayers
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
          squadPubgChampionshipModel.findOne(
            {
              endDate:"no date added",
            },
            {
              _id:0,
              totalPlayersNumber:1
            }
          )
            .then(data=>{
              squadTotalPlayers = data.totalPlayersNumber;
              squadNumberPlayers = numberRegister;
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in squad findone in addTotalPlayersServer');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in squad addTotalPlayersServer");
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
            emailFirstMember:index+"5@gmail.com",
            pubgIdFirstMember:"2222222"+index,
            acceptFirstPlayer:true,
            emailSecondMember:index+"6@gmail.com",
            pubgIdSecondMember:"3333333"+index,
            acceptSecondPlayer:true,
            emailThirdMember:index+"7@gmail.com",
            pubgIdThirdMember:"4444444"+index,
            acceptThirdPlayer:true,
          })
        }
        squadRegisterPlayersModel.insertMany(players)
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