export default class Motor {
    constructor() {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    drawMotor(){
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        
    }
  }