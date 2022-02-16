var start = document.getElementById("start");
var questionText = document.getElementById("question");
var firstOption = document.getElementById("A");
var secondOption = document.getElementById("B");
var thirdOption = document.getElementById("C");
var timerText = document.getElementById("timer");
var scoresUl = document.getElementById("high-scores");

var timer = 20;
var gameTimer = null;
var score = 0;

var savedScores = JSON.parse(localStorage.getItem("score")) || []

var questionArray = [
    {
        question: "Question",
        firstOption: "is it A?",
        secondOption: "or maybe B?",
        thirdOption: "could it be C?",
        correct: "",

    },{
        question: "Which of the following variables has the highest precedence??",
        firstOption: "Global variable",
        secondOption: "The local element",
        thirdOption: "They are equal",
        correct: "The local element",

    },{
        question: "The 'function' and 'var' are known as:",
        firstOption: "Keywords",
        secondOption: "Data types",
        thirdOption: "Declaration statements",
        correct: "Declaration statements",
    },{
        question: "What happens if the return statement has no related expression?",
        firstOption: "It will return a undefined value",
        secondOption: "It will throw a error",
        thirdOption: "It will return the 0 as the value",
        correct: "It will return a undefined value",
    },{
        question: "How can you add a comment in a JavaScript?",
        firstOption: "//This is a comment",
        secondOption: "'This is a comment",
        thirdOption: "<!--This is a comment-->",
        correct: "//This is a comment",
    },{
        question: "JavaScript is the same as Java.",
        firstOption: "True",
        secondOption: "False",
        thirdOption: "Truthy",
        correct: "False",
    }

];

var questionIndex = 0;

function questionCheck(){
    if (questionIndex >= questionArray.length - 1){
    endGame()
} else {
    questionIndex++;
   renderQuestion();
}


}

function init(){
    renderScores();
    score = 0;
    timer = 20;
    questionIndex = 0;
    renderQuestion();
}



function renderQuestion(){
    questionText.textContent = questionArray[questionIndex].question;
    firstOption.textContent = questionArray[questionIndex].firstOption;
    secondOption.textContent = questionArray[questionIndex].secondOption;
    thirdOption.textContent = questionArray[questionIndex].thirdOption;
}

function firstAnswer () {
    var question = questionArray[questionIndex]
    if (question.correct === question.firstOption) {
        score++;
    } else {
        timer =timer-2;
    }
    questionCheck()

}

function secondAnswer () {
    var question = questionArray[questionIndex]
    if (question.correct === question.secondOption) {
        score++;
    } else {
        timer =timer-2;
    }
    questionCheck()
   
}

function thirdAnswer () {
    var question = questionArray[questionIndex]
    if (question.correct === question.thirdOption) {
        score++;
    } else {
        timer =timer-2;
    }
   questionCheck()
   
}




start.addEventListener("click",startGame);
firstOption.addEventListener("click", firstAnswer);
secondOption.addEventListener("click", secondAnswer);
thirdOption.addEventListener("click", thirdAnswer);

function startGame(){
    questionIndex++;
    renderQuestion();
    gameTimer = setInterval(() => {
        timer--;
        timerText.textContent = timer;
        
        if(timer <= 0){
            endGame();
        }
        
    }, 1000);
    
    

}

function endGame(){
    clearInterval(gameTimer);
    var userInits = window.prompt("What are your Initials?")
    var userObj = {
        userInits,
        score,
    }
    if (userInits?.length) {
    savedScores.push(userObj);
}
    localStorage.setItem("score", JSON.stringify(savedScores))
    
    
    init();
    
}

    


function renderScores(){
    console.log(savedScores)
    scoresUl.textContent = "";
    for (let i = 0; i < savedScores.length; i++) {
        var element = savedScores[i];
        var newLi = document.createElement("li")
        newLi.textContent = element.userInits + " -- " + element.score
        scoresUl.appendChild(newLi);
    }  
}

init();