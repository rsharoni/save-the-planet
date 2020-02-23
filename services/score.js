const Score = require('../models/Score');

exports.getScore = async () => {
    try {
        const scores = await Score.findById('5e504f93e7179a5e7ee24a1b');
        return scores.score;
    } catch (err) {
        console.log('get score error', err);
    }
}

exports.setScore = async (newScore) => {
    try {
        await Score.updateOne({ _id: '5e504f93e7179a5e7ee24a1b' }, { $set: { score: newScore } });
    } catch (err) {
        console.log('set score error', err);
    }
}