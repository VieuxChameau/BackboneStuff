var Appointment = Backbone.Model.extend({});
var appointment = new Appointment();
appointment.set('title', 'My knee hurts');

var AppointmentView = Backbone.View.extend({
  render: function(){
    $(this.el).html('<li>' + this.model.get('title') + '</li>');
  }
});

var appointmentView = new AppointmentView({model: appointment});

appointmentView.render(); 
$('#app').html(appointmentView.el);