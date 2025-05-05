// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Practice Questions functionality
const questionContainer = document.querySelector('.question-container');
const options = document.querySelectorAll('.option');
const submitButton = document.querySelector('.submit-answer');

// Sample questions data
const questions = [
    {
        question: "Which of the following is the BEST way to prevent unauthorized access to a wireless network?",
        options: [
            "A. Disable SSID broadcasting",
            "B. Implement WPA3 encryption",
            "C. Use MAC filtering",
            "D. Enable WEP encryption"
        ],
        correctAnswer: 1 // Index of correct answer (B)
    },
    {
        question: "What is the primary purpose of a honeypot?",
        options: [
            "A. To detect and prevent malware infections",
            "B. To attract and analyze potential attackers",
            "C. To encrypt sensitive data",
            "D. To authenticate users"
        ],
        correctAnswer: 1 // Index of correct answer (B)
    }
];

let currentQuestion = 0;
let selectedOption = null;

// Function to display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    questionContainer.querySelector('h3').textContent = `Question ${currentQuestion + 1}`;
    questionContainer.querySelector('p').textContent = question.question;
    
    options.forEach((option, index) => {
        option.textContent = question.options[index];
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    selectedOption = null;
    submitButton.disabled = true;
}

// Add click event listeners to options
options.forEach((option, index) => {
    option.addEventListener('click', () => {
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedOption = index;
        submitButton.disabled = false;
    });
});

// Handle submit button click
submitButton.addEventListener('click', () => {
    if (selectedOption === null) return;
    
    const correctAnswer = questions[currentQuestion].correctAnswer;
    
    options.forEach((option, index) => {
        if (index === correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedOption && selectedOption !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    submitButton.disabled = true;
    
    // Move to next question after a delay
    setTimeout(() => {
        currentQuestion = (currentQuestion + 1) % questions.length;
        displayQuestion();
    }, 2000);
});

// Initialize first question
displayQuestion();

// Add styles for selected, correct, and incorrect answers
const style = document.createElement('style');
style.textContent = `
    .option.selected {
        background-color: #e3f2fd;
        border-color: #3498db;
    }
    .option.correct {
        background-color: #e8f5e9;
        border-color: #4caf50;
    }
    .option.incorrect {
        background-color: #ffebee;
        border-color: #f44336;
    }
`;
document.head.appendChild(style);

// Game state management
const gameState = {
    score: 0,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    achievements: new Set(),
    examPrediction: {
        accuracy: 0,
        completion: 0,
        prediction: "Start answering questions to get your prediction!"
    }
};

// Achievement definitions
const achievements = {
    firstQuestion: {
        name: "First Step",
        description: "Answered your first question",
        condition: (state) => state.questionsAnswered >= 1
    },
    perfectScore: {
        name: "Perfect Score",
        description: "Got 5 questions correct in a row",
        condition: (state) => state.streak >= 5
    },
    halfWay: {
        name: "Halfway There",
        description: "Completed 100 questions",
        condition: (state) => state.questionsAnswered >= 100
    },
    examReady: {
        name: "Exam Ready",
        description: "Achieved 80% accuracy on 50+ questions",
        condition: (state) => state.questionsAnswered >= 50 && 
                            (state.correctAnswers / state.questionsAnswered) >= 0.8
    }
};

// Update score display
function updateScoreDisplay() {
    const scoreElement = document.querySelector('.stat-value');
    const progressElement = document.querySelector('.progress');
    const scoreDescElement = document.querySelector('.stat-desc');
    
    const accuracy = gameState.questionsAnswered > 0 
        ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100) 
        : 0;
    
    scoreElement.textContent = gameState.score;
    progressElement.style.width = `${accuracy}%`;
    scoreDescElement.textContent = `${accuracy}% correct`;
}

// Update streak display
function updateStreakDisplay() {
    const streakElement = document.querySelector('.stat-value:nth-of-type(2)');
    const streakProgressElement = document.querySelector('.progress-bar:nth-of-type(2) .progress');
    const streakDescElement = document.querySelector('.stat-desc:nth-of-type(2)');
    
    streakElement.textContent = gameState.streak;
    streakProgressElement.style.width = `${Math.min(gameState.streak * 20, 100)}%`;
    streakDescElement.textContent = `${gameState.streak} questions in a row`;
}

// Update questions progress
function updateQuestionsProgress() {
    const questionsElement = document.querySelector('.stat-value:nth-of-type(3)');
    const questionsProgressElement = document.querySelector('.progress-bar:nth-of-type(3) .progress');
    const questionsDescElement = document.querySelector('.stat-desc:nth-of-type(3)');
    
    const progress = Math.round((gameState.questionsAnswered / 200) * 100);
    
    questionsElement.textContent = `${gameState.questionsAnswered}/200`;
    questionsProgressElement.style.width = `${progress}%`;
    questionsDescElement.textContent = `${progress}% completed`;
}

// Calculate exam prediction
function calculateExamPrediction() {
    if (gameState.questionsAnswered < 10) {
        return {
            accuracy: 0,
            completion: Math.round((gameState.questionsAnswered / 200) * 100),
            prediction: "Answer more questions to get a better prediction!"
        };
    }

    const accuracy = Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100);
    const completion = Math.round((gameState.questionsAnswered / 200) * 100);
    
    let prediction;
    if (accuracy >= 85 && completion >= 50) {
        prediction = "You're ready to take the exam!";
    } else if (accuracy >= 70 && completion >= 30) {
        prediction = "You're making good progress!";
    } else {
        prediction = "Keep practicing to improve your readiness!";
    }

    return { accuracy, completion, prediction };
}

// Update exam prediction display
function updateExamPrediction() {
    const prediction = calculateExamPrediction();
    const predictionElement = document.querySelector('.exam-prediction');
    const accuracyElement = document.querySelector('.metric-value:nth-of-type(1)');
    const completionElement = document.querySelector('.metric-value:nth-of-type(2)');
    
    predictionElement.textContent = prediction.prediction;
    accuracyElement.textContent = `${prediction.accuracy}%`;
    completionElement.textContent = `${prediction.completion}%`;
}

// Check and unlock achievements
function checkAchievements() {
    for (const [key, achievement] of Object.entries(achievements)) {
        if (!gameState.achievements.has(key) && achievement.condition(gameState)) {
            gameState.achievements.add(key);
            showAchievementPopup(achievement);
        }
    }
}

// Show achievement popup
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <i class="fas fa-trophy"></i>
        <h3>${achievement.name}</h3>
        <p>${achievement.description}</p>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

// Event listeners for answer submission
document.querySelectorAll('.answer-option').forEach(option => {
    option.addEventListener('click', function() {
        const isCorrect = this.dataset.correct === 'true';
        
        // Update game state
        gameState.questionsAnswered++;
        if (isCorrect) {
            gameState.correctAnswers++;
            gameState.streak++;
            gameState.score += 10;
        } else {
            gameState.streak = 0;
        }
        
        // Update displays
        updateScoreDisplay();
        updateStreakDisplay();
        updateQuestionsProgress();
        updateExamPrediction();
        checkAchievements();
        
        // Show feedback
        this.classList.add(isCorrect ? 'correct' : 'incorrect');
    });
});

// Initialize displays
updateScoreDisplay();
updateStreakDisplay();
updateQuestionsProgress();
updateExamPrediction(); 