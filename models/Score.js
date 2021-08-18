const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema({
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Score', ScoreSchema);