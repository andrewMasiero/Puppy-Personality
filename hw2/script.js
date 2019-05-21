"use strict";

var $ = function(id) {
    return document.getElementById(id);
}
var allChoices = [];
var results = {
    "one": "",
    "two": "",
    "three": ""
};
var quizComplete = false;
var result = "";

var makeChoice = function(){
    if (!quizComplete) {
        var gridChoices = this.parentElement.getElementsByTagName('div');
        var choice = this.getElementsByClassName('checkbox');
        choice = choice[0];

        // FUNCTION TO EXECUTE
        checkBox(gridChoices, choice);
        storeResult(choice);
        evaluateChoices();
    }
};

var checkBox = function(gridChoices, choice) {
    var box;
    for (var i = 0; i < gridChoices.length; i++) {
        box = gridChoices[i].getElementsByClassName('checkbox');
        box[0].parentElement.setAttribute("class", "faded");
        if (box[0].getAttribute('src') === "images/checked.png") {
            box[0].setAttribute('src', "images/unchecked.png");
        }
    }
    choice.setAttribute('src', "images/checked.png");
    choice.parentElement.setAttribute("class", "selected");
};

var storeResult = function(choice) {
    choice = choice.parentElement;
    var choiceID = choice.dataset.choiceId;
    var questionID = choice.dataset.questionId;
    results[questionID] = choiceID;
};

var evaluateChoices = function() {
    if (!(results.one === "" || results.two === "" || results.three === "")) {
        quizComplete = true;
        if (results.two === results.three) {
            result = results.two;
        } else {
            result = results.one;
        }
        displayResults();
    }
};

var displayResults = function() {
    var display = $("results-display").children;
    display[0].firstChild.nodeValue = RESULTS_MAP[result].title;
    display[1].firstChild.nodeValue = RESULTS_MAP[result].contents;
    
    display = $("results-display");
    display.removeAttribute("class");
};

var resetQuiz = function() {
    for (var i = 0; i < allChoices.length; i++) {
        allChoices[i].removeAttribute("class");
        var box = allChoices[i].getElementsByClassName("checkbox");
        box[0].src = "images/unchecked.png";
    }
    $("results-display").setAttribute("class", "hidden");
    results = {
        "one": "",
        "two": "",
        "three": ""
    };
    quizComplete = false;
    result = "";
};

window.onload = function() {
    var choiceGrid = document.getElementsByClassName("choice-grid");
    var gridChoices;
    var resetQuizButton = $("restart");
    resetQuizButton.onclick = resetQuiz;

    for (var i = 0; i < choiceGrid.length; i++) {
        gridChoices = choiceGrid[i].getElementsByTagName('div');
    
        for (var j = 0; j < gridChoices.length; j++) {
            allChoices[allChoices.length] = gridChoices[j];
        }
        
    }
    
    for (i = 0; i < allChoices.length; i++) {
        allChoices[i].onclick = makeChoice;
    }
};