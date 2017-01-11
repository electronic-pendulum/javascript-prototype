/**
 * Created by claudio on 18/12/16.
 */
var DIM = 10;
var INITIAL_POS = 100;
var G = 9.81;
var L = 500;
var MAX_ANGLE = 90;
var TEHTA0 = MAX_ANGLE/180*Math.PI;
var PERIOD = 2*Math.PI*Math.sqrt(L/G)*(1+Math.pow(TEHTA0,2)/16);
console.log('PERIOD', PERIOD);

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
    var angle = calculateAngle(i) - Math.PI/2;
    var acc = calculateAcc(angle);
    drawPendulum(100+Math.cos(angle)*0.1*L, 100-Math.sin(angle)*0.1*L);
    //console.log(i, angle, acc);
    calculator.registerPoint(acc, i);
    i++;
},10);

function stopStart(){
    "use strict";
    stop = !stop;
}

function calculateAngle(time){
    "use strict";
    return TEHTA0 * Math.cos(2* Math.PI/PERIOD * time);
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
    minXAcc: 1000,
    minYAcc: 1000,
    //zeroYAcc: 1000,
    higherPeriod: 0,
    registerPoint: function(acc, time){
        "use strict";
        //TODO do the same thing for y
        //TODO make a sort of avg
        //TODO make the entire cycle
        //half period
        var x = Math.abs(acc.x);
        var y = Math.abs(acc.y);
        //console.log(x);
        if(x<this.previousXAcc)
        {
            if(!this.decrementingX) {
                var period = (time-this.zeroTime-1)*4;
                console.log('period', period);
                var theta = this.calculateTheta();
                this.calculateL(period, theta);
            }
            this.minXAcc = x;
            this.minYAcc = y;
            this.decrementingX = true;
            this.zeroTime = time;
        }else{
            if(this.decrementingX) {
                //var theta = this.calculateTheta();
            }
            this.decrementingX = false;
        }
        this.previousXAcc = x;
    },
    calculateL: function(period, theta){
        "use strict";
        theta = theta/180*Math.PI;
        var l =  G * Math.pow(period,2)/(4* Math.pow(Math.PI,2) * Math.pow((1+Math.pow(theta,2)/16),2));
        console.log('l', l);
    },
    calculateTheta: function(){
        "use strict";
        var angle = 90-Math.asin(this.minXAcc/G)/Math.PI*180;
        console.log('theta by x', angle);
        console.log('theta by y', 90-Math.acos(this.minYAcc/G)/Math.PI*180);
        return angle;
    }
};