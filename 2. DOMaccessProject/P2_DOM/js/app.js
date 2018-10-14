// Global Variables
let cardList = [];
let shuffledDeck = [];
let openCardsStatus = 0;
let openCardLists =[]
let card1 = "";
let card2 = "";
let cards = document.getElementsByClassName('card');
let totalClickCount = 0
let totalClickDisplay = document.querySelector('.moves');
const restart = document.querySelector('.restart')
const frame = document.getElementsByTagName('ul')[1];

//allEventListener
frame.addEventListener("click",function(event){if (event.target.tagName === "LI"){
  display(event)}
});
restart.addEventListener("click",reset);


//initiliaze the randomization of deck
function randomizeDeck (){
  //create Deck from HTML and removes elements that don't belong there
  function deckCreator () {
    deckContent = Array.from(cards);
    for (var i = 0; i < deckContent.length; i++) {
      deckContent[i].classList.remove("match")
      deckContent[i].classList.remove("open")
      deckContent[i].classList.remove("show")
    }
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  // conduct randomization on Deck (deckCreator)
  deckCreator()
  shuffledDeck = shuffle(deckContent)

  for (var i = 0; i < cards.length; i++) {
      cards[i].innerHTML = shuffledDeck[i].innerHTML
  }
}


//display an open card on click
function display(event){
      //opens card
      function open(event){
      event.target.classList.add("open");
      event.target.classList.add("show");
      }

    //some logic to make sure only 2 cards is open
    if (openCardsStatus === 0) {
      open(event)
      openCardsStatus = 1;
      openCardLists.push(event.target)
    } else if (openCardsStatus === 1) {
      openCardsStatus = 2;
      open(event)
      openCardLists.push(event.target)
      totalClickCount += 1
      totalClickDisplay.innerHTML = totalClickCount
      setTimeout(checkMatch, 1000)
    }


}

//Check if the cards that are opened matched
function checkMatch(event){
    card1 = openCardLists[0];
    card2 = openCardLists[1];
    if (card1.firstElementChild.className === card2.firstElementChild.className) {
      card1.classList.add("match")
      card2.classList.add("match")
      card1 = ""
      card2 = ""
    } else {
      card1.classList.remove("open")
      card1.classList.remove("show")
      card2.classList.remove("open")
      card2.classList.remove("show")
    }
    openCardsStatus = 0;
    openCardLists = [];
}

//resets the whole thing

function reset(){
  randomizeDeck ()
  totalClickCount = 0
  }


  randomizeDeck ()



/*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
