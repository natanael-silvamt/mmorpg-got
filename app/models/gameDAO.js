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

gameDAO.prototype.startGame = function(response, user, home){
    this._request.db.collection("Game", function(error, collection){
        if(error){ return console.dir(error); }
        collection.find({user: user}).toArray(function(error, result){
            response.render('game', {img_home: home, game: result[0]});
        });
    });
}

module.exports = function(){
    return gameDAO;
}