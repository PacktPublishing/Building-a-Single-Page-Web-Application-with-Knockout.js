var Spreadsheet = Base.extend({
    templateName: "spreadsheet-template",
    constructor: function (title, numRows, numCols) {
        this.title = ko.observable(title);
        this.numRows = ko.observable(numRows);
        this.numCols = ko.observable(numCols);

        this.rows = ko.observableArray();
    },
    init: function() {
        var row;
        var cell;
        var rowIndex;
        var colIndex;
        
        for (rowIndex = 0; rowIndex < this.numRows() ; rowIndex++) {
            row = { cells: ko.observableArray };
            for (colIndex = 0; colIndex < this.numCols(); colIndex++) {
                cell = { value: ko.observable() };
                row.push(cell);
            }
            this.rows.push(row);
        }
    }
});