//questions:
const quizArray = [
    {
    questionText: "What is a boolean data type?", 
    answers: ["(a) Object", "(b) True/False", "(c) String", "(d) Operator"],
    correctAnswer: "(b) True/False",
    },
    {
    questionText: "What is 'hoisting'?",
    answers: ["(a) Helping a friend", "(b) Bringing an element to the top of a script", "(c) The ability to use a variable before it has been declared", "(d) A wrestling move"], 
    correctAnswer: "(c) The ability to use a variable before it has been declared",
    },
    {
    questionText: "When was the statement 'let' introduced?", 
    answers: ["(a) 1945", "(b) 1996", "(c) 2021", "(d) 2015"], 
    correctAnswer: "(d) 2015",
    },
    { 
    questionText: "True or False: isNaN(365) will return 'true'.", 
    answers: ["(a) True", "(b) False"], 
    correctAnswer: "(b) False", //false - it will return false because 365 IS a number
    },
    {
    questionText: "What does the 'slice()' method do to an array?", 
    answers: ["(a) It returns selected elements in an array, into a new array", "(b) cuts an array in half", "(c) It divides an array into 4 equal pieces", "(d) 'slice() is only a string method"], 
    correctAnswer: "(a) It returns selected elements in an array, into a new array",
    },
];

//name all 
let timer = document.querySelector("#start-btn");
let cardTitle = document.querySelector(".card-title");
let timeRemaining = 60;
let interval = 0;
let clockText = document.querySelector("#clock");
let quizContainer = document.querySelector("#quizContainer");
let questionContainer = document.querySelector("#questionsContainer");
let question = 0;
let score = 0;
let penalty = 10;
let createUl = document.createElement("ul");
let shuffledQuestions, currentQuestionIndex;//for shuffling questionz
quizContainer.children
timer.addEventListener("click", function() {
    console.log("started")
    if (interval === 0) {
        interval = setInterval(function() {
            timeRemaining--;
            clockText.textContent = "time remaining: " + timeRemaining;

            if (timeRemaining <=0) {
                clearInterval(interval);
                quizComplete();
                clockText.textContent = "Quiz Over.";
            }    
        }, 1 * 1000);
    }
    startGame(question);
});


function startGame(question) {
    console.log("questions"); 
    // document.getElementById("questionsContainer").style.cssText = "display: flex; flex-direction: column; text-align: center"

    cardTitle.innerHTML = "";
    createUl.innerHTML = "";
    
    for (var i = 0; i < quizArray.length; i++) {
        var arrayQuestion = quizArray[question].questionText;
        var userAnswer = quizArray[question].answers;
        questionContainer.textContent = arrayQuestion;
    }
    userAnswer.forEach(function (showNextQuestion) {
        var listItem = document.createElement("li");
        listItem.textContent = showNextQuestion;
        questionContainer.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (questionResult));
    })  
}
function questionResult(event) {
    var element = event.target;
    
    if (element.matches("li")) {
        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
    
    if (element.textContent == quizArray[question].correctAnswer) {
        score++;
        createDiv.textContent = "Correctamundo"

    } else {
        timeRemaining = timeRemaining - penalty;
        createDiv.textContent = "Incorrect";
    }
}

question++;

if (question >= quizArray.length) {
    quizComplete();
    createDiv.textContent = "Quiz Complete." + " " + "Your score: " + score + "/" + quizArray.length + " correct.";
} else {
    startGame(question);
}
questionContainer.appendChild(createDiv);
}

//at end of questions:
function quizComplete() {
    questionContainer.innerhtml = "";
    clockText.innerHTML = "";
    console.log("questions complete");

    //create completion header
    var displayComplete = document.createElement("h1");
    displayComplete.setAttribute("id", "displayComplete");
    displayComplete.textContent = "Done";
    questionContainer.appendChild(displayComplete);

    //create completion text
    var displayComplete2 = document.createElement("p");
    displayComplete2.setAttribute("id", "displayComplete2");
    displayComplete2.setAttribute('style', 'white-space: pre;');
    questionContainer.appendChild(displayComplete2);
    //ensure timer has not run out
    // also made remaining time be the score
    if (timeRemaining >= 0) {
        var timeRemainingAtEnd = timeRemaining;
        var displayComplete3 = document.createElement("p");
        questionContainer.appendChild(displayComplete3);
        clearInterval(interval);
        displayComplete2.textContent = "Congratulations. Your score is: " + timeRemainingAtEnd + "\n SCOREBOARD:";
        // displayComplete2.textContent += "SCOREBOARD:";
    }
    
    //create score form text
    var nameSubmitText = document.createElement("formText");
    nameSubmitText.setAttribute("id", "formText");
    nameSubmitText.textContent = "Enter your initials to the scoreboard!";

    //append form text
    questionContainer.appendChild(nameSubmitText);

    //create form field
    let nameSubmitForm = document.createElement("input");
    nameSubmitForm.setAttribute("type", 'text');
    nameSubmitForm.setAttribute('id', 'initials');
    nameSubmitForm.textContent = "";

    questionContainer.appendChild(nameSubmitForm);

    //create submit button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submit");
    submitBtn.setAttribute("type", "submit");
    //button text
    submitBtn.textContent = 'Submit';
    questionContainer.appendChild(submitBtn);


    //event listener for submitBtn
    submitBtn.addEventListener('click', function handleClick(event) {
        event.preventDefault();
        var nameEntry = nameSubmitForm.value; 
        if (!nameEntry) {
            window.alert("Enter some intials, or a funny acronym.\n\Like 'BUTT'.");  
        } else {
            //clear form
            nameSubmitForm.value = "";
            let yourScore = {
                initials: nameEntry,
                score: timeRemaining
            }
            console.log(yourScore);
            let bestGame = localStorage.getItem("bestGame");
            if (bestGame === null) {
                bestGame = [];
            } else {
                bestGame = JSON.parse(bestGame);
            }
            var scoreBoard = document.createElement("scoreBoard");
            scoreBoard.setAttribute("id", "scoreBoard");
            displayComplete3.appendChild(scoreBoard);
            //1) store score
            const newScore = JSON.stringify(bestGame);
            localStorage.setItem(bestGame, newScore);
            //2) retrieve score
            let scoreBoardText = localStorage.getItem(bestGame);
            
            scoreBoard.textContent = scoreBoardText;
            //3)?? profit?


            
            
            
            
                        

            
            
            
            



             //couldn't get submit button to redirect w below code:
             //so changed to same page (suboptimal)
            // var newScore = JSON.stringify(bestGame);//
            // localStorage.setItem("bestGame", newScore);//
           
            // window.location.href="./scores.html";
        }
    });
}




