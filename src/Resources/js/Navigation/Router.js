var Backbone = require("backbone");

module.exports = Backbone.Router.extend({
    routes: {
        "": "index",
        ":menu/:lang": "list"
    }
});
