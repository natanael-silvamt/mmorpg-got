var ObjectID = require('mongodb').ObjectID;

function gameDAO(request) {
    this._request = request;
}

gameDAO.prototype.generateParameters = function(user){
     this._request.db.collection("Game", function(error, collection){
        if(error){ return console.dir(error); }
        collection.insert({
            user: user,
            coin: 15,
            suditos: 10,
            fear: Math.floor(Math.random() * 1000),
            wisdom: Math.floor(Math.random() * 1000),
            commerce: Math.floor(Math.random() * 1000),
            magic: Math.floor(Math.random() * 1000)
        });
    });
}

gameDAO.prototype.startGame = function(response, user, home, msg){
    this._request.db.collection("Game", function(error, collection){
        if(error){ return console.dir(error); }
        collection.find({user: user}).toArray(function(error, result){
            response.render('game', {img_home: home, game: result[0], msg: msg});
        });
    });
}

gameDAO.prototype.action = function(objectAction, request){
    request.db.collection("Action", function(error, collection){
        if(error){ return console.dir(error); }
        var date = new Date();
        var time = null;
        switch(parseInt(objectAction.action)){
            case 1: time = 1 * 60 * 60000; break;
            case 2: time = 2 * 60 * 60000; break;
            case 3: time = 5 * 60 * 60000; break;
            case 4: time = 5 * 60 * 60000; break;
        }
        objectAction.action_end_in = date.getTime() + time;
        collection.insert(objectAction);
    });

    request.db.collection("Game", function(error, collection){
        if(error){return console.dir(error);}
        var coins = null;
        switch(parseInt(objectAction.action)){
            case 1: coins = -2 * parseInt(objectAction.quantity); break;
            case 2: coins = -3 * parseInt(objectAction.quantity); break;
            case 3: coins = -1 * parseInt(objectAction.quantity); break;
            case 4: coins = -1 * parseInt(objectAction.quantity); break;
        }
        collection.update({'user': objectAction.user}, {'$inc': {'coin': coins}});
    });
}

gameDAO.prototype.getActions = function(user, response){
    this._request.db.collection("Action", function(error, collection){
         if(error){ return console.dir(error); }
         var date = new Date();
         var nowadays = date.getTime();
         collection.find({"user": user, "action_end_in": {'$gt': nowadays}}).toArray(function(error, result){
             response.render("parchment", {actions: result});
         });
    });
}

gameDAO.prototype.revokeAction = function(action_id, response){
    this._request.db.collection("Action", function(error, collection){
        if(error){return console.dir(error);}
        collection.remove({'_id': ObjectID(action_id)}, function(error, result){
            response.redirect("game?msg=D");
        });
    });
}

module.exports = function(){
    return gameDAO;
}