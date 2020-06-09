function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

    let a = [carx, cary, carz];
    let c = [camx, camy, camz];
    let upvector = [0, 0.3, 0];
    let Vz = utils.normalizeVector3(subtractVectors(c, a));
    let Vx = utils.normalizeVector3(utils.crossVector(upvector, Vz));
    let Vy = utils.crossVector(Vz, Vx);
    var view  = constructLookAtViewMatrix(Vx, Vy, Vz, c);

    let scaleMatrix = utils.MakeScaleMatrix(1);

    let translateMatrix = utils.MakeTranslateMatrix(carx, cary, carz);

    let angleMatrix = utils.MakeRotateYMatrix(cardir);

    var world = utils.multiplyMatrices(utils.multiplyMatrices(translateMatrix, angleMatrix), scaleMatrix);

	return [world, view];
}

function sumVectors(Va, Vb) {
    var out = [];

    console.assert(Va.length == Vb.length, "sumVectorsError: Va has lenght="+ Va.length + " and Vb has length=" + Vb.length);    

    for(var i = 0; i < Va.length; i++) {
        out.push(Va[i] + Vb[i]);
    }

    return out;
}

function subtractVectors(Va, Vb) {
    var out = [];

    console.assert(Va.length == Vb.length, "substractVectorsError: Va has lenght="+ Va.length + " and Vb has length=" + Vb.length);    

    for(var i = 0; i < Va.length; i++) {
        out.push(Va[i] - Vb[i]);
    }

    return out;
}

function vectorModule(vector) {
    var squaredSum = 0;
    for (var i=0; i < vector.length; i++) {
        squaredSum += Math.pow(vector[i], 2);
    }
    return Math.sqrt(squaredSum);
}

function scalarDivision(vector, number) {
    var out = [];
    for (var i=0; i < vector.length; i++) {
        out.push(vector[i] / number);
    }

    console.assert(out.length == vector.length, "scalarDivisionError");

    return out;
}

function constructLookAtCameraMatrix(Vx, Vy, Vz, c) {
    console.assert(Vx.length == 3, "constructLookAtCameraMatrixError");
    console.assert(Vy.length == 3, "constructLookAtCameraMatrixError");
    console.assert(Vz.length == 3, "constructLookAtCameraMatrixError");
    console.assert(c.length == 3, "constructLookAtCameraMatrixError");

    return out = [
        Vx[0], Vy[0], Vz[0], c[0], 
        Vx[1], Vy[1], Vz[1], c[1], 
        Vx[2], Vy[2], Vz[2], c[2], 
        0.0,      0.0,      0.0,    1.0
    ]
}

function constructLookAtViewMatrix(Vx, Vy, Vz, c) {
    console.assert(Vx.length == 3, "constructLookAtViewMatrixError");
    console.assert(Vy.length == 3, "constructLookAtViewMatrixError");
    console.assert(Vz.length == 3, "constructLookAtViewMatrixError");
    console.assert(c.length == 3, "constructLookAtViewMatrixError");

    camMatrix = constructLookAtCameraMatrix(Vx, Vy, Vz, c);
    return utils.invertMatrix(camMatrix);
}

function matrixVectorDotProduct(matrix, vector) {
    console.assert(matrix.length % vector.length == 0, "Matrix could not be multiplied by vector");

    var out = [];

    for (var i = 0; i < matrix.length; i += vector.length) {
        var val = 0;
        for (var j = 0; j < vector.length; j++) {
            val += matrix[i+j] * vector[j];
        }
        out.push(val);
    }

    console.assert(out.length == (matrix.length/vector.length), "Matrix could not be multiplied correctly");

    return out;
}