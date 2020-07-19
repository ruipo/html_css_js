var express = require('express');
var app = express();

var nameFinder= (req, res, next) => {
    var name = req.query.name;
    if (name)
	req.username = name.toUpperCase();
    else
	req.username = 'Guest';
    next();
};

var greeter = (req, res, next) => {
    res.status(200).type('html');
    res.write('Hello, ' + req.username);
    next();
};

var adminName = (req, res, next) => {
    req.username = 'Admin';
    next();
};


var logger = (req, res, next) => {
    var url = req.url;
    var time = new Date();
    console.log('Served request for ' + url + ' at ' + time);
    next();
};


var header = (req, res, next) => {
    // header
    next();
};


var footer = (req, res, next) => {
    // footer
    next();
};



var commonRoute = express.Router();
commonRoute.use(header, greeter, footer);

app.use('/welcome', logger, nameFinder, commonRoute,
	(req, res) => { res.end(); } );


app.use('/admin', logger, adminName, commonRoute, 
	(req, res) => { res.end(); } );

app.use('/', logger, (req, res) => { res.send('hi'); } );


app.listen(3000,  () => {
	console.log('Listening on port 3000');
    });
