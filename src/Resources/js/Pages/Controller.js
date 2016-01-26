var _ = require("underscore"),
    Marionette = require("backbone.marionette"),
    Pagetypes = require("./Pagetypes"),
    ListView = require("./ListView");

var Controller = Marionette.Object.extend({
    initialize: function(options){
        _.extend(this, options);

    },
    index: function() {
        this.app.router.navigate("list/" + this.app.languages.first().id, {trigger: true});
    },
    list: function(lang) {
        var view = new ListView({
            collection: this.app.pages,
            languages: this.app.languages,
            language: lang
        });
        this.setView(view);
    },
    edit: function(path) {
        var page = this.app.pages.get(path),
            view = Pagetypes.createView(page);

        this.listenTo(view, "save", _.bind(function() {
            page.save();
            this.router.navigate("list/" + page.getLanguage(), {trigger: true});
        }, this));
        this.setView(view);

    },
    setView: function(view) {
        this.app.container.show(view);
    }

});

module.exports = Controller;