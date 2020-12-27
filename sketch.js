var trex, trex_running, trex_collided, ground, invi_ground, ground_img, cloud, cactus, cactus_img, cloud_img, cloudG, cactusG, gamestate, score, gameover, restart, gameover_img, restart_img;

score = 0;
var PLAY = 1
var END = 0
gamestate = PLAY
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png"); 

  trex_collided = loadAnimation("trex_collided.png");
  ground_img = loadImage("ground2.png");
  cactus_img = loadImage("obstacle1.png")
  cactus_img1 = loadImage("obstacle2.png")
  cactus_img2 = loadImage("obstacle3.png")
  cactus_img3 = loadImage("obstacle4.png")
  cactus_img4 = loadImage("obstacle5.png")
  cactus_img5 = loadImage("obstacle6.png")
   cloud_img = loadImage("cloud.png")
  gameover_img = loadImage("gameOver.png")
  restart_img = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(100, 165, 20, 50);
  trex.addAnimation("run", trex_running);
  trex.addAnimation("ded",trex_collided)
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addImage(ground_img);
  ground.x = ground.width / 2;
  invi_ground = createSprite(300, 190, 600, 5);
  invi_ground.visible = false;
  restart = createSprite(300,150,20,20);
      restart.scale = 0.5
       restart.visible = false;
      restart.addImage(restart_img);
  gameover = createSprite(300,100,20,20);
  gameover.addImage(gameover_img);
  gameover.scale = 0.75;
      gameover.visible = false;
  
  cloudG = createGroup();
  cactusG = createGroup();
  
}

function draw() {
  background("white");
  
textSize(15);
  text("score = "+ score,450,60);

if (gamestate === PLAY){
  if(keyDown("space") && trex.y >= 160){
    trex.velocityY = -11 ;
  }
  trex.velocityY = trex.velocityY + 0.8;
  trex.collide(invi_ground);
  
  ground.velocityX = -5;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
      score = score + Math.ceil(World.frameRate/60);
   
  
  if(score%100 === 0 && score>0){
    ground.velocityX = ground.velocityX - 1;
  }
  cloudf();
    cactusf();
  
  if (cactusG.isTouching(trex)){
    gamestate = END;
  }
    
  
  }else if(gamestate === END){
    
  ground.velocityX = 0;
    trex.velocityY = 0;
    cloudG.setVelocityXEach(0);
        cloudG.setLifetimeEach(-1);
        cactusG.setVelocityXEach(0);
        cactusG.setLifetimeEach(-1);
        
    trex.changeAnimation("ded",trex_collided);
    gameover.visible = true; 
    restart.visible = true; 
    if(mousePressedOver(restart)){
        reset();
      }
}

  drawSprites();
}

function reset(){
  gamestate=PLAY;
  cloudG.destroyEach();
  cactusG.destroyEach();
  restart.visible = false;
  gameover.visible = false;
  trex.changeAnimation("run",trex_running);
  score=0;
}

function cloudf() {
  //write code here to spawn the clouds
  
  if (World.frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(20,100));
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //add a group
    cloudG.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
} 

function cactusf() {
    if (World.frameCount % 100 === 0) {
  cactus = createSprite(600,160,20,10);
  cactus.velocityX = ground.velocityX;
  cactus.scale = 0.5;
  var rand = Math.round(random(1,6));
      
  switch(rand){
    case 1: cactus.addImage(cactus_img);
      break; 
    case 2: cactus.addImage(cactus_img1);
      break;
    case 3: cactus.addImage(cactus_img2);
      break;
    case 4: cactus.addImage(cactus_img3);
      break;
    case 5: cactus.addImage(cactus_img4);
      break;
    case 6: cactus.addImage(cactus_img5);
      break;
      default: break;
  }   
  cactus.lifetime = 200;

//add to cactusG group
    cactusG.add(cactus);
    }
}







