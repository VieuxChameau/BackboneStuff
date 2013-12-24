var Appointment = Backbone.Model.extend({
    urlRoot: '/appointments',
    defaults: function() {
        return {
            title: 'Checkup',
            date: new Date()};
    }
});


var appointment = new Appointment({id : 1});

appointment.fetch(); // will retrive from server GET /appointments/1

appointment.set({cancelled : true});
appointment.save(); // will sync with server PUT /appointments/1

appointment.on('change', function(){
    alert('A property in the appointment changed');
});

appointment.set({cancelled : true}, {silent : true}); // Will not trigger any event

appointment.on('change:cancelled', function(){
    alert('The property cancelled in the appointment changed');
});

console.log(appointment.toJSON());