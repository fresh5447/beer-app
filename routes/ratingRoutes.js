var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('../model/beerModel');
var User = require('../model/user');


//router.use(bodyParser.urlencoded({ extended: true }));
module.exports = function(app, passport){

 app.post('/api/rating/beers/:beerId/rating',function(req, res) {
	
	var user = req.user;
	console.log(user,"*****************");			
	
	var b = req.body;	
	console.log('New Rating:', b);
	
	mongoose.model('Beer').findById({
			id: req.params.beerId
		}, function(err, beer) {
			if(err) {
				res.send(err);
			}

		// Add newRating to the beer's ratings array
		beer.ratings = beer.ratings || [];
		beer.ratings.push({
			tasting_notes: b.tasting_notes,
			overall: b.overall
            // user_id: req.user._id
		})
		// Save the updated beer back to the DB
		
		beer.save(function(err, beer) {
				if(err)
					res.send(err);
					
				res.json({ message: "Beer was updated"});
			});

		});	
	})		
	
app.get('/api/rating',function(req, res){
		mongoose.model('Beer').find({}, function(err, beer){
			if(err){
				return console.log('err');
			} else {
				res.json(beer);
			}
		});
	})



 app.get('/api/rating/:id', function(req, res) {
		mongoose.model('Beer').findById({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
			res.json(beer);
		});
	});

app.put('/api/rating/:id',function(req, res) {
		mongoose.model('Beer').findById(req.params.id, function(err, beer){
			if(err)
				res.send(err);
	
			// beer.ratings.push(res.body)

			beer.rating.tasting_notes = req.body.tasting_notes;
			beer.rating.overall = req.body.overall;
			// beer.rating[0].user_id = req.body.user_id;

			console.log(JSON.stringify(beer));

			beer.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "Beer was updated"});
			});

		});
	})

//get all ratings by beer ID

	app.delete('/api/beer/:id',function(req, res) {
		mongoose.model('Beer').remove({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

}
