const express = require("express");// Imports the Express framework.
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");//Imports a controller module

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
