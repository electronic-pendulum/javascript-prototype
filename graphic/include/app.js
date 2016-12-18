/**
 * Created by claudio on 18/12/16.
 */
var DIM = 10;
var INITIAL_POS = 100;
var PERIOD = 200;
var G = 9.81;

function drawPendulum(x, y) {
    "use strict";
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.lineWidth = 1;
    ctx.fillStyle = "red";
    ctx.strokeStyle = 'black';
    ctx.moveTo(INITIAL_POS*DIM,INITIAL_POS*DIM);
    ctx.lineTo(x*DIM,y*DIM);
    ctx.stroke();
    ctx.fillRect(INITIAL_POS*DIM,INITIAL_POS*DIM,DIM*4, DIM*4);
    ctx.fillRect(x*DIM,y*DIM,DIM*4, DIM*4);
}

var i = 0;
var stop = false;
window.setInterval(function(){
    "use strict";
    if(stop) return;
    var angle = calculateAngle(i)/2 - Math.PI/2;
    var acc = calculateAcc(angle);
    drawPendulum(100+Math.cos(angle)*50, 100-Math.sin(angle)*50);
    //console.log(i, angle, acc);
    calculator.registerPoint(acc, i);
    i++;
},100);

function stopStart(){
    "use strict";
    stop = !stop;
}

function calculateAngle(time){
    "use strict";
    return Math.PI * Math.cos(2* Math.PI/PERIOD * time);
}

function calculateAcc(angle){
    "use strict";
    return {
        x: G* Math.sin(angle),
        y: G* Math.cos(angle),
    }
}

var calculator = {
    previousXAcc: 1000,
    //zeroYAcc: 1000,
    higherPeriod: 0,
    registerPoint: function(acc, time){
        "use strict";
        //TODO do the same thing for y
        //TODO make a sort of avg
        //half period
        var x = Math.abs(acc.x);
        //console.log(x);
        if(x<this.previousXAcc)
        {
            if(!this.decrementingX) {
                console.log('period', x, (time-this.zeroTime-1)*4);
            }
            this.decrementingX = true;
            this.zeroTime = time;
        }else{
            this.decrementingX = false;
        }
        this.previousXAcc = x;
    }
};