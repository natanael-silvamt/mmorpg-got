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

gameDAO.prototype.action = function(obejectAction){
    this._request.db.collection("Action", function(error, collection){
        if(error){ return console.dir(error); }
        var date = new Date();
        var time = null;
        switch(obejectAction.action){
            case 1: time = 1 * 60 * 60000;
            case 2: time = 2 * 60 * 60000;
            case 3: time = 5 * 60 * 60000;
            case 4: time = 5 * 60 * 60000;
        }
        obejectAction.action_end_in = date.getTime() + time;
        collection.insert(obejectAction);
    });
}

module.exports = function(){
    return gameDAO;
}