module.exports = function(application){
	application.get('/register', function(request, response){
		application.app.controllers.register.newRegister(application, request,response);
	});

	application.post('/register', function(request, response){
		application.app.controllers.register.register(application, request,response);
	});
}