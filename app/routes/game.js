module.exports = function(application){
	application.get('/game', function(request, response){
		application.app.controllers.game.gameHome(application, request, response);
	});

	application.get('/exit', function(request, response){
		application.app.controllers.game.exit(application, request, response);
	});
}