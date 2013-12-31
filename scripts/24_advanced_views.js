var Appointment = Backbone.Model.extend({});

var AppointmentView = Backbone.View.extend({
    template: _.template("<span><%= model.escape('title') %></span>"), // escape avoid xss
    initialize: function() {
        this.model.on('change:title', this.changedTitle, this);
        this.listenTo(this.model, 'change:title', this.render);
    },
    render: function() {
        this.$el.html(this.template({model: this.model}));
    },
    changedTitle: function(model, value, options) {
        this.$('span').html(value);
        if (options.highlight !== false) {
            this.$el.effect('highlight', {}, 1000);
        }
    }
});

var Appointments = Backbone.Collection.extend({
    model: Appointment
});

var AppointmentsView = Backbone.View.extend({
    initialize: function(options) {
        this.doctor = options.doctor;
        this.collection = options.appointments;
    },
    render: function() {
        var _this = this;
        this.collection.forEach(function(model) {
            return _this.$el.append("<h2>" + (model.get('title')) + "</h2><em>" + (model.get('name')) + "</em>");
        });
        return this;
    }
});

var appointments = new Appointments([
    {
        title: "Toothache",
        name: "Eric"
    }, {
        title: "Regular Checkup",
        name: "Gregg"
    }
]);

var appointmentsView = new AppointmentsView({collection: appointments, el: $('#app')}); // so el will point to the existing
appointmentsView.render();


var drGoodparts = new Doctor({name: "Dr. Goodparts"});
new AppointmentsView({doctor: drGoodparts});
new AppointmentsView({collection: appointments, doctor: drGoodparts});


var appointment = new Appointment({title: "Toothache"});
var appView = new AppointmentView({model: appointment});
appointment.set({title: "General Cleaning"}, {highlight: false});