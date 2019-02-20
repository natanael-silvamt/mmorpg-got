function UsersDAO(request) {
    this._request = request;
}

UsersDAO.prototype.insertUser = function(user){
    this._request.db.collection("Users", function(error, collection){
        if(error){ return console.dir(error); }
        collection.insert(user);
    });
}

UsersDAO.prototype.authenticate = function(formData, request, response){
    this._request.db.collection("Users", function(error, collection){
        if(error){ return console.dir(error); }
        collection.find(formData).toArray(function(error, result){
            if(result[0] != undefined){
                request.session.authorized = true;
                request.session.user = result[0].user;
                request.session.home = result[0].home;

                response.redirect("game");
            } else{
                response.render("index", {validation: {}});
            }
        });
    });
}

module.exports = function(){
    return UsersDAO;
}