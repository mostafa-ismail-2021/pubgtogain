const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouters = require('./routes/admin');
const path = require("path");
const soloPubgRouters = require('./routes/soloPubg');
const duoPubgRouters = require('./routes/duoPubg');
const squadPubgRouters = require('./routes/squadPubg');
const paidAdsRouters = require('./routes/paidAds');
const charityAdsRouters = require('./routes/charityAds');
const blackListRouters = require('./routes/blackList');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mostafa:' + process.env.MONGO_ATLAS_PW + '@cluster0.32r7d.mongodb.net/pubgchampionship?retryWrites=true&w=majority',{ useFindAndModify: false ,useNewUrlParser: true , useUnifiedTopology: true,useCreateIndex:true})
 .then(()=>{console.log("connect to database")})
 .catch(()=>{console.log("error")});

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT , PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/",express.static(path.join(__dirname , "angular")));

app.use("/api/admin",adminRouters);
app.use("/api/solo",soloPubgRouters);
app.use("/api/duo",duoPubgRouters);
app.use("/api/squad",squadPubgRouters);
app.use("/api/paidads",paidAdsRouters);
app.use("/api/charityads",charityAdsRouters);
app.use("/api/blacklist",blackListRouters);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname , "angular" , "index.html"));
});

module.exports= app;