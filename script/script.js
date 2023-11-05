import Speedway from './speedway.js';
import Motor from './motor.js';
import Track from './track.js';

let motor1, motor2, motor3, motor4;

const keyInputs = document.querySelectorAll(".key");

keyInputs.forEach(element => {
    element.addEventListener("keydown", (event) => {
        element.value = event.key
        event.preventDefault();

    });
});
document.querySelector(".button").addEventListener("click", ()=>{
    start()
})
function checkForm() {
    let allInputsValid = true; 
    let anythingChecked = false

    document.querySelectorAll('.player .toggle').forEach(player => {
        const checkbox = player.querySelector('input[type="checkbox"]');

        if (checkbox.checked) {
            anythingChecked = true
            player.querySelectorAll('input[type="text"], input[type="color"]').forEach(input => {
                if (!input.value.trim()) {
                    allInputsValid = false;
                    input.classList.add('input-invalid'); 
                } else {
                    input.classList.remove('input-invalid'); 
                }
            });
        }
    });
    if (!anythingChecked)
        allInputsValid = false
    return allInputsValid
}


function start(){
    if(!checkForm())
        return
    const isPlaying1 = document.querySelector("#horse1").checked
    const isPlaying2 = document.querySelector("#horse2").checked
    const isPlaying3 = document.querySelector("#horse3").checked
    const isPlaying4 = document.querySelector("#horse4").checked
    let starting = false
    if(isPlaying1){
        const leftKey = document.querySelector(".keyLeft1").value
        const rightKey = document.querySelector(".keyRight1").value
        const color = document.querySelector("#color1").value
        const name = document.querySelector(".name1").value
        const track1 = new Track("canvas", color)
        if(!starting)
            starting = true
        else 
            starting = false
        motor1 = new Motor("canvas", 47, 14, 1, leftKey, rightKey, track1, name, starting)
    }
    if(isPlaying2){
        const leftKey = document.querySelector(".keyLeft2").value
        const rightKey = document.querySelector(".keyRight2").value
        const color = document.querySelector("#color2").value
        const name = document.querySelector(".name2").value
        const track2 = new Track("canvas", color)
        if(!starting)
            starting = true
        else 
            starting = false
        motor2 = new Motor("canvas", 47, 14, 2, leftKey, rightKey, track2, name, starting)
        
    }
    if(isPlaying3){
        const leftKey = document.querySelector(".keyLeft3").value
        const rightKey = document.querySelector(".keyRight3").value
        const color = document.querySelector("#color3").value
        const name = document.querySelector(".name3").value
        const track3 = new Track("canvas", color)
        if(!starting)
            starting = true
        else 
            starting = false
        motor3 = new Motor("canvas", 47, 14, 3, leftKey, rightKey, track3, name, starting)
    }
    if(isPlaying4){
        const leftKey = document.querySelector(".keyLeft4").value
        const rightKey = document.querySelector(".keyRight4").value
        const color = document.querySelector("#color4").value
        const name = document.querySelector(".name4").value
        const track4 = new Track("canvas", color)
        if(!starting)
            starting = true
        else 
            starting = false
        motor4 = new Motor("canvas", 47, 14, 4, leftKey, rightKey, track4, name, starting)
        }

    document.querySelector(".menu").style.visibility = "hidden"
    document.querySelector(".frame").style.visibility = "visible"
    const speedway = new Speedway("canvas");
    speedway.drawSpeedway()
    motor1?.start();
    motor2?.start();
    motor3?.start();
    motor4?.start();

}




