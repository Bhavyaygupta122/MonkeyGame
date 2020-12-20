//adding variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var banana;
var monkey , monkey_running;
var Banana ,BananaImage, Obstacle, ObstacleImage;
var BananaGroup;
var ObstacleGroup;
var score=0;
var invisibleGround;
var ground;

function preload(){
  //loading Images
  monkey_running =              loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  BananaImage = loadImage("Banana.png");
  ObstacleImage = loadImage("Obstacle.png");
  groundImage = loadImage("ground11.png");
}

function setup() {
  //creating canvas
  createCanvas(600,300);
  
//creating monkey
  monkey = createSprite(50,220,20,50);
  monkey.addAnimation("moving", monkey_running);  
  monkey.scale = 0.1;
  //creating ground 
  ground = createSprite(300,350,900,20);
  ground.addImage("ground",groundImage);
  ground.scale=0.3;
  //ground.x = ground.width /2;
 //creating invisible ground 
  invisibleGround = createSprite(200,230,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and banana Groups
  ObstacleGroup = createGroup();
  BananaGroup = createGroup();

  
  monkey.setCollider("circle",0,0,40)
  //score
  score = 0;
  banana = 0;
}

function draw() {
  //background 
  background("lightBlue");
  text("Score: "+ score, 500,50);
  text("Banana: "+ banana,350,50);
  
  
  //gamestate is play
  if(gameState === PLAY){
      monkey.changeAnimation("moving", monkey_running);
    //velocity of ground
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    //ground infinte
    if (ground.x < 0){
        ground.x = 300;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 221) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    //monkey is touching banana then 1 banana is collected
    if(monkey.isTouching(BananaGroup)){
      BananaGroup.destroyEach();
      banana = banana +1; 
    }
    
    
  //spawning banana and obstacles
    spawnBanana();
  
    spawnObstacle();
    //if obstacle touches monkey game over and gamestate end
    if(ObstacleGroup.isTouching(monkey)){
        monkey.velocityY = -12;       
        gameState = END;
      
    }
  }
  //gamestate is end
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
      
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
     
     ObstacleGroup.setVelocityXEach(0);
     BananaGroup.setVelocityXEach(0); 
  }
  
  monkey.collide(invisibleGround);
  
  console.log(monkey.y);
  drawSprites();
}



//spawning obstacle
function spawnObstacle(){
 if (frameCount % 100 === 0){
   var Obstacle = createSprite(600,240,10,40);
    Obstacle.velocityX = -(6 + score/100);
    Obstacle.addImage(ObstacleImage);     
    Obstacle.scale = 0.1;
    Obstacle.lifetime = 300;
    ObstacleGroup.add(Obstacle);
 }
}
//spawing banana
function spawnBanana() {

 if (frameCount % 120 === 0) {
    var Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(100,120));
    Banana.addImage(BananaImage);
    Banana.scale = 0.1;
    Banana.velocityX = -3;
    Banana.lifetime = 200;
    
   BananaGroup.add(Banana);
  }
}


  