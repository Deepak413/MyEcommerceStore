const express = require("express");

const {testGemini, shoppingAssistant} = require("../controllers/aiController.js");
const router = express.Router();

router.route("/ai/test").get(testGemini);
router.route("/ai/shopping-assistant").post(shoppingAssistant);

module.exports = router;
