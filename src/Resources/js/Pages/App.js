var Backbone = require("expose?Backbone!backbone"),
    Marionette = require("backbone.marionette"),
    _ = require("expose?_!underscore"),
    $ = require("expose?jQuery!jquery"),
    Routing = global.Routing,
    Controller = require("./Controller"),
    Router = require("./Router"),
    LanguagesCollection = require("Collection/Languages"),
    PagesCollection = require("Collection/Pages");

module.exports = Marionette.Application.extend({
    initialize: function() {
        this.container = new Marionette.Region({
            el: "#pages-container"
        });

        this.controller = new Controller({
            app: this
        });
        this.router = new Router({
            controller: this.controller
        });
        this.pagetypes = require("./Pagetypes");
    },
    onStart: function() {
        $.when(this.loadLanguages(), this.loadPages())
            .done(_.bind(function() {
                Backbone.history.start();
            }, this));
    },
    loadLanguages: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_languages_rest"))
            .done(function(data) {
                that.languages = new LanguagesCollection(_.values(data));
            });
    },
    loadPages: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_pages_rest"))
            .done(function(data) {
                that.pages = new PagesCollection(data);
            });

    }

});