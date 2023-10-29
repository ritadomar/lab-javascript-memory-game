const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

const memoryGame = new MemoryGame(cards);
// shuffling the cards for a different order every time
memoryGame.shuffleCards();

window.addEventListener('load', event => {
  // creating a variable called html that is an empty string
  let html = '';

  // selecting each card object from the card array, using the different properties to create the different cards
  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;
  /*   document.querySelector('#pairs-clicked').innerHTML = memoryGame.pairsClicked;
  document.querySelector('#pairs-guessed').innerHTML = memoryGame.pairsGuessed; */

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      console.log(`Card clicked: ${card}`);

      // cards only get added if the array is shorter than 2
      if (memoryGame.pickedCards.length < 2) {
        // adds class "turned" to the card, if it doesn't have it, removes it if it does have it
        // HTMLElement.classList.toggle('className')
        card.classList.toggle('turned');

        // pushing the name of the cards for comparison
        memoryGame.pickedCards.push(card.getAttribute('data-card-name'));
      }
      // creating variables for picked cards & paircheck function for easy access
      const card1 = memoryGame.pickedCards[0];
      const card2 = memoryGame.pickedCards[1];
      const checkFunction = memoryGame.checkIfPair(card1, card2);

      // creating a variable to access all cards with class="turned"
      const turnedCards = document.querySelectorAll('.turned');

      // conditionals for the click event
      // if cards are the same & the array is full
      if (checkFunction && memoryGame.pickedCards.length === 2) {
        // all turned cards become blocked cards
        turnedCards.forEach(card => {
          card.classList.add('blocked');
          card.classList.remove('turned');
        });

        // empties picked cards array
        memoryGame.pickedCards = [];

        // updates score
        memoryGame.updateScore();

        // everytime a pair is found, checks if the game is over
        if (memoryGame.checkIfFinished()) {
          // after 500ms, we win
          setTimeout(() => {
            // window.alert('You won!');
            const winnerScreen = document.getElementById('winner');
            const message = document.createElement('div');
            message.setAttribute('id', 'message');
            winnerScreen.appendChild(message);
            const title = document.createElement('h2');
            title.innerHTML = 'You Won!';
            message.appendChild(title);
            const restartButton = document.createElement('button');
            restartButton.setAttribute('class', 'restart');
            restartButton.innerHTML = 'Restart Game';
            restartButton.addEventListener('click', () => {
              location.reload();
            });
            const finalScores = [...document.querySelectorAll('#score p')];

            finalScores.forEach(paragraph => {
              message.appendChild(paragraph);
            });

            message.appendChild(restartButton);

            winnerScreen.style.display = 'block';
          }, 500);
        }
        // when it's not a pair. important to have length because check if pair always returns false if length < 2
      } else if (!checkFunction && memoryGame.pickedCards.length === 2) {
        // after 1 second, cards turn back
        setTimeout(() => {
          turnedCards.forEach(card => {
            card.classList.toggle('turned');
          });
        }, 1000);
        // cleans array
        memoryGame.pickedCards = [];

        // updates score
        memoryGame.updateScore();
      }
    });
  });
});
