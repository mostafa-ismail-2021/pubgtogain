const adminSchema = require('../models/adminSchema');
const charityAds = require('../models/charitableAds');

exports.addCharityAd = (req,res)=>{
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
            let charityAd = req.body.charityAd;
            const addCharityAds = new charityAds({
              videoId:charityAd.videoId,
              adAppearanceCountry:charityAd.adAppearanceCountry
            });
            addCharityAds.save()
            .then(data=>{
              res.status(200).json({
                message:"charity ad added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in save in addCharityAd');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addCharityAd");
        console.log(error);
        res.status(200).json({
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
            charityAds.find()
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getCharityAds');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getCharityAds");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.deleteCharityAd = (req,res)=>{
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
            charityAds.deleteOne(
              {
                _id:req.body._id,
              }
              ).then(data=>{
                if(data != null){
                  res.status(200).json({
                      message:"charity ad deleted successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in find in deleteCharityAd');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteCharityAd");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }