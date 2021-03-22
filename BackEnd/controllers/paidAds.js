const adminSchema = require('../models/adminSchema');
const paidAds = require('../models/paidAds');

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
            let paidAd = req.body.paidAd;
            const addPaidAd = new paidAds({
              videoId:paidAd.videoId,
              totalViews:paidAd.totalViews,
              companyName:paidAd.companyName,
              costByEGP:paidAd.costByEGP,
              adAppearanceCountry:paidAd.adAppearanceCountry
            });
            addPaidAd.save()
            .then(data=>{
              res.status(200).json({
                message:"paid ad added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in save in addPaidAd');console.log(error);
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
            paidAds.find()
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getPaidAds');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPaidAds");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.getPaidAdsNot = (req,res)=>{
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
                { $expr: { $gt: [ "$totalViews" , "$viewsNumber" ] } }
            )
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getPaidAdsNot');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPaidAdsNot");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.getPaidAdsCompany = (req,res)=>{
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
                { $expr: { $eq: [ "$companyName" , req.body.companyName ] } }
            )
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getPaidAdsCompany');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPaidAdsCompany");
        console.log(error);
        res.status(200).json([]);
    })
  }

  exports.getPaidAdsComFalse = (req,res)=>{
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
              { 
                informCompanyAdsOver:false,
                $expr: { 
                  $gte: [ "$viewsNumber" , "$totalViews" ]
                } 
              }
            )
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getPaidAdsComFalse');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getPaidAdsComFalse");
        console.log(error);
        res.status(200).json([]);
    })
  }


exports.setPaidComTrue = (req,res)=>{
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
          paidAds.findOneAndUpdate(
            {
              _id:req.body._id,
            },
            {
              $set: { "informCompanyAdsOver" : true}
            },
            {
              runValidators: true,
              projection: { "_id" : 0, "informCompanyAdsOver" : 1 }
            }
            ).then(data=>{
              if(data != null){
                res.status(200).json({
                    message:"set inform ads over true successfully"
                });                
              }
              else{
                res.status(200).json({
                    message:"error occur"
                });
              }
            })
            .catch(error=>{console.log('error in  admin in findoneandupdate in setPaidComTrue');console.log(error);
              res.status(201).json({message:"error occur"});
          });
      }
  })
  .catch(error =>{
      console.log("error in admin in setPaidComTrue");
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
            paidAds.deleteOne(
              {
                _id:req.body._id,
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
              .catch(error=>{console.log('error in  admin in deleteone in deletePaidAd');console.log(error);
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