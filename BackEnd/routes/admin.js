const express = require('express');
const adminRouters = express.Router();
const adminController = require("../controllers/admin");

adminRouters.post("/login", adminController.adminLogin);

module.exports = adminRouters;