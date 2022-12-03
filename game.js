var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var clickNo = 0;

$(document).on("keydown", function() {
    if(started == false) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }    
});

$(".btn").on("click", function() {
    if(started == true && clickNo < level) {
        let userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        answer = checkAnswer(clickNo);
        if(answer) {
            clickNo++;
        } else {
            setTimeout(gameOver, 100);
        }
    } 

    if(answer == true && clickNo == level) {
        moveLevel();
        setTimeout(nextSequence, 500);
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = getRandomNumber(0, buttonColours.length); //Exclusive upper limit
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    var idColor = "#" + randomChosenColour;
    $(idColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

function moveLevel() {
    let greetings = ["Good!", "Bravo!", "Amazing!", "Fantastic!", "Genius!", "Keep Going!"];
    let index = getRandomNumber(0, greetings.length);
    let greeting = greetings[index];
    $("#level-title").text(greeting);
    clickNo = 0;
    userClickedPattern = [];
}

function gameOver() {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
        $("body").removeClass("game-over");
        //$("#level-title").css("margin-top", "1%");
        $("#level-title").text("Game Over, Press Any Key to Restart!");
        startOver();
    }, 200);
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    clickNo = 0;
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {    
        return true;           
    } else {
        return false;        
    }
}

function animatePress(currentColour) {
    var idColor = "#" + currentColour;
    $(idColor).addClass("pressed");
    setTimeout(function() {
        $(idColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function getRandomNumber(low, high) {
    let rand = Math.random();
    rand = Math.floor((rand * (high - low)) + low);
    return rand;
}