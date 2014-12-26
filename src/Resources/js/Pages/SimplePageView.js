var Pages = Pages || {};
Pages.SimplePageView = Backbone.View.extend({
    tagName: "form",
    initialize: function(options) {
        this.originalModel = options.model;
        this.model = options.model.clone();
        _.extend(this, options);
    },
    render: function() {
        var content = window.JST["pages-simplePageView.html.twig"].render(this);
        this.$el.html(content);
        this.stickit();
    },
    events: {
        "submit": "onSubmit"
    },
    bindings: {
        "[name=title]": "title",
        "[name=content]": "content",
        "[name=meta_description]": "meta_description"
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.save();
    },
    save: function() {
        this.originalModel.set(this.model.attributes);
        this.originalModel.trigger("save");
    }
});
