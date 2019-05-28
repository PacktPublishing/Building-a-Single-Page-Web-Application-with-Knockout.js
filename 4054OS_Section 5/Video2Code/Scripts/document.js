var Document = Base.extend({
    templateName: "document-template",
    constructor: function (title, body) {
        this.title = ko.observable(title);
        this.body = ko.observable(body);
    }
});