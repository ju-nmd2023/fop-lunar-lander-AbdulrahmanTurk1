let lander;
let gravity = 0.05;
let thrustPower = -0.1;
let gameState = "start"; 
let resultMessage = "";

function setup() {
  createCanvas(400, 600);
  resetLander();
}

function draw() {
  background(0);
  
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    updateLander();
    drawLander();
  } else if (gameState === "result") {
    drawResultScreen();
  }
}

function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Lunar Lander", width / 2, height / 2 - 30);
  textSize(16);
  text("Press any key to start", width / 2, height / 2 + 20);
}

function drawResultScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(resultMessage, width / 2, height / 2 - 20);
  textSize(16);
  text("Press any key to restart", width / 2, height / 2 + 30);
}

function updateLander() {
  lander.velocity += gravity;
  
  if (keyIsDown(DOWN_ARROW) || keyIsDown(32)) { 
    lander.velocity += thrustPower;
  }

  lander.y += lander.velocity;

  if (lander.y >= height - 40) {
    gameState = "result";
    if (lander.velocity > 2) {
      resultMessage = "You Crashed!";
    } else {
      resultMessage = "Successful Landing!";
    }
  }
}

function drawLander() {
  fill(200);
  rect(width / 2 - 10, lander.y, 20, 30);
  fill(255, 0, 0);
  if (keyIsDown(DOWN_ARROW) || keyIsDown(32)) {
    triangle(width / 2 - 10, lander.y + 30, width / 2 + 10, lander.y + 30, width / 2, lander.y + 45);
  }

  stroke(255);
  line(0, height - 10, width, height - 10);
}

function keyPressed() {
  if (gameState === "start" || gameState === "result") {
    resetLander();
    gameState = "playing";
  }
}

function resetLander() {
  lander = {
    y: 50,
    velocity: 0
  };
}
