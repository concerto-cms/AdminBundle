var Collection = Collection || {};
Collection.Pages = Backbone.Collection.extend({
    model: Model.Page,
    getByLanguage: function(lang) {
        return this.filter(function(model) {
            return model.getLanguage() == lang;
        })
    }
});
