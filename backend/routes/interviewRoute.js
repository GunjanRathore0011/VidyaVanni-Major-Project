const express = require("express");
const { createInterview, startInterviewSession , saveTranscript} = require("../controllers/interviewController");

const router = express.Router();

router.post("/s", createInterview);
router.post("/save-transcript", saveTranscript);
router.get("/start/:id", startInterviewSession);

module.exports = router;
