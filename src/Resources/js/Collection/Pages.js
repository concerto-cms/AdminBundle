var Collection = Collection || {};
Collection.Pages = Backbone.Collection.extend({
    model: Model.Page,
    comparator: 'id',
    getByLanguage: function(lang) {
        return this.filter(function(model) {
            return model.getLanguage() == lang;
        })
    }
});
