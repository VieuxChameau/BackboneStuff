var Appointment = Backbone.Model.extend({
    idAttribute: "identifier", // Mapping json attribute identifier to be the id in the model
    parse: function(response) {
        var appointment = response.appointment;
        appointment.cancelled = response.appointment.cankelled;
        delete appointment.cankelled;
        return appointment;
    },
    toJSON: function() {
        var attrs = _.clone(this.attributes);
        attrs.cankelled = attrs.cancelled;
        return {appointment: _.omit(attrs, 'cancelled')};
    }
});


var data = {"appointment": {"title": "Ms. Kitty Hairball Treatment", "cankelled": false, "identifier": 1}};
var appointment = new Appointment(data, {parse: true}); // force to use the parse function to bind


var AppointmentView = Backbone.View.extend({
    template: _.template('<span>' +
            '<%= title %></span>' +
            '<a href="#">x</a>'),
    render: function() {
        this.$el.html(this.template(this.model.attributes)); // no more toJSON() because the template will not match
    }
});