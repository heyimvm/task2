import { Sitting , Stand } from './main.js';

export class Player{
    constructor(){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.speed = 0;
        this.Maxspeed = 10;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.maxframe = 0;
        this.fps = 20;
        this.frameinterval = 1000/this.fps;
        this.frametimer = 0;
        this.FrameX = 0;
        this.FrameY = 0;
        this.states = [
            new Sitting(this) ,
             new Running(this) , 
             new Jumping (this) , 
             new Falling(this)
            ];
        this.Currentstates = this.states[0];
        this.Currentstates.enter();
}

update(input , deltatime) { 
    this.Currentstates.handleInput(input);
     this.x += this.speed;
     if(input.includes('ArrowRight')) this.speed = this.Maxspeed;
     else if(input.includes('ArrowLeft')) this.speed = -this.Maxspeed;
     else this.speed = 0;
     if(this.x < 0) this.x = 0;
     if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
     this.y += this.vy;
     if(input.includes('ArrowUp') && this.onGround()) this.vy -= 10;
     if(!this.onGround()) this.vy += this.weight;
     else this.vy = 0;

     if(this.frametimer > this.frameinterval){ 
        this.frametimer = 0;
    if(this.FrameX < this.maxframe) this.FrameX++;
    else this.FrameX;
    } else {
        this.frametimer += deltatime;
    }

   // if(this.FrameX < this.maxframe) this.FrameX++;
   // else this.FrameX = 0;
}  
draw(context){
    if(this.game.debug) context.strokeRect(this.x , this.y , this.width , this.height);
     context.drawImage(this.image , this.FrameX * this.width , this.FrameY * this.height , this.x , this.y , this.width, this.height);
}
onGround(){
     return this.y >= this.game.height - this.height - this.game.groundMargin;
}
setState(state , speed){
     this.Currentstates = this.states[state];
     this.game.speed = this.game.Maxspeed * speed;
     this.Currentstates.enter();
}
}