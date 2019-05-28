var Spreadsheet = ItemBase.extend({
    templateName: "spreadsheet-template",
    constructor: function (title, numRows, numCols) {
        this.base(title);
        this.numRows = ko.observable(numRows);
        this.numCols = ko.observable(numCols);

        this.rows = ko.observableArray();

        this.columnNames = ko.computed(this._getColumnNames, this);
        this.addRow = this.addRow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        
        this.init();
    },
    init: function() {
        var rowIndex;
        
        for (rowIndex = 0; rowIndex < this.numRows() ; rowIndex++) {
            this.addRow();
        }
    },
    addRow: function () {
        var row = new Spreadsheet.Row();
        var cell;
        for (var i = 0; i < this.numCols() ; i++) {
            cell = new Spreadsheet.Cell();
            row.cells.push(cell);
        }
        this.rows.push(row);
    },
    addColumn: function () {
        var cell;
        _.each(this.rows(), function (row) {
            cell = new Spreadsheet.Cell();
            row.cells.push(cell);
        });
        this.numCols(this.numCols() + 1);
    },
    matchesTextFilter: function (textFilter) {
        var title = this.title() || '';
        var titleMatches = title.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        return titleMatches || this._anyCellMatchesTextFilter(textFilter);
    },
    toJSON: function() {
        var cleaned = this.base();
        
        delete cleaned.numRows;
        delete cleaned.numCols;
        delete cleaned.columnNames;

        return cleaned;
    },
    fromJSON: function (json) {
        this.base(json);

        this.numRows(json.rows.length);

        if (json.rows[0] !== undefined && json.rows[0].cells !== undefined) {
            this.numCols(json.rows[0].cells.length);
        }
        //clear out rows
        this.rows([]);

        _.each(json.rows, function (jsonRow) {
            var row = new Spreadsheet.Row();
            row.fromJSON(jsonRow);
            this.rows.push(row);
        }, this);
    },
    _getColumnNames: function () {
        var letters = [];
        var ACharCode = 'A'.charCodeAt(0);
        //Only works up to Z
        for (var i = ACharCode; i < ACharCode + this.numCols() ; i++) {
            letters.push(String.fromCharCode(i));
        }
        return letters;
    },
    _anyCellMatchesTextFilter: function (textFilter) {
        var anyRowMatches = _.any(this.rows(), function(row) {
            var anyCellMatches = _.any(row.cells(), function(cell) {
                var cellValue = cell.value() || '';
                return cellValue.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;
            });
            return anyCellMatches;
        });
        return anyRowMatches;
    }
}, {
    Row: Base.extend({
        constructor: function() {
            this.cells = ko.observableArray();
        },
        fromJSON: function (jsonRow) {
            _.each(jsonRow.cells, function(jsonCell) {
                var cell = new Spreadsheet.Cell();
                cell.value(jsonCell.value);
                this.cells.push(cell);
            }, this);
        }
    }),
    Cell: Base.extend({
        constructor: function () {
            this.value = ko.observable();
        }
    }),
});