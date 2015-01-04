var Login = Login || {};
Login.Controller = function Login_Controller() {
    var container = $("#login-container");
    container.on("submit", "form", function(e) {
        var username = container.find("#username"),
            password = container.find("#password");

        if (!username.val()) {
            e.preventDefault();
            username.focus();
            return false;
        }
        if (!password.val()) {
            e.preventDefault();
            password.focus();
            return false;
        }
        return true;
    });

    container.find("#username").focus();
};
