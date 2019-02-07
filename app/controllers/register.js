module.exports.newRegister = function (application, request, response) {
    response.render('register', {validation: {}, formData: {}});
}

module.exports.register = function (application, request, response){
    var formData = request.body;
    
    request.assert('name', 'Name field can not be empty.').notEmpty();
    request.assert('user', 'User field can not be empty.').notEmpty();
    request.assert('password', 'Password field can not be empty.').notEmpty();
    request.assert('home', 'Home field can not be empty.').notEmpty();
    var errors = request.validationErrors();

    if(errors){
        response.render('register', {validation: errors, formData: formData});
        return;
    }
       
    var usersDAO = new application.app.models.UsersDAO(request);
    usersDAO.insertUser(formData);

    response.send("Test ok");
}