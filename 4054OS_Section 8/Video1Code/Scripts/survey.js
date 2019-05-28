var Survey = ItemBase.extend({
    templateName: "survey-template",
    constructor: function(title) {
        this.base(title);
        
        this.questions = ko.observableArray();
        this.isInEditMode = ko.observable(true);

        this.createTextBoxQuestion = this.createTextBoxQuestion.bind(this);
        this.createCheckBoxQuestion = this.createCheckBoxQuestion.bind(this);
        this.createRadioButtonQuestion = this.createRadioButtonQuestion.bind(this);
        this.createSelectListQuestion = this.createSelectListQuestion.bind(this);
        this.matchesTextFilter = this.matchesTextFilter.bind(this);
    },
    createTextBoxQuestion: function() {
        this.questions.push(new Survey.TextBoxQuestion('[New Text Question]'));
    },
    createCheckBoxQuestion: function() {
        this.questions.push(new Survey.CheckBoxQuestion('[New Checkbox Question]'));
    },
    createRadioButtonQuestion: function() {
        this.questions.push(new Survey.RadioButtonQuestion('[New Radio Button Question]'));
    },
    createSelectListQuestion: function () {
        this.questions.push(new Survey.SelectListQuestion('[New Select List Question]'));
    },
    matchesTextFilter: function(textFilter) {
        var title = this.title() || '';
        var titleMatches = title.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var anyQuestionsMatch = _.any(this.questions(), function(question) {
            return this._questionMatchesTextFilter(question, textFilter);
        }, this);

        return titleMatches || anyQuestionsMatch;
    },
    toJSON: function () {
        var cleaned = this.base();
        delete cleaned.isInEditMode;
        return cleaned;
    },
    _questionMatchesTextFilter: function(question, textFilter) {
        var questionText = question.questionText() || '';
        var questionTextMatches = questionText.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;

        var optionsMatch = false;
        if (question.options !== undefined) {
            optionsMatch = _.any(question.options(), function(option) {
                var optionText = option.optionText() || '';
                return optionText.toLowerCase().indexOf(textFilter.toLowerCase()) != -1;
            });
        }

        return questionTextMatches || optionsMatch;
    }
});

Survey.QuestionBase = Base.extend({
    constructor: function(questionText) {
        this.questionText = ko.observable(questionText);
    },
    toJSON: function() {
        var cleaned = ko.toJS(this);
        cleaned.type = this.templateName.replace('-template', '').replace('survey-', '');
        delete cleaned.templateName;

        return cleaned;
    }
});
Survey.TextBoxQuestion = Survey.QuestionBase.extend({
    templateName: "survey-textbox-template"
});

Survey.MulipleChoiceOption = Base.extend({
    constructor: function (optionText) {
        this.optionText = ko.observable(optionText);
    }
});

Survey.MultipleChoiceQuestionBase = Survey.QuestionBase.extend({
    constructor: function (questionText) {
        this.base(questionText);
        
        this.options = ko.observableArray();

        this.addOption = this.addOption.bind(this);
    },
    addOption: function() {
        this.options.push(new Survey.MulipleChoiceOption());
    }
});
Survey.CheckBoxQuestion = Survey.MultipleChoiceQuestionBase.extend({
    templateName: "survey-checkbox-template"
});
Survey.RadioButtonQuestion = Survey.MultipleChoiceQuestionBase.extend({
    templateName: "survey-radiobutton-template",
    constructor: function(questionText) {
        this.base(questionText);
        this.dummyRadioSelection = ko.observable();
    }
});
Survey.SelectListQuestion = Survey.MultipleChoiceQuestionBase.extend({
    templateName: "survey-selectlist-template"
});
