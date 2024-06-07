document.addEventListener('DOMContentLoaded', () => {
    const questionArea = document.querySelector('.question-area');
    const answerArea = document.getElementById('answer-area');
    const scoreElement = document.getElementById('score');
    const incorrectElement = document.getElementById('incorrect');
    const progressBar = document.getElementById('progress-bar');
    const retakeButton = document.querySelector('.retake-btn'); // Selecting the retake button

    let currentQuestionIndex = 0;
    let score = 0;
    let incorrect = 0;

    // Function to get 5 random questions
    function getRandomQuestions() {
        const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
        return shuffledQuestions.slice(0, 5);
    }

    const selectedQuestions = getRandomQuestions();

    // Function to display a question
    function displayQuestion(index) {
        if (index >= selectedQuestions.length) {
            showFinalScore();
            return;
        }

        const questionObj = selectedQuestions[index];
        questionArea.querySelector('p').innerText = questionObj.question;

        const options = [questionObj.option1, questionObj.option2, questionObj.option3, questionObj.option4];
        answerArea.innerHTML = '';
        options.forEach((option, i) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.innerText = option;
            button.addEventListener('click', () => checkAnswer(i + 1, questionObj.answer));
            answerArea.appendChild(button);
        });

        updateProgressBar(index);

    }

    // Function to check the selected answer
    function checkAnswer(selected, correct) {
        selected = parseInt(selected);
        correct = parseInt(correct);
        
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((button, index) => {
            if (index + 1 === correct) {
                button.classList.add('correct-answer');
            } else if (index + 1 === selected) {
                button.classList.add('incorrect-answer');
            }
             // Disable all buttons after an answer is selected
             button.disabled = true;
        });
        // Update the score and move to the next question
        if (selected === correct) {
            score++;
        } else {
            incorrect++;
        }
        scoreElement.innerText = score;
        incorrectElement.innerText = incorrect;
        currentQuestionIndex++;
        setTimeout(() => {
            displayQuestion(currentQuestionIndex);
        }, 1000); // Delay to see the answer highlight
    }

    // Function to update the progress bar
    function updateProgressBar(index) {
        const progress = ((index + 1) / selectedQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Function to show the final score and the retake button
    function showFinalScore() {
        questionArea.innerHTML = ''; // Clearing the question area
        answerArea.innerHTML = ''; // Clearing the answer area
        progressBar.style.width = '100%'; // Updating progress bar to full width
        retakeButton.style.display = 'block'; // Unhiding the retake button    
    }

    // Start the quiz by displaying the first question
    displayQuestion(currentQuestionIndex);
});