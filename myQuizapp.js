const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Australia", correct: true},
            {text: "Africa", correct: false},
            {text: "Asia", correct: false},
            {text: "Europe", correct: false},
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answers: [
            {text: "Australia", correct: false},
            {text: "Africa", correct: false},
            {text: "Asia", correct: true},
            {text: "Europe", correct: false},
        ]
    },
    {
        question: "Which of the following is a state in the south eastern part of Nigeria?",
        answers: [
            {text: "Borno", correct: false},
            {text: "Kogi", correct: false},
            {text: "Oyo", correct: false},
            {text: "Abia", correct: true},
        ]
    },
    {
        question: "Which of the following numbers is a prime number?",
        answers: [
            {text: "51", correct: false},
            {text: "53", correct: true},
            {text: "105", correct: false},
            {text: "16", correct: false},
        ]
    },
    {
        question: "What make up protein?",
        answers: [
            {text: "Amino acids", correct: true},
            {text: "Glucose", correct: false},
            {text: "Fatty acids", correct: false},
            {text: "Sucrose", correct: false},
        ]
    },
    {
        question: "What is the unit of Energy?",
        answers: [
            {text: "Newton", correct: false},
            {text: "Joule", correct: true},
            {text: "Kilogram", correct: false},
            {text: "Celsius", correct: false},
        ]
    },
    {
        question: "Which of the following fights antigens in the body?",
        answers: [
            {text: "White Blood Cell", correct: true},
            {text: "Red Blood Cell", correct: false},
            {text: "Platelets", correct: false},
            {text: "Adrenaline", correct: false},
        ]
    },
    {
        question: "Which of the following causes malaria?",
        answers: [
            {text: "Virus", correct: false},
            {text: "Bacteria", correct: false},
            {text: "Protozoa", correct: true},
            {text: "Fungi", correct: false},
        ]
    },
    {
        question: "Which of the following is located at the south western region of nigeria?",
        answers: [
            {text: "Delta", correct: false},
            {text: "Bauchi", correct: false},
            {text: "Enugu", correct: false},
            {text: "Ondo", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();