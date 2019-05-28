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

        this._loaded = false;
    },
    initAutoSave: function () {
        //Using a computed for side-effects of auto-saving.
        ko.computed(this.save, this).extend({ throttle: 500 });
    },
    save: function () {
        
        //This creates a deep-dependency chain on all items because it has to evaluate every observable.
        var json = ko.toJSON(this);

        //We don't want to save until data has been loaded from the server
        //This check comes after calling toJSON because we want to build the dependencies
        if (!this._loaded) {
            return;
        }

        $.ajax({
            url: 'save.ashx', //Fill in with actual save url
            data: { json: json },
            type: 'POST' //In a real application should be POST
        }).success(function (data) {
            //Do something with the result.  Possibly update a last-saved date
            console.log("Successfully saved: " + json);
        }).error(function(jqXHR, textStatus, errorThrown) {
            alert("Add error handling");
        });
    },
    load: function() {
        $.ajax({
            url: 'load.ashx',
            type: 'GET' 
        })
            .success(function(data) {
                this.fromJSON(data);
                this._loaded = true;
            }.bind(this))
            .error(function(jqXHR, textStatus, errorThrown) {
                alert("Add error handling");
            }.bind(this));
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
    },
    toJSON: function() {
        return {
            items: ko.toJS(this.items)
        };
    },
    fromJSON: function (json) {
        this.items([]);

        _.each(json.items, function (jsonItem) {
            var item;
            switch (jsonItem.type) {
                case 'document':
                    item = new Document();
                    break;
                case 'spreadsheet':
                    item = new Spreadsheet();
                    break;
                case 'survey':
                    item = new Survey();
                    break;
                default:
                    throw new Error('Unknown item type:' + jsonItem.type);
            }

            item.fromJSON(jsonItem);

            this.items.push(item);
        }, this);
    }
});