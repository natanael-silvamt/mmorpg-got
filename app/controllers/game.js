module.exports.gameHome = function (application, request, response) {
    if(request.session.authorized !== true){
        response.send("User must sign in.");
        return;
    } 
    var gameDAO = new application.app.models.gameDAO(request);
    gameDAO.startGame(response, request.session.user, request.session.home);   
}

module.exports.exit = function(application, request, response){
    request.session.destroy(function(error){
        response.render("index", {validation: {}});
    });
}

module.exports.suditos = function(application, request, response){
        response.render("villagers", {validation: {}});
}

module.exports.parchment = function(application, request, response){
        response.render("parchment", {validation: {}});
}