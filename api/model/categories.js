var sql = require('../../connect_db');

var categories = function(categories){
    this.category = categories.category;
    this.sub_categories = categories.sub_categories;
}

categories.getAllCategories = function(result){
    sql.query("select * from tedi.categories order by category,sub_categories",function(err,res){
        if(err){
            console.log("Error: ",err);
            result(null,err);
        }
        else{
            result(null,res);
        }
    });
}

module.exports = categories;