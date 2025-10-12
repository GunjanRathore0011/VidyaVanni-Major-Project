const express = require("express");
const { getRepoInfo } = require("../controllers/repoInfoController");
const { analyzeLLM } = require("../controllers/analyzeLLMController.js");

const router = express.Router();

router.post("/repo-info", getRepoInfo);
router.post("/analyze-llm", analyzeLLM);

module.exports = router;
