const express = require('express');
const paidAdsRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const paidAdsController = require("../controllers/paidAds")

paidAdsRouters.post("/addPaidAd",checkAuth, paidAdsController.addPaidAd);

paidAdsRouters.post("/getPaidAds",checkAuth, paidAdsController.getPaidAds); 

paidAdsRouters.post("/getPaidAdsNot",checkAuth, paidAdsController.getPaidAdsNot); 

paidAdsRouters.post("/getPaidAdsCompany",checkAuth, paidAdsController.getPaidAdsCompany);

paidAdsRouters.post("/getPaidAdsComFalse",checkAuth, paidAdsController.getPaidAdsComFalse); 

paidAdsRouters.post("/setPaidComTrue", paidAdsController.setPaidComTrue);

paidAdsRouters.post("/deletePaidAd", paidAdsController.deletePaidAd);

module.exports = paidAdsRouters;