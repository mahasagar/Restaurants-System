/**
 * Created by medibox on 8/9/17.
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    requireDir = require('require-dir'),
    config = require('./config/developement'),
    passport = require('passport'),
    localStrategy = require('passport-local'),Strategy,
    path = require('path');
var controllers = requireDir('./server/controller/api');
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//passport init
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname,'client')));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-username,x-token');
    next();
};
app.use(allowCrossDomain);

app.get('/',function(req,res){
    res.sendfile(__dirname+'/client/index.html');
});


app.post('/api/registerUser',controllers.userAPI.createUser);
app.post('/api/login',controllers.userAPI.loginUser);

app.post('/api/entityRestaurantsAction',controllers.restaurantsAPI.entityRestaurantsAction);
app.post('/api/searchRestaurants',controllers.restaurantsAPI.searchRestaurants);
app.post('/api/menuAction',controllers.restaurantsAPI.menuAction);

app.post('/api/tableActions',controllers.tablesAPI.tableActions);
app.post('/api/bookingTable',controllers.tablesAPI.bookingTable);
app.post('/api/searchTable',controllers.tablesAPI.searchTable);
app.post('/api/bookingDetails',controllers.tablesAPI.bookingDetails);

app.post('/api/ordersAction',controllers.ordersAPI.ordersAction);

app.post('/api/writeReview',controllers.reviewsAPI.writeReview);







mongoose.connect('mongodb://'+config.db.mongo.host+':'+config.db.mongo.port+'/'+config.db.mongo.db);
app.listen(8000, function () {
    console.log("Welcome to Dew and Dine.. server started at 8000")
})
module.exports = app;

