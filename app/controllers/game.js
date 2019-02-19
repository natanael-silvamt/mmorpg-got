module.exports.gameHome = function (application, request, response) {
    if(request.session.authorized !== true){
        response.send("User must sign in.");
        return;
    } 

    var invalid_command = 'N';
    if(request.query.invalid_command == 'S'){invalid_command = 'S';}

    var gameDAO = new application.app.models.gameDAO(request);
    gameDAO.startGame(response, request.session.user, request.session.home, invalid_command);   
}

module.exports.exit = function(application, request, response){
    request.session.destroy(function(error){
        response.render("index", {validation: {}});
    });
}

module.exports.suditos = function(application, request, response){
    if(request.session.authorized !== true){
        response.send("User must sign in.");
        return;
    } 
    response.render("villagers", {validation: {}});
}

module.exports.parchment = function(application, request, response){
    if(request.session.authorized !== true){
        response.send("User must sign in.");
        return;
    } 
    response.render("parchment", {validation: {}});
}

module.exports.order_action_sudito = function(application, request, response){
    if(request.session.authorized !== true){
        response.send("User must sign in.");
        return;
    } 
    var formData = request.body;
    request.assert('action', 'Action should by informed.').notEmpty();
    request.assert('quantity', 'Quantity should by informed.').notEmpty();

    var errors = request.validationErrors();
    if(errors){
        response.redirect('game?invalid_command=S');
        return;
    }

    response.send('ok');

}