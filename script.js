const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const restartButton = document.getElementById('restart-button');

let moves = 0;
let flippedCards = [];
let matchedCards = [];

const cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🍑'];
const deck = [...cardSymbols, ...cardSymbols]; // 8 farklı simgenin 2 kez kullanıldığı kart destesi

// Rastgele karıştırma algoritması
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = ''; // Oyun tahtasını sıfırlıyoruz
    shuffle(deck); // Kartları karıştırıyoruz

    deck.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol; // Her karta bir simge veriyoruz
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    const clickedCard = event.target;

    // Kart zaten açık veya eşleşmişse işlem yapma
    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    // Kartı çevir
    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.symbol;
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Eşleşme varsa
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === deck.length) {
            setTimeout(() => alert('Congratulations! You have matched all the cards!'), 500);
        }
    } else {
        // Eşleşme yoksa kartları tekrar kapat
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }

    moves++;
    movesCounter.textContent = moves;
}

function restartGame() {
    moves = 0;
    movesCounter.textContent = moves;
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

// Oyun başlatma ve sıfırlama butonları
restartButton.addEventListener('click', restartGame);

createBoard();
