var Appointment = Backbone.Model.extend({});


var AppointmentForm = Backbone.View.extend({
    template: _.template('<form><input name="title" type="text" value="<%= title %>" /><input name="name" type="text" value="<%= name %>" /></form>'),
    events:
            {submit: "save"},
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    save: function(e) {
        e.preventDefault(); // prevent the default browser behavior : submitting the form
        var newTitle = this.$('input[name=title]').val();
        var newName = this.$('input[name=name]').val();
        this.model.save({title: newTitle, name: newName}, {
            success: function() {
                Backbone.history.navigate('', {trigger: true});
            },
            error: function(model, xhr, options) {
                var errors = JSON.parse(xhr.responseText).errors;
                alert(errors);
            }
        });
    }
});

var appointment = new Appointment({name: "Eric Allam", title: "General Cleaning"});
var appointmentForm = new AppointmentForm({model: appointment});