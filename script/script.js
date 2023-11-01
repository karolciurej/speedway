import Speedway from './speedway.js';
import Motor from './motor.js';

const speedway = new Speedway("canvas");
speedway.drawSpeedway();

const motor1 = new Motor("canvas", 17, 20,0, "a", "d")
motor1.start()
