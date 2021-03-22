const express = require('express');
const charityAdsRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const charitableAdsController = require("../controllers/charityAds");

charityAdsRouters.post("/addCharityAd",checkAuth, charitableAdsController.addCharityAd);

charityAdsRouters.post("/getCharityAds",checkAuth, charitableAdsController.getCharityAds); 

charityAdsRouters.post("/deleteCharityAd",checkAuth, charitableAdsController.deleteCharityAd);

module.exports = charityAdsRouters;