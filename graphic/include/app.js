/**
 * Created by claudio on 18/12/16.
 */
var DIM = 10;
var INITIAL_POS =100;
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

var i = -50;
var sign = false;
window.setInterval(function(){
    "use strict";
    if(Math.abs(i)==0 || Math.abs(i)==100)
        sign = !sign;
    drawPendulum(100+Math.cos(i/100*Math.PI)*50, 100-Math.sin(i/100*Math.PI)*50);
    if(sign)
        i--;
    else
        i++;
},100);
