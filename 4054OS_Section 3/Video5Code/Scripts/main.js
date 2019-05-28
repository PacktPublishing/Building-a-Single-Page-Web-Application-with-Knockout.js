//JQuery on load
$(function () {
    
    var viewModel = new KnockoutDocs();
    viewModel.addItem(new Document("hello", "world"));
    viewModel.addItem(new Document("goodbye", "world"));

    ko.applyBindings(viewModel);
});