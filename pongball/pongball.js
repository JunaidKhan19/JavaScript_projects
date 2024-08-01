const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.getElementById("scoretext");
const restartbtn = document.getElementById("restartbtn");
const gameWidth = gameboard.width;
const gameHeight = gameboard.height;
const boardBackground = "cornflowerblue" ;
const paddle1color = "green";
const paddle2color = "red";
const paddleborder = "black";
const paddlespeed = 50 ;
const ballcolor = "yellow";
const ballborder = "black";
const ballradius = 12.5;
let intervalID;
let ballspeed = 1 ;
let ballX = gameWidth/2;
let ballY = gameHeight/2;
let ballXdirection = 0 ;
let ballYdirection = 0 ;
let player1score = 0 ;
let player2score = 0 ;

let paddle1 = {
    width : 25 ,
    height : 100 ,
    x : 0 ,
    y : 0 ,
}

let paddle2 = {
    width : 25 ,
    height : 100 ,
    x : gameWidth-25 ,
    y : gameHeight-100 ,
}

window.addEventListener("keydown", changePaddleDirection); //for changing the direction of paddles
restartbtn.addEventListener("click", restartGame);

gameStart();

function gameStart(){
   createBall();
   nextTic();
}

function nextTic(){
    intervalID = setTimeout(() => {
     clearBoard();
     drawPaddles();
     moveBall();
     drawBall(ballX , ballY);
     checkCollision();
     nextTic();
    }, 10)
}

function drawPaddles(){
    ctx.strokeStyle = paddleborder
 
    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x , paddle1.y , paddle1.width , paddle1.height);
    ctx.strokeRect(paddle1.x , paddle1.y , paddle1.width , paddle1.height);
 
    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x , paddle2.y , paddle2.width , paddle2.height);
    ctx.strokeRect(paddle2.x , paddle2.y , paddle2.width , paddle2.height);
}

function changePaddleDirection(event){
    const keypressed = event.keyCode;
    const paddle1Up =87;
    const paddle1Down =83;
    const paddle2Up =38;
    const paddle2Down =40;
 
    switch (keypressed){
        case(paddle1Up) :
         if (paddle1.y > 0){
             paddle1.y -= paddlespeed;
         }
         break;
        case(paddle1Down) :
         if (paddle1.y < gameHeight - paddle1.height){
             paddle1.y += paddlespeed;
         } 
         break;
        case(paddle2Up) :
         if (paddle2.y > 0){
             paddle2.y -= paddlespeed;
         } 
         break;
        case(paddle2Down) :
         if (paddle2.y < gameHeight - paddle2.height){
             paddle2.y += paddlespeed;
         } 
         break;
    }
} 

function drawBall(ballX , ballY){
    ctx.fillStyle = ballcolor ;
    ctx.strokeStyle = ballborder ;
    ctx.lineWidth = 2 ;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballradius, 0 , 2* Math.PI);
    ctx.stroke();
    ctx.fill();
}

function createBall(){
   ballspeed = 1 ;
   ballX = gameWidth/2;
   ballY = gameHeight/2;
   if (Math.round(Math.random()) == 1){
    ballXdirection = 1 ;
   }
   else {
    ballXdirection = -1 ;
   }

   if (Math.round(Math.random()) == 1){
    ballYdirection = 1 ;
   }
   else {
    ballYdirection = -1 ;
   }

   drawBall(ballX , ballY);
}

function moveBall(){
    ballX += (ballspeed * ballXdirection);
    ballY += (ballspeed * ballYdirection);
}

function clearBoard(){
   ctx.fillStyle = boardBackground;
   ctx.fillRect(0, 0, gameWidth ,gameHeight)
}

function checkCollision(){
   //for bouncing off from top and bottom border
   if (ballY <= 0 + ballradius ){
       ballYdirection *= -1 ;
   }
   if (ballY >= gameHeight - ballradius ){
    ballYdirection *= -1 ;
   }
   // for gowing outside from players direction
   if (ballX <= 0){
    player2score += 1 ;
    updateScore();
    createBall();
    return ;
   }
   if (ballX >= gameWidth){
    player1score += 1 ;
    updateScore();
    createBall();
    return ;
   }
   // for bouncing from players paddles
   if ( ballX <= (paddle1.x + paddle1.width + ballradius)){
      if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
        ballX = (paddle1.x + paddle1.width) + ballradius; //  if ball gets stuck
        ballXdirection *= -1 ;
        ballspeed += 1;
      }
   }
   if ( ballX >= (paddle2.x - ballradius)){
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballX = paddle2.x  - ballradius; //  if ball gets stuck
      ballXdirection *= -1 ;
      ballspeed += 1;
    }
 }
}

function updateScore(){
   scoretext.textContent  = `${player1score} : ${player2score}`;
}

function restartGame(){
   player1score = 0 ;
   player2score = 0 ;
   paddle1 = {
      width : 25 ,
      height : 100 ,
      x : 0 ,
      y : 0 ,
    }

   paddle2 = {
      width : 25 ,
      height : 100 ,
      x : gameWidth-25 ,
      y : gameHeight-100 ,
    }
   ballspeed = 1 ;
   ballX = 0 ;
   ballY = 0 ;
   ballXdirection = 0 ;
   ballYdirection = 0 ;
   updateScore();
   clearInterval(intervalID);
   gameStart();
}