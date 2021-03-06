﻿var Spreadsheet = Base.extend({
    templateName: "spreadsheet-template",
    constructor: function (title, numRows, numCols) {
        this.title = ko.observable(title);
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
    _getColumnNames: function () {
        var letters = [];
        var ACharCode = 'A'.charCodeAt(0);
        //Only works up to Z
        for (var i = ACharCode; i < ACharCode + this.numCols() ; i++) {
            letters.push(String.fromCharCode(i));
        }
        return letters;
    }
}, {
    Row: Base.extend({
        constructor: function() {
            this.cells = ko.observableArray();
        }
    }),
    Cell: Base.extend({
        constructor: function () {
            this.value = ko.observable();
        }
    }),
});