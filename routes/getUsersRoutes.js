var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('../model/user');

module.exports = function(app, passport){

app('/api/getUsers/', get(function(req, res){
        mongoose.model('User').find({}, function(err, user){
            if(err){
                return console.log('err');
            } else {
                res.json(user);
            }
        });
    })

app('/api/getUsers/:id', get(function(req, res) {
        mongoose.model('User').findById({
            _id: req.params.id
        }, function(err, user) {
            if(err)
                res.send(err);
                res.json(user);
        });
    })
    
}
