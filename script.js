const questions = [
    {
        question: "Which is the capital of Australia?",
        answers: [
            { text: "berlin", correct: false },
            { text: "canberra", correct: true },
            { text: "paris", correct: false },
            { text: "london", correct: false }
        ]
    }, {
        question: "Where is the nile river located?",
        answers: [
            { text: "India", correct: false },
            { text: "Brazil", correct: false },
            { text: "UK", correct: false },
            { text: "Egypt", correct: true }]
    }, {
        question: "What is the probablity of atleast two people having a birthday in the same month in a room of 25 people ?",
        answers: [
            { text: "100%", correct: true },
            { text: "50%", correct: false },
            { text: "25%", correct: false },
            { text: "80%", correct: false }]

    }, {
        question: "What is the chance of being right in this quiz given you have no clue about teh question?",
        answers: [
            { text: "100%", correct: false },
            { text: "50%", correct: false },
            { text: "25%", correct: true },
            { text: "0%", correct: false }]
    }, {
        question: "How many matches do you need to win a chess tournament where number of contestants are 2048?",
        answers: [
            { text: "11", correct: true },
            { text: "12", correct: false },
            { text: "8", correct: false },
            { text: "6", correct: false }]
    }];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer");
const nextButton = document.getElementById("nextbtn");
let currentind = 0;
let score = 0;
function startquiz() {

    currentind = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showquestion();
}
function showquestion() {
    resetState();
    let currentques = questions[currentind];
    let qno = currentind + 1;
    questionElement.innerHTML = qno + "." + currentques.question;
    currentques.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "None";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
function handlenextButton() {
    currentind++;
    if (currentind < questions.length) {
        showquestion();
    }
    else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentind < questions.length) {
        handlenextButton();
    }
    else {
        startquiz();
    }
});
startquiz();