var Survey = Base.extend({
    templateName: "survey-template",
    constructor: function (title) {
        this.title = ko.observable(title);
        this.questions = ko.observableArray();
        
        this.createTextBoxQuestion = this.createTextBoxQuestion.bind(this);
        this.createCheckBoxQuestion = this.createCheckBoxQuestion.bind(this);
        this.matchesTextFilter = this.matchesTextFilter.bind(this);
    },
    createTextBoxQuestion: function () {
        this.questions.push(new Survey.TextBoxQuestion('[New Text Question]'));
    },
    createCheckBoxQuestion: function () {
        this.questions.push(new Survey.CheckBoxQuestion('[New Checkbox Question]'));
    },
    matchesTextFilter: function (textFilter) {
        var title = this.title() || '';
        var titleMatches = title.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var anyQuestionsMatch = _.any(this.questions(), function(question) {
            return this._questionMatchesTextFilter(question, textFilter);
        }, this);

        return titleMatches || anyQuestionsMatch;
    },
    _questionMatchesTextFilter: function (question, textFilter) {
        var questionText = question.questionText() || '';
        var questionTextMatches = questionText.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var optionsMatch = false;
        if (question.options !== undefined) {
            optionsMatch = _.any(question.options(), function (option) {
                var optionText = option.optionText() || '';
                return optionText.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;
            });
        }
            
        return questionTextMatches || optionsMatch;
    }
}, {
    TextBoxQuestion: Base.extend({
        templateName: "survey-textbox-template",
        constructor: function (questionText) {
            this.questionText = ko.observable(questionText);
        },
    }),
    CheckBoxQuestion: Base.extend({
        templateName: "survey-checkbox-template",
        constructor: function (questionText) {
            this.questionText = ko.observable(questionText);
            this.options = ko.observableArray();

            this.addOption = this.addOption.bind(this);
        },
        addOption: function () {
            this.options.push(new Survey.MulipleChoiceOption());
        }
    }),
MulipleChoiceOption: Base.extend({
    constructor: function (optionText) {
        this.optionText = ko.observable(optionText);
    }
})
});