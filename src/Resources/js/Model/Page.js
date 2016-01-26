var Backbone = require("backbone"),
    _ = require("underscore");
module.exports = Backbone.Model.extend({
    defaults: {
        type: 'simplepage'
    },
    set: function(attrs, options) {
        if (typeof attrs == "object" && attrs.id) {
            arguments[0].id = attrs.id.replace("/cms/pages/", "");
        }
        Backbone.Model.prototype.set.apply(this, arguments);
    },

    getLanguage: function() {
        if (!this.id) {
            return null;
        }
        var urlParts = this.id.split("/");
        return _.first(urlParts);
    },
    url: function() {
        return Routing.generate('concerto_cms_core_pages_rest_get', {path: this.id});
    },
    toJSON: function() {
        var data = Backbone.Model.prototype.toJSON.apply(this, arguments);
        data.language = this.getLanguage();
        return data;
    }
});
