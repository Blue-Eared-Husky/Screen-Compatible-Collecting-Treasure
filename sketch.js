var path,boy,end,edges;
var choose,pathImg,boyAnim,boyImg,cashImg,diamondsImg,necklaceImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyAnim = loadAnimation("Runner-1.png","Runner-2.png");
  boyImg = loadImage("Runner-1.png")
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  necklaceImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  path = createSprite(width/2,200);
  path.addImage(pathImg);

  boy = createSprite(200,height-50);
  boy.addAnimation("running",boyAnim);
  boy.addAnimation("stopped",boyImg);
  boy.scale = 0.08;
  
  end = createSprite(width/2,50);
  end.addImage(endImg);
  end.scale = 0.8;

  cashG = createGroup();
  diamondsG = createGroup();
  jwelleryG = createGroup();
  swordGroup = createGroup();

  edges = createEdgeSprites();
}

function draw(){
  background(0);

  if (gameState == PLAY){
    boy.changeAnimation("running");
    end.visible = false;

    boy.x = World.mouseX;
    boy.bounceOff(edges);

    path.velocityY = 10;
    if (path.y>(height)){
      path.y = height/2;
    }

    choose = Math.round(random(1,4));

    if (World.frameCount % 100 == 0){
      if (choose == 1){
        cash();
      }
      if (choose == 2){
        diamonds();
      }
      if (choose == 3){
        jwellery();
      }
      else{
        swords();
      }
    }

    if (cashG.isTouching(boy)){
      treasureCollection++;
      cashG.destroyEach();
    }
    if (diamondsG.isTouching(boy)){
      treasureCollection++;
      diamondsG.destroyEach();
    }
    if (jwelleryG.isTouching(boy)){
      treasureCollection++;
      jwelleryG.destroyEach();
    }
    if (swordGroup.isTouching(boy)){
      gameState = END;
    }
  }
  
  if (gameState == END){
    boy.changeAnimation("stopped");
    path.velocityY = 0;

    cashG.setVelocityYEach(0);
    cashG.setLifetimeEach(-1);

    diamondsG.setVelocityYEach(0);
    diamondsG.setLifetimeEach(-1);
    
    jwelleryG.setVelocityYEach(0);
    jwelleryG.setLifetimeEach(-1);
    
    swordGroup.setVelocityYEach(0);
    swordGroup.setLifetimeEach(-1);
    
    end.visible = true;
  }

  drawSprites();

  textSize(width/50)
  fill("white");
  text("Score: " + treasureCollection,10,(width/50));
}

function cash(){
  var cashx = Math.round(random(50,(width-50)));
  var cashmoney = createSprite(cashx,-10);
  boy.depth = cashmoney.depth + 1;
  cashmoney.addImage(cashImg);
  cashmoney.velocityY = 10;
  cashmoney.lifetime = 100;
  cashmoney.scale = 0.1;
  cashG.add(cashmoney);
}

function diamonds(){
  var diamondx = Math.round(random(50,(width-50)));
  var diamond = createSprite(diamondx,-10);
  boy.depth = diamond.depth + 1;
  diamond.addImage(diamondsImg);
  diamond.velocityY = 10;
  diamond.lifetime = 100;
  diamond.scale = 0.04;
  diamondsG.add(diamond);
}

function jwellery(){
  var necklacex = Math.round(random(50,(width-50)));
  var necklace = createSprite(necklacex,-10);
  boy.depth = necklace.depth + 1;
  necklace.addImage(necklaceImg);
  necklace.velocityY = 10;
  necklace.lifetime = 100;
  necklace.scale = 0.15;
  jwelleryG.add(necklace);
}

function swords(){
  var swordx = Math.round(random(50,(width-50)));
  var sword = createSprite(swordx,-10);
  boy.depth = sword.depth + 1;
  sword.addImage(swordImg);
  sword.velocityY = 10;
  sword.lifetime = 100;
  sword.scale = 0.1;
  swordGroup.add(sword);
}