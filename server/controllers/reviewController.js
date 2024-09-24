const Review = require('../models/Review');
const Service = require('../models/Service');

// Create a new review
exports.createReview = async (req, res) => {
    const { rating, comment, serviceID, postedBy } = req.body; // `postedBy` is now passed in the request body

    // Basic input validation
    if (!rating || !comment || !serviceID || !postedBy) {
        return res.status(400).json({ message: "Rating, comment, serviceID, and postedBy are required." });
    }

    try {
        // Check if the service exists
        const service = await Service.findById(serviceID);
        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Create and save the review
        const review = new Review({ postedBy, rating, comment, serviceID });
        await review.save();

        // Populate the postedBy field with the user's name if necessary
        await review.populate('postedBy', 'name');

        res.status(201).json(review);
    } catch (err) {
        console.error("Error creating review:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get all reviews for a specific service
exports.getReviewsByService = async (req, res) => {
    try {
        const reviews = await Review.find({ serviceID: req.params.serviceID }).populate('postedBy', 'username');
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: 'No reviews found for this service' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update review by ID
exports.updateReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Only allow updating rating and comment fields
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();
        await review.populate('postedBy', 'username');
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a review
exports.deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};
