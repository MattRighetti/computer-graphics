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

        this.currentTime = (new Date).getTime();
        this.lastUpdateTime = null;
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

    clearOptimized() {
        utils.resizeCanvasToDisplaySize(this.gl.canvas);
        this.gl.clearColor(0.85, 0.85, 0.85, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
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
        this.perspectiveMatrix = utils.MakePerspective(60, this.gl.canvas.width / this.gl.canvas.height, 0.01, 100.0);
        this.viewMatrix = utils.MakeView(0, 0.0, 0.131, 0.0, 0.0);
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

    // I had to pass gl like this because this.gl gave some problems at runtime
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
        this.gl.drawElements(this.gl.TRIANGLES, model.getIndices().length, this.gl.UNSIGNED_SHORT, 0);
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
        this.animateClockHour();
        this.animateClockMinutes();
        this.animateTailAndEyes();
        this.clearOptimized();
        this.models.forEach(model => {
            this.updateModelData(model);
            this.drawScene(model);
        });
    }

   /****************************************************
    *   Update Methods
    *   These methods are state changing
    ****************************************************/

    // CLOCK Animation

    /**
     * This method positions the hours hand in the correct position when the program 
     * starts execution
     */
    rotateToCurrentHoursAndMinutes() {
        var minutes = (new Date()).getMinutes();
        var rotateMatrix = utils.MakeRotateZMatrix(6.0 * minutes);
        this.models[2].localMatrix = utils.multiplyMatrices(this.models[2].localMatrix, rotateMatrix);

        var hours = (new Date()).getHours();
        // deltaHours is used to make the position of the hours hand more precise
        // e.g. ig you have 51 minutes then the hours hand must be closer to the next hour
        var deltaHours = (30.0 / 60.0) * minutes;
        var rotateMatrix = utils.MakeRotateZMatrix((30.0 * hours) + deltaHours);
        this.models[3].localMatrix = utils.multiplyMatrices(this.models[3].localMatrix, rotateMatrix);
    }

    // NB: This function is called every time a frame is loadded
    // this GL program runs more or less at 60FPS
    animateClockMinutes() {
        // This is called 60 per second
        // To make a complete 360° angle we have to wait 60 seconds
        // Degrees to rotate each call = 6 / 60
        var rotateMatrix = utils.MakeRotateZMatrix(6.0 / 60.0 / 60.0);
        this.models[2].localMatrix = utils.multiplyMatrices(this.models[2].localMatrix, rotateMatrix)
    }

    animateClockHour() {
        // This is called 60 times per second
        // To make a complete 360° angle we have to wait 60 seconds
        // Degrees to rotate each hour = 6 / 60 / 60 / 60
        var rotateMatrix = utils.MakeRotateZMatrix(6.0 / 60.0 / 60.0 / 60.0);
        this.models[3].localMatrix = utils.multiplyMatrices(this.models[3].localMatrix, rotateMatrix)
    }

    animateTailAndEyes() {
        this.currentTime = (new Date()).getTime();
        var sinTime = Math.sin(this.currentTime  / 1000.0);
        var rotateMatrix = utils.MakeRotateZMatrix(30.0 * sinTime / 60.0);
        this.models[1].localMatrix = utils.multiplyMatrices(this.models[1].localMatrix, rotateMatrix)

        rotateMatrix = utils.MakeRotateYMatrix(sinTime / 2.0);
        this.models[4].localMatrix = utils.multiplyMatrices(this.models[4].localMatrix, rotateMatrix);
        this.models[5].localMatrix = utils.multiplyMatrices(this.models[5].localMatrix, rotateMatrix);
    }

    /****************************************************
    *   WSDA Methods
    ****************************************************/
    
    goForward() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(0.0, 0.0, 0.001);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    goBack() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(0.0, 0.0, -0.001);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    goLeft() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(0.001, 0.0, 0.0);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    goRight() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(-0.001, 0.0, 0.0);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    goUp() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(0.0, 0.001, 0.0);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    goDown() {
        // Transformation matrix
        var goForwardTransformMatrix = utils.MakeTranslateMatrix(0.0, -0.001, 0.0);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, goForwardTransformMatrix);
    }

    lookDown() {
        var lookDownTransformMatrix = utils.MakeRotateXMatrix(5);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, lookDownTransformMatrix);
    }

    lookUp() {
        var lookDownTransformMatrix = utils.MakeRotateXMatrix(-5);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, lookDownTransformMatrix);
    }

    lookRight() {
        var lookDownTransformMatrix = utils.MakeRotateYMatrix(5);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, lookDownTransformMatrix);
    }

    lookLeft() {
        var lookDownTransformMatrix = utils.MakeRotateYMatrix(-5);
        this.viewMatrix = utils.multiplyMatrices(this.viewMatrix, lookDownTransformMatrix);
    }

}