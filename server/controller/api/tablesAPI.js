/**
 * Created by medibox on 11/9/17.
 */

var Tables = require('../../model/Tables');

function tableActions(req,res){
    console.log('req',req.body);
    if(req.body.action == 'NEW'){
        var newRest = new Tables(req.body.data);
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
        Tables.update(query,updateDetails,function(err,results){
            if(results !== null) {
                res.json({result : results,status : true});
            }else{
                res.json({result :false,status : false});
            }
        })
    }else if(req.body.action == 'DELETE'){
        var query = req.body.query;
        Tables.remove(query,function(err,results){
            if(results !== null) {
                res.json({result : results,status : true});
            }else{
                res.json({result :false,status : false});
            }
        });
    }else if(req.body.action == 'GET'){
        var query = req.body.query;
        Tables.find(query,function(err,results){
            if(results !== null) {
                res.json({result : results,status : true});
            }else{
                res.json({result :false,status : false});
            }
        });
    }
}

function  bookingTable(req,res) {
    var query = {
        restaurantId : req.body.restaurantId,
        tableNo : req.body.tableNo
    };
    Tables.findOne(query,function(err,results){
        console.log('results',results);
        if(results !== null) {
            if(req.body.availability) {
                results.availability = req.body.availability;
            }
            if(req.body.userId) {
                results.bookingDetails = {
                    userId :  req.body.userId,
                    userName : req.body.userName || '',
                    email :  req.body.email || '',
                    mobile : req.body.mobile || ''
                };
                if(req.body.bookingStartTime && req.body.bookingEndTime){
                    results.bookingDetails.bookingTime = {
                        start : req.body.bookingStartTime,
                        end : req.body.bookingEndTime
                    };
                    console.log('\n@@@@',results);
                }
            }

            results.save(function (err, result) {
                console.log('\nerr',err);
                console.log('result',result);
                if(result !== null) {
                    res.json({result : result,status : true});
                }else{
                    res.json({result : result,status : true});
                }
            });
        }else{
            res.json({result :false,status : false});
        }
    })
}

function bookingDetails(req,res){
    var query = {
        restaurantId : req.body.restaurantId,
        bookingDetails : {$exists : true}
    };
    if(req.body.availability){
        query.availability = req.body.availability;
    }
    if(req.body.bookingStartTime && req.body.bookingEndTime){
        query['bookingDetails.bookingTime.start'] = {
            $gte: new Date(req.body.bookingStartTime)
        };
        query['bookingDetails.bookingTime.end'] = {
            $lte: new Date(req.body.bookingEndTime)
        };
    }
    Tables.find(query,function(err,results){
        if(results !== null) {
            res.json({result : results,status : true});
        }else{
            res.json({result : results,status : true});
        }
    })
}

function  searchTable(req,res) {
    var query = {
        restaurantId : req.body.restaurantId
    };
    if(req.body.capacity){
        query.capacity = {$lt : req.body.capacity};
    }
    if(req.body.availability){
        query.availability = req.body.availability;
    }
    Tables.find(query,function(err,results){
        if(results !== null) {
            res.json({result : results,status : true});
        }else{
            res.json({result : results,status : true});
        }
    })
}

module.exports.tableActions = tableActions;
module.exports.bookingTable = bookingTable;
module.exports.bookingDetails = bookingDetails;
module.exports.searchTable = searchTable;