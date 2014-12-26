var Pages = Pages || {};
Pages.Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "list/:lang": "list",
        "edit/*path": "edit"
    }
});
