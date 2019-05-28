var Filter = Base.extend({
    constructor: function() {
        this.showDocuments = ko.observable(true);
        this.showSpreadsheets = ko.observable(true);
        this.showSurveys = ko.observable(true);
        this.textFilter = ko.observable();
    },
    itemMatchesFilter: function(item) {
        if (item instanceof Document && !this.showDocuments()) {
            return false;
        }
        if (item instanceof Spreadsheet && !this.showSpreadsheets()) {
            return false;
        }
        if (item instanceof Survey && !this.showSurveys()) {
            return false;
        }
        
        var textFilter = this.textFilter();

        if (!textFilter) {
            //No filter specified
            return true;
        }
        
        //matchesTextFilter is defined for each class.
        return item.matchesTextFilter(textFilter);
    }
});