var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];


var divisionHeight=300;
var score =0;
var turn = 0;
var check = 1;

var One, Two, Three, Four, Five;
var Won, Lose;

var gh;

var gameState = "Start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(width/2,height,width,20);
  


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 25; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 25; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");

  textSize(20)
  gh = text("Score : "+score,20,30);
 
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   

  
    
  


   //text for points
   push();
   textSize(30);
   textAlign(CENTER);
   stroke(255);
   text("100", width/2-40, 700);
   text("100", width/2+40, 700);

   text("200", width/2-120, 700);
   text("200", width/2+120, 700);

   text("300", width/2-200, 700);
   text("300", width/2+200, 700);

   text("400", width/2-280, 700);
   text("400", width/2+280, 700);

   text("500", width/2-360, 700);
   text("500", width/2+360, 700);
   pop();
   
   if (particle!=null){
     particle.display();

     if (particle.body.position.y>750){
       check=1;
       
      if((particle.body.position.x>0&&particle.body.position.x<80)||(particle.body.position.x>720&&particle.body.position.x<800)){
        score+=500;
       particle=null;
        
      }

      else if((particle.body.position.x>80&&particle.body.position.x<160)||(particle.body.position.x>640&&particle.body.position.x<720)){
        score+=400;
        particle=null;
        
      }

      else if((particle.body.position.x>160&&particle.body.position.x<240)||(particle.body.position.x>560&&particle.body.position.x<640)){
        score+=300;
        particle=null;
        
      }

      else if((particle.body.position.x>240&&particle.body.position.x<320)||(particle.body.position.x>480&&particle.body.position.x<560)){
        score+=200;
        particle=null;
        
      }

      else if((particle.body.position.x>320&&particle.body.position.x<480)){
        score+=100;
        particle=null;
        
      }
      else{
        score-=100;
        particle=null;
      }
    }
    
   }

   if (turn>=5){
     gameState="End";
   }

   if (gameState==="End"&&particle===null){
     if(score<2000){
       
       particle=0;
     }
     else if(score>=2000){
      
      particle=1;
     }
   }

   if(turn===5&&particle===0){
     
     Lose.play();
     particle=12;
     gh = null;
   }

   if(particle===12){
    push();
       textSize(40);
       textAlign(CENTER);
       text("You Lose!", width/2, height/2+30);
       text("Score: "+ score+ "/2000", width/2, height/2+90);
     pop();
     gh = null;
     textSize(20);
      text("Score : "+score,20,30);
     noLoop();
   }

   if(turn===5&&particle===1){
    
    Won.play();
    particle=13;
    gh = null;
  }
  if(particle===13){
    push();
    textSize(40);
    textAlign(CENTER);
    text("You Won!", width/2, height/2+50);
    pop();
    gh = null;
    textSize(20);
    text("Score : "+score,20,30);
    noLoop();
  }

}
  


function mousePressed(){
  if(gameState!=="End"&&check===1){
    turn++;
    particle = new Particle(mouseX+random(-100, 100), 10, 10);
    check = 2;
    
    
    
  }
}