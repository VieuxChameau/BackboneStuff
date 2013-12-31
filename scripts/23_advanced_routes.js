var AppRouter = new (Backbone.Router.extend({
    routes: {
        "appointments/:id": "show",
        "appointments/p:page(/pp:per_page)(/)": "page", // () stand for optionnal params
        '*path': 'notFound' // should be the last
    },
    initialize: function() {
        this.route(/^appointments\/(\d+)$/, 'show'); // manual route creation
    },
    page: function(page, per_page) {
        var decodedPage = decodeURIComponent(page); // decodeURIComponent from js core
        var decodedPerPage = decodeURIComponent(per_page);
        this.appointments.fetch({data: {page: decodedPage, per_page: decodedPerPage}});
    },
    show: function(id) {
        var appointment = new Appointment({id: id});
        console.log(appointment);
    },
    notFound: function() {
        console.log('No route match');
    }
}));