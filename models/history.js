const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    moves: Array,
    result: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);