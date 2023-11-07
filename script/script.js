import Speedway from './speedway.js';
import Motor from './motor.js';
import Track from './track.js';


let motor1, motor2, motor3, motor4;
const players = []
export default players


class Start{
    start(){
        if(!this.checkForm()){
            alert("źle")
            return
        }
    
        const loops = document.querySelector(".loops").value
        console.log(loops)
        const isPlaying1 = document.querySelector("#horse1").checked
        const isPlaying2 = document.querySelector("#horse2").checked
        const isPlaying3 = document.querySelector("#horse3").checked
        const isPlaying4 = document.querySelector("#horse4").checked
        let isChecked = false
        let isStarting = false
        if(isPlaying1){
            console.log("1gra")
            const leftKey = document.querySelector(".keyLeft1").value
            const rightKey = document.querySelector(".keyRight1").value
            const color = document.querySelector("#color1").value
            const name = document.querySelector(".name1").value
            const track1 = new Track("canvas", color)
            if(!isStarting && !isChecked){
                isStarting = true
                isChecked = true
            }
            else 
                isStarting = false
            motor1 = new Motor("canvas", 47, 14, 1, leftKey, rightKey, track1, name, isStarting, loops)
            players.push(motor1);

        }

        if(isPlaying2){
            console.log("2gra")
            const leftKey = document.querySelector(".keyLeft2").value
            const rightKey = document.querySelector(".keyRight2").value
            const color = document.querySelector("#color2").value
            const name = document.querySelector(".name2").value
            const track2 = new Track("canvas", color)
            if(!isStarting && !isChecked){
                isStarting = true
                isChecked = true
            }
            else 
                isStarting = false
            motor2 = new Motor("canvas", 47, 14, 2, leftKey, rightKey, track2, name, isStarting, loops)
            players.push(motor2);
 
        }
        if(isPlaying3){
            console.log("3gra")
            const leftKey = document.querySelector(".keyLeft3").value
            const rightKey = document.querySelector(".keyRight3").value
            const color = document.querySelector("#color3").value
            const name = document.querySelector(".name3").value
            const track3 = new Track("canvas", color)
            if(!isStarting && !isChecked){
                isStarting = true
                isChecked = true
            }
            else 
                isStarting = false
            motor3 = new Motor("canvas", 47, 14, 3, leftKey, rightKey, track3, name, isStarting, loops)
            players.push(motor3)
        }
        if(isPlaying4){
            console.log("4gra")
            const leftKey = document.querySelector(".keyLeft4").value
            const rightKey = document.querySelector(".keyRight4").value
            const color = document.querySelector("#color4").value
            const name = document.querySelector(".name4").value
            const track4 = new Track("canvas", color)
            if(!isStarting && !isChecked){
                isStarting = true
                isChecked = true
            }
            else 
                isStarting = false
            motor4 = new Motor("canvas", 47, 14, 4, leftKey, rightKey, track4, name, isStarting, loops)
            players.push(motor4);    
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
        checkForm() {
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

}

const keyInputs = document.querySelectorAll(".key");

keyInputs.forEach(element => {
    element.addEventListener("keydown", (event) => {
        element.value = event.key
        event.preventDefault();

    });
});

const start = new Start()
document.querySelector(".button").addEventListener("click", ()=>{
    start.start()
})








