import Speedway from "./speedway.js";
const speedway = new Speedway("canvas");

export default class Motor {
  pos = { x: 0, y: 0 };
  angle = 0;
  isMoving = true;
  speed = 0.4;
  constructor(canvasId, width, height, count, leftKey, rightKey) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.speedway = speedway;
    this.width = width;
    this.height = height;
    this.pos.x = this.canvas.width / 2;
    this.pos.y = 600 + 15 * count;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.lastTurnLeft = 0;
    this.lastTurnRight = 0;
    this.turnDelay = 40;
    this.lastFrameTime = 0;
    this.move = this.move.bind(this);
    document.addEventListener("keydown", this.keyPress.bind(this));
  }
  //* Poruszanie do przodu
  start() {
    requestAnimationFrame(this.move);
  }
  drawMotor() {
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate((this.angle * Math.PI) / 180);
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.ctx.restore();
  }
  
  update(deltaTime) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.speedway.drawSpeedway();
    this.isInPath();
    const radians = (this.angle * Math.PI) / 180;
    this.pos.x += this.speed * Math.cos(radians) * deltaTime;
    this.pos.y += this.speed * Math.sin(radians) * deltaTime;
    this.drawMotor();
  }
  
  move(timestamp) {
    if (!this.isMoving) return;
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    console.log(timestamp)
    const deltaTime = timestamp - this.lastFrameTime;
    console.log(deltaTime)
    this.lastFrameTime = timestamp;
    this.update(deltaTime);
    requestAnimationFrame(this.move);
  }

  //* Przyciski
  keyPress(event) {
    if (event.key === this.leftKey) {
      this.turnLeft();
    } else if (event.key === this.rightKey) {
      this.turnRight();
    }
  }
  turnLeft() {
    const currentTime = Date.now();
    if (currentTime - this.lastTurnLeft > this.turnDelay) {
      this.angle -= 7;
      this.lastTurnLeft = currentTime;
    }
  }
  turnRight() {
    const currentTime = Date.now();
    if (currentTime - this.lastTurnRight > this.turnDelay) {
      this.angle += 7;
      this.lastTurnRight = currentTime;
    }
  }

  //* Sprawdzanie czy auto jest w torze
  isInPath() {
    const path = new Path2D();
    path.ellipse(400, 400, 300, 350, 0, 0, 2 * Math.PI);
    path.ellipse(1000, 400, 300, 350, 0, 0, 2 * Math.PI);
    path.rect(400, 50, 600, 700);
    const path2 = new Path2D();
    path2.ellipse(450, 400, 150, 175, 0, 0, 2 * Math.PI);
    path2.ellipse(950, 400, 150, 175, 0, 0, 2 * Math.PI);
    path2.rect(450, 225, 500, 350);
    const corners = this.getCorners();
    let cornersInside = true;
    let cornersOutside = true;

    for (const corner of corners) {
      if (!this.ctx.isPointInPath(path, corner.x, corner.y)) {
        cornersInside = false;

      }
      if (this.ctx.isPointInPath(path2, corner.x, corner.y)) {
        cornersOutside = false;
      }
    }

    if (!cornersInside || !cornersOutside) {
      this.speed = 0;
    }
  }

  getCorners() {
    const radians = (this.angle * Math.PI) / 180;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const cosA = Math.cos(radians);
    const sinA = Math.sin(radians);

    const corners = [
      {
        x: this.pos.x + halfWidth * cosA - halfHeight * sinA,
        y: this.pos.y + halfWidth * sinA + halfHeight * cosA,
      },
      {
        x: this.pos.x - halfWidth * cosA - halfHeight * sinA,
        y: this.pos.y - halfWidth * sinA + halfHeight * cosA,
      },
      {
        x: this.pos.x + halfWidth * cosA + halfHeight * sinA,
        y: this.pos.y + halfWidth * sinA - halfHeight * cosA,
      },
      {
        x: this.pos.x - halfWidth * cosA + halfHeight * sinA,
        y: this.pos.y - halfWidth * sinA - halfHeight * cosA,
      },
    ];

    return corners;
  }


  //! Wyświetlanie narożników
  // drawCorners() {
  //     const corners = this.getCorners();
  //     this.ctx.fillStyle = 'red';
  //     for (const corner of corners) {
  //         this.ctx.beginPath();
  //         this.ctx.arc(corner.x, corner.y, 2, 0, 2 * Math.PI);
  //         this.ctx.fill();
  //     }
  // }
}
