// Horse data extracted from the directory tree
const HORSES = [
    { name: 'Amigo', imageCount: 2 },
    { name: 'Arcadia', imageCount: 3 },
    { name: 'Artemis', imageCount: 3 },
    { name: 'Austin', imageCount: 3 },
    { name: 'Bandit', imageCount: 3 },
    { name: 'Big K', imageCount: 3 },
    { name: 'Bonnie', imageCount: 3 },
    { name: 'Brassy', imageCount: 2 },
    { name: 'Bridger', imageCount: 3 },
    { name: 'Buddy', imageCount: 3 },
    { name: 'Buttercup', imageCount: 3 },
    { name: 'Caliber', imageCount: 3 },
    { name: 'Cassidy', imageCount: 3 },
    { name: 'Colorado', imageCount: 3 },
    { name: 'Concho', imageCount: 3 },
    { name: 'Crow', imageCount: 3 },
    { name: 'Cuddles', imageCount: 3 },
    { name: 'Daisy', imageCount: 3 },
    { name: 'Dandelion', imageCount: 3 },
    { name: 'Deputy', imageCount: 3 },
    { name: 'Diesel', imageCount: 3 },
    { name: 'Doc Holiday', imageCount: 3 },
    { name: 'Dumbledore', imageCount: 3 },
    { name: 'Durango', imageCount: 3 },
    { name: 'Esperanza', imageCount: 3 },
    { name: 'Everest', imageCount: 4 },
    { name: 'Gunsmoke', imageCount: 3 },
    { name: 'Gypsum', imageCount: 3 },
    { name: 'Hickory', imageCount: 3 },
    { name: 'Homer', imageCount: 3 },
    { name: 'Howdy', imageCount: 3 },
    { name: 'Jewel', imageCount: 3 },
    { name: 'Kaladin', imageCount: 3 },
    { name: 'Kestrel', imageCount: 3 },
    { name: 'Lariat', imageCount: 3 },
    { name: 'Lark', imageCount: 3 },
    { name: 'Lil Miss', imageCount: 2 },
    { name: 'Lucky', imageCount: 3 },
    { name: 'Magnum', imageCount: 3 },
    { name: 'Mancos', imageCount: 3 },
    { name: 'Marigold', imageCount: 3 },
    { name: 'Mesa', imageCount: 3 },
    { name: 'Oakley', imageCount: 3 },
    { name: 'Ojala', imageCount: 4 },
    { name: 'Opal', imageCount: 3 },
    { name: 'Paiute', imageCount: 3 },
    { name: 'Pearl Heart', imageCount: 3 },
    { name: 'Peso', imageCount: 4 },
    { name: 'Petunia', imageCount: 3 },
    { name: 'Porthos', imageCount: 3 },
    { name: 'Rio', imageCount: 3 },
    { name: 'Royal', imageCount: 3 },
    { name: 'Ruger', imageCount: 3 },
    { name: 'Scout', imageCount: 3 },
    { name: 'Sequoia', imageCount: 3 },
    { name: 'Sheriff', imageCount: 3 },
    { name: 'Sienna', imageCount: 3 },
    { name: 'Sirius', imageCount: 3 },
    { name: 'Smokey', imageCount: 3 },
    { name: 'Suerte', imageCount: 3 },
    { name: 'Teton', imageCount: 3 },
    { name: 'Tin Cup', imageCount: 3 },
    { name: 'Tiny', imageCount: 3 },
    { name: 'Tom', imageCount: 3 },
    { name: 'Topper', imageCount: 3 },
    { name: 'Trapper', imageCount: 3 },
    { name: 'Trinidad', imageCount: 4 },
    { name: 'Wayne', imageCount: 3 },
    { name: 'Winchester', imageCount: 3 },
    { name: 'Yampa', imageCount: 3 },
    { name: 'Yellowstone', imageCount: 3 },
    { name: 'Yosemite', imageCount: 3 }
];

// Game state
let gameState = {
    currentQuestion: 0,
    score: 0,
    selectedHorses: [],
    currentHorse: null,
    answerOptions: [],
    correctAnswerIndex: 0,
    answered: false,
    gameMode: 'easy', // 'easy' or 'hard'
    answerCount: 4 // 4 for easy, 8 for hard
};

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const startEasyBtn = document.getElementById('start-easy');
const startHardBtn = document.getElementById('start-hard');
const playAgainBtn = document.getElementById('play-again');
const scoreDisplay = document.getElementById('score');
const progressDisplay = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const horseImagesContainer = document.getElementById('horse-images');
const answerButtonsContainer = document.getElementById('answer-buttons-container');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackText = document.getElementById('feedback-text');
const nextQuestionBtn = document.getElementById('next-question');
const finalScoreText = document.getElementById('final-score-text');
const scoreMessage = document.getElementById('score-message');

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomHorses(count) {
    return shuffleArray(HORSES).slice(0, count);
}

function getRandomWrongAnswers(correctHorse, count) {
    const otherHorses = HORSES.filter(horse => horse.name !== correctHorse.name);
    return shuffleArray(otherHorses).slice(0, count);
}

