var Navigation = Navigation || {};
Navigation.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "list/:menu/:lang/": "list",
        "edit/:menu/:lang/*path": "edit"
    }
});
