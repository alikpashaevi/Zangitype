const randomWords = [
  "house", "car", "water", "food", "book", "computer", "phone", "chair", "table", "bed",
  "sun", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "tree", "flower",
  "bird", "fish", "cat", "dog", "cow", "horse", "sheep", "pig", "chicken", "snake",
  "man", "woman", "child", "boy", "girl", "parent", "teacher", "doctor", "friend", "family",
  "big", "small", "long", "short", "high", "low", "wide", "narrow", "deep", "shallow",
  "hot", "cold", "wet", "dry", "happy", "sad", "angry", "tired", "hungry", "thirsty",
  "in", "out", "on", "off", "up", "down", "left", "right", "front", "back",
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "see", "hear", "smell", "taste", "touch", "think", "know", "believe", "remember", "forget",
  "come", "go", "walk", "run", "jump", "play", "eat", "drink", "sleep", "talk",
  "like", "love", "hate", "want", "need", "give", "take", "help", "make", "look",
  "yes", "no", "stop", "wait", "go on", "turn", "open", "close", "find", "lose",
  "red", "green", "blue", "yellow", "orange", "purple", "black", "white", "gray", "pink",
  "day", "night", "morning", "afternoon", "evening", "week", "month", "year", "time",
  "world", "life", "death", "peace", "war", "freedom", "love", "hate", "hope", "fear",
  "book", "paper", "pen", "pencil", "ruler", "scissors", "glue", "tape", "computer", "mouse",
  "table", "chair", "bed", "sofa", "lamp", "door", "window", "wall", "floor", "ceiling"
];


let allTypedWords = 0;
let uncorrectWords = 0;
count = 30;



//first code


for (let i = 0; i < 60; i++) {
  let randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  let words = "";
  words += randomWord;
  let div = document.createElement("div");
  div.setAttribute('class', 'random-word');
  document.getElementById("words").appendChild(div);
  [...randomWord].forEach(letter => {
    let span = document.createElement("span");
    span.innerHTML = letter;
    div.appendChild(span);
    span.style.opacity = 0.4;
  });
}

// let displayedWords = String(words.textContent);

let displayedWords = [];

// Loop through each div element containing words
document.querySelectorAll('.random-word').forEach(div => {
    displayedWords = displayedWords.concat(div.textContent.split(" "));
});



function refreshPage(){
  window.location.reload();
} 



//------------------------------

// Function to update the countdown timer

function updateTimer() {
  document.querySelector(".timer").innerHTML = count;
  count--;

  if (count < 0) {
    clearInterval(timer); // Stop the timer when count reaches 0
    document.querySelector(".timer").innerHTML = "Time's up!";
    document.querySelector(".words").innerHTML = "WPM: " + wpm;
  }
}

let displayedWordsWithSpaces = displayedWords.map(word => word + " ");

function speedTyping(words) {
  let currentWordIndex = 0;
  let currentLetterIndex = 0;
  let wordsContainer = document.querySelector('.words');
  let timerStarted = false; // Flag to track if the timer has been started

  function calculateWPM() {
    return Math.floor(((allTypedWords / 5) - uncorrectWords) * 2);
  }

  document.addEventListener('keydown', function(event) {
    wpm = calculateWPM();
    const currentWord = words[currentWordIndex];
    const currentLetter = currentWord[currentLetterIndex];
    let currentSpan = wordsContainer.children[currentWordIndex].children[currentLetterIndex];

    if (!timerStarted && event.key === currentLetter) {
      updateTimer();
      timerStarted = true; 
      timer = setInterval(updateTimer, 1000);
    }

    if (event.key === currentLetter) {
      if (currentSpan && currentLetter !== " ") {
        allTypedWords++;
        currentSpan.style.opacity = 1;
        // currentSpan.classList.add('cursor')
      }
      currentLetterIndex++;

      if (currentLetterIndex === currentWord.length) {
        currentWordIndex++;
        currentLetterIndex = 0;
      }
    } else if (event.key === " " && currentLetterIndex === currentWord.length) {
      currentWordIndex++;
      currentLetterIndex = 0;
    } else if (event.key === "Backspace") {
      if(uncorrectWords > 0){
        uncorrectWords--;
      }else {
        allTypedWords--;
      }
      if (currentLetterIndex > 0) {
        currentLetterIndex--;
        currentSpan = wordsContainer.children[currentWordIndex].children[currentLetterIndex];
        currentSpan.style.opacity = 0.4;
        currentSpan.style.color = "white";
      } else if (currentWordIndex > 0) {
        // If at the beginning of a word, move to the previous word
        currentWordIndex--;
        currentLetterIndex = words[currentWordIndex].length - 1;
        currentSpan = wordsContainer.children[currentWordIndex].children[currentLetterIndex];
        currentSpan.style.opacity = 0.4;
        currentSpan.style.color = "white";
      }
    } else if (event.key !== currentLetter && currentSpan && currentLetter !== " ") {
      currentSpan.style.opacity = 1;
      currentSpan.style.color = "red";
      currentLetterIndex++;
      uncorrectWords++;
    }
  });
}



speedTyping(displayedWordsWithSpaces);


