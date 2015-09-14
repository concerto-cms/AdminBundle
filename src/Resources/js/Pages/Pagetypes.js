var Backbone = require("backbone");
module.exports = {
    types: new Backbone.Collection([], {
        model: Backbone.Model
    }),
    addType: function(name, attrs) {
        var model = new Backbone.Model(attrs);
        model.set('id', name);
        this.types.add(model);
    },
    getTypes: function() {
        return this.types.models;
    },
    createView: function(model) {
        var type = this.getType(model.get('type')),
            view;
        if (!type) {
            type = this.getType("simplepage");
        }
        view = type.get('view');
        return new view({
            model: model
        });
    },
    getType: function(name) {
        return this.types.get(name);
    }
};
