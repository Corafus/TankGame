var numberOfTurns;
var whosTurn = 0;
var counter = 60;
var decision = 0;
var howManyMovesLeft = 2;
var choosingDirection = false;

var numberOfColumns = 5;
var numberOfRows = 8;
var resolution = 70;
var boardWidth = 0;

function setup() {
  createCanvas(900, 900);
  tanks.push(new Tank(0,1));
  tanks.push(new Tank(0,3));
  tanks.push(new Tank(0,5));
  tanks.push(new Tank(0,7));
  robots.push(new Robot(4, 4));
  numberOfTurns = tanks.length + robots.length;
  boardWidth = 2*(numberOfColumns * resolution);
}

function draw() {
  if(counter>0){
    counter--;
  }
  /*if(whosTurn>=numberOfTurns){
    whosTurn=0;
  }*/


  controls();
  background(50);


  //////////////////////////////////////////////////////
  //DRAWING GRID//
  ///////////////////////////////////////////////////////
  for(var i = 0; i < numberOfColumns; i++){
    for(var j = 0; j < numberOfRows; j++){
      rect(i*resolution, j*resolution, resolution, resolution);
    }
  }

//////////////////////////////////////////////////////
//DRAWING TANK NAMES AND HEALTH//
///////////////////////////////////////////////////////
  for(var i = 0; i < tanks.length; i++){
    textSize(18);
    if(i===whosTurn){
      stroke('blue');
      strokeWeight(5);
    }
    rect(i*boardWidth/tanks.length, numberOfRows*resolution+10, boardWidth/tanks.length, 30);
    noStroke();
    //rect(i*boardWidth/tanks.length + boardWidth/tanks.length - 70, numberOfRows*resolution+10, 70, 30);
    stroke(0);
    strokeWeight(1);
    text("TANK: " + i, boardWidth/tanks.length*i+5, numberOfRows*resolution+10+25);
    text("HP: " + tanks[i].health, i*boardWidth/tanks.length + boardWidth/tanks.length - 70+5, numberOfRows*resolution+10+25);
  }

//////////////////////////////////////////////////////
//DRAWING THINGS//////////
///////////////////////////////////////////////////////
  if(whosTurn < tanks.length){
    tanks[whosTurn].orientation();
  }


  for(var i = 0; i < tanks.length; i++){
    if(whosTurn===i){
      push();
      stroke('blue');
      strokeWeight(5);
      noFill();
      //rectMode(CENTER);
      rect(tanks[i].pos.x*resolution, tanks[i].pos.y*resolution, resolution, resolution);
      pop();
    }
    tanks[i].display();
  }






  for(var i = 0; i < robots.length; i++){
    robots[i].update();
    robots[i].display();
  }

  drawDecisionTree();
  debugMode();



}

function controls(){

  if(whosTurn < tanks.length){
    if(counter===0 && choosingDirection===true){
        if(keyIsDown(83) && decision < 2){//S Key, DOWN
          decision++;
          counter=20;
        }
        if(keyIsDown(87) && decision > 0){//W Key, UP
          decision--;
          counter=20;
        }
        if(keyIsDown(13) && decision===0){//ENTER
          tanks[whosTurn].turn(1);
          howManyMovesLeft--;
          choosingDirection=false;
          decision=0;
          counter=20;
        }
        if(keyIsDown(13) && decision===1){//ENTER
          tanks[whosTurn].turn(-1);
          howManyMovesLeft--;
          choosingDirection=false;
          decision=0;
          counter=20;
        }

        if(keyIsDown(13) && decision===2){//ENTER
          choosingDirection=false;
          decision=0;
          counter=20;
        }
    }

      if(counter===0 && choosingDirection===false){
        if(keyIsDown(83) && decision < 3){//S Key, DOWN
          decision++;
          counter=20;
        }
        if(keyIsDown(87) && decision > 0){//W Key, UP
          decision--;
          counter=20;
        }
        if(keyIsDown(13) && decision===0){//ENTER
          tanks[whosTurn].move();
          howManyMovesLeft--;
          counter=20;
          decision=0;
        }

        if(keyIsDown(13) && decision===1){//ENTER
          choosingDirection = true;
          counter=50;
          decision=0;
        }

        if(keyIsDown(13) && decision===2){//ENTER
          tanks[whosTurn].shoot();
          howManyMovesLeft--;
          counter=20;
          decision=0;
        }

        if(keyIsDown(13) && decision===3){//ENTER
          whosTurn++;
          howManyMovesLeft=2;
          counter=20;
          decision=0;
        }
      }
  }

  if(howManyMovesLeft<=0){
    whosTurn++;
    if(whosTurn==4){
      robots[0].whichActionToPerform=0;
    }
    howManyMovesLeft=2;
  }
}

function drawDecisionTree(){
  if(whosTurn<tanks.length){
    if(choosingDirection===false){
      push();
      for(var i = 0; i < 4; i++){
        if(decision===i){
          stroke('blue');
          strokeWeight(5);
        } else {
          stroke(0);
          strokeWeight(1);
        }
        rect(0, numberOfRows*resolution+10 + 40 + i*45, 120, 40);
      }
      pop();
      text("Move", 10, numberOfRows*resolution+10 + 70 + 0*45);
      text("Turn", 10, numberOfRows*resolution+10 + 70 + 1*45);
      text("Fire", 10, numberOfRows*resolution+10 + 70 + 2*45);
      text("Wait", 10, numberOfRows*resolution+10 + 70 + 3*45);
    }

    if(choosingDirection===true){
      push();
      for(var i = 0; i < 3; i++){
        if(decision===i){
          stroke('blue');
          strokeWeight(5);
        } else {
          stroke(0);
          strokeWeight(1);
        }
        rect(0, numberOfRows*resolution+10 + 40 + i*45, 120, 40);
      }
      pop();
      text("Turn Clockwise", 10, numberOfRows*resolution+10 + 70 + 0*45);
      text("Turn CounterClockwise", 10, numberOfRows*resolution+10 + 70 + 1*45);
      text("Return", 10, numberOfRows*resolution+10 + 70 + 2*45);
    }
  }
}

function debugMode(){
  text("Decision: " + decision, 400, 50);
  text("Who's Turn is it: " + whosTurn, 400, 70);
  text("How Many Moves Left: " + howManyMovesLeft, 400, 90);
  text("ChoosingDirection: " + choosingDirection, 400, 130);
  text("Counter: " + counter, 400, 110);
  text("Robot Behavior: " + robots[0].behavior, 400, 150);

}

function robotActions(){
  robots[0].move();
  robots[0].move();

}
