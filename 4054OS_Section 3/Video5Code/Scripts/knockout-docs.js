var KnockoutDocs = Base.extend({
    constructor: function () {
        this.items = ko.observableArray();
        this.selectedItem = ko.observable();
        
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
    },
    addItem: function(item) {
        this.items.push(item);
        this.selectedItem(item);
    },
    editItem: function (item) {
        this.selectedItem(item);
    }
});