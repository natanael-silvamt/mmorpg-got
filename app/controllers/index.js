module.exports.home = function (application, request, response) {
    response.render('index', {validation: {}});
}

module.exports.authenticate = function (application, request, response) {
    var formData = request.body;
    request.assert("user", "User field can not be empty.").notEmpty(); 
    request.assert("password", "Password field can not be empty.").notEmpty(); 
    var errors = request.validationErrors();
    if(errors){
        response.render("index", {validation: errors});
        return;
    }
    var usersDAO = new application.app.models.UsersDAO(request);
    usersDAO.authenticate(formData, request, response);
}