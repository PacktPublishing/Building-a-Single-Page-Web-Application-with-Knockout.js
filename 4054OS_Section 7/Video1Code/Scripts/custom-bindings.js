ko.bindingHandlers.slideUpdate = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        //use unwrapObservable because we don't know whether or not the object passed in will be an observable
        var visible = ko.utils.unwrapObservable(valueAccessor());

        var $element = $(element);
        
        //Replace the element with a clone
        var $clone = $element.clone();
        $clone.insertAfter($element);
        $element.hide();
        
        //Animate hiding the clone
        $clone.slideUp('slow', function () {
            //Remove after it's hidden to prevent memory leak
            $clone.remove();
        });
        
        //If it's visible, animate showing the newly bound element
        if (visible) {
            $element.slideDown('slow');
        }
    }
};

