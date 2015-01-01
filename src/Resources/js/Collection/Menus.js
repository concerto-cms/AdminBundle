var Collection = Collection || {};

Collection.Menus = Backbone.Collection.extend({
    model: Model.Menu,

    getMenu: function(name, language) {
        return this.get(name + "/" + language);
    }
});