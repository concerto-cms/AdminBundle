var Pages = Pages || {};
Pages.NewPageDialog = Backbone.View.extend({
    className: "modal fade",
    initialize: function(options) {
        _.extend(this, options);
        this.$el.appendTo(document.body);
        this.listenTo(this.model, "change:type", this.setActiveType);
    },
    render: function() {
        var content = window.JST["pages-newPageDialog.html.twig"].render(this);
        this.$el.html(content);
        this.setActiveType();
        this.stickit();
        return this;
    },
    bindings: {
        '[name=slug]': 'slug',
        '[name=title]': 'title',
        '[name=parent]': 'parent'
    },
    events: {
        'hidden.bs.modal': 'onClose',
        'click .page-types a': 'onClickPagetype',
        'submit form': 'onSubmit'
    },
    open: function() {
        this.$el.modal("show");
    },
    close: function() {
        this.$el.modal("hide");
    },
    onClose: function() {
        this.trigger("close");
    },
    onClickPagetype: function(e) {
        var type = $(e.currentTarget).data("type");
        this.model.set('type', type);
        e.preventDefault();
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.save();
    },
    save: function() {
        var that = this,
            model = this.model,
            type = model.get('type'),
            parent = model.get('parent');
        model.unset('type');
        model.unset('parent');

        window.dialogModel = model;
        $.ajax({
            type: 'POST',
            url: Routing.generate('concerto_cms_core_pages_rest_get', {path: parent}),
            data: JSON.stringify ({
                type: type,
                page: model.toJSON()
            }),
            contentType: "application/json",
            dataType: 'json'
        })
        .done(function(data) {
            model.set(data);
            that.trigger("save", model);
        });


    },
    setActiveType: function() {
        var type = this.model.get('type'),
            el;

        try {
            el = this.$(".page-types [data-type=" + type + "]");
            el.addClass("active").siblings().removeClass("active");
        } catch (e) {
            this.$(".page-types a.active").removeClass("active");
        }
    }
});