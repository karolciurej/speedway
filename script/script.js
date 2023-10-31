import Speedway from './speedway.js';
import Motor from './motor.js';

const speedway = new Speedway("canvas");
speedway.drawSpeedway();

const motor1 = new Motor("canvas", 20,10,0)
motor1.drawMotor()