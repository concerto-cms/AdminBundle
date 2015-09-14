var Backbone = require("backbone");

module.exports = Backbone.Collection.extend({
    model: require("Model/Menu"),

    getMenu: function(name, language) {
        return this.get(name + "/" + language);
    }
});