const express = require("express");
const router = express.Router();
const cors = require('cors');
const feedbackcontrol = require("../controllers/feedbackcontroller")
router.get("/", feedbackcontrol.getAllFeedbacks);
router.post("/",feedbackcontrol.addFeedbacks);
router.get("/:userId",feedbackcontrol.getFeedbacksByUserId);
router.put("/:id",feedbackcontrol.updatefeedbacks);
router.delete("/:id",feedbackcontrol.deleteFeedbacks);
module.exports =router;