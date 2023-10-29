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
      // adds class "turned" to the card, if it doesn't have it, removes it if it does have it
      // HTMLElement.classList.toggle('className')
      if (memoryGame.pickedCards.length < 2) {
        card.classList.toggle('turned');
        memoryGame.pickedCards.push(card.getAttribute('data-card-name'));
        const card1 = memoryGame.pickedCards[0];
        const card2 = memoryGame.pickedCards[1];
        const check = memoryGame.checkIfPair(card1, card2);

        const turnedCards = document.querySelectorAll('.turned');
        if (check && memoryGame.pickedCards.length === 2) {
          turnedCards.forEach(card => {
            card.classList.add('blocked');
            card.classList.remove('turned');
          });
          memoryGame.pickedCards = [];
          if (memoryGame.checkIfFinished()) {
            setTimeout(() => {
              window.alert('You won!');
            }, 500);
          }
        } else if (!check && memoryGame.pickedCards.length === 2) {
          setTimeout(() => {
            turnedCards.forEach(card => {
              card.classList.toggle('turned');
            });
          }, 1000);

          memoryGame.pickedCards = [];
        }
      }
    });
  });
});
