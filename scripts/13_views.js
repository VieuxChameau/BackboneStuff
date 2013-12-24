var AppointmentView = Backbone.View.extend({
    tagName: 'li',
    className: 'appointment',
    render: function() {
        this.$el.html('<li>' + this.model.get('title') + '</li>');
    },
    template: _.template('<span><%= title %></span>'),
    render: function() { // the same with underscore template
        var attributes = this.model.toJSON();
        this.$el.html(this.template(attributes));
    },
            events: {
                "click span": "alertTitle",
                "dblclick" : "alertTitle"
            },
    alertTitle: function() {
        alert(this.model.get('title'));
    }
});