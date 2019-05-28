//JQuery on load
$(function () {
    //TODO: Add code here
    var doc1 = {
        title: ko.observable("hello"),
        body: ko.observable("World")
    };

    var doc2 = {
        title: ko.observable("goodbye"),
        body: ko.observable("World")
    };

    var viewModel = {
        documents: ko.observableArray(),
        selectedItem: ko.observable(),
        editItem: function(doc) {
            viewModel.selectedItem(doc);
        }
    };
    

    viewModel.documents.push(doc1);
    viewModel.documents.push(doc2);

    ko.applyBindings(viewModel);
});