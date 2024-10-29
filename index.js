let firstCard = 10
let secondCard = 4
let cards = [firstCard, secondCard]
let sum = firstCard + secondCard
let hasBlackjack = false
let isAlive = true
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

let lastScoresEl = document.getElementById("last-scores")
let minScoreEl = document.getElementById("min-score")
let maxScoreEl = document.getElementById("max-score")
let averageScoreEl = document.getElementById("average-score")

let scores = JSON.parse(localStorage.getItem("scores")) || []

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum < 21) {
        message = "Do you want to draw a new card? 🙂"
    } else if (sum === 21) {
        message = "Woohoo! You've got Blackjack! 🥳"
        hasBlackjack = true
        updateScores(sum)
    } else {
        message = "You're out of the game! 😭"
        isAlive = false
        updateScores(sum)
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function startGame() {
    isAlive = true
    hasBlackjack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    return randomNumber === 1 ? 11 : randomNumber > 10 ? 10 : randomNumber
}

function updateScores(score) {
    scores.push(score)
    if (scores.length > 4) {
        scores.shift()
    }
    localStorage.setItem("scores", JSON.stringify(scores))
    displayStats()
}

function displayStats() {
    if (scores.length > 0) {
        lastScoresEl.textContent = "Last Scores: " + scores.join(", ")
        let minScore = Math.min(...scores)
        let maxScore = Math.max(...scores)
        let meanScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)

        minScoreEl.textContent = "Minimum Score: " + minScore
        maxScoreEl.textContent = "Maximum Score: " + maxScore
        averageScoreEl.textContent = "Average Score: " + meanScore
    } else {
        lastScoresEl.textContent = "Last Scores: No data"
        minScoreEl.textContent = "Minimum Score: No data"
        maxScoreEl.textContent = "Maximum Score: No data"
        averageScoreEl.textContent = "Average Score: No data"
    }
}

displayStats()
