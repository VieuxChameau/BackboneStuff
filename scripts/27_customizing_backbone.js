App.Models.Appointment = Backbone.Model.extend({
    sync: function(method, model, options) {
        if (method == "read" || method == "create") {
            Backbone.sync(method, model, options);
        }
    }
});

var appointment = new App.Models.Appointment({title: "Foo", possibleDates: [
        {day: "Friday", time: "3:00pm"}, {day: "Tuesday", time: "9:00am"}
    ]
});

var appointmentView = App.Views.Appointment({model: appointment});

var AppointmentForm = Backbone.View.extend({
    underscore_template: _.template('<form>' + '<input name = "title" type = "text" value = "<%= title %>" / > ' +
            '<input name="name" type="text" value="<%= name %>" /></form>'),
    template: Mustache.compile('<form>' + '<input name="title" type="text" value="{{ title }}" />' +
            '<input name="name" type="text" value="{{ name }}" /></form>'),
    underscore_template_one: _.template('<h2><%= title %></h2>' +
            'Possible Dates: <ul><% _.each(possibleDates, function(date) { %>' +
            '<li><%= date %></li>' +
            '<% }); %></ul>'),
    template_one: Mustache.compile('<h2>{{ title }}</h2>' +
            'Possible Dates: <ul>{{#possibleDates}}' +
            '<li><{{ . }}</li>' +
            '{{/possibleDates}}</ul>'),
    template_two: Mustache.compile('<h2>{{ title }}</h2>' +
            'Possible Dates: <ul>{{#possibleDates}}' +
            '<li>{{day}} at {{time}}</li>' +
            '{{/possibleDates}}</ul>'),
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});



App.Models.AppointmentLocalStorage = Backbone.Model.extend({
    sync: function(method, model, options) {
        options = options || {};

        switch (method) {
            case 'delete':
                var key = "Appointment-" + model.id;
                localStorage.removeItem(key);
                break;
            case 'update':
                var key = "Appointment-" + model.id;
                localStorage.setItem(key, JSON.stringify(model));
                break;
            case 'create':
                var key = "Appointment-" + model.id;
                localStorage.setItem(key, JSON.stringify(model));
                break;
            case 'read':
                var key = "Appointment-" + model.id;
                var result = localStorage.getItem(key);
                if (result) {
                    result = JSON.parse(result);
                    options.success && options.success(result);
                } else if (options.error) {
                    options.error("Couldn't find Appointment with id=" + model.id);
                }
                break;
        }
    }
});

