
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint,
Render = Matter.Render,
Runner = Matter.Runner,
Events = Matter.Events,
Constraint = Matter.Constraint,
Composite = Matter.Composite;



var ground, frontwall, backwall;
var bird, enemy;
var mConstraint;
let sling, srightImg, sleftImg;
var bImg;
var bx1,bx2,bx3,bx4,bx5,bx6,bx7,bx8,bx9;
var pig;

function preload(){

  bImg = loadImage("./assests/background.png");
  srightImg = loadImage("./assests/slingr.png");
  sleftImg = loadImage("./assests/slingl.png");
  pig = loadImage("./assests/king_pig.png");
}



function setup() {
  var canvas = createCanvas(1000,600);

  engine = Engine.create();
  

  world = engine.world;

  ground = new Ground(width/2, height+10, width, 20);
  frontwall = new Ground (width+10, height/2,20,height );
  backwall = new Ground (-10, height/2, 20, width);

  bx1 = new Box(690,450,120,20, PI/2);
  bx2 = new Box(780,450,120,20, PI/2);
  bx3 = new Box(735,390,120,20, PI);
  bx4 = new Box(690,310,120,20, PI/2);
  bx5 = new Box(780,310,120,20, PI/2);


  bird = new Bird (50,700,25)
  
  sling= new Slingshot(bird.body, {x:192,y:500});

 // enemy = createSprite(735,420,5,5);
 // enemy.addImage(pig);
 // enemy.scale = 0.25;


  rectMode(CENTER);
  ellipseMode(CENTER);
  
}


function draw() 
{
  image(bImg,0,0,1200,600);
  Engine.update(engine);

  push ()
  imageMode (CENTER);
  image(sleftImg,200,540,20,150);
  image(srightImg,185,510,20,80);
  pop ()

  ground.show();
  frontwall.show();
  backwall.show();

  bx1.show();
  bx2.show();
  bx3.show();
  bx4.show();
  bx5.show();

  bird.show();
  sling.show();

  drawSprites();
}

function mouseDragged(){
  //
  Body.setPosition(bird.body, {x: mouseX, y : mouseY})
}

function mouseReleased(){
  //break the slingshot, constraint

  sling.break()
  //ropeSound.play()
}

function keyPressed(){
  if(keyCode  === 32 && bird.body.speed<1){
    Matter.Body.setPosition(bird.body, {x:192,y:400})
    sling.attach(bird.body)
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}