const express = require('express');
const mongoose = require('mongoose');
const {check, validationResult} = require('express-validator');

const router = express.Router();
const gameResult = mongoose.model('gameResult');
const playerStat = mongoose.model('playerStat');
const k = 64; //elo variability

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
			const addresult = true

			// update stats of 1st place
			playerStat.find({name:req.body.firstpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.firstpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.secondpl.toUpperCase()})
							.then((playerstat2) => {
								const beatelo = playerstat2[0].elo;
								const plelo = firstplace[0].elo;
								//console.log(beatelo);
								//console.log(plelo);
								const P1 = 1.0/(1.0+Math.pow(10,((beatelo-plelo)/400)));
								const updatedelo = Math.round(plelo+k*(1-P1));
							  //console.log(updatedelo);

								playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins+1, points:firstplace[0].points+6, win_rate:Math.round(((firstplace[0].wins+1)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+6)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.firstvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.firstvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo},{upsert:true})
									.then((updatedpstat) =>{
										// const test = updatedpstat;
										// console.log(test);
									})	
							})
					}
				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');
				});	

			// update stats of 2nd place
			playerStat.find({name:req.body.secondpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.secondpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.thirdpl.toUpperCase()})
							.then((playerstat2) => {

								playerStat.find({name:req.body.firstpl.toUpperCase()})
									.then((playerstat3) => {
										const lostelo = playerstat3[0].elo;
										const plelo = firstplace[0].elo;
										//console.log(lostelo);
										//console.log(plelo);
										const P1 = 1.0/(1.0+Math.pow(10,((lostelo-plelo)/400)));
										const updatedelo = plelo+k*(0-P1);
										//console.log(updatedelo);
										if (playerstat2[0] == void(0)){
											const P2 = 1;
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+5, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+5)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.secondvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.secondvp))/(firstplace[0].games+1)*100)/100), elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
										}
										else{
											const beatelo = playerstat2[0].elo;
											//console.log(beatelo);
											const P2 = 1.0/(1.0+Math.pow(10,((beatelo-updatedelo)/400)));
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+5, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+5)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.secondvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.secondvp))/(firstplace[0].games+1)*100)/100), elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
									  }
									  
									})
							})
					}

				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');	
				});	

			// update stats of 3rd place
			playerStat.find({name:req.body.thirdpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.thirdpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.fourthpl.toUpperCase()})
							.then((playerstat2) => {

								playerStat.find({name:req.body.secondpl.toUpperCase()})
									.then((playerstat3) => {
										const lostelo = playerstat3[0].elo;
										const plelo = firstplace[0].elo;
										//console.log(lostelo);
										//console.log(plelo);
										const P1 = 1.0/(1.0+Math.pow(10,((lostelo-plelo)/400)));
										const updatedelo = plelo+k*(0-P1);
										//console.log(updatedelo);
										if (playerstat2[0] == void(0)){
											const P2 = 1;
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+4, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+4)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.thirdvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.thirdvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
										}
										else{
											const beatelo = playerstat2[0].elo;
											//console.log(beatelo);
											const P2 = 1.0/(1.0+Math.pow(10,((beatelo-updatedelo)/400)));
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+4, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+4)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.thirdvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.thirdvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
									  }
									  
									})
							})
					}
				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');			
				});	

			// update stats of 4th place
			playerStat.find({name:req.body.fourthpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.fourthpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.fifthpl.toUpperCase()})
							.then((playerstat2) => {

								playerStat.find({name:req.body.thirdpl.toUpperCase()})
									.then((playerstat3) => {
										const lostelo = playerstat3[0].elo;
										const plelo = firstplace[0].elo;
										//console.log(lostelo);
										//console.log(plelo);
										const P1 = 1.0/(1.0+Math.pow(10,((lostelo-plelo)/400)));
										const updatedelo = plelo+k*(0-P1);
										//console.log(updatedelo);
										if (playerstat2[0] == void(0)){
											const P2 = 1;
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+3, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+3)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.fourthvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.fourthvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
										}
										else{
											const beatelo = playerstat2[0].elo;
											//console.log(beatelo);
											const P2 = 1.0/(1.0+Math.pow(10,((beatelo-updatedelo)/400)));
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+3, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+3)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.fourthvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.fourthvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
									  }
									  
									})
							})
					}

				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');
					
				});	

			// update stats of 5th place
			playerStat.find({name:req.body.fifthpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.fifthpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.sixthpl.toUpperCase()})
							.then((playerstat2) => {

								playerStat.find({name:req.body.fourthpl.toUpperCase()})
									.then((playerstat3) => {
										const lostelo = playerstat3[0].elo;
										const plelo = firstplace[0].elo;
										//console.log(lostelo);
										//console.log(plelo);
										const P1 = 1.0/(1.0+Math.pow(10,((lostelo-plelo)/400)));
										const updatedelo = plelo+k*(0-P1);
										//console.log(updatedelo);
										if (playerstat2[0] == void(0)){
											const P2 = 1;
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+2, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+2)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.fifthvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.fifthvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
										}
										else{
											const beatelo = playerstat2[0].elo;
											//console.log(beatelo);
											const P2 = 1.0/(1.0+Math.pow(10,((beatelo-updatedelo)/400)));
											const updatedelo1 = Math.round(updatedelo+k*(1-P2));
											//console.log(updatedelo1);
											playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+2, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+2)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.fifthvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.fifthvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo1},{upsert:true})
												.then((updatedpstat) =>{
												// const test = updatedpstat;
												// console.log(test);
												})	
									  }
									  
									})
							})
					}
				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');
					
				});	

			// update stats of 6th place
			playerStat.find({name:req.body.sixthpl.toUpperCase()})
				.then((playerstat) => {
					const firstplace = playerstat;
					//console.log(firstplace[0]);
					const filter = { name: req.body.sixthpl.toUpperCase()};
					if (firstplace[0] != void(0)){
						playerStat.find({name:req.body.fifthpl.toUpperCase()})
							.then((playerstat2) => {

								const lostelo = playerstat2[0].elo;
								const plelo = firstplace[0].elo;
								//console.log(lostelo);
								//console.log(plelo);
								const P1 = 1.0/(1.0+Math.pow(10,((lostelo-plelo)/400)));
								const updatedelo = Math.round(plelo+k*(0-P1));
								//console.log(updatedelo);
								
								playerStat.updateOne(filter, {games:firstplace[0].games+1, wins:firstplace[0].wins, points:firstplace[0].points+1, win_rate:Math.round(((firstplace[0].wins)/(firstplace[0].games+1)*100)*100)/100, ptspergame:Math.round(((firstplace[0].points+1)/(firstplace[0].games+1))*100)/100, totalvps:firstplace[0].totalvps+parseFloat(req.body.sixthvp), vpspergame:Math.round(((firstplace[0].totalvps+parseFloat(req.body.sixthvp))/(firstplace[0].games+1))*100)/100, elo:updatedelo},{upsert:true})
									.then((updatedpstat) =>{
								})	
							})
					}
				})
				.catch((err) => {
					console.log(err);
					res.send('Please add new player to database first!');
					
				});	
			

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