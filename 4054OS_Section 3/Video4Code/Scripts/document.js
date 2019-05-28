var Document = Base.extend({
    constructor: function (title, body) {
        this.title = ko.observable(title);
        this.body = ko.observable(body);
    }
});