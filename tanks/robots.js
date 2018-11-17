var robots = [];

class Robot{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.health = 10;
    this.direction = 2;
    this.listOfActions=["move", "move", "move", "turn", "move", "turn", "shoot", "turn", "shoot", "move", "shoot", "turn", "shoot", "move", "shoot"];
    this.whichActionToPerform=-1;
    this.behavior=0;
  }

  update(){
    this.behavior=this.listOfActions[this.whichActionToPerform];

    if(this.behavior=="move"){
      if(counter>0){
        counter--;
      }
      if(counter===10){
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
      if(counter===0){
        this.whichActionToPerform++;
        counter=60;
      }
      push();
      textSize(50);
      textAlign(CENTER);
      fill("red");
      text("ROBOT IS MOVING!", width/2, height/2);
      pop();
    }

    if(this.behavior=="turn"){
      if(counter>0){
        counter--;
      }
      if(counter===10){
        var direction = random([-1, 1]);
        this.direction+=direction;
        if(this.direction>3){
          this.direction=0;
        }
        if(this.direction<0){
          this.direction=3;
        }
      }
      if(counter===0){
        this.whichActionToPerform++;
        counter=60;
      }
      push();
      textSize(50);
      textAlign(CENTER);
      fill("red");
      text("ROBOT IS TURNING!", width/2, height/2);
      pop();
    }

    if(this.whichActionToPerform > this.listOfActions.length-1){
      whosTurn=0;
      this.whichActionToPerform=-1;
    }

    if(this.behavior=="shoot"){
      if(counter>0){
        counter--;
      }
      if(counter===10){
        for(var i = 0; i < tanks.length; i++){
          if(this.direction===0 && tanks[i].pos.x > this.pos.x && tanks[i].pos.y===this.pos.y){
            tanks[i].health--;
          }
          if(this.direction===1 && tanks[i].pos.y > this.pos.y && tanks[i].pos.x===this.pos.x){
            tanks[i].health--;
          }
          if(this.direction===2 && tanks[i].pos.x < this.pos.x && tanks[i].pos.y===this.pos.y){
            tanks[i].health--;
          }
          if(this.direction===3 && tanks[i].pos.y < this.pos.y && tanks[i].pos.x===this.pos.x){
            tanks[i].health--;
          }
        }
      }
      if(counter===0){
        this.whichActionToPerform++;
        counter=60;
      }
      push();
      textSize(50);
      textAlign(CENTER);
      fill("red");
      text("ROBOT PERFORMED EYE LASER!", width/2, height/2);
      pop();
    }

    if(this.whichActionToPerform > this.listOfActions.length-1){
      whosTurn=0;
    }
  }

  move(){
    if(counter===0){
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
  }

  turn(){
    if(counter===0){
      var direction = -1;
      this.direction+=direction;
      if(this.direction>3){
        this.direction=0;
      }
      if(this.direction<0){
        this.direction=3;
      }
      counter=60;
      this.howManyMovesLeft--;
    }
    if(this.howManyMovesLeft===0){
      whosTurn++;
      this.howManyMovesLeft=3;
    }
  }

  display(){

    push();
    rectMode(CENTER);
    fill('red');
    rect(this.pos.x*resolution+resolution/2, this.pos.y*resolution+resolution/2, 20, 20);
    if(this.direction===0){
      rect(this.pos.x*resolution+resolution/2 + 10, this.pos.y*resolution+resolution/2, 10, 10);
    }
    if(this.direction===1){
      rect(this.pos.x*resolution+resolution/2, this.pos.y*resolution+resolution/2 + 10, 10, 10);
    }
    if(this.direction===2){
      rect(this.pos.x*resolution+resolution/2 - 10, this.pos.y*resolution+resolution/2, 10, 10);
    }
    if(this.direction===3){
      rect(this.pos.x*resolution+resolution/2 , this.pos.y*resolution+resolution/2- 10, 10, 10);
    }

    fill(0);
    text(this.health, this.pos.x*resolution+resolution/2, this.pos.y*resolution+resolution/2);
    pop();
  }
}
