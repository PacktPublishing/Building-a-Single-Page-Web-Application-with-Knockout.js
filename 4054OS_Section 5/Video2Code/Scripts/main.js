//JQuery on load
$(function () {
    ko.observable['fn'].equalityComparer = function(a, b) {
        return a === b;
    };
    var viewModel = new KnockoutDocs();
    viewModel.addItem(new Document("hello", "world"));
    viewModel.addItem(new Document("goodbye", "world"));
    viewModel.addItem(new Spreadsheet("Spreadsheet", 5, 5));

    ko.applyBindings(viewModel);
});