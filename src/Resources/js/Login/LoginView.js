var Marionette = require("marionette");

module.exports = Marionette.View.extend({
    initialize: function() {
        this.ui.username.focus();
    },

    ui: {
        "username": "[name=username]",
        "password": "[name=password]"
    },

    events: {
        "submit": "onSubmit" //is the same as "click .dog":
    },
    onSubmit: function(e) {
        var $username = this.ui.username,
            $password = this.ui.password;

        if (!$username.val()) {
            e.preventDefault();
            $username.focus();
            return false;
        }
        if (!$password.val()) {
            e.preventDefault();
            $password.focus();
            return false;
        }
        return true;

    }

});
