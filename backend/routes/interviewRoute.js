const express = require("express");
const { createInterview, startInterviewSession } = require("../controllers/interviewController");

const router = express.Router();

router.post("/", createInterview);

router.get("/start/:id", startInterviewSession);

module.exports = router;
