/**
 * Created by claudio on 18/12/16.
 */
var DIM = 10;
var INITIAL_POS = 100;
var PERIOD = 100;

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
var sign = false;
window.setInterval(function(){
    "use strict";
    var angle = calculateAngle(i)/2 - Math.PI/2;
    drawPendulum(100+Math.cos(angle)*50, 100-Math.sin(angle)*50);
    console.log(i, angle);
    i++;
},100);


function calculateAngle(time){
    "use strict";
    return Math.PI * Math.cos(2* Math.PI/PERIOD * time);
}