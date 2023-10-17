import Speedway from './class.js'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath()
ctx.ellipse(250, 200, 200, 150, 0, 0, 2 * Math.PI);
ctx.fill()

const speed = new Speedway(50, 50, ctx)
console.log(speed)