const express = require("express");
const { createInterview } = require("../controllers/interviewController");

const router = express.Router();

router.post("/", createInterview);

module.exports = router;
