const states = {
    Sitting : 0,
    Running : 1,
    Jumping : 2,
    Falling : 3,
}

export class state {
    constructor(name, frames, speed){
        this.state = state;
        this.frames = frames;
        this.speed = speed;
    }};

export class Sitting extends state{
    constructor(player){
        super('Sitting');
        this.player = player;
    }
    enter(){
        this.player.FrameX = 0;
        this.player.FrameY = 3;
        this.player.maxframe = 4;
    }
    handleInput(input){
        if(input.includes('Arrowleft') || input.includes('ArrowRight')){
            this.player.setState(states.Running , 1);
        }
    }
};

export class Running extends state{
    constructor(player){
        super('Running');
        this.player = player;
    }
    enter(){
        this.player.FrameX = 0;
        this.player.maxframe = 6;
        this.player.FrameY = 3;
    }
    handleInput(input){
        if(input.includes('ArrowDown')){
            this.player.setState(states.Sitting , 0);
        } else if(input.includes('ArrowUp')){
            this.player.setState(states.Jumping , 1);
    
    }
}};

export class Jumping extends state{
    constructor(player){
        super('Jumping');
        this.player = player;
    }
    enter(){
        if(this.player.onGround()) this.player.vy -= 30;
        this.player.FrameX = 0;
        this.player.maxframe = 6;
        this.player.FrameY = 1;
    }
    handleInput(input){
         if(this.player.vy > this.player.weight){
            this.player.setState(states.Falling , 1);
         }
        }
};


export class Falling extends state{
    constructor(player){
        super('Falling');
        this.player = player;
    }
    enter(){
        this.player.FrameX = 0;
        this.player.maxframe = 6;
        this.player.FrameY = 2;
    }
    handleInput(input){
       if(this.player.onGround()){
        this.player.setState(states.Running , 1);
       }
    }
};



