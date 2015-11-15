var Marionette = require("backbone.marionette");

var Router = Marionette.AppRouter.extend({
    // "someMethod" must exist at controller.someMethod
    appRoutes: {
        "": "index",
        "list/:lang": "list",
        "edit/*path": "edit"
    }
});
module.exports = Router;