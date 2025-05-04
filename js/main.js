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