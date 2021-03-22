const express = require('express');
const blackListRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const blackListController = require("../controllers/blackList")

blackListRouters.post("/addBlackList",checkAuth,blackListController.addBlackList );

blackListRouters.post("/getBlackList",checkAuth, blackListController.getBlackList); 

blackListRouters.post("/deleteBlackList",checkAuth, blackListController.deleteBlackList);

module.exports = blackListRouters;