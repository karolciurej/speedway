export default class Motor {
    pos = {x: 0, y: 0}
    angle = 0
    constructor(canvasId, width, height, count) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.width = width
        this.height = height
        this.pos.x = this.canvas.width/2;
        this.pos.y = 600 + 15 * count;

    }
    drawMotor() {
        this.ctx.save();
        this.ctx.fillStyle = "blue";
        this.ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2); 
        this.ctx.rotate((this.angle * Math.PI) / 180); 
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); 
        this.ctx.restore();
    }
    update() {
        
    }    
  }