let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

$("body").keypress(function() {
    if(!started) {
        started = true;
        $("h1").text("Level 0")
        nextSequence();
    }
})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed")
    setTimeout(function() {
        $(`.${currentColour}`).removeClass("pressed")
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

