var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    $("#" + randomChosenColour).fadeOut().fadeIn();
};

function playSound(name) {
    var sequenceAudio = new Audio("sounds/" + name + '.mp3');
    sequenceAudio.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(removePressed, 100);
    function removePressed() {
        $("#" + currentColour).removeClass("pressed");
    };
};

function checkAnswer() {
    var correctAnswer = true;
    for (i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            correctAnswer = false;
            gameOver();
            break;
        }
    };
    if (correctAnswer === true) {
        $("#level-title").text("Correct!");
        setTimeout(nextSequence, 1000);
    }
};

function gameOver() {
    started = false;
    level = 0;
    gamePattern = [];
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function () { $("body").removeClass("game-over") }, 200);
    $("#level-title").text("Game Over! Press a key to Restart");
};

$(document).keydown(function () {
    if (started === false) {
        started = true;
        nextSequence();
    };
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer();
    };
}); 