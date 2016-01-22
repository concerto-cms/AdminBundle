var Backbone = require("backbone"),
    Routing = global.Routing,
    LanguagesCollection = require("Collection/Languages"),
    PagesCollection = require("Collection/Pages"),
    MenusCollection = require("Collection/Menus"),
    Router = require("./Router"),
    _ = require("underscore"),
    $ = require("jquery"),
    ListView = require("./ListView");

var Controller = function Navigation_Controller(options) {
    _.extend(this, options);
    $.when(this.loadLanguages(), this.loadMenus(), this.loadPages())
    .done(_.bind(function() {
            this.router = new Router();
            this.listenTo(this.router, "route:index", this.indexAction);
            this.listenTo(this.router, "route:list", this.listAction);
            Backbone.history.start();
    }, this));


};
_.extend(Controller.prototype, Backbone.Events);
_.extend(Controller.prototype, {
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
    loadMenus: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_navigation_rest"))
            .done(function(data) {
                that.menus = new MenusCollection(data);
            })

    },
    indexAction: function() {
        var menu = this.menus.first().get('name'),
            language = this.languages.first().id;
        this.router.navigate([menu, language].join('/'), {trigger: true});
    },
    listAction: function(menu, lang) {
        var view = new ListView({
                collection: this.menus,
                pages: this.pages,
                languages: this.languages,
                language: lang,
                menu: menu
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

module.exports = Controller;