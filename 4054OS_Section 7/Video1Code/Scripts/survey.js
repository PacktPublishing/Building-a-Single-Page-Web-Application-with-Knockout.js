var Survey = Base.extend({
    templateName: "survey-template",
    constructor: function (title) {
        this.title = ko.observable(title);
        this.questions = ko.observableArray();
        
        this.createTextBoxQuestion = this.createTextBoxQuestion.bind(this);
        this.matchesTextFilter = this.matchesTextFilter.bind(this);
    },
    createTextBoxQuestion: function () {
        this.questions.push(new Survey.TextBoxQuestion('[New Text Question]'));
    },
    matchesTextFilter: function (textFilter) {
        var title = this.title() || '';
        var titleMatches = title.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var anyQuestionsMatch = _.any(this.questions(), function (question) {
            var questionText = question.questionText() || '';
            var questionTextMatches = questionText.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

            return questionTextMatches;
        });

        return titleMatches || anyQuestionsMatch;
    }
}, {
    TextBoxQuestion: Base.extend({
        templateName: "survey-textbox-template",
        constructor: function (questionText) {
            this.questionText = ko.observable(questionText);
        },
    })
});