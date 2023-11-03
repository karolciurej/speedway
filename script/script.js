import Speedway from './speedway.js';
import Motor from './motor.js';
import Track from './track.js';

const speedway = new Speedway("canvas");
speedway.drawSpeedway();

const track1 = new Track("canvas")
const track2 = new Track("canvas")
const motor1 = new Motor("canvas", 47, 14, 1, "a", "d", track1)
const motor2 = new Motor("canvas", 47, 14, 2, "ArrowLeft", "ArrowRight", track2)
motor1.start()
motor2.start()