// Game functions
function initializeGame(mode) {
    gameState = {
        currentQuestion: 0,
        score: 0,
        selectedHorses: getRandomHorses(20),
        currentHorse: null,
        answerOptions: [],
        correctAnswerIndex: 0,
        answered: false,
        gameMode: mode,
        answerCount: mode === 'easy' ? 4 : 8
    };
    
    // Set up answer buttons grid
    answerButtonsContainer.className = `answer-buttons ${mode}-mode`;
    
    // Show/hide buttons based on mode
    const answerButtons = answerButtonsContainer.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        if (index < gameState.answerCount) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });
    
    showScreen('game');
    loadQuestion();
}

function loadQuestion() {
    if (gameState.currentQuestion >= 20) {
        showResults();
        return;
    }

    gameState.currentHorse = gameState.selectedHorses[gameState.currentQuestion];
    gameState.answered = false;
    
    // Update progress
    updateProgress();
    
    // Load horse images
    loadHorseImages();
    
    // Generate answer options
    generateAnswerOptions();
    
    // Reset answer buttons
    resetAnswerButtons();
    
    // Scroll to top of images container
    horseImagesContainer.scrollTop = 0;
}

function updateProgress() {
    const current = gameState.currentQuestion + 1;
    const total = 20;
    const percentage = (gameState.currentQuestion / 20) * 100;
    
    progressDisplay.textContent = `${current} of ${total}`;
    progressFill.style.width = `${percentage}%`;
    scoreDisplay.textContent = `Score: ${gameState.score}/${gameState.currentQuestion}`;
}

function loadHorseImages() {
    horseImagesContainer.innerHTML = '';
    
    for (let i = 1; i <= gameState.currentHorse.imageCount; i++) {
        const img = document.createElement('img');
        img.className = 'horse-image';
        img.src = `images/${gameState.currentHorse.name}-${i}.jpg`;
        img.alt = `Horse image ${i}`;
        img.loading = 'lazy';
        
        // Handle image load errors
        img.onerror = function() {
            console.warn(`Could not load image: ${this.src}`);
            this.style.display = 'none';
        };
        
        horseImagesContainer.appendChild(img);
    }
    
    // Add spacer div after all images
    const spacer = document.createElement('div');
    spacer.className = 'image-spacer';
    spacer.style.height = '160px';
    spacer.style.width = '100%';
    horseImagesContainer.appendChild(spacer);
}

function generateAnswerOptions() {
    const wrongAnswersCount = gameState.answerCount - 1;
    const wrongAnswers = getRandomWrongAnswers(gameState.currentHorse, wrongAnswersCount);
    const allOptions = [gameState.currentHorse, ...wrongAnswers];
    gameState.answerOptions = shuffleArray(allOptions);
    gameState.correctAnswerIndex = gameState.answerOptions.findIndex(
        option => option.name === gameState.currentHorse.name
    );
    
    // Update button texts
    const answerButtons = answerButtonsContainer.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        if (index < gameState.answerCount) {
            btn.textContent = gameState.answerOptions[index].name;
            btn.dataset.answer = index;
        }
    });
}

function resetAnswerButtons() {
    const answerButtons = answerButtonsContainer.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        if (index < gameState.answerCount) {
            btn.disabled = false;
            btn.className = 'answer-btn';
            btn.onclick = () => handleAnswer(parseInt(btn.dataset.answer));
        }
    });
}

function handleAnswer(selectedIndex) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const isCorrect = selectedIndex === gameState.correctAnswerIndex;
    
    // Update score
    if (isCorrect) {
        gameState.score++;
    }
    
    // Visual feedback on buttons
    const answerButtons = answerButtonsContainer.querySelectorAll('.answer-btn');
    answerButtons.forEach((btn, index) => {
        if (index < gameState.answerCount) {
            btn.disabled = true;
            if (index === gameState.correctAnswerIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('incorrect');
            }
        }
    });
    
    // Show feedback overlay
    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    const correctName = gameState.currentHorse.name;
    
    if (isCorrect) {
        feedbackText.innerHTML = `
            <div class="feedback-correct">
                <strong>Correct!</strong><br>
                That's ${correctName}! 🎉
            </div>
        `;
    } else {
        feedbackText.innerHTML = `
            <div class="feedback-incorrect">
                <strong>Not quite!</strong><br>
                This is ${correctName}
            </div>
        `;
    }
    
    feedbackOverlay.classList.add('show');
}

function nextQuestion() {
    feedbackOverlay.classList.remove('show');
    gameState.currentQuestion++;
    loadQuestion();
}

function showResults() {
    const percentage = Math.round((gameState.score / 20) * 100);
    finalScoreText.textContent = `Your Score: ${gameState.score}/20 (${percentage}%)`;
    
    let message = '';
    if (percentage >= 90) {
        message = '🏆 Outstanding! You really know your horses!';
    } else if (percentage >= 80) {
        message = '🌟 Excellent work! You have great horse knowledge!';
    } else if (percentage >= 70) {
        message = '👍 Good job! You know quite a few horses!';
    } else if (percentage >= 60) {
        message = '👌 Not bad! Keep practicing to improve!';
    } else {
        message = '🤔 Room for improvement! Try playing again!';
    }
    
    scoreMessage.textContent = message;
    showScreen('results');
}

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    document.getElementById(`${screenName}-screen`).classList.add('active');
}

// Event listeners
startEasyBtn.addEventListener('click', () => initializeGame('easy'));
startHardBtn.addEventListener('click', () => initializeGame('hard'));
playAgainBtn.addEventListener('click', () => showScreen('welcome'));
nextQuestionBtn.addEventListener('click', nextQuestion);

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome');
});