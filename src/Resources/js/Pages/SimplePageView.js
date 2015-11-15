var Backbone = require("backbone");

module.exports = Backbone.View.extend({
    tagName: "form",
    initialize: function(options) {
        this.originalModel = options.model;
        this.model = options.model.clone();
        _.extend(this, options);
    },
    render: function() {
        var content = window.JST["pages-simplePageView.html.twig"].render(this),
            editor;
        this.$el.html(content);

        editor = this.$("[name=content]").ckeditor({
            customConfig: ''
        }).data("ckeditorInstance");
        editor.on( 'change', _.bind(function(e) {
            this.$("[name=content]").trigger("change");
        }, this));

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
        this.trigger("save");
    }
});
