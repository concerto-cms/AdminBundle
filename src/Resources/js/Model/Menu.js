var Model = Model || {};
Model.Menu = Backbone.Model.extend({
    defaults: {
    },
    set: function(attrs, options) {
        if (typeof attrs == "object" && attrs.id) {
            arguments[0].id = attrs.id.replace("/cms/menu/", "");
        }
        Backbone.Model.prototype.set.apply(this, arguments);
    },

    url: function() {
        return Routing.generate('concerto_cms_core_navigation_rest_get', {path: this.id});
    },
    getChildren: function() {
        if (this.collection) {
            return this.collection.where({parent: this.get('id')});
        }
    }
});
