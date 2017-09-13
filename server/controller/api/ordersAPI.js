/**
 * Created by medibox on 12/9/17.
 */

var Orders = require('../../model/Orders');
var _ = require('lodash');
function getOrderID() {
    var length = 12;
    var timestamp = + new Date();
    var randomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };
    var ts = timestamp.toString();
    var parts = ts.split('').reverse();
    var id = '';
    for( var i = 0; i < length; ++i ) {
        var index = randomInt( 0, parts.length - 1 );
        id += parts[index];
    }
    return id;
}

function ordersAction(req,res){
    if(req.body.action == 'NEW'){
        var oneOrder = req.body;
        oneOrder.orderId = getOrderID();
        var newRest = new Orders(oneOrder);
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
        Orders.update(query,updateDetails,function(err,results){
            if(results !== null) {
                res({result : results,status : true});
            }else{
                res({result :false,status : false});
            }
        })
    }
}

module.exports.ordersAction = ordersAction;