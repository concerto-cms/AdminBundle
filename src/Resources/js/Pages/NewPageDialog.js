var Marionette = require("backbone.marionette"),
    _ = require("underscore");

require("bootstrap/js/modal");
module.exports = Marionette.ItemView.extend({
    template: require("pages-newPageDialog.html.twig"),
    initialize: function(options) {
        _.extend(this, options);
        this.listenTo(this.model, "change:type", this.setActiveType);
    },
    behaviors: {
        DialogBehavior: {
            behaviorClass: require("../Utils/DialogBehavior")
        }
    },
    onRender: function() {
        this.setActiveType();
        this.stickit();
    },
    bindings: {
        '[name=slug]': 'slug',
        '[name=title]': 'title',
        '[name=parent]': 'parent'
    },
    events: {
        'click .page-types a': 'onClickPagetype',
        'submit form': 'onSubmit'
    },
    onClickPagetype: function(e) {
        var type = $(e.currentTarget).data("type");
        this.model.set('type', type);
        e.preventDefault();
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.save();
    },
    save: function() {
        var that = this,
            model = this.model.toJSON(),
            type = model.type,
            parent = model.parent;
        delete model.type;
        delete model.parent;

        window.dialogModel = model;
        $.ajax({
            type: 'POST',
            url: Routing.generate('concerto_cms_core_pages_rest_get', {path: parent}),
            data: JSON.stringify ({
                type: type,
                page: model
            }),
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function(data) {
            that.model.set(data);
            that.triggerMethod("hide");
            that.trigger("save", that.model);
        });


    },
    setActiveType: function() {
        var type = this.model.get('type'),
            el;

        try {
            el = this.$(".page-types [data-type=" + type + "]");
            el.addClass("active").siblings().removeClass("active");
        } catch (e) {
            this.$(".page-types a.active").removeClass("active");
        }
    }
});