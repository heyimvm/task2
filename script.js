import { player } from './player.js';
import { Inputhandler } from './input.js';
import { Background } from './background.js';
import { Flyingenemy , Climbingenemy , Groundenemy } from './enemies.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 500;

    class Game{
        constructor(width , height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxspeed = 3;
            this.background = new Background(this);
            this.player = new player(this);
            this.input = new Inputhandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
    }
    update(deltatime) {
        this.background.update();
        this.player.update(this.input.keys , deltatime);

        if(this.enemyTimer > this.enemyInterval){
          this.addEnemy(); 
          this.enemyTimer = 0; 
        } else{
            this.enemyTimer += deltatime;
        }
        this.enemies.forEach(enemy => {
            enemy.update(deltatime);
            if(enemy.markedforDeletion ) this.enemies.splice(this.enemies.indexOf(enemy) , 1);
        })
    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }
    addEnemy(){
        if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new Groundenemy(this));
        else if(this.speed > 0) history.enemies.push(new Climbingenemy(this));

        this.enemies.push(new Flyingenemy(this));
        console.log(this.enemies);
    }
}

 const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
 console.log(game);
 let lastTime = 0;


 function animate(timestamp){
    const deltatime = timestamp - lastTime;
    console.log(deltatime);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltatime);
    game.draw(ctx);
    requestAnimationFrame(animate);
 } 
 animate(0);
});