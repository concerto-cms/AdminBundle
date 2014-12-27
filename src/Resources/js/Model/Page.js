var Model = Model || {};
Model.Page = Backbone.Model.extend({
    set: function(attrs, options) {
        if (typeof attrs == "object" && attrs.id) {
            arguments[0].id = attrs.id.replace("/cms/pages/", "");
        }
        Backbone.Model.prototype.set.apply(this, arguments);
    },

    getLanguage: function() {
        var urlParts = this.id.split("/");
        return _.first(urlParts);
    },
    url: function() {
        if (this.isNew()) {
            return Routing.generate('concerto_cms_core_pages_rest');
        } else {
            return Routing.generate('concerto_cms_core_pages_rest_get', {path: this.id});
        }
    }

});
