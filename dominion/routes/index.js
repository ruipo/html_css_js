const express = require('express');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const gameResult = mongoose.model('gameResult');

router.get('/', (req, res) => {
	res.render('form',{title:'Game Result Form'});
});

router.get('/gameResults', (req, res) => {
	gameResult.find()
		.then((gameresults) => {
			res.render('index', {title: 'Listing Game Results',gameresults });
		})
		.catch(() => { res.send('Sorry! Trouble retrieving game results.');});
	
});

router.post('/',
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
				.then(() => {res.send('The game result has been successfully submitted and logged!');})
				.catch((err) => {
					console.log(err);
					res.send('Sorry! Game Result Logging Unsucessful.');
				});			
		}
		else {
			res.render('form',{
				title : 'Game Result Form',
				errors: errors.array(),
				data: req.body,
			});
		}
	});


module.exports = router;