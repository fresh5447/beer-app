var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 9090;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var db = require('./model/db');



// app.use('/api/beer', beerRoutes);
// app.use('/api/rating', ratingRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/getUsers', getUsersRoutes);




//Routes========================================================================






require('./config/passport')(passport);

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser());


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/test', function(req, res) {
    res.render('/test');
});

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./routes/userRoutes.js')(app, passport);
require ('./routes/beerRoutes')(app, passport);
require ('./routes/ratingRoutes')(app, passport);
 
 // require ('./routes/getUsersRoutes')(app, passport);
app.listen(port);
console.log('9090 is the magic port');