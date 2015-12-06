var Marionette = require("backbone.marionette"),
    pagetypes = require("./Pagetypes"),
    _ = require("underscore"),
    PageModel = require("Model/Page");

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
            //require.ensure("./NewPageDialog", _.bind(function(require) {
                var NewPageDialog = require("./NewPageDialog");
                var model = new PageModel({
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
            //}, this));
        },

        getPages: function() {
            return this.collection.getByLanguage(this.language);
        }
});
