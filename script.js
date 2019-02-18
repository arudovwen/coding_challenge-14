const cardsArray = [{
        name: '1',
        image: 'images/1.png'
    },
    {
        name: '2',
        image: 'images/7.png'
    },
    {
        name: '3',
        image: 'images/8.png'
    },
    {
        name: '4',
        image: 'images/9.png'
    },
    {
        name: '5',
        image: 'images/10.png'
    },
    {
        name: '6',
        image: 'images/11.png'
    },
    {
        name: '7',
        image: 'images/12.png'
    },
    {
        name: '8',
        image: 'images/13.png'
    },
]
let firstGuess = '';
let secondGuess = '';
let count = 0;
let prevClick = null;
let delay = 1200;
let movesCount = 0;




// move list
const moves = document.querySelector('#moves');
const moveList = () => {
    movesCount++;
    moves.innerHTML = `Your Moves: ${movesCount}`;
}
// default number of moves
moves.innerHTML = `Your Moves: ${movesCount}`;


// reset entire game
const resetGame = document.getElementById('reset-game');
resetGame.addEventListener('click', () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    movesCount = 0;
    moves.innerHTML = `Your Moves: ${movesCount}`;
    let match = document.querySelectorAll('.match');
    match.forEach(card => {
        card.classList.remove('match');
    })
    let selected = document.querySelectorAll('.is-flipped');
    selected.forEach(card => {
        card.classList.remove('is-flipped');
    })

})

//to match cards
const match = () => {
    let selected = document.querySelectorAll('.is-flipped');
    selected.forEach(card => {
        card.classList.add('match');
    })
}

// reset card if they dont match
const reset = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    let selected = document.querySelectorAll('.is-flipped');
    selected.forEach(card => {
        card.classList.remove('is-flipped');
    })
}



const game = document.getElementById('game')
const grid = document.createElement('section');
grid.classList.add('grid', 'board');
game.appendChild(grid);

// double cards
doubleCards = cardsArray.concat(cardsArray)
doubleCards.sort(() => 0.5 - Math.random());


doubleCards.forEach(element => {
    const card = document.createElement('div');
    card.classList.add('card');

    cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    cardFront.textContent = element.name;
    card.dataset.name = element.name;
    card.appendChild(cardFront);

    cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');
    cardBack.style.backgroundImage = `url(${element.image})`;
    card.appendChild(cardBack);
    grid.appendChild(card);




    // when card is clicked
    card.addEventListener('click', (event) => {
        const clicked = event.target;


        if (clicked.nodeName === 'SECTION' || card.classList.contains('is-flipped')) {
            return;

        }
        if (count < 2) {
            count++;

            if (count === 1) {
                firstGuess = card.dataset.name;
                card.classList.toggle('is-flipped')
            } else {
                secondGuess = card.dataset.name;
                card.classList.toggle('is-flipped')
            }


            if (firstGuess !== '' && secondGuess !== '') {
                moveList();

                if (firstGuess === secondGuess) {

                    setTimeout(match, delay);
                    setTimeout(reset, delay);



                } else {
                    setTimeout(reset, delay);
                }


            }

        }
        prevClick = clicked;
    })


})