var Pages = Pages || {};
Pages.Controller = function Pages_Controller(options) {
    _.extend(this, options);
    $.when(this.loadLanguages(), this.loadPages())
    .done(_.bind(function() {
            this.router = new Pages.Router();
            this.listenTo(this.router, "route:index", this.indexAction);
            this.listenTo(this.router, "route:list", this.listAction);
            this.listenTo(this.router, "route:edit", this.editAction);
            Backbone.history.start();
    }, this));


};
_.extend(Pages.Controller.prototype, Backbone.Events);
_.extend(Pages.Controller.prototype, {
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
    indexAction: function() {
        this.router.navigate("list/" + this.languages.first().id, {trigger: true});
    },
    listAction: function(lang) {
        var view = new Pages.ListView({
                collection: this.pages,
                languages: this.languages,
                language: lang
            });
        this.setView(view);
    },
    editAction: function(path) {
        var page = this.pages.get(path),
            view = Pages.Pagetypes.createView(page);

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

