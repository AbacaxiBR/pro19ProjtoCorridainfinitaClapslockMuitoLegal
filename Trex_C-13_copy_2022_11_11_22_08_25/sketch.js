var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var abacaxi, abacaxi_correndo, abacaxi_colidiu;
var solo, soloinvisivel, imagemdosolo;


var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;



function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  

  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite(width-width+100,-100,1,1);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  console.log(width, height);
  solo = createSprite(width,height-100,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(width/2,height/1.20,width,10);
  soloinvisivel.visible = false;
   

  grupodeobstaculos = createGroup();

  
  console.log("Oi" + 5);
  
  pontuacao = 0;
}

function draw() {
  background(180);
  //exibindo pontuação
  text("Pontuação: "+ pontuacao, 500,50);
    
  pontuacao = pontuacao + Math.round(getFrameRate()/60);
  
  
  if(estadoJogo === JOGAR){
    //mover o solo
    solo.velocityX = -4;

    
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //saltar quando a tecla de espaço é pressionada
    if(keyDown("space")) {
       trex.velocityY = -13;
  }
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
  
    //gerar obstáculos no solo
    gerarObstaculos();
        
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
    }
    
  }
     else if (estadoJogo === ENCERRAR) {
      solo.velocityX = 0;
     
     grupodeobstaculos.setVelocityXEach(0);

   }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(width,height-150,1,1);
  obstaculo.velocityX = -6;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 1.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}


