// Global variable to store the classifier
let classifier;

let label = "Listening...";

// Teachable Machine model URL:
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/LdGdXza7l/model.json';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}


let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  classifier.classify(gotResult);
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
  
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function controlSnake(){
  if (label === "left") {
    snake.setDir(-1, 0);
  } else if (label === "right") {
    snake.setDir(1, 0);
  } else if (label === "down") {
    snake.setDir(0, 1);
  } else if (label === "up") {
    snake.setDir(0, -1);
  } 

}

function draw() {
    
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();


  if (snake.endGame()) {
    print("END GAME");
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
  
  fill(0,0,255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  controlSnake();
}