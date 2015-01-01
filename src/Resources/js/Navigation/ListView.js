var Navigation = Navigation || {};
Navigation.ListView = Backbone.View.extend({
    initialize: function(options) {
        _.extend(this, options);
    },
    render: function() {
        var menu = this.collection.getMenu(this.menu, this.language),
            content = window.JST["navigation-listView.html.twig"].render({
            menu: this.collection.get(this.menu),   // main-menu
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
            model = this.collection.get(id),
            view;
        view = new Navigation.EditView({
            model: model,
            pages: this.pages
        });
        this.setActive(e.currentTarget);
        this.setView(view);

    },
    addMenu: function(e) {
        var parent = $(el.currentTarget).data("parent"),
            model,
            view;
        model = new Model.Menu({
            parent: parent
        });
        view = new Navigation.AddPage({
            model: model,
            pages: this.pages
        });
        this.setActive(e.currentTarget);
        this.setView(view);
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
