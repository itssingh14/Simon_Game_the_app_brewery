var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var level = 1;
var flag = 0;
var checked;

function nextSequence(){
    return(Math.floor(Math.random() * 4));
}

$("body").keypress(function(){
    if(flag==0){
    if(event.code == 'KeyA'){
        flag = 1;
        gamePattern = [];
        userClickedPattern = [];
        level = 1;
        game();
    }
}
});

function game(){
    if(flag){
        checked = 0;
        $("#level-title").text("Level " + level);
        randomChosenColor = buttonColor[nextSequence()];
        $("#"+randomChosenColor).fadeOut(500).fadeIn(500);
        gamePattern.push(randomChosenColor);
    }
}

$("div.btn").click(function(){
    if(flag){
    var choosenButton = this.id;
    player(choosenButton);
    userClickedPattern.push(choosenButton);
    console.log(gamePattern);
    console.log(userClickedPattern);
    console.log("checked : "+checked);
    validator(userClickedPattern[checked], gamePattern[checked]);
    }
});

function player(cb){
    $("."+cb).addClass("pressed");
    setTimeout(() => {
        $("."+cb).removeClass("pressed");
    }, 40);
}

function validator(x, y){
    console.log("x : "+x+" and y : "+y);
    if(x != y){
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }, 200);
        $("body").keypress(function(){
            gamePattern = [];
            userClickedPattern = [];
            level = 1;
            game();
        });
    }
    else{
        new Audio("sounds/"+ x + ".mp3").play();
        checked++;
        if(checked == gamePattern.length){
            userClickedPattern = [];
            level++;
            game();
        }
    }
}