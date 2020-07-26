const mongoose = require('mongoose');

const playerStatSchema = new mongoose.Schema({
  name: {
    type: String, trim: true, uppercase: true
  },
  games: {
    type: Number, default: 0
  },
  wins: {
    type: Number, default: 0
  },
  points:{
    type: Number, default: 0
  },
  win_rate: {
    type: Number, default: 0
  },
  ptspergame:{
    type: Number, default: 0
  },
  totalvps: {
    type: Number, default: 0
  },
  vpspergame:{
    type: Number, default: 0
  },
  golf: {
    type: Number, default: 0
  },
  elo:{
    type: [Number], default: [1000]
  },
});

module.exports = mongoose.model('playerStat', playerStatSchema);