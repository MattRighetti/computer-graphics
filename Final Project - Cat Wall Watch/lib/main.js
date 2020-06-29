/*
*********************************************************************************************************
*********************************************************************************************************
*                                                                                                       *
*                                          Commands Setup                                               *
*                                                                                                       *
*********************************************************************************************************
*********************************************************************************************************
*/

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: //d
            keyD = true;
            gl.onKeyDown(68);
            break;
        case 83: //s
            keyS = true;
            gl.onKeyDown(83);
            break;
        case 65: //a
            keyA = true;
            gl.onKeyDown(65);
            break;
        case 87: //w
            keyW = true;
            gl.onKeyDown(87);
            break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
    }
}

/*
*********************************************************************************************************
*********************************************************************************************************
*                                                                                                       *
*                                         MODELS POSITIONS                                              *
*                                                                                                       *
*********************************************************************************************************
*********************************************************************************************************
*/

var catBodyLocalMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
var clockHand1LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.00111111, 0.0, 0.0, 0.0, 1.0);
var clockHand2LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.011, 0.0, 0.0, 0.0, 1.0);
var eye1LocalMatrix = utils.MakeWorld(-0.009095, 0.047, 0.018732, 0.0,0.0,0.0, 1.0);
var eye2LocalMatrix = utils.MakeWorld(0.007117, 0.047, 0.018971, 0.0,0.0,0.0, 1.0);
var tailLocalMatrix = utils.MakeWorld(-0.005182, -0.014557, 0.012112, 0.0,0.0,0.0, 1.0);

/*
*********************************************************************************************************
*********************************************************************************************************
*                                                                                                       *
*                                                MAIN                                                   *
*                                                                                                       *
*********************************************************************************************************
*********************************************************************************************************
*/

var gl;

async function main() {
    gl = new GL();
    gl.setProgram();
    gl.clear(viewport=true);
    gl.initLocation();

    var catBody = new Model(gl.baseDir + 'lib/models/CatBody.obj', catBodyLocalMatrix);
    var tail = new Model(gl.baseDir + 'lib/models/tail.obj', tailLocalMatrix);
    var clockhand1 = new Model(gl.baseDir + 'lib/models/clockhand1.obj', clockHand1LocalMatrix);
    var clockhand2 = new Model(gl.baseDir + 'lib/models/clockhand2.obj', clockHand2LocalMatrix);
    var eye1 = new Model(gl.baseDir + 'lib/models/eye1.obj', eye1LocalMatrix);
    var eye2 = new Model(gl.baseDir + 'lib/models/eye2.obj', eye2LocalMatrix);

    await catBody.initModel();
    await tail.initModel();
    await clockhand1.initModel();
    await clockhand2.initModel();
    await eye1.initModel();
    await eye2.initModel();

    gl.initMainMatrices();
    gl.initVertexArrayObject();

    gl.loadModelInGl(catBody);
    gl.loadModelInGl(tail);
    gl.loadModelInGl(clockhand1);
    gl.loadModelInGl(clockhand2);
    gl.loadModelInGl(eye1);
    gl.loadModelInGl(eye2);

    gl.initTexture();
    gl.rotateToCurrentHoursAndMinutes();

    draw();

    function draw() {
        gl.drawModels();
        window.requestAnimationFrame(draw);
    }

}

/*
*********************************************************************************************************
*********************************************************************************************************
*                                                                                                       *
*                                              WINDOW OPS                                               *
*                                                                                                       *
*********************************************************************************************************
*********************************************************************************************************
*/

window.onload = main;
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);