const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");

// Route to create a new feedback
router.post("/", feedbackController.createFeedback);

// Route to get all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// Route to get a single feedback by ID
router.get("/:id", feedbackController.getFeedbackById);

// Route to update a feedback by ID
router.put("/:id", feedbackController.updateFeedback);

// Route to delete a feedback by ID
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
