var container = $("#login-container"),
    LoginView = require("./LoginView");

global.view = new LoginView({
    el: container
});