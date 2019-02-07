module.exports = function(application){
	application.get('/', function(request, response){
		application.app.controllers.index.home(application, request, response);
	});

	application.post('/authenticate', function(request, response){
		application.app.controllers.index.authenticate(application, request, response);
	});
}
