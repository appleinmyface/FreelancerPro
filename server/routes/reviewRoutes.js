// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { createReview, getReviewsByService, updateReview, deleteReview } = require('../controllers/reviewController');

// Create a review
router.post('/', createReview);

// Get all reviews for a specific service
router.get('/service/:serviceID', getReviewsByService);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
