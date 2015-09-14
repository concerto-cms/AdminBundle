var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    Router = require("./Router"),
    PagesCollection = require("Collection/Pages"),
    LanguagesCollection = require("Collection/Languages"),
    PagesListView = require("Pages/ListView"),
    pagetypes = require("Pages/Pagetypes"),
    Routing = global.Routing;

var Application = Marionette.Application.extend({
    initialize: function() {
        this.router = new Router();
        this.listenTo(this.router, "route:index", this.indexAction);
        this.listenTo(this.router, "route:list", this.listAction);
        this.listenTo(this.router, "route:edit", this.editAction);
        this.el = document.getElementById("pages-container");
        this.pagetypes = pagetypes;
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
            })

    },
    indexAction: function() {
        this.router.navigate("list/" + this.languages.first().id, {trigger: true});
    },
    listAction: function(lang) {
        var view = new PagesListView({
            collection: this.pages,
            languages: this.languages,
            language: lang
        });
        this.setView(view);
    },
    editAction: function(path) {
        var page = this.pages.get(path),
            view = PagesPagetypes.createView(page);

        this.listenTo(view, "save", function() {
            page.save();
            this.router.navigate("list/" + page.getLanguage(), {trigger: true});
        });
        this.setView(view);

    },
    setView: function(view) {
        if (this.view) {
            this.stopListening(this.view);
            this.view.remove();
        }
        this.view = view;
        $(this.el).html("");
        view.$el.appendTo(this.el);
        view.render();
    }

});

module.exports = new Application();
