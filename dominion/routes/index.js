const express = require('express');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const gameResult = mongoose.model('gameResult');
const playerStat = mongoose.model('playerStat');

router.get('/', (req, res) => {
	res.render('home',{title:'Home'});
});

router.get('/addGameResult', (req, res) => {
	res.render('form',{title:'Add Game Result'});
});

router.get('/addPlayer', (req, res) => {
	res.render('player_form',{title:'Add Player'});
});

router.get('/gameResults', (req, res) => {
	gameResult.find()
		.then((gameresults) => {
			res.render('index', {title: 'Game Results',gameresults });
		})
		.catch(() => { res.send('Sorry! Trouble retrieving game results.');});
	
});

router.get('/playerStats', (req, res) => {
	playerStat.find()
		.then((playerstats) => {
			res.render('stats', {title: 'Player Stats',playerstats });
		})
		.catch(() => { res.send('Sorry! Trouble retrieving player stats.');});
	
});

router.post('/addGameResult',
	[
		check('date')
			.isDate('mm/dd/yyyy')
			.withMessage('Please enter a valid game date.'),
		check('firstpl')
			.isLength({min:1})
			.withMessage('Please enter the 1st place winner.'),
		check('firstvp')
			.isLength({min:1})
			.withMessage('Please enter the 1st place winner VP.'),
		check('secondpl')
			.isLength({min:1})
			.withMessage('Please enter the 2nd place winner.'),
		check('secondvp')
			.isLength({min:1})
			.withMessage('Please enter the 2nd place winner VP.'),
		check('turnsNum')
			.isLength({min:1})
			.withMessage('Please enter the number of game turns.'),
		check('sets')
			.isLength({min:1})
			.withMessage('Please enter the game sets.'),

	],
	(req,res) => {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			console.log(req.body);
			const game_Results = new gameResult(req.body);
			game_Results.save()
				.then(() => {res.render('form',{
				title : 'Add Game Result',
				errors: errors.array()});})
				.catch((err) => {
					console.log(err);
					res.send('Sorry! Game Result Logging Unsucessful.');
				});			
		}
		else {
			res.render('form',{
				title : 'Add Game Result',
				errors: errors.array(),
				data: req.body,
			});
		}
	});


router.post('/addPlayer',
	[
		check('name')
			.isLength({min:1})
			.withMessage('Please enter the player name.'),
	],
	(req,res) => {
		const errors = validationResult(req);

		if (errors.isEmpty()) {
			console.log(req.body);
			const player_Stat = new playerStat(req.body);
			player_Stat.save()
				.then(() => {res.render('player_form',{
				title : 'Add Player',
				errors: errors.array()});})
				.catch((err) => {
					console.log(err);
					res.send('Sorry! Player Logging Unsucessful.');
				});			
		}
		else {
			res.render('player_form',{
				title : 'Add Player',
				errors: errors.array(),
				data: req.body,
			});
		}
	});


module.exports = router;