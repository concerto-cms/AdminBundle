var Pages = Pages || {};
Pages.ListView = Backbone.View.extend({
    initialize: function(options) {
        _.extend(this, options);
    },
    render: function() {
        var content = window.JST["pages-listView.html.twig"].render({
            pages: this.collection
        });
        this.$el.html(content);
    },
    events: {
        "click .add-page": "addPage"
    },
    addPage: function() {

    }
});
