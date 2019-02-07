module.exports.gameHome = function (application, request, response) {
    if(request.session.authorized){
        response.render('game');
    } else{
        response.send("User must sign in.");
    }    
}

module.exports.exit = function(application, request, response){
    request.session.destroy(function(error){
        response.render("index", {validation: {}})
    });
}