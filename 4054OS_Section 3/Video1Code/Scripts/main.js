//JQuery on load
$(function () {
    //TODO: Add code here
    var doc = {
        title: ko.observable("hello"),
        body: ko.observable("World")
    };

    ko.applyBindings(doc);
});