/**
 * Created by medibox on 11/9/17.
 */

var Restaurants = require('../../model/Restaurants');

function entityRestaurantsAction(req,res){
    console.log('req',req.body);
    if(req.body.action == 'NEW'){
        var newRest = new Restaurants(req.body.data);
        newRest.save(function (err, result) {
            if(result !== null) {
                res.json({result : result,status : true});
            }else{
                res.json({result : result,status : true});
            }
        });
    }else if(req.body.action == 'UPDATE'){
        var query = req.body.query;
        var updateDetails = req.body.updateDetails;
        Restaurants.update(query,updateDetails,function(err,results){
            if(results !== null) {
                res({result : results,status : true});
            }else{
                res({result :false,status : false});
            }
        })
    }else if(req.body.action == 'DELETE'){
        var query = req.body.query;
        Restaurants.delete(query,function(err,results){
            if(results !== null) {
                res({result : results,status : true});
            }else{
                res({result :false,status : false});
            }
        });
    }
}



function  searchRestaurants(req,res) {
    var query = {
        name :   new RegExp(req.body.name, 'i')
    };
    if(req.body.location){
        query['address.city'] =  new RegExp(req.body.location, 'i');
    }
    Restaurants.find(query,function(err,results){

            if(results !== null) {
                res.json({result : results,status : true});
            }else{
                res.json({result : results,status : true});
            }
    })
}

module.exports.entityRestaurantsAction = entityRestaurantsAction;
module.exports.searchRestaurants = searchRestaurants;