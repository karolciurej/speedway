export default class Track {
    points = []
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.dirtPatttern = null
        this.loadImage()
    }
    loadImage() {
        const img = new Image();
        img.src = `img/dirt.png`;
    
        img.onload = () => {
          this.dirtPatttern = this.ctx.createPattern(img, "repeat");
        }
      }
    savePoint(x) {
        this.points.push(x)
        this.drawTrack()
    }
    drawTrack() {
        this.ctx.beginPath()
        this.points.forEach((el, nr) => {
            if (nr == 0){
                this.ctx.moveTo(el.x, el.y)

            }else{
                this.ctx.lineTo(el.x, el.y)

            }
        });
        this.ctx.strokeStyle = this.dirtPatttern
        this.ctx.lineWidth = 6
        this.ctx.stroke()
    }
}