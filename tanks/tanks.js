var tanks = [];

class Tank{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.health = 4;
    this.direction = 0;
    this.tankWidth = 20;
    this.tankLength = 30;
    this.howManyMovesLeft = 2;
  }

  move(){
    if(this.direction===0){
      this.pos.x++;
    }
    if(this.direction===1){
      this.pos.y++;
    }
    if(this.direction===2){
      this.pos.x--;
    }
    if(this.direction===3){
      this.pos.y--;
    }
  }

  shoot(){
    for(var i = 0; i < robots.length; i++){
      if(this.direction===0 && robots[i].pos.x > this.pos.x && robots[i].pos.y===this.pos.y){
        robots[i].health--;
      }
      if(this.direction===1 && robots[i].pos.y > this.pos.y && robots[i].pos.x===this.pos.x){
        robots[i].health--;
      }
      if(this.direction===2 && robots[i].pos.x < this.pos.x && robots[i].pos.y===this.pos.y){
        robots[i].health--;
      }
      if(this.direction===3 && robots[i].pos.y < this.pos.y && robots[i].pos.x===this.pos.x){
        robots[i].health--;
      }
    }
  }

  turn(direction){
    this.direction+=direction;
    if(this.direction>3){
      this.direction=0;
    }
    if(this.direction<0){
      this.direction=3;
    }
  }

  orientation(){
    if(choosingDirection===true){
      push();
      rectMode(CENTER);
      noStroke();
      fill('blue');
      //FACING RIGHT
      if(this.direction===0 && decision===0){
        //FACE DOWN
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 + 10, this.tankWidth*0.25, this.tankLength*0.90);
      }
      if(this.direction===0 && decision===1){
        //FACE UP
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
        rect(this.pos.x*resolution + resolution/2 , this.pos.y*resolution + resolution/2 -10, this.tankWidth*0.25, this.tankLength*0.90);
      }

      //FACING DOWN
      if(this.direction===1 && decision===0){
        //FACE LEFT
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
        rect(this.pos.x*resolution + resolution/2 - 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      }
      if(this.direction===1 && decision===1){
        //FACE RIGHT
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
        rect(this.pos.x*resolution + resolution/2 + 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      }

      //FACING LEFT
      if(this.direction===2 && decision===0){
        //FACE UP
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 - 10, this.tankWidth*0.25, this.tankLength*0.90);
      }
      if(this.direction===2 && decision===1){
        //FACE DOWN
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
        rect(this.pos.x*resolution + resolution/2 , this.pos.y*resolution + resolution/2 +10, this.tankWidth*0.25, this.tankLength*0.90);
      }

      //FACING UP
      if(this.direction===3 && decision===0){
        //FACE RIGHT
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
        rect(this.pos.x*resolution + resolution/2 + 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      }
      if(this.direction===3 && decision===1){
        //FACE LEFT
        rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
        rect(this.pos.x*resolution + resolution/2 - 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      }
      pop();
    }
  }

  display(){
    push();
    fill('green');
    rectMode(CENTER);
    //FACING RIGHT//
    if(this.direction===0){
      //TOP WHEELS
      fill(50);
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 -10, this.tankLength+5, this.tankWidth-10);
      //BOTTOM WHEELS
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 +10, this.tankLength+5, this.tankWidth-10);
      fill('green');
      //BODY
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
      //COCKPIT
      ellipse(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength-8, this.tankWidth-6);
      //CANNON SHAFT
      rect(this.pos.x*resolution + resolution/2 + 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      //CANNON HEAD
      rect(this.pos.x*resolution + resolution/2 + 23, this.pos.y*resolution + resolution/2, this.tankLength * 0.25, this.tankWidth * 0.35);
    }
    //FACING DOWN//
    if(this.direction===1){
      //LEFT SIDE WHEELS
      fill(50);
      rect(this.pos.x*resolution + resolution/2 - 10, this.pos.y*resolution + resolution/2, this.tankWidth-10, this.tankLength+5);
      //RIGHT SIDE WHEELS
      rect(this.pos.x*resolution + resolution/2 +10, this.pos.y*resolution + resolution/2, this.tankWidth-10, this.tankLength+5);
      fill('green');
      //BODY
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
      //COCKPIT
      ellipse(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth-6, this.tankLength-8);
      //CANNON SHAFT
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 + 10, this.tankWidth*0.25, this.tankLength*0.90);
      //CANNON HEAD
      rect(this.pos.x*resolution + resolution/2 , this.pos.y*resolution + resolution/2+ 23, this.tankWidth * 0.35, this.tankLength * 0.25);
    }
    //FACING LEFT//
    if(this.direction===2){
      //TOP WHEELS
      fill(50);
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 -10, this.tankLength+5, this.tankWidth-10);
      //BOTTOM WHEELS
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 +10, this.tankLength+5, this.tankWidth-10);
      fill('green');
      //BODY
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength, this.tankWidth);
      //COCKPIT
      ellipse(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankLength-8, this.tankWidth-6)
      //CANNON SHAFT
      rect(this.pos.x*resolution + resolution/2 - 10, this.pos.y*resolution + resolution/2, this.tankLength * 0.90, this.tankWidth * 0.25);
      //CANNON HEAD
      rect(this.pos.x*resolution + resolution/2 - 23, this.pos.y*resolution + resolution/2, this.tankLength * 0.25, this.tankWidth * 0.35);
    }
    //FACING UP//
    if(this.direction===3){
      //LEFT SIDE WHEELS
      fill(50);
      rect(this.pos.x*resolution + resolution/2 - 10, this.pos.y*resolution + resolution/2, this.tankWidth-10, this.tankLength+5);
      //RIGHT SIDE WHEELS
      rect(this.pos.x*resolution + resolution/2 +10, this.pos.y*resolution + resolution/2, this.tankWidth-10, this.tankLength+5);
      fill('green');
      //BODY
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth, this.tankLength);
      //COCKPIT
      ellipse(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2, this.tankWidth-6, this.tankLength-8);
      //CANNON SHAFT
      rect(this.pos.x*resolution + resolution/2, this.pos.y*resolution + resolution/2 - 10, this.tankWidth*0.25, this.tankLength*0.90);
      //CANNON HEAD
      rect(this.pos.x*resolution + resolution/2 , this.pos.y*resolution + resolution/2- 23, this.tankWidth * 0.35, this.tankLength * 0.25);
    }
    pop();


  }
}
