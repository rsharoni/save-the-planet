const Score = require('../models/Score');
require('dotenv/config');
const SCORE_ID = process.env.SCORE_ID;

exports.getScore = async () => {
    console.log('get score', SCORE_ID);
    try {
        const scores = await Score.findById(SCORE_ID);
        console.log('scores', scores);
        return scores.score;
    } catch (err) {
        console.log('get score error', err);
    }
}

exports.setScore = async (newScore) => {
    console.log('set score', SCORE_ID);
    try {
        await Score.updateOne({ _id: SCORE_ID }, { $set: { score: newScore } });
    } catch (err) {
        console.log('set score error', err);
    }
}