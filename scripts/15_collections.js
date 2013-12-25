var Appointment = Backbone.Model.extend({});

var AppointmentList = Backbone.Collection.extend({
    url: "/appointments",
    model: Appointment
});

var appointments = new AppointmentList();
var json = [
    {title: 'Back pain'},
    {title: 'Dry mouth'},
    {title: 'Headache'}
];

appointments.reset(json);


appointments.fetch(); // retrieve data from server

appointments.on('reset', function() { // Will be trigger on reset and fetch
    alert(appointments.length);
});

appointments.fetch({silent: true}); // Will not trigger the previous callback

appointments.on('add', function(newAppointment) {
    console.log('New appoitment added : ' + newAppointment.get('title'));
});

var titles = appointments.map(function(appointment) {
    return appointment.get('title');
});


var titles = appointments.forEach(function(appointment) {
    console.log(appointment.get('title'));
});