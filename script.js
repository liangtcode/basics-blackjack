// Initialise static variables for game status
var GAME_STATUS_SHUFFLE_DECK = "SHUFFLE DECK";
var GAME_STATUS_DISPLAY_CARDS = "DISPLAY CARDS";
var GAME_STATUS_HUMAN_DECIDES = "HUMAN DECIDES";
var GAME_STATUS_RESULTS = "RESULTS";

// Initialise static variables for hit or stand
var HIT = "h";
var STAND = "s";

// Initialise game status
var gameStatus = GAME_STATUS_SHUFFLE_DECK;

// Initialise card arrays
var humanCards = [];
var dealerCards = [];

// Function to create the card deck representation as an array of objects
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Intialise an arrage of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitEmoji = ["♣️", "♠️", "♦️", "♥️"];
  var nameEmoji = [
    "A",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "9️⃣",
    "8️⃣",
    "🔟",
    "🕺🏽",
    "👸🏽",
    "🤴🏽",
  ];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentEmoji = suitEmoji[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var currentRank = rankCounter;
      var currentNameEmoji = nameEmoji[rankCounter - 1];

      // if rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        currentRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        currentRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        currentRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
        emoji: currentEmoji,
        nameEmoji: currentNameEmoji,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Initialise the card deck
var deck = makeDeck();

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

// get sum of an array of card objects
var cardSum = function (playerCards) {
  var sum = 0;
  var numOfAce = 0;

  var counter = 0;
  // calculate sum assuming all Aces are value 1 and counts how many aces there are in the hand
  while (counter < playerCards.length) {
    // ace counter
    if (playerCards[counter].rank == 1) {
      numOfAce += 1;
    }
    // sum of card rank
    sum = sum + playerCards[counter].rank;
    counter += 1;
  }

  // adjust sum if there is at least one ace
  if (numOfAce > 0) {
    // higher sum assuming 1 ace has value 11
    var highSum = sum + 10;

    if (highSum < 22) {
      sum = highSum;
    }
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

// get which player has higher card sum
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
          humanCards[humanCardsCounter].nameEmoji
        } of ${humanCards[humanCardsCounter].emoji}. <br>`;

      humanCardsCounter += 1;
    }

    msg = msg + "<br>";

    var dealerCardsCounter = 0;
    // add to message for all dealer cards
    while (dealerCardsCounter < dealerCards.length) {
      msg =
        msg +
        `Dealer card ${dealerCardsCounter + 1}: ${
          dealerCards[dealerCardsCounter].nameEmoji
        } of ${dealerCards[dealerCardsCounter].emoji}. <br>`;

      dealerCardsCounter += 1;
    }

    msg = msg + "<br>";

    // if human only has two cards, check for Black Jack
    if (humanCards.length == 2) {
      if (checkBlackJack(humanCards)) {
        msg =
          msg +
          `Player hits Black Jack. PLAYER WINS. <br> Player total is ${cardSum(
            humanCards
          )}. Dealer total is ${cardSum(
            dealerCards
          )}. <br><br> Click submit to play again.`;
        gameStatus = GAME_STATUS_SHUFFLE_DECK;
        return msg;
        // else check if dealer bust
      } else if (checkBust(dealerCards)) {
        msg =
          msg +
          `Dealer busts. PLAYER WINS. <br> Player total is ${cardSum(
            humanCards
          )}. Dealer total is ${cardSum(
            dealerCards
          )}. <br><br>Click submit to play again.`;
        gameStatus = GAME_STATUS_SHUFFLE_DECK;
        return msg;
      }
      // else if human has more than two cards, check if human busts
    } else if (checkBust(humanCards)) {
      msg =
        msg +
        `Player busts. DEALER WINS. <br> Player total is ${cardSum(
          humanCards
        )}. Dealer total is ${cardSum(
          dealerCards
        )}. <br><br>Click submit to play again.`;
      gameStatus = GAME_STATUS_SHUFFLE_DECK;
      return msg;
      // else check if dealer busts
    } else if (checkBust(dealerCards)) {
      msg =
        msg +
        `Dealer busts. PLAYER WINS. <br> Player total is ${cardSum(
          humanCards
        )}. Dealer total is ${cardSum(
          dealerCards
        )}. <br><br>Click submit to play again.`;
      gameStatus = GAME_STATUS_SHUFFLE_DECK;
      return msg;
    }

    // Initialise winner
    var winner = getWinner(humanCards, dealerCards);

    // add to output message based on winner
    if (winner == "human") {
      msg = msg + "PLAYER WINS! <br>";
    }
    if (winner == "dealer") {
      msg = msg + "DEALER WINS! <br>";
    }
    if (winner == "tie") {
      msg = msg + "IT'S A TIE. <br>";
    }

    // add player and dealer totals to message
    msg =
      msg +
      `Player total is ${cardSum(humanCards)}. Dealer total is ${cardSum(
        dealerCards
      )} <br><br>Click submit to play again!`;

    gameStatus = GAME_STATUS_SHUFFLE_DECK;

    // else for all other game statuses, create message to display all human cards plus first card of dealer
  } else {
    var humanCardsCounter = 0;
    // create message for all human cards
    while (humanCardsCounter < humanCards.length) {
      msg =
        msg +
        `Player card ${humanCardsCounter + 1}: ${
          humanCards[humanCardsCounter].nameEmoji
        } of ${humanCards[humanCardsCounter].emoji}. <br>`;

      humanCardsCounter += 1;
    }
    // add dealer's first card to message
    msg =
      msg +
      `<br> Dealer card 1: ${dealerCards[0].nameEmoji} of ${dealerCards[0].emoji}.`;

    // give hint to human
    msg = msg + `<br><br> Player current total is ${cardSum(humanCards)}.`;
    if (cardSum(humanCards) < 13) {
      msg = msg + " You should hit.";
    } else if (cardSum(humanCards) > 12 && cardSum(humanCards) < 17) {
      msg = msg + " Tricky! Think about about you want to hit or stand.";
    } else if (cardSum(humanCards > 16) && cardSum(humanCards < 20)) {
      msg = msg + " You should probably stand.";
    } else {
      msg = msg + " You should stand.";
    }

    msg = msg + "<br><br> Type h for hit or s for stand.";
  }

  return msg;
};

// check if sum of cards is below 17
var isBelow17 = function (playerCards) {
  var belowOrNot = false;
  var sum = cardSum(playerCards);

  if (sum < 17) {
    belowOrNot = true;
  }

  return belowOrNot;
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

    if (checkBlackJack(humanCards)) {
      gameStatus = GAME_STATUS_RESULTS;
      myOutputValue = displayCards(humanCards, dealerCards);
      gameStatus = GAME_STATUS_SHUFFLE_DECK;
    } else {
      gameStatus = GAME_STATUS_DISPLAY_CARDS;
      myOutputValue = displayCards(humanCards, dealerCards);
      gameStatus = GAME_STATUS_HUMAN_DECIDES;
    }
  } else if (gameStatus == GAME_STATUS_HUMAN_DECIDES) {
    // check input to make sure it's "h" or "s"
    if (input !== HIT && input !== STAND) {
      myOutputValue = "Please input h for hit or s for stand";
      return myOutputValue;
    }
    // if human decides to hit
    if (input == HIT) {
      // deal another card to human
      humanCards.push(shuffledDeck.pop());
      // check if human busts
      if (checkBust(humanCards)) {
        gameStatus = GAME_STATUS_RESULTS;
        myOutputValue = displayCards(humanCards, dealerCards);
        gameStatus = GAME_STATUS_SHUFFLE_DECK;
      } else {
        gameStatus = GAME_STATUS_DISPLAY_CARDS;
        myOutputValue = displayCards(humanCards, dealerCards);
        gameStatus = GAME_STATUS_HUMAN_DECIDES;
      }
      // if human decides to stand
    } else if (input == STAND) {
      // deal out cards for dealer while dealer cards sum is less than 17
      while (isBelow17(dealerCards)) {
        dealerCards.push(shuffledDeck.pop());
      }
      // set game status to GAME_STATUS_RESULTS
      gameStatus = GAME_STATUS_RESULTS;
      myOutputValue = displayCards(humanCards, dealerCards);
    }
  }

  return myOutputValue;
};
