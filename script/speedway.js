// Uruchomić liveserwer

export default class Speedway {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.roadPattern = null
    this.grassPattern = null
    this.loadImage()
  }
  loadImage() {
    const roadImg = new Image();
    const grassImg = new Image()
    roadImg.src = 'img/path.jpeg';
    grassImg.src = 'img/grass.jpg';

    roadImg.onload = () => {
      this.roadPattern = this.ctx.createPattern(roadImg, "repeat");
    };
    grassImg.onload = () => {
            this.grassPattern = this.ctx.createPattern(grassImg, "repeat")

    }


  }
  drawSpeedway() {

    this.ctx.fillStyle = this.grassPattern;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.roadPattern;
    this.ctx.ellipse(400, 400, 300, 350, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(1000, 400, 300, 350, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillRect(400, 50, 600, 700);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.grassPattern;
    this.ctx.ellipse(450, 400, 150, 175, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(950, 400, 150, 175, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillRect(450, 225, 500, 350);
    this.ctx.beginPath()
    this.ctx.fillStyle = "#000000EE"
    this.ctx.fillRect(675,575,5,175)
    
  }
}
