var Navigation = Navigation || {};
Navigation.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        ":menu/:lang": "list"
    }
});
