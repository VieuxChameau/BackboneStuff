var Appointment = Backbone.Model.extend({
    cancel: function() {
        this.set({cancelled: true});
        this.save();
    }
});

var AppointmentView = Backbone.View.extend({
    template: _.template('<span class="<% if(cancelled) print("cancelled") %>">' +
            '<%= title %></span>' +
            '<a href="#">x</a>'),
    events: {"click a": "cancel"},
    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },
    cancel: function() {
        this.model.cancel();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    remove: function() {
        this.$el.remove();
    }
});