// Uruchomić liveserwer

import Speedway from "./speedway.js";
const speedway = new Speedway("canvas");
import players from "./script.js"


export default class Motor {
  pos = { x: 0, y: 0 }
  angle = 0
  isMoving = true
  speed = 300
  motorLoops = 0
  isWinChecked = false
  constructor(canvasId, width, height, count, leftKey, rightKey, track, name, starting, loops) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.name = name
    this.speedway = speedway;
    this.track = track
    this.width = width;
    this.height = height;
    this.loops = loops
    this.pos.x = this.canvas.width / 2
    this.pos.y = 600 + 30 * count;
    this.horsePatttern = null
    this.count = count
    this.starting = starting
    this.loadImage()
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.lastFrameTime = 0;
    //? Obsługa wielu klawiszy
    this.pressedKeys = {}
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
    document.querySelector(`.nick${count}`).innerHTML = name
    document.querySelector(`.loop${count}`).innerHTML = `0/${loops}`

  }
  loadImage() {
    const img = new Image();
    img.src = `img/kon${this.count}.png`;

    img.onload = () => {
      this.horsePatttern = this.ctx.createPattern(img, "repeat");
    }
  }
  //* Poruszanie do przodu
  start() {
    requestAnimationFrame(this.move.bind(this));
  }
  drawMotor() {
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate((this.angle * Math.PI) / 180);
    this.ctx.translate(-this.width / 2, -this.height / 2);
    this.ctx.fillStyle = this.horsePatttern;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  update(deltaTime) {
    if (this.starting) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.speedway.drawSpeedway()
    }

    this.isInPath()
    this.isLastPlayerRemaining(players)
    this.checkWin()
    const radians = (this.angle * Math.PI) / 180;
    this.pos.x += this.speed * Math.cos(radians) * deltaTime;
    this.pos.y += this.speed * Math.sin(radians) * deltaTime;
    this.track.savePoint({ x: this.pos.x + Math.cos(radians + Math.PI) * 23, y: this.pos.y + Math.sin(radians + Math.PI) * 23, expire: 10 })
    this.drawMotor()
    this.track.points = this.track.points.map((el) => {
      el.expire -= deltaTime
      return el
    }).filter(({ expire }) => expire > 0)
    // this.drawCorners()
  }

  move(timestamp) {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    const deltaTime = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp
    this.update(deltaTime)
    requestAnimationFrame(this.move.bind(this))
  }

  //* Przyciski
  keyDown(event) {
    this.pressedKeys[event.key] = true
    this.handleKeys()
  }

  keyUp(event) {
    this.pressedKeys[event.key] = false
    this.handleKeys()
  }
  handleKeys() {
    if (this.pressedKeys[this.leftKey] && this.isMoving) {
      this.turnLeft();
    }
    if (this.pressedKeys[this.rightKey] && this.isMoving) {
      this.turnRight();
    }
  }
  turnLeft() {
    this.angle -= 4
  }
  turnRight() {
    this.angle += 4
  }
  isLastPlayerRemaining(players) {
    const remainingPlayers = players.filter((player) => player.isMoving);
    return remainingPlayers.length == 1;
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
      this.isMoving = false;
      if (players.length == 1 && !this.isWinChecked) {
        this.announceLoss(this);
      }
    }
  }
  checkWin() {
    const finishLine = new Path2D();
    finishLine.rect(675, 575, 2, 175);
    if (this.ctx.isPointInPath(finishLine, this.pos.x, this.pos.y)) {
      this.motorLoops += 1;
      document.querySelector(`.loop${this.count}`).innerHTML = `${this.motorLoops}/${this.loops}`;
    }

    const activePlayers = players.filter(player => player.isMoving);

    if (players.length == 1) {
      if (this.motorLoops == this.loops && !this.isWinChecked) {
        this.announceWin(this);
      }
    }
    else {
      const isLastMotor = activePlayers.length == 1;
      if (this.motorLoops == this.loops && !this.isWinChecked) {
        this.announceWin(this);
      }
      else if (isLastMotor && !this.isWinChecked) {
        this.announceWin(activePlayers[0]);
      }
    }
  }

  announceLoss(losingMotor) {
    losingMotor.isWinChecked = true;
    document.querySelector(".title").style.visibility = "visible";
    document.querySelector(".winName").innerHTML = `Przegrał ${losingMotor.name}`;
  }

  announceWin(winningMotor) {
    winningMotor.isWinChecked = true;
    document.querySelector(".title").style.visibility = "visible";
    document.querySelector(".winName").innerHTML = `Wygrał ${winningMotor.name}`;
    players.forEach(player => {
      player.isWinChecked = true;
      player.isMoving = false;
      player.speed = 0;
    });
  }





  getCorners() {
    const radians = (this.angle * Math.PI) / 180
    const halfWidth = this.width / 2 - 1
    const halfHeight = this.height / 2 - 1
    const cosA = Math.cos(radians)
    const sinA = Math.sin(radians)

    const corners = [
      {
        x: this.pos.x + (cosA * halfWidth) - (sinA * halfHeight),
        y: this.pos.y + (sinA * halfWidth) + (cosA * halfHeight),
      },
      {
        x: this.pos.x - (cosA * halfWidth) - (sinA * halfHeight),
        y: this.pos.y - (sinA * halfWidth) + (cosA * halfHeight),
      },
      {
        x: this.pos.x + (cosA * halfWidth) + (sinA * halfHeight),
        y: this.pos.y + (sinA * halfWidth) - (cosA * halfHeight),
      },
      {
        x: this.pos.x - (cosA * halfWidth) + (sinA * halfHeight),
        y: this.pos.y - (sinA * halfWidth) - (cosA * halfHeight),
      },
    ];

    return corners
  }


  //   ! Wyświetlanie narożników
  drawCorners() {
    const corners = this.getCorners();
    this.ctx.fillStyle = 'red';
    for (const corner of corners) {
      this.ctx.beginPath();
      this.ctx.arc(corner.x, corner.y, 2, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}
