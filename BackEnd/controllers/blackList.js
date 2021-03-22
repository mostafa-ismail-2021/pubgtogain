const adminSchema = require('../models/adminSchema');
const blackList = require('../models/blackList');

exports.addBlackList = (req,res)=>{
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
            let blackListPerson = req.body.blackListPerson;
            const addBlackList = new blackList({
                email:blackListPerson.email,
                pubgId:blackListPerson.pubgId
            });
            addBlackList.save()
            .then(data=>{
              res.status(200).json({
                message:"data added successfuly"
              });
            })
            .catch(error=>{console.log('error in  admin in save in addBlackList');console.log(error);
            res.status(200).json({
              message:"error occur"
            });
          });
        }
    })
    .catch(error =>{
        console.log("error in admin in addBlackList");
        console.log(error);
        res.status(200).json({
          message:"error occur"
        });
    })
  }

exports.getBlackList = (req,res)=>{
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
            blackList.find()
            .then(data=>{
                if(data.length != 0){
                  res.status(200).json(data);
                }
                else{
                  res.status(200).json([]);
                }
              })
              .catch(error=>{console.log('error in  admin in find in getBlackList');console.log(error);
              res.status(200).json([]);
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in getBlackList");
        console.log(error);
        res.status(200).json([]);
    })
  }

exports.deleteBlackList = (req,res)=>{
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
            blackList.deleteOne(
              {
                _id:req.body._id,
              }
              ).then(data=>{
                if(data != null){
                  res.status(200).json({
                      message:"data deleted successfuly"
                  });                
                }
                else{
                  res.status(200).json({
                      message:"error occur"
                  });
                }
              })
              .catch(error=>{console.log('error in  admin in deleteone in deleteBlackList');console.log(error);
                res.status(201).json({message:"error occur"});
            });
        }
    })
    .catch(error =>{
        console.log("error in admin in deleteBlackList");
        console.log(error);
        res.status(201).json({
            message:"error occur"
        });
    })
  }