var Navigation = Navigation || {};
Navigation.ListView = Backbone.View.extend({
    initialize: function(options) {
        _.extend(this, options);
    },
    render: function() {
        var menu = this.collection.getMenu(this.menu, this.language),
            content = window.JST["navigation-listView.html.twig"].render({
            menu: this.collection.get(this.menu),   // main-menu
            languages: this.languages.toJSON(),
            lang: this.language,
            root: menu                              // main-menu/en
        });
        this.$el.html(content);
    },
    events: {
        "click .list-group a.item-add": "addMenu",
        "click .list-group a.item-edit": "editMenu"
    },
    editMenu: function(e) {
        var id = $(e.currentTarget).data("id"),
            collection = this.collection,
            model = collection.get(id),
            view;
        view = new Navigation.EditView({
            model: model,
            pages: this.pages.getByLanguage(this.language),
            listEl: e.currentTarget
        });
        this.setActive(e.currentTarget);
        this.setView(view);
        this.listenTo(view, "save", _.bind(function() {
            var that = this;
            model.save().done(function() {
                that.render();
            });
        }, this));
        this.listenTo(view, "delete", function() {
            view.remove();
            this.render();
        });
    },
    addMenu: function(e) {
        var parent = $(e.currentTarget).data("parent"),
            model,
            view,
            that = this;
        model = new Model.Menu({
            parent: parent
        });
        view = new Navigation.EditView({
            model: model,
            pages: this.pages.getByLanguage(this.language)
        });
        this.setActive(e.currentTarget);
        this.setView(view);
        this.listenTo(view, "save", _.bind(function() {
            var collection = this.collection;
            $.ajax({
                type: 'POST',
                url: Routing.generate('concerto_cms_core_navigation_rest', {path: parent}),
                data: JSON.stringify (model.toJSON()),
                contentType: "application/json",
                dataType: 'json'
            })
                .done(function(data) {
                    model.set(data);
                    collection.add(model);
                    that.render();
                });

        }, this));
    },
    setActive: function(el) {
        this.$('.list-group a.list-group-item.active').removeClass("active");
        $(el).addClass("active");
    },
    setView: function(view) {
        var container = this.$("#form-container");
        if (this.view) {
            this.stopListening(this.view);
            this.view.remove();
        }
        this.view = view;
        container.html("");
        view.$el.appendTo(container);
        view.render();
    }
});
