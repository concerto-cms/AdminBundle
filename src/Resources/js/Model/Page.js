var Model = Model || {};
Model.Page = Backbone.Model.extend({
    constructor: function(attrs, options) {
        if (typeof attrs == "object" && attrs.id) {
            attrs.id = attrs.id.replace("/cms/pages/", "");
        }
        Backbone.Model.apply(this, arguments);
    },
    getLanguage: function() {
        var urlParts = this.id.split("/");
        return _.first(urlParts);
    }

});
