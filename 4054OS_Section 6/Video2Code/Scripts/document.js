var Document = Base.extend({
    templateName: "document-template",
    constructor: function (title, body) {
        this.title = ko.observable(title);
        this.body = ko.observable(body);
    },
    matchesTextFilter: function (textFilter) {
        var title = this.title() || '';
        var titleMatches = title.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var body = this.body() || '';
        var bodyMatches = body.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        return titleMatches || bodyMatches;
    }
});