// Function to start the quiz
function startQuiz() {
    // Navigate to the quiz page
    window.location.href = 'quiz.html';
}

// Function to generate a random quiz with 5 questions
function generateQuiz() {
    // Get reference to the answer area
    const answerArea = document.getElementById('answer-area');
    // Clear previous answer buttons
    answerArea.innerHTML = '';

    // Shuffle the questions array
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // Select the first 5 questions
    const selectedQuestions = shuffledQuestions.slice(0, 5);

    // Iterate through selected questions
    selectedQuestions.forEach((question, index) => {
        // Create question element
        const questionElement = document.createElement('p');
        questionElement.textContent = `${index + 1}. ${question.question}`;
        answerArea.appendChild(questionElement);

        // Create answer buttons
        for (let i = 1; i <= 4; i++) {
            const optionButton = document.createElement('button');
            optionButton.textContent = question['option' + i];
            optionButton.classList.add('option-btn');
            optionButton.setAttribute('data-correct', question.answer === i.toString());
            answerArea.appendChild(optionButton);
        }
    });
}

// Function to handle quiz completion
function handleQuizCompletion() {
    // Get score and incorrect count from local storage
    const score = localStorage.getItem('score');
    const incorrect = localStorage.getItem('incorrect');

    // Display score and incorrect count
    document.getElementById('score').textContent = score;
    document.getElementById('incorrect').textContent = incorrect;
}

// Function to retake the quiz
function retakeQuiz() {
    // Clear local storage
    localStorage.removeItem('score');
    localStorage.removeItem('incorrect');
    // Navigate back to the quiz page
    window.location.href = 'quiz.html';
}

// Event listener for start button
document.querySelector('.start-btn').addEventListener('click', startQuiz);

// Event listener for quiz page load
if (window.location.pathname === '/quiz.html') {
    generateQuiz(); // Generate quiz on quiz page load

    // Event listener for option button click
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                let score = parseInt(localStorage.getItem('score')) || 0;
                score++;
                localStorage.setItem('score', score);
            } else {
                let incorrect = parseInt(localStorage.getItem('incorrect')) || 0;
                incorrect++;
                localStorage.setItem('incorrect', incorrect);
            }
            generateQuiz(); // Generate next question
        });
    });
}

// Event listener for feedback page load
if (window.location.pathname === '/feedback.html') {
    handleQuizCompletion(); // Display score and incorrect count on feedback page load
}

// Event listener for retake button
document.querySelector('.retake-btn').addEventListener('click', retakeQuiz);
