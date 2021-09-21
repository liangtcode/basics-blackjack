// Initialise the card deck representation as an array of objects
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 10,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 10,
  },
  {
    name: "king",
    suit: "spades",
    rank: 10,
  },
];

// Initialise static variables for game status
var GAME_STATUS_SHUFFLE_DECK = "SHUFFLE DECK";
var GAME_STATUS_INITIAL_DEAL = "INITIAL DEAL";
var GAME_STATUS_DISPLAY_CARDS = "DISPLAY CARDS";
var GAME_STATUS_HUMAN_DECIDES = "HUMAN DECIDES";
var GAME_STATUS_HUMAN_STANDS = "HUMAN STANDS";
var GAME_STATUS_HUMAN_HITS = "HUMAN HITS";
var GAME_STATUS_RESULTS = "RESULTS";

// Initialise static variables for hit or stand
var HIT = "h";
var STAND = "s";

// Initialise game status
var gameStatus = GAME_STATUS_SHUFFLE_DECK;

// Initialise card arrays
var humanCards = [];
var dealerCards = [];

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the deck array
var shuffleCards = function (deck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < deck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};

// get sum of player cards
var cardSum = function (playerCards) {
  var sum = 0;

  var counter = 0;
  while (counter < playerCards.length) {
    sum = sum + playerCards[counter].rank;
    counter += 1;
  }

  return sum;
};

// check for BlackJack
var checkBlackJack = function (playerCards) {
  var ifBlackJack = Boolean;

  var sum = cardSum(playerCards);
  if (sum == 21) {
    ifBlackJack = true;
  } else {
    ifBlackJack = false;
  }

  return ifBlackJack;
};

// check for bust
var checkBust = function (playerCards) {
  var ifBust = Boolean;

  var sum = cardSum(playerCards);
  if (sum > 21) {
    ifBust = true;
  } else {
    ifBust = false;
  }

  return ifBust;
};

// check winner
var getWinner = function (humanCards, dealerCards) {
  var winner = "";
  var humanCardSum = cardSum(humanCards);
  var dealerCardSum = cardSum(dealerCards);

  if (humanCardSum > dealerCardSum) {
    winner = "human";
  } else if (dealerCardSum > humanCardSum) {
    winner = "dealer";
  } else {
    winner = "tie";
  }
  return winner;
};

// create display cards message
var displayCards = function (humanCards, dealerCards) {
  var msg = "";

  // if game ended, create message to display all cards
  if (gameStatus == GAME_STATUS_RESULTS) {
    var humanCardsCounter = 0;
    // create message for all human cards
    while (humanCardsCounter < humanCards.length) {
      msg =
        msg +
        `Player card ${humanCardsCounter + 1}: ${
          humanCards[humanCardsCounter].name
        } of ${humanCards[humanCardsCounter].suit}. <br>`;

      humanCardsCounter += 1;
    }

    var dealerCardsCounter = 0;
    // add to message for all dealer cards
    while (humanCardsCounter < humanCards.length) {
      msg =
        msg +
        `Dealer card ${dealerCardsCounter + 1}: ${dealerCards[0].name} of ${
          dealerCards[0].suit
        }. <br>`;

      humanCardsCounter += 1;
    }
    // else for all other game statuses, create message to display all human cards plus first card of dealer
  } else {
    var humanCardsCounter = 0;
    // create message for all human cards
    while (humanCardsCounter < humanCards.length) {
      msg =
        msg +
        `Player card ${humanCardsCounter + 1}: ${
          humanCards[humanCardsCounter].name
        } of ${humanCards[humanCardsCounter].suit}. <br>`;

      humanCardsCounter += 1;
    }
    // add dealer's first card to message
    msg =
      msg +
      `Dealer card 1: ${dealerCards[0].name} of ${dealerCards[0].suit}. <br>`;
  }
  return msg;
};

// main function
var main = function (input) {
  var myOutputValue = "";
  var shuffledDeck = shuffleCards(deck);

  if (gameStatus == GAME_STATUS_SHUFFLE_DECK) {
    humanCards = [];
    dealerCards = [];

    var counter = 0;
    while (counter < 2) {
      humanCards[counter] = shuffledDeck.pop();
      dealerCards[counter] = shuffledDeck.pop();
      counter += 1;
    }
    console.log("Human cards are:");
    console.log(humanCards);
    console.log("Dealer cards are:");
    console.log(dealerCards);

    gameStatus = GAME_STATUS_DISPLAY_CARDS;

    myOutputValue = "Deck shuffled. Press submit to deal cards.";
  } else if (gameStatus == GAME_STATUS_DISPLAY_CARDS) {
    myOutputValue = displayCards(humanCards, dealerCards);

    // if human cards hit black jack
    if (checkBlackJack(humanCards) == true) {
      myOutputValue =
        myOutputValue +
        "Player hits Black Jack. Player wins. <br> Press submit to play again.";
      gameStatus = GAME_STATUS_SHUFFLE_DECK;
      // else human does not hit black jack
    } else {
      myOutputValue = myOutputValue + "Type h for hit or s for stand.";

      gameStatus = GAME_STATUS_HUMAN_DECIDES;
    }
  } else if (gameStatus == GAME_STATUS_HUMAN_DECIDES) {
    if (input == HIT) {
      gameStatus = GAME_STATUS_HUMAN_HITS;
    } else if (input == STAND) {
      gameStatus = GAME_STATUS_HUMAN_STANDS;
      myOutputValue = "Player stands. Dealer will deal own cards.";
    }
  } else if (gameStatus == GAME_STATUS_HUMAN_STANDS) {
    // set game status to Results
    gameStatus = GAME_STATUS_RESULTS;
    // if human decides to stand then display all human and dealer cards
    myOutputValue = displayCards(playerCards, dealerCards);
  } else if (gameStatus == GAME_STATUS_HUMAN_HITS) {
    // if human decides to hits then deal one more card for human
    humanCards.push(shuffledDeck.pop());
    gameStatus = GAME_STATUS_DISPLAY_CARDS;
  }

  console.log("end game status:");
  console.log(gameStatus);

  var winner = getWinner(humanCards, dealerCards);

  return myOutputValue;
};
