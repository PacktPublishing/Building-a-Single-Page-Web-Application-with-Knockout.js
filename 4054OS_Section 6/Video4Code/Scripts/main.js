//JQuery on load
$(function () {
    ko.observable['fn'].equalityComparer = function(a, b) {
        return a === b;
    };
    var viewModel = new KnockoutDocs();

    ko.applyBindings(viewModel);
});