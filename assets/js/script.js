document.addEventListener('DOMContentLoaded', () => {
    const questionArea = document.querySelector('.question-area');
    const answerArea = document.getElementById('answer-area');
    const scoreElement = document.getElementById('score');
    const incorrectElement = document.getElementById('incorrect');
    const progressBar = document.getElementById('progress-bar');
    const retakeButton = document.querySelector('.retake-btn'); // Selecting the retake button
