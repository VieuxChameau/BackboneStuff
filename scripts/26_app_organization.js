var AppointmentApp = new (Backbone.View.extend({
    Collections: {},
    Models: {},
    Views: {},
    events: {
        "click a[data-backbone]": function(event) { // Will handle all the click on a that contains a data-backbone attribute
            event.preventDefault();
            Backbone.history.navigate(event.target.pathname, {trigger: true});
        }
    },
    start: function(data) {
        this.appointments = new AppointmentApp.Collections.Appointments(data.appointments);
        var appointmentsView = new AppointmentApp.Views.Appointments({collection: this.appointments});
        $('#app').html(appointmentsView.render().el);
    }
}))({el: document.body});

AppointmentApp.Models.Appointment = Backbone.Model.extend({});
AppointmentApp.Collections.Appointments = Backbone.Collection.extend({});
AppointmentApp.Views.Appointment = Backbone.View.extend({});
AppointmentApp.Views.Appointments = Backbone.View.extend({});
AppointmentApp.AppRouter = new (Backbone.Router.extend({}))();