var Marionette = require("backbone.marionette");

module.exports = Marionette.ItemView.extend({
    tagName: "form",
    template: require("pages-simplePageView.html.twig"),
    initialize: function(options) {
        this.originalModel = options.model;
        this.model = options.model.clone();
        _.extend(this, options);
    },
    onAttach: function() {
        var editor;
        editor = this.$("[name=content]").ckeditor({
            customConfig: ''
        }).data("ckeditorInstance");
        editor.on( 'change', _.bind(function(e) {
            this.$("[name=content]").trigger("change");
        }, this));

        this.stickit();
    },
    onRender: function() {

    },
    events: {
        "submit": "onSubmit"
    },
    bindings: {
        "[name=title]": "title",
        "[name=content]": "content",
        "[name=meta_description]": "metaDescription"
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
