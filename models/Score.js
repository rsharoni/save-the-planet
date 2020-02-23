const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema({
    score: {
        type: Number,
    }
});

module.exports = mongoose.model('Score', ScoreSchema);