var balImg, balloon;
var backImg;
var database, otbal;
var position;

function preload() {
  balImg = loadAnimation("sprites/Hot-Air-Ballon-02.png","sprites/Hot-Air-Ballon-03.png","sprites/Hot-Air-Ballon-04.png",)
  backImg = loadImage("sprites/Hot-Air-Ballon-01.png")

}

function setup() {

  database = firebase.database();


  createCanvas(displayWidth, displayHeight);
  
  balloon = createSprite(400, displayHeight-550, 50, 50);
  balloon.addAnimation("bal", balImg);

  otbal = database.ref('balloon/position');
  otbal.on("value", readPosition, showError);

}

function draw() {
  background(backImg);  
  
  if(keyDown(LEFT_ARROW)) {
    writePosition (-5,0);
  }

  if(keyDown(DOWN_ARROW)) {
    writePosition (0,5);
    balloon.scale += 0.009;
  }

  if(keyDown(UP_ARROW)) {
    writePosition (0,-5);
    balloon.scale -= 0.009;
  }

  if(keyDown(RIGHT_ARROW)) {
    writePosition (5,0);
  }
  console.log(balloon.scale);

  if(balloon.scale == 0.000999999999999248) {
    balloon.scale = 0.000999999999999248;
  }

  drawSprites();

}

function writePosition(x,y){
  database.ref('balloon/position').set({
  'x' :position.x + x,
  'y' :position.y + y
   } )
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  console.log(position.y);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError () {

  console.log ("error has occured");

}