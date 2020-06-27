class GL {
    constructor() {
        // Folders utils
        var path = window.location.pathname;
        var page = path.split("/").pop();
        this.baseDir = window.location.href.replace(page, '');
        this.shaderDir = this.baseDir + 'lib/shaders/';

        // WebGL variables
        this.canvas = document.getElementById("my-canvas");
        this.gl = this.canvas.getContext("webgl2");
        if (!this.gl) {
            document.write("GL context not opened");
        }

        // Other variables
        this.positionAttributeLocation = null;
        this.uvAttributeLocation = null;
        this.matrixLocation = null;
        this.textLocation = null;

        this.texture = null;

        // Main matrices
        this.perspectiveMatrix = null;
        this.viewMatrix = null;

        // Models container
        this.models = []; 
    }

    setProgram() {
        let vs = `#version 300 es

        in vec3 a_position;
        in vec2 a_uv;
        out vec2 uvFS;
        
        uniform mat4 matrix; 
        void main() {
            uvFS = a_uv;
            gl_Position = matrix * vec4(a_position, 1.0);
        }
        `

        let fs = `#version 300 es

        precision mediump float;
        
        in vec2 uvFS;
        out vec4 outColor;
        uniform sampler2D u_texture;
        
        void main() {
            outColor = texture(u_texture, uvFS);
        }
        `

        var vertexShader = utils.createShader(this.gl, this.gl.VERTEX_SHADER, vs);
        var fragmentShader = utils.createShader(this.gl, this.gl.FRAGMENT_SHADER, fs);  
        this.program = utils.createProgram(this.gl, vertexShader, fragmentShader);
        this.gl.useProgram(this.program);
    }

    clear(setViewPort=false) {
        utils.resizeCanvasToDisplaySize(this.gl.canvas);
        if (setViewPort) {
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        }
        this.gl.clearColor(0.85, 0.85, 0.85, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        if (setViewPort) {
            this.gl.enable(this.gl.DEPTH_TEST);
        }
    }

    initLocation() {
        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.uvAttributeLocation = this.gl.getAttribLocation(this.program, "a_uv");
        this.matrixLocation = this.gl.getUniformLocation(this.program, "matrix");
        this.textLocation = this.gl.getUniformLocation(this.program, "u_texture");
    }

    initVertexArrayObject() {
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
    }

    initMainMatrices() {
        this.perspectiveMatrix = utils.MakePerspective(120, this.gl.canvas.width / this.gl.canvas.height, 0.1, 100.0);
        this.viewMatrix = utils.MakeView(0, 0.0, 3.0, 0.0, 0.0);
    }

    createPositionBuffer(modelVertices) {
        // Create buffer
        var positionBuffer = this.gl.createBuffer();
        // Bind to buffer so that every other function call refers to that buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        // Pass data to buffer (on GPU)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(modelVertices), this.gl.STATIC_DRAW);


        // First off we need to turn the attribute on. 
        // This tells WebGL we want to get data out of a buffer. 
        // If we don't turn on the attribute then the attribute will have a constant value.
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        // How to pull the data out of the buffer
        // gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
        this.gl.vertexAttribPointer(this.positionAttributeLocation, 3, this.gl.FLOAT, false, 0, 0);
    }

    createUvBuffer(modelTextCoords) {
        var uvBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, uvBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(modelTextCoords), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(this.uvAttributeLocation);
        this.gl.vertexAttribPointer(this.uvAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    createIndexBuffer(modelIndices) {
        var indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndices), this.gl.STATIC_DRAW);
    }

    createTexture(url, gl=this.gl) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        var image = new Image();
        image.src = this.baseDir + url;

        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D);
        };

        this.texture = texture;
    }

    drawScene(model) {
        var viewWorldMatrix = utils.multiplyMatrices(this.viewMatrix, model.localMatrix);
        var projectionMatrix = utils.multiplyMatrices(this.perspectiveMatrix, viewWorldMatrix);
        this.gl.uniformMatrix4fv(this.matrixLocation, this.gl.FALSE, utils.transposeMatrix(projectionMatrix));
        this.gl.uniform1i(this.textLocation, this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindVertexArray(this.vao);
        this.gl.drawElements(this.gl.TRIANGLES, model.getIndices().length, this.gl.UNSIGNED_SHORT, 0, 4);
    }

    updateModelData(model) {
        this.createPositionBuffer(model.getVertices());
        this.createUvBuffer(model.getTextureCoord());
        this.createIndexBuffer(model.getIndices());
    }

    loadModelInGl(model) {
        this.models.push(model);
    }

    initTexture() {
        this.createTexture('lib/models/KitCat_color.png');
    }

    drawModels() {
        
        this.clear();

        this.models.forEach(model => {
            this.updateModelData(model);
            this.drawScene(model);
            console.log("Drawing");
        });
    }
}

class Model {
    constructor(url, localMatrix) {
        this.obj = null;
        this.model = null;
        this.localMatrix = localMatrix;

        this.url = url;
    }

    async initModel() {
        this.obj = await utils.get_objstr(this.url)
        this.model = new OBJ.Mesh(this.obj);
    }

    getVertices() {
        return this.model.vertices;
    }

    getVertexNormals() {
        return this.model.vertexNormals;
    }

    getIndices() {
        return this.model.indices;
    }

    getTextureCoord() {
        return this.model.textures;
    }

}

async function main() {
    var gl = new GL();
    gl.setProgram();
    gl.clear(viewport=true);
    gl.initLocation();

    // Model Positions
    var catBodyLocalMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 50.0);
    var clockHand1LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.029, 0.0, 0.0, 0.0, 40.0);
    var clockHand2LocalMatrix = utils.MakeWorld(0.0, 0.0, 0.028, 0.0, 0.0, 0.0, 40.0);
    var eye1LocalMatrix = utils.MakeWorld(-0.009095, 0.047, 0.018732, 0.0,0.0,0.0,40.0);
    var eye2LocalMatrix = utils.MakeWorld(0.007117, 0.047, 0.018971, 0.0,0.0,0.0,40.0);
    var tailLocalMatrix = utils.MakeWorld(-0.005182, -0.014557, 0.012112, 0.0,0.0,0.0,40.0);

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
    gl.loadModelInGl(eye1);
    gl.loadModelInGl(eye2);
    gl.loadModelInGl(clockhand1);
    gl.loadModelInGl(clockhand2);

    gl.initTexture();

    draw();

    function draw() {
        gl.drawModels();
        window.requestAnimationFrame(draw);
    }

}


window.onload = main;