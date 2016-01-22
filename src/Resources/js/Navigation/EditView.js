var Backbone = require("backbone"),
    $ = require("jquery"),
    _ = require("underscore"),
    tpl = require("navigation-editView.html.twig");

module.exports = Backbone.View.extend({
    tagName: 'form',
    initialize: function(options) {
        _.extend(this, options);
        this.model = options.model;
    },
    events: {
        'submit': 'onSubmit',
        'click .move-up': 'moveUp',
        'click .move-down': 'moveDown',
        'click .delete': 'delete'
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
        var content = tpl(this);
        this.$el.html(content);
        if (!this.model.isNew()) {
            this.setOrderButtonsState();
        }
        this.stickit();
    },
    setOrderButtonsState: function() {
        var $el = $(this.listEl),
            $up = this.$(".move-up"),
            $down = this.$(".move-down");
        if ($el.next().next().hasClass("item-add")) {
            $down.attr("disabled", "disabled").addClass("disabled");
        } else {
            $down.removeAttr("disabled").removeClass("disabled");
        }
        if ($el.prev().length == 0) {
            $up.attr("disabled", "disabled").addClass("disabled");
        } else {
            $up.removeAttr("disabled").removeClass("disabled");
        }
    },
    moveUp: function() {
        var $el = $(this.listEl),
            target = $el.prev().prev(),
            prev = target.data("id"),
            options = $el.next();

        this.postReorder($(this.listEl).data("id"), prev);
        target.before(this.listEl).before(options);
        this.setOrderButtonsState();
    },
    moveDown: function() {
        var $el = $(this.listEl),
            target = $el.next().next().next().next(),
            next = target.data("id"),
            options = $el.next();

        this.postReorder($el.next().next().data("id"), $(this.listEl).data("id"));
        target.before(this.listEl).before(options);
        this.setOrderButtonsState();
    },
    postReorder: function(id, before) {
        $.ajax({
            type: 'PUT',
            url: Routing.generate('concerto_cms_core_navigation_rest', {path: id}),
            data: JSON.stringify ({
                orderBefore: before
            }),
            contentType: "application/json",
            dataType: 'json'
        });
    },
    delete: function() {
        this.model.destroy();
        this.trigger("delete");
    }
});
