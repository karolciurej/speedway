export default class Speedway {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.pattern = null
    this.loadImage()
  }
  loadImage() {
    const img = new Image();
    img.src = 'img/droga2.png';
    img.onload = () => {
      this.pattern = this.ctx.createPattern(img, "repeat");
    };


  }
  drawSpeedway() {

    this.ctx.fillStyle = "#376A4f";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.pattern;
    this.ctx.ellipse(400, 400, 300, 350, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(1000, 400, 300, 350, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillRect(400, 50, 600, 700);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#376A4f";
    this.ctx.ellipse(450, 400, 150, 175, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(950, 400, 150, 175, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillRect(450, 225, 500, 350);
  }
}
