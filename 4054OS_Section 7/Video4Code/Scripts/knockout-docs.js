var KnockoutDocs = Base.extend({
    constructor: function () {
        this.items = ko.observableArray();
        this.selectedItem = ko.observable();

        this.filter = new Filter();

        this.createDocument = this.createDocument.bind(this);
        this.createSpreadsheet = this.createSpreadsheet.bind(this);
        this.createSurvey = this.createSurvey.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);

        this.initAutoSave();
    },
    initAutoSave: function () {
        //Using a computed for side-effects of auto-saving.
        ko.computed(this.save, this).extend({ throttle: 500 });
    },
    save: function () {
        //This creates a deep-dependency chain on all items because it has to evaluate every observable.
        var json = ko.toJSON(this.items);

        $.ajax({
            url: '', //Fill in with actual save url
            data: json,
            type: 'GET' //In a real application should be POST
        }).success(function (data) {
            //Do something with the result.  Possibly update a last-saved date
            console.log("Successfully saved: " + json);
        }).error(function(jqXHR, textStatus, errorThrown) {
            alert("Add error handling");
        });
    },
    createDocument: function() {
        this.addItem(new Document('[New Document]', ''));
    },
    createSpreadsheet: function() {
        this.addItem(new Spreadsheet('[New Spreadsheet]', 5, 3));
    },
    createSurvey: function() {
        this.addItem(new Survey('[New Survey]'));
    },
    addItem: function(item) {
        this.items.push(item);
        this.selectedItem(item);
    },
    editItem: function (item) {
        this.selectedItem(item);
    }
});