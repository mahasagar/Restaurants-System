/**
 * Created by medibox on 11/9/17.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
// Schema
var schema = new mongoose.Schema({
    restaurantID : {type: mongoose.Schema.Types.ObjectId},
    menuDetails : [{
        dishName : {type: String},
        MRP : {type: String},
        description :  {type: String}
    }]
});

//index
schema.index({restaurantId: 1});

// Model
var model = mongoose.model('Menu', schema);

// Public API
module.exports = model;
