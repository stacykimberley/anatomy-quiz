// Define variables to keep track of the quiz state
let currentQuestion = 0;
let score = 0;

// Function to shuffle questions array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Function to load questions for the quiz
function loadQuiz() {
  // Shuffle questions array to randomize questions
  let shuffledQuestions = shuffle(questions);
  let questionArea = document.querySelector('.question-area');
  
  // Display current question
  questionArea.innerHTML = `
    <p>${shuffledQuestions[currentQuestion].question}</p>
    <div id="answer-area" class="answer-area">
        <button class="option-btn" onclick="checkAnswer(1)"> ${shuffledQuestions[currentQuestion].option1}</button>
        <button class="option-btn" onclick="checkAnswer(2)"> ${shuffledQuestions[currentQuestion].option2}</button>
        <button class="option-btn" onclick="checkAnswer(3)"> ${shuffledQuestions[currentQuestion].option3}</button>
        <button class="option-btn" onclick="checkAnswer(4)"> ${shuffledQuestions[currentQuestion].option4}</button>
    </div>
  `;
}

// Function to check the answer selected by the user
function checkAnswer(selectedOption) {
  let correctAnswer = questions[currentQuestion].answer;
  let selectedButton = document.querySelector(`.option-btn:nth-child(${selectedOption})`);
  
  if (selectedOption == correctAnswer) {
    // Highlight correct answer button green
    selectedButton.style.backgroundColor = '#2ecc71';
    score++;
  } else {
    // Highlight wrong answer button red
    selectedButton.style.backgroundColor = '#e74c3c';
  }

  // Disable all buttons to prevent multiple selections
  let answerButtons = document.querySelectorAll('.option-btn');
  answerButtons.forEach(button => {
    button.disabled = true;
  });

  // Move to the next question or end the quiz
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < 5) {
      loadQuiz();
    } else {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz and display the score
function endQuiz() {
  // Store the score in localStorage to display in feedback.html
  localStorage.setItem('score', score);

  // Redirect to feedback.html
  window.location.href = 'feedback.html';
}

// Event listener for the start button
document.querySelector('.start-btn').addEventListener('click', () => {
  // Redirect to quiz.html
  window.location.href = 'quiz.html';
});

// Load the quiz when the quiz.html page loads
window.addEventListener('DOMContentLoaded', loadQuiz);
