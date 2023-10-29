class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }
  // added method to calculate pairs. game will always have 24 cards, but this way is more dynamic
  calculatePairs() {
    if (this.cards !== undefined) {
      return this.cards.length / 2;
    }
  }

  shuffleCards() {
    // ... write your code here
    // checking if a parameter is passed
    if (this.cards !== undefined) {
      let shuffledCards = [];
      for (let i = this.cards.length; i > 0; i--) {
        let k = Math.floor(Math.random() * this.cards.length);
        shuffledCards.push(this.cards[k]);
        this.cards.splice(k, 1);
      }
      this.cards = shuffledCards;
    }
  }

  // created an extra method to update the score. this method is called everytime the check if pair is called
  updateScore() {
    const pairsClicked = document.getElementById('pairs-clicked');
    pairsClicked.innerHTML = this.pairsClicked;
    const pairsGuessed = document.getElementById('pairs-guessed');
    pairsGuessed.innerHTML = this.pairsGuessed;
  }

  // added the update score method to the checkIfPair method
  checkIfPair(card1, card2) {
    // ... write your code here
    if (card1 === card2) {
      this.pairsClicked++;
      this.pairsGuessed++;
      // this.updateScore();
      return true;
    } else if (card1 !== card2 && card2 !== undefined) {
      this.pairsClicked++;
      // this.updateScore();
      return false;
    }
  }

  // check if finished will return true every time the number of pairs guessed is the same as the number returner by calculatePairs()
  checkIfFinished() {
    // ... write your code here
    if (this.pairsGuessed === this.calculatePairs()) {
      return true;
    } else {
      return false;
    }
  }
}
