let canvas;
var program;
var gl;
var positionAttributeLocation;
var uvAttributeLocation;
var matrixLocation;
var textLocation;

var shaderDir;
var baseDir;
var modelRelativeDir = 'lib/models/';
var shadersRelativaDir = 'lib/shaders/';

// OBJs
var catBodyStr = modelRelativeDir + 'CatBody.obj';
var clockHandOneStr = modelRelativeDir + 'clockhand1.obj';
var clockHandTwoStr = modelRelativeDir + 'clockhand2.obj';
var eyeOneStr = modelRelativeDir + 'eye1.obj';
var eyeTwoStr = modelRelativeDir + 'eye2.obj';
var tailStr = modelRelativeDir + 'tail.obj';

// Texture
var catBodyTexture = 'lib/models/KitCat_color.png'

// Models
var catBodyModel;

// Model Positions
var clockHand1LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.029, 0.0, 0.0, 0.0, 1.0);
var clockHand2LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.028, 0.0, 0.0, 0.0, 1.0);
var eye1LocalMatrix = utils.MakeWorld(-0.009095, 0.047, 0.018732, 0.0,0.0,0.0,1.0);
var eye2LocalMatrix = utils.MakeWorld(0.007117, 0.047, 0.018971, 0.0,0.0,0.0,1.0);
var tailLocalMatrix = utils.MakeWorld(-0.005182, -0.014557, 0.012112, 0.0,0.0,0.0,1.0);

async function init() {

    var path = window.location.pathname;
    var page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir + shadersRelativaDir;

    var canvas = document.getElementById("my-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }

    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        program = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    gl.useProgram(program);

    //###################################################################################
    //This loads the obj model in the catBodyModel variable
    var model_dict = await loadModels();

    catBodyModel = model_dict['catBody'];
    eye1Model = model_dict['eye1'];
    eye2Model = model_dict['eye2'];
    hand1Model = model_dict['hand1'];
    hand2Models = model_dict['hand2'];
    tailModel = model_dict['tail'];
    //###################################################################################

    main();
}

async function loadModels() {
    var obj_dict = {};
    obj_dict['catBody'] = await utils.get_objstr(baseDir + catBodyStr);
    obj_dict['eye1'] = await utils.get_objstr(baseDir + eyeOneStr);
    obj_dict['eye2'] = await utils.get_objstr(baseDir + eyeTwoStr);
    obj_dict['hand1'] = await utils.get_objstr(baseDir + clockHandOneStr);
    obj_dict['hand2'] = await utils.get_objstr(baseDir + clockHandTwoStr);
    obj_dict['tail'] = await utils.get_objstr(baseDir + tailStr);

    var model_dict = {};
    model_dict['catBody'] = new OBJ.Mesh(obj_dict['catBody']);
    model_dict['eye1'] = new OBJ.Mesh(obj_dict['eye1']);
    model_dict['eye2'] = new OBJ.Mesh(obj_dict['eye2']);
    model_dict['hand1'] = new OBJ.Mesh(obj_dict['hand1']);
    model_dict['hand2'] = new OBJ.Mesh(obj_dict['hand2']);
    model_dict['tail'] = new OBJ.Mesh(obj_dict['tail']);

    return model_dict;
}

function main() {

    var lastUpdateTime = (new Date).getTime();

    var Rx = 0.0;
    var Ry = 0.0;
    var Rz = 0.0;
    var S = 30.0;

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 1.0, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    //###################################################################################
    //Here we extract the position of the vertices, the normals, the indices, and the uv coordinates
    var catBodyVertices = catBodyModel.vertices;
    var catBodyNormals = catBodyModel.vertexNormals;
    var catBodyIndices = catBodyModel.indices;
    var catBodyTexCoords = catBodyModel.textures;

    var tailVertices = tailModel.vertices;
    var tailNormals = tailModel.vertexNormals;
    var tailIndices = tailModel.indices;
    var tailTexCoords = tailModel.textures;
    //###################################################################################

    positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    uvAttributeLocation = gl.getAttribLocation(program, "a_uv");
    matrixLocation = gl.getUniformLocation(program, "matrix");
    textLocation = gl.getUniformLocation(program, "u_texture");

    var perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
    var viewMatrix = utils.MakeView(0, 0.0, 3.0, 0.0, 0.0);

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    createPositionBuffer(catBodyVertices);
    createUvBuffer(catBodyTexCoords);
    createIndexBuffer(catBodyIndices);

    var texture = createTexture(catBodyTexture, gl);

    drawScene();

    function drawScene() {
        worldMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 30.0);
        utils.resizeCanvasToDisplaySize(gl.canvas);
        gl.clearColor(0.85, 0.85, 0.85, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
    
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
    
        gl.activeTexture(gl.TEXTURE0);
        gl.uniform1i(textLocation, texture);
    
        gl.bindVertexArray(vao);
        gl.drawElements(gl.TRIANGLES, catBodyIndices.length, gl.UNSIGNED_SHORT, 0);
    
        window.requestAnimationFrame(drawScene);
    }
}

function createPositionBuffer(modelVertices) {
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
}

function createUvBuffer(modelTexCoords) {
    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelTexCoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);
}

function createIndexBuffer(modelIndices) {
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), gl.STATIC_DRAW);
}

function createTexture(url, gl) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    var image = new Image();
    image.src = baseDir + url;

    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    };

    return texture;
}

window.onload = init;