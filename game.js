let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
const localStorageKey = 'score';
updateHighScore(0);

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
        $("h1").text("Level 0");
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
        }, 200);
        updateHighScore(gamePattern.length - 1);
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
    gamePattern.forEach((el, index) => {
        setTimeout(function() {
            $(`#${el}`).fadeIn(100).fadeOut(100).fadeIn(100)
            playSound(el);
        }, 500 * index)
    })
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.volume = 0.3;
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

function updateHighScore(score) {
    const highScore = localStorage.getItem(localStorageKey);
    if(highScore) {
        const newScore = highScore > score ? highScore : score;
        localStorage.setItem(localStorageKey, newScore.toString());
    } else {
        localStorage.setItem(localStorageKey, score.toString());
    };
    $("#score").text("High Score: " + localStorage.getItem(localStorageKey));

}