var Appointment = Backbone.Model.extend({});

var AppointmentList = Backbone.Collection.extend({
    model: Appointment,
    initialize: function() {
        this.on('remove', this.hideModel);
    },
    hideModel: function(model) {
        model.trigger('hide');
    }
});

var appointments = new AppointmentList();


var AppointmentView = Backbone.View.extend({
    initialize: function() {
        this.model.on('hide', this.remove, this);
    },
    remove: function() {
        this.$el.remove();
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
        var todoView = new AppointmentView({model: model});
        this.$el.append(todoView.render().el);
    }
});

var view = new AppointmentListView({collection: appointments});

$('#app').append(appointmentsView.render().el);