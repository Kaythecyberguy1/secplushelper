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
        correctAnswer: 1,
        category: "Network Security",
        difficulty: "Medium"
    },
    {
        question: "What is the primary purpose of a honeypot?",
        options: [
            "A. To detect and prevent malware infections",
            "B. To attract and analyze potential attackers",
            "C. To encrypt sensitive data",
            "D. To authenticate users"
        ],
        correctAnswer: 1,
        category: "Threat Management",
        difficulty: "Easy"
    },
    {
        question: "Which of the following is a characteristic of a zero-day vulnerability?",
        options: [
            "A. It has been publicly disclosed for more than 30 days",
            "B. It affects only legacy systems",
            "C. It has no known patch or fix",
            "D. It requires physical access to exploit"
        ],
        correctAnswer: 2,
        category: "Vulnerability Management",
        difficulty: "Medium"
    },
    {
        question: "What is the primary purpose of a digital certificate?",
        options: [
            "A. To encrypt data in transit",
            "B. To verify the identity of a user or system",
            "C. To store private keys securely",
            "D. To generate random numbers"
        ],
        correctAnswer: 1,
        category: "Cryptography",
        difficulty: "Easy"
    },
    {
        question: "Which of the following is the MOST effective way to prevent SQL injection attacks?",
        options: [
            "A. Using input validation",
            "B. Implementing parameterized queries",
            "C. Disabling JavaScript",
            "D. Using stored procedures"
        ],
        correctAnswer: 1,
        category: "Application Security",
        difficulty: "Hard"
    },
    {
        question: "What is the purpose of a security baseline?",
        options: [
            "A. To establish minimum security requirements",
            "B. To track security incidents",
            "C. To document security policies",
            "D. To measure network performance"
        ],
        correctAnswer: 0,
        category: "Security Operations",
        difficulty: "Easy"
    },
    {
        question: "Which of the following is a characteristic of a secure password policy?",
        options: [
            "A. Maximum length of 8 characters",
            "B. No special characters required",
            "C. Regular password rotation",
            "D. Allowing common dictionary words"
        ],
        correctAnswer: 2,
        category: "Identity and Access Management",
        difficulty: "Medium"
    },
    {
        question: "What is the primary purpose of a SIEM system?",
        options: [
            "A. To block malicious traffic",
            "B. To aggregate and analyze security logs",
            "C. To encrypt network traffic",
            "D. To manage user permissions"
        ],
        correctAnswer: 1,
        category: "Security Operations",
        difficulty: "Medium"
    },
    {
        question: "Which of the following is a characteristic of a secure coding practice?",
        options: [
            "A. Using hardcoded credentials",
            "B. Implementing proper error handling",
            "C. Storing sensitive data in plaintext",
            "D. Using deprecated functions"
        ],
        correctAnswer: 1,
        category: "Application Security",
        difficulty: "Medium"
    },
    {
        question: "What is the purpose of a security assessment?",
        options: [
            "A. To identify vulnerabilities in a system",
            "B. To implement security controls",
            "C. To monitor network traffic",
            "D. To create security policies"
        ],
        correctAnswer: 0,
        category: "Security Assessment",
        difficulty: "Easy"
    },
    {
        question: "A company has hired a third-party to gather information about the company's servers and data. This third-party will not have direct access to the company's internal network, but they can gather information from any other source. Which of the following would BEST describe this approach?",
        options: [
            "A. Vulnerability scanning",
            "B. Passive reconnaissance",
            "C. Supply chain analysis",
            "D. Regulatory audit"
        ],
        correctAnswer: 1,
        category: "Threats & Reconnaissance",
        difficulty: "Medium",
        explanation: "Passive reconnaissance involves gathering information about a target without direct interaction, often using publicly available sources. This matches the scenario described."
    },
    {
        question: "A company is installing a new application in a public cloud. Which of the following determines the assignment of data security in this cloud infrastructure?",
        options: [
            "A. Playbook",
            "B. Audit committee",
            "C. Responsibility matrix",
            "D. Right-to-audit clause"
        ],
        correctAnswer: 2,
        category: "Cloud Security",
        difficulty: "Medium",
        explanation: "A responsibility matrix (such as a RACI chart) defines roles and responsibilities, including data security assignments in cloud environments."
    },
    {
        question: "When decommissioning a device, a company documents the type and size of storage drive, the amount of RAM, and any installed adapter cards. Which of the following describes this process?",
        options: [
            "A. Destruction",
            "B. Sanitization",
            "C. Certification",
            "D. Enumeration"
        ],
        correctAnswer: 3,
        category: "Asset Management",
        difficulty: "Easy",
        explanation: "Enumeration is the process of listing and documenting hardware and components before decommissioning."
    },
    {
        question: "An attacker has sent more information than expected in a single API call, and this has allowed the execution of arbitrary code. Which of the following would BEST describe this attack?",
        options: [
            "A. Buffer overflow",
            "B. Replay attack",
            "C. Cross-site scripting",
            "D. DDoS"
        ],
        correctAnswer: 0,
        category: "Application Security",
        difficulty: "Medium",
        explanation: "A buffer overflow occurs when more data is sent than a buffer can handle, potentially allowing arbitrary code execution."
    },
    {
        question: "A company encourages users to encrypt all of their confidential materials on a central server. The organization would like to enable key escrow as a backup option. Which of these keys should the organization place into escrow?",
        options: [
            "A. Private",
            "B. CA",
            "C. Session",
            "D. Public"
        ],
        correctAnswer: 0,
        category: "Cryptography",
        difficulty: "Medium",
        explanation: "Private keys are placed in escrow to allow recovery if the original is lost."
    },
    {
        question: "A company is in the process of configuring and enabling host-based firewalls on all user devices. Which of the following threats is the company addressing?",
        options: [
            "A. Default credentials",
            "B. Vishing",
            "C. Instant messaging",
            "D. On-path"
        ],
        correctAnswer: 3,
        category: "Network Security",
        difficulty: "Easy",
        explanation: "Host-based firewalls help prevent on-path (man-in-the-middle) attacks by controlling network traffic."
    },
    {
        question: "A manufacturing company would like to use an existing router to separate a corporate network from a manufacturing floor. Both networks use the same physical switch, and the company does not want to install any additional hardware. Which of the following would be the BEST choice for this segmentation?",
        options: [
            "A. Connect the corporate network and the manufacturing floor with a VPN",
            "B. Build an air gapped manufacturing floor network",
            "C. Use host-based firewalls on each device",
            "D. Create separate VLANs for the corporate network and the manufacturing floor"
        ],
        correctAnswer: 3,
        category: "Network Segmentation",
        difficulty: "Medium",
        explanation: "VLANs allow logical separation of networks using the same physical hardware."
    },
    {
        question: "An organization needs to provide a remote access solution for a newly deployed cloud-based application. This application is designed to be used by mobile field service technicians. Which of the following would be the best option for this requirement?",
        options: [
            "A. RTOS",
            "B. CRL",
            "C. Zero-trust",
            "D. SASE"
        ],
        correctAnswer: 3,
        category: "Cloud Security",
        difficulty: "Medium",
        explanation: "SASE (Secure Access Service Edge) is designed for secure remote access to cloud applications."
    },
    {
        question: "A company is implementing a quarterly security awareness campaign. Which of the following would MOST likely be part of this campaign?",
        options: [
            "A. Suspicious message reports from users",
            "B. An itemized statement of work",
            "C. An IaC configuration file",
            "D. An acceptable use policy document"
        ],
        correctAnswer: 3,
        category: "Security Awareness",
        difficulty: "Easy",
        explanation: "Acceptable use policy documents are commonly distributed during security awareness campaigns."
    },
    {
        question: "A recent report shows the return of a vulnerability that was previously patched four months ago. After researching this issue, the security team has found a recent patch has reintroduced this vulnerability on the servers. Which of the following should the security administrator implement to prevent this issue from occurring in the future?",
        options: [
            "A. Containerization",
            "B. Data masking",
            "C. 802.1X",
            "D. Change management"
        ],
        correctAnswer: 3,
        category: "Change Management",
        difficulty: "Medium",
        explanation: "Change management ensures that changes are tracked and tested to prevent reintroducing vulnerabilities."
    },
    {
        question: "A security manager would like to ensure that unique hashes are used with an application login process. Which of the following would be the BEST way to add random data when generating a set of stored password hashes?",
        options: [
            "A. Salting",
            "B. Obfuscation",
            "C. Key stretching",
            "D. Digital signature"
        ],
        correctAnswer: 0,
        category: "Authentication",
        difficulty: "Easy",
        explanation: "Salting adds random data to passwords before hashing to ensure uniqueness."
    },
    {
        question: "Which cryptographic method is used to add trust to a digital certificate?",
        options: [
            "A. Steganography",
            "B. Hash",
            "C. Symmetric encryption",
            "D. Digital signature"
        ],
        correctAnswer: 3,
        category: "Cryptography",
        difficulty: "Easy",
        explanation: "Digital signatures are used to verify the authenticity and integrity of digital certificates."
    },
    {
        question: "A company is using SCAP as part of their security monitoring processes. Which of the following would BEST describe this implementation?",
        options: [
            "A. Train the user community to better identify phishing attempts",
            "B. Present the results of an internal audit to the board",
            "C. Automate the validation and patching of security issues",
            "D. Identify and document authorized data center visitors"
        ],
        correctAnswer: 2,
        category: "Security Automation",
        difficulty: "Medium",
        explanation: "SCAP (Security Content Automation Protocol) is used to automate validation and patching of security issues."
    },
    {
        question: "An organization maintains a large database of customer information for sales tracking and customer support. Which person in the organization would be responsible for managing the access rights to this data?",
        options: [
            "A. Data processor",
            "B. Data owner",
            "C. Data subject",
            "D. Data custodian"
        ],
        correctAnswer: 1,
        category: "Data Governance",
        difficulty: "Easy",
        explanation: "The data owner is responsible for managing access rights to data."
    },
    {
        question: "An organization's content management system currently labels files and documents as \"Public\" and \"Restricted.\" On a recent update, a new classification type of \"Private\" was added. Which of the following would be the MOST likely reason for this addition?",
        options: [
            "A. Minimized attack surface",
            "B. Simplified categorization",
            "C. Expanded privacy compliance",
            "D. Decreased search time"
        ],
        correctAnswer: 2,
        category: "Data Classification",
        difficulty: "Medium",
        explanation: "Adding a 'Private' classification is likely to expand privacy compliance."
    },
    {
        question: "A corporate security team would like to consolidate and protect the private keys across all of their web servers. Which of these would be the BEST way to securely store these keys?",
        options: [
            "A. Integrate an HSM",
            "B. Implement full disk encryption on the web servers",
            "C. Use a TPM",
            "D. Upgrade the web servers to use a UEFI BIOS"
        ],
        correctAnswer: 0,
        category: "Cryptography",
        difficulty: "Medium",
        explanation: "A Hardware Security Module (HSM) is designed to securely store and manage cryptographic keys."
    }
];

let currentQuestion = 0;
let selectedOption = null;

// Function to display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    const questionContainer = document.querySelector('.question-container');
    
    // Update question header
    questionContainer.querySelector('.question-number').textContent = `Question ${currentQuestion + 1}`;
    questionContainer.querySelector('.question-category').textContent = question.category;
    questionContainer.querySelector('.question-difficulty').textContent = question.difficulty;
    
    // Update question content
    questionContainer.querySelector('.question-content h3').textContent = question.question;
    
    // Update options
    const options = questionContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.querySelector('.option-text').textContent = question.options[index];
        option.dataset.correct = (index === question.correctAnswer).toString();
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Reset submit button
    questionContainer.querySelector('.submit-answer').disabled = true;
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


const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
}

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
document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    updateStreakDisplay();
    updateQuestionsProgress();
    updateExamPrediction();
});

// Study Materials Accordion
document.addEventListener('DOMContentLoaded', function () {
    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach(card => {
        const header = card.querySelector('.domain-header');
        header.addEventListener('click', function () {
            // Close all other cards
            domainCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            // Toggle this card
            card.classList.toggle('active');
        });
    });
});

// User session and nav logic
function updateNavAndWelcome() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navLogin = document.getElementById('nav-login');
    const navSignup = document.getElementById('nav-signup');
    const navProfile = document.getElementById('nav-profile');
    const navLogout = document.getElementById('nav-logout');
    const welcomeMsg = document.getElementById('welcome-message');
    if (loggedInUser) {
        if (navLogin) navLogin.style.display = 'none';
        if (navSignup) navSignup.style.display = 'none';
        if (navProfile) navProfile.style.display = '';
        if (navLogout) navLogout.style.display = '';
        if (welcomeMsg) {
            welcomeMsg.style.display = '';
            welcomeMsg.textContent = `Welcome, ${loggedInUser}!`;
        }
    } else {
        if (navLogin) navLogin.style.display = '';
        if (navSignup) navSignup.style.display = '';
        if (navProfile) navProfile.style.display = 'none';
        if (navLogout) navLogout.style.display = 'none';
        if (welcomeMsg) welcomeMsg.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateNavAndWelcome();
    // Logout logic
    const navLogout = document.getElementById('nav-logout');
    if (navLogout) {
        navLogout.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            updateNavAndWelcome();
            window.location.reload();
        });
    }
    // Hamburger menu logic
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
    // Profile link logic
    const navProfile = document.getElementById('nav-profile');
    if (navProfile) {
        navProfile.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }
    // Redirect from profile.html if not logged in
    if (window.location.pathname.endsWith('profile.html')) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html';
        }
    }
}); 