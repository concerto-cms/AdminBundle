var Backbone = require("backbone");
module.exports = Backbone.Collection.extend({
    model: require("Model/Page"),
    comparator: 'id',
    getByLanguage: function(lang) {
        return this.filter(function(model) {
            return model.getLanguage() == lang;
        })
    }
});
