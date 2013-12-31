var Appointments = Backbone.Collection.extend({
    parse: function(response) {
        this.per_page = response.per_page;
        this.total = response.total;
        this.page = response.page;
        return response.appointments;
    },
    // comparator: 'date'  Sort by ascending date
    comparator: function(firstApppointment, secondAppointment) { // reverse order
        return firstApppointment.get('date') < secondAppointment.get('date');
    },
    cancelledCount: function() { // Count the item of the collection that match cancelled = true
        return this.where({cancelled: true}).length;
    }
});


///appointments?since=2013-01-01&per_page=10

var appointments = new Appointments();
appointments.fetch({data: {since: "2013-01-01", per_page: 10}}); // Will add the since=2013-01-01&per_page=10 to the URL


var AppointmentListView = Backbone.View.extend({
    template: _.template('<a href="#/appointments/p<%= page %>/pp<%= per_page %>">View Next</a>'),
    initialize: function() {
        this.collection.on('reset', this.render, this);
    },
    render: function() {
        this.$el.empty();
        this.collection.forEach(this.addOne, this);

        this.$el.append(this.template({page: this.collection.page + 1, per_page: this.collection.per_page}));
    },
    addOne: function(model) {
        var appointmentView = new AppointmentView({model: model});
        appointmentView.render();
        this.$el.append(appointmentView.el);
    }
});


var AppRouter = new (Backbone.Router.extend({
    routes: {
        "": "index",
        "appointments/p:page/pp:per_page": "page"
    },
    initialize: function() {
        this.appointmentList = new AppointmentList();
    },
    index: function() {
        var appointmentsView = new AppointmentListView({collection: this.appointmentList});
        appointmentsView.render();
        $('#app').html(appointmentsView.el);
        this.appointmentList.fetch();
    },
    page: function(page, perPage) {
        this.appointmentList.fetch({data: {page: page, per_page: perPage}});
    }
}));