const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./campaign.js')

router.use(accountRoutes)
module.exports = router;