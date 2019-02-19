module.exports = function(application){
	application.get('/game', function(request, response){
		application.app.controllers.game.gameHome(application, request, response);
	});

	application.get('/exit', function(request, response){
		application.app.controllers.game.exit(application, request, response);
	});

	application.get('/suditos', function(request, response){
		application.app.controllers.game.suditos(application, request, response);
	});

	application.get('/parchment', function(request, response){
		application.app.controllers.game.parchment(application, request, response);
	});

	application.post('/order_action_sudito', function(request, response){
		application.app.controllers.game.order_action_sudito(application, request, response);
	});
}