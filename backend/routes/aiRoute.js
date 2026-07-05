const express = require("express");

const {shoppingAssistant} = require("../controllers/aiController.js");
const router = express.Router();

router.route("/ai/shopping-assistant").post(shoppingAssistant);

module.exports = router;
