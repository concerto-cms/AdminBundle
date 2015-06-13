var Pages = Pages || {};
Pages.ListView = Backbone.View.extend({
    initialize: function(options) {
        _.extend(this, options);
    },
    render: function() {
        var pages = this.getPages(),
            content = window.JST["pages-listView.html.twig"].render({
            pages: pages,
            types: Pages.Pagetypes.types.pluck("id")

            });
        this.$el.html(content);
    },
    events: {
        "click .add-page": "addPage"
    },
    addPage: function() {
        var model = new Model.Page({
                parent: this.collection.first().get('id')
            }),
            dialog = new Pages.NewPageDialog({
                pages: this.getPages(),
                types: Pages.Pagetypes.getTypes(),
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
