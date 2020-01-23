var categories = require('../model/categories');

exports.get_all_categories = function(req,res){
    categories.getAllCategories(function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
}