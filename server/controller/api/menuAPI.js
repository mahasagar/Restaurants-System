/**
 * Created by medibox on 12/9/17.
 */

var Menu = require('../../model/Menu');

function menuAction(req,res){
    var result = {
        status : false
    };
    if(!req.body.restaurantID){
        res.json(result);
    }
    var query = {
        restaurantID : req.body.restaurantID
    };
    var newMenu = {
        dishName :  req.body.dishName,
        MRP : req.body.MRP,
        description :  req.body.description
    };
    Menu.findOne(query,function(err,results){
        if(results !== null) {
            results.menuDetails.push(newMenu);
            results.save();
            result.response = results;
            result.status = true;
            res.json(result);
        }else{
            var firstMenu = new Menu({
                restaurantID : req.body.restaurantID,
                menuDetails : newMenu
            });
            firstMenu.save();
            res.json(result);
        }
    });

}


module.exports.menuAction = menuAction;