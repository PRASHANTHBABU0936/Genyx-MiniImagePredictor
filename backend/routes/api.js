const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Mock AI prediction generator
const getRandomPrediction = () => {
    const predictions = ["Cat", "Dog", "Car", "Tree", "Bird", "Boat", "Plane"];
    return predictions[Math.floor(Math.random() * predictions.length)];
};

// @route   POST api/predict
// @desc    Upload image & get prediction
// @access  Private
router.post('/predict', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const predictionText = getRandomPrediction();

        const newPrediction = new Prediction({
            user_id: req.user.id,
            image_url: imageUrl,
            prediction: predictionText
        });

        const prediction = await newPrediction.save();

        res.json(prediction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/dashboard
// @desc    Get user's predictions
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
    try {
        // Return newest first
        const predictions = await Prediction.find({ user_id: req.user.id }).sort({ timestamp: -1 });
        res.json(predictions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
