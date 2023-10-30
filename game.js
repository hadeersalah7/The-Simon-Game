let userClickedPattern = [];

let gamePatern = [];
const buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

// detect when a user click on any button
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// function to compare the user's answer with the associated level
const checkAnswer = (currentLevel) => {
  if (gamePatern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePatern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    // if the user enters a wrong awnser
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }
};

// detect the clicked button(square), push it to the array and envoke some functions calls
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColours[randomNumber];
  gamePatern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
};

// function to create a sound when any square is clicked
const playSound = (name) => {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// function to make th squares animate with the specific class name
const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// when losing the game a function to start over
const startOver = () => {
  level = 0;
  gamePatern = [];
  started = false;
};
