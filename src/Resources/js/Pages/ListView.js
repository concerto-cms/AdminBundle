var Marionette = require("backbone.marionette"),
    pagetypes = require("./Pagetypes"),
    _ = require("underscore"),
    NewPageDialog = require("./NewPageDialog");

    module.exports = Marionette.ItemView.extend({
        template: require("pages-listView.html.twig"),
        initialize: function(options) {
            _.extend(this, options);
        },
        serializeData: function() {
            return {
                pages: this.getPages(),
                languages: this.languages.toJSON(),
                lang: this.language,
                types: pagetypes.types.pluck("id")
            }
        },
        events: {
            "click .add-page": "addPage"
        },
        addPage: function() {
            var model = new Model.Page({
                    parent: this.getPages()[0].get('id')
                }),
                dialog = new NewPageDialog({
                    pages: this.getPages(),
                    types: pagetypes.getTypes(),
                    model: model
                }),
                that = this;


            this.listenTo(dialog, "close", function() {
                this.stopListening(dialog);
                dialog.remove();
            });
            this.listenTo(dialog, "save", function(model) {
                that.collection.add(model);
                that.render();
                dialog.close();
            });
            dialog.render().open();
        },

        getPages: function() {
            return this.collection.getByLanguage(this.language);
        }
});
