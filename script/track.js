export default class Track {
    points = []
    constructor(canvasId,color) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.startTime = new Date().getTime()
        this.color = color
    }
    savePoint(x) {
        this.points.push(x)
        this.drawTrack()
    }
    drawTrack() {
        this.points.forEach(({x, y, expire}, nr) => {
            if (nr >= this.points.length - 1) return;
            const alpha = parseInt(expire / 10 * 255).toString(16);           
            this.ctx.strokeStyle = `${this.color}${alpha.length > 1 ? alpha : "0" + alpha}`;
            this.ctx.lineWidth = 6
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
            this.ctx.lineTo(this.points[nr + 1].x, this.points[nr + 1].y)
            this.ctx.stroke()
        });
        // this.ctx.strokeStyle = this.dirtPatttern
    }
}