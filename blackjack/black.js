//blackjack game javasript 
let blackjackgame = {
    'you': { 'scoreSpan': '#your-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'A', 'K', 'J'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Q': 10, 'A': [1, 11], 'K': 10, 'J': 10 },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver':false,
    
};
const You = blackjackgame['you'];
const Dealer = blackjackgame['dealer'];

const histSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSonud = new Audio('sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackhit);
document.querySelector('#dealer-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);

function blackjackhit() {
    if (blackjackgame['isStand'] === false) {
        let card = randomCards();
        updateScore(card, You);
        showCard(card, You);
        showScore(You);
    }
    
}

function randomCards() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        histSound.play();
}
    }
    
function blackjackDeal() {
    if (blackjackgame['turnsOver'] === true) {
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImage.length; i++) { yourImage[i].remove(); }
        for (let i = 0; i < dealerImages.length; i++) { dealerImages[i].remove(); }
        You['score'] = 0;
        Dealer['score'] = 0;
        document.querySelector('#dealer-result').textContent = 0;
        document.querySelector('#your-result').textContent = 0;
        document.querySelector('#your-result').style.color = 'black';
        document.querySelector('#dealer-result').style.color = 'black';
        document.querySelector('#blackjack-result').textContent = "let\'s play ";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackgame['turnsOver'] = true;

    }
    
   
    blackjackgame['isStand'] = false;

}
function updateScore(card, activePlayer) {
    //decide value of A 1 or 11
    if (card === 'A') {
        
        if (activePlayer['score'] + blackjackgame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackgame['cardsMap'][card][1];
        }
        else {
            
            activePlayer['score'] += blackjackgame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer.score += blackjackgame['cardsMap'][card];
}
    }
    
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
        
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic() {
    blackjackgame['isStand'] = true;
    while(Dealer['score'] <= 16 &&(blackjackgame['isStand'] ===true)) {
        
        
        let card = randomCards();
        showCard(card, Dealer);
        updateScore(card, Dealer);
        showScore(Dealer);
        await sleep(1000);
    }
    
    
    blackjackgame['turnsOver'] = true;
    let winner = computeWiner();
    showResult(winner);
        
    
    

}
// decide winner and update table.
function computeWiner() {
    let winner;
    if (You['score'] <= 21) {
        if (You['score'] > Dealer['score'] || (Dealer['score'] > 21)) {
            console.log('you win');
            winner = You;
        }
        else if (You['score'] < Dealer['score']) {
            console.log('you lost!');
            winner = Dealer;

        }
        else if (You['score'] === Dealer['score']) {
            console.log('you draw');
           
            
        }

    }
    else if (You['score'] > 21 && Dealer['score'] <= 21) {
         console.log('you lost!');
         winner = Dealer;
    } else if (You['score'] > 21 && Dealer['score'] > 21) {
        console.log('you draw');
    }
    console.log('The winner is : ', winner);
    //update losses, wins and drows
    if (winner === You) {
        blackjackgame['wins']++;
    }
    else if (winner === Dealer) {
        blackjackgame['losses']++;
    }
    else {
        blackjackgame['draws']++;
    }
    console.log(blackjackgame);
    return winner;
} 

function showResult(winner) {
    if (blackjackgame['turnsOver']===true){
        let message, messageColor;
        if (winner === You) {
            message = 'You win!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === Dealer) {
            message = 'You lost!';
            messageColor = 'red';
            lossSonud.play();
            
        }
        else {
            messageColor = 'black';
            message = 'You drow';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
        document.querySelector('#win').textContent = blackjackgame['wins'];
        document.querySelector('#lose').textContent = blackjackgame['losses'];
        document.querySelector('#draw').textContent = blackjackgame['draws'];
        }
}
