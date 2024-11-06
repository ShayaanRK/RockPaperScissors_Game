// Declaring DOM variables globally
const choice = document.querySelector("#choice");
const banner = document.querySelector("#step2");
const gameMsg = document.querySelector("#game-msg");
const roundBanner = document.querySelector("#round-count");
const battle = document.querySelector("#battle");
const userImg = document.querySelector("#guy1");
const compImg = document.querySelector("#guy2");
const winMsg = document.querySelector(".win-msg");
const resetBtn = document.querySelector("#reset-btn");

let roundCount = 0;
let userScore = 0;
let compScore = 0;
const totalRounds = 3; // Set the total rounds to play

// Start the game by showing the choice section
setTimeout(() => {
    document.querySelector("#step1").classList.add("visible");

    // Adding event listeners to the choices
    choice.addEventListener("click", (e) => {
        const sign = e.target.id; // Get the ID of the clicked choice
        if (['rock', 'paper', 'scissors'].includes(sign)) { // Ensure valid choice
            playGame(sign);
        }
    });
}, 100);

function playGame(sign) {
    if (roundCount < totalRounds) {
        roundCount++; // Increment the round count
        roundBanner.textContent = `Round ${roundCount}`; // Update the round banner

        // Show the game banner after a short delay
        setTimeout(() => {
            banner.classList.add("visible");

            const choices = ['rock', 'paper', 'scissors'];
            const cpuChoice = choices[Math.floor(Math.random() * choices.length)]; // Random CPU choice

            // Update user image based on their choice
            updateUserImage(sign);

            // Update CPU image based on random choice
            updateCompImage(cpuChoice);

            // Determine the winner of this round
            determineRoundWinner(sign, cpuChoice);

            // If all rounds are completed, determine the final winner
            if (roundCount === totalRounds) {
                setTimeout(determineFinalWinner, 2000); // Call final winner determination after a short delay
            }
        }, 1000);
    }
}

function updateUserImage(sign) {
    const imageMap = {
        rock: "https://brightsunp.github.io/web_practice/node/images/left_fist.png",
        paper: "https://upload.wikimedia.org/wikipedia/commons/a/af/Rock-paper-scissors_%28paper%29.png",
        scissors: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/800px-Rock-paper-scissors_%28scissors%29.png"
    };
    userImg.src = imageMap[sign]; // Update user image based on their choice
}

function updateCompImage(cpuChoice) {
    const imageMap = {
        rock: "https://brightsunp.github.io/web_practice/node/images/left_fist.png",
        paper: "https://upload.wikimedia.org/wikipedia/commons/a/af/Rock-paper-scissors_%28paper%29.png",
        scissors: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/800px-Rock-paper-scissors_%28scissors%29.png"
    };
    compImg.src = imageMap[cpuChoice]; // Update computer image based on CPU choice
}

function determineRoundWinner(userChoice, cpuChoice) {
    if (userChoice === cpuChoice) {
        // It's a draw
        gameMsg.textContent = "It's a Draw!";
    } else if (
        (userChoice === 'rock' && cpuChoice === 'scissors') ||
        (userChoice === 'paper' && cpuChoice === 'rock') ||
        (userChoice === 'scissors' && cpuChoice === 'paper')
    ) {
        // User wins
        userScore++;
        gameMsg.textContent = "You Win!";
    } else {
        // CPU wins
        compScore++;
        gameMsg.textContent = "You Lose!";
    }

    // Update the score display
    document.getElementById('score1').textContent = userScore; // Update user score
    document.getElementById('score2').textContent = compScore; // Update CPU score
}

function determineFinalWinner() {
    let finalResult;
    if (userScore > compScore) {
        finalResult = "You are the Winner!";
    } else if (compScore > userScore) {
        finalResult = "CPU is the Winner!";
    } else {
        finalResult = "It's a Draw!";
    }

    winMsg.textContent = finalResult;
    winMsg.style.display = "block"; // Show win message
}

resetBtn.addEventListener("click", resetGame); // Add event listener for reset button

function resetGame() {
    roundCount = 0;
    userScore = 0;
    compScore = 0;
    roundBanner.textContent = "Round 0"; // Reset round display
    document.getElementById('score1').textContent = userScore; // Reset user score display
    document.getElementById('score2').textContent = compScore; // Reset CPU score display
    winMsg.textContent = ""; // Clear win message
    winMsg.style.display = "none"; // Hide win message

    // Hide banners
    banner.classList.remove("visible");
    document.querySelector("#step2").classList.remove("visible");
}
