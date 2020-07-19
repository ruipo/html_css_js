const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  date: {
    type: String, trim: true
  },
  firstpl: {
    type: String, trim: true, uppercase: true
  },
  firstvp:{
    type: String, trim: true
  },
  secondpl: {
    type: String, trim: true, uppercase: true
  },
  secondvp:{
    type: String, trim: true
  },
  thirdpl: {
    type: String, trim: true, uppercase: true
  },
  thirdvp:{
    type: String, trim: true
  },
  fourthpl: {
    type: String, trim: true, uppercase: true
  },
  fourthvp:{
    type: String, trim: true
  },
  fifthpl: {
    type: String, trim: true, uppercase: true
  },
  fifthvp:{
    type: String, trim: true
  },
  sixthpl: {
    type: String, trim: true, uppercase: true
  },
  sixthvp:{
    type: String, trim: true
  },
  turnsNum: {
  	type: String, trim: true
  },
  sets: {
  	type: String,
  	trim: true,
    uppercase: true
  },
});

module.exports = mongoose.model('gameResult', gameResultSchema);