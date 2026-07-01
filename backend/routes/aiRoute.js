const express = require("express");

const testGemini = require("../controllers/aiController.js");
const router = express.Router();

router.route("/ai/test").get(testGemini);

module.exports = router;