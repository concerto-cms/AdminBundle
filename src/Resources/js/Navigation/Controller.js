var Navigation = Navigation || {};
Navigation.Controller = function Navigation_Controller(options) {
    _.extend(this, options);
    $.when(this.loadLanguages(), this.loadMenus(), this.loadPages())
    .done(_.bind(function() {
            this.router = new Navigation.Router();
            this.listenTo(this.router, "route:index", this.indexAction);
            this.listenTo(this.router, "route:list", this.listAction);
            Backbone.history.start();
    }, this));


};
_.extend(Navigation.Controller.prototype, Backbone.Events);
_.extend(Navigation.Controller.prototype, {
    loadLanguages: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_languages_rest"))
            .done(function(data) {
                that.languages = new Collection.Languages(_.values(data));
            });
    },
    loadPages: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_pages_rest"))
            .done(function(data) {
                that.pages = new Collection.Pages(data);
            })

    },
    loadMenus: function() {
        var that = this;
        return $.getJSON(Routing.generate("concerto_cms_core_navigation_rest"))
            .done(function(data) {
                that.menus = new Collection.Menus(data);
            })

    },
    indexAction: function() {
        var menu = this.menus.first().get('name'),
            language = this.languages.first().id;
        this.router.navigate([menu, language].join('/'), {trigger: true});
    },
    listAction: function(menu, lang) {
        var view = new Navigation.ListView({
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

