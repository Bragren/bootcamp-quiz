

var questons = [
    {
        text: "Commonly uesed data types do NOT include: ",
        answer: "Booleans",
        options: ["Strings", "Alerts", "Booleans", "Numbers"]
    },
    {
        text: "The condition in if / else statement is enclosed with _________.",
        answer: "parenthesis",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"]
    },
   {
        text: "Arrays in Javascript can be used to store ___________.",
        answer: "all of the above",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"]
    },
    {
        text: "String values must be enclosed within __________ when being assigned to variables.",
        answer: "quotes",
        options: ["commas", "curly brackets", "quotes", "parenthesis"]
    },
    {
        text: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "console.log",
        options: ["Javascript", "terminal/bash", "for loops", "console.log"]
    }
];



var addQuestion = function () {
    var addQuestionName = function () {
        for (const i of questons) {
            console.log(i)
        }
    }
}

// if time is postive continue
// if time is negative stop quiz
// function to -1 every second