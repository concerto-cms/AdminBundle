var Marionette = require("backbone.marionette");
require("bootstrap/js/modal");

module.exports = Marionette.Behavior.extend({
    initialize: function() {
        this.$el
            .addClass("modal fade")
            .attr({
                tabindex: "-1",
                role: "dialog"
            });
    },
    onShow: function() {
        this.view.render();
        this.$el.appendTo(document.body);
        this.$el.modal(this.options.modalOptions);
    },
    onHide: function() {
        this.$el.modal('hide');
    },
    defaults: {
        modalOptions: {}
    },
    events: {
        'hidden.bs.modal': 'onHidden'
    },
    onHidden: function() {
        this.view.triggerMethod("close");
        this.view.destroy();
    }
});