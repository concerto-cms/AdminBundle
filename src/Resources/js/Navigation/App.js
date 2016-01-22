var Marionette = require("backbone.marionette"),
    Controller = require("./Controller");

var Application = Marionette.Application.extend({
    initialize: function() {
    },
    onStart: function(options) {
        this.controller = new Controller(options);
    }
});

module.exports = Application;