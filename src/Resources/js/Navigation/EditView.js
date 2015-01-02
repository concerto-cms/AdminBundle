var Navigation = Navigation || {};
Navigation.EditView = Backbone.View.extend({
    tagName: 'form',
    initialize: function(options) {
        _.extend(this, options);
    },
    events: {
        'submit': 'onSubmit'
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.save();
    },
    save: function() {
        this.trigger("save");
    },
    bindings: {
        '[name=label]': 'label',
        '[name=uri]': 'uri'
    },
    render: function() {
        var content = window.JST["navigation-editView.html.twig"].render(this);
        this.$el.html(content);
        this.stickit();
    }
});
