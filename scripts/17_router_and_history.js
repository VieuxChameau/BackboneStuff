var Appointment = Backbone.Model.extend({
    defaults: function() {
        return {
            'date': new Date(),
            'cancelled': false,
            'title': 'Checkup'
        };
    }
});

var AppointmentList = Backbone.Collection.extend({
    model: Appointment
});

var AppointmentView = Backbone.View.extend({
    template: _.template('<span class="<% if(cancelled) print("cancelled") %>"><%= title %></span><a href="#">x</a>'),
    initialize: function() {
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppointmentListView = Backbone.View.extend({
    initialize: function() {
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.render, this);
    },
    render: function() {
        this.collection.forEach(this.addOne, this);
    },
    addOne: function(model) {
        var appointmentView = new AppointmentView({model: model});
        appointmentView.render();
        this.$el.append(appointmentView.el);
    }
});

var AppRouter = new (Backbone.Router.extend({
    routes: {"appointments/:id": "show", "": "index"},
    initialize: function(options) {
        this.appointmentList = new AppointmentList();
    },
    index: function() {
        var appointmentsView = new AppointmentListView({collection: this.appointmentList});
        appointmentsView.render();
        $('#app').html(appointmentsView.el);
        this.appointmentList.fetch();
    },
    show: function(id) {
        var appointment = new Appointment({id: id});
        var appointmentView = new AppointmentView({model: appointment});
        appointmentView.render();
        $('#app').html(appointmentView.el);
        appointment.fetch();
    },
    start: function() {
        Backbone.history.start({pushState: true});
    }
}));



Backbone.history.start({pushState: true});

var router = new AppRouter();
router.navigate("appointments/1", {trigger: true});

$(document).ready(function() {
    AppRouter.start();
});