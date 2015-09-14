var Backbone = require("backbone"),
    app = require("Pages/app");
module.exports = Backbone.View.extend({
    initialize: function(options) {
        _.extend(this, options);
    },
    render: function() {
        var pages = this.getPages(),
            content = window.JST["pages-listView.html.twig"].render({
                pages: pages,
                languages: this.languages.toJSON(),
                lang: this.language,
                types: app.pagetypes.types.pluck("id")
            });
        this.$el.html(content);
    },
    events: {
        "click .add-page": "addPage"
    },
    addPage: function() {
        var model = new Model.Page({
                parent: this.getPages()[0].get('id')
            }),
            dialog = new Pages.NewPageDialog({
                pages: this.getPages(),
                types: app.pagetypes.getTypes(),
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
        window.dialog = dialog;
        dialog.render().open();
    },

    getPages: function() {
        return this.collection.getByLanguage(this.language);
    }
});
