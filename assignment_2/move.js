function move() {
	// Translate of +2 on the x axis, and -1 on the y axis
	var T1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,	    0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    T1 = translateBy(2.0, -1.0, 0.0, T1);
			   
	// Rotate of 45 degrees on the x axis
	var R1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    R1 = rotateAroundAxisBy("x", 45, R1);
			   
	// Make the object 2 times smaller
	var S1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    S1 = shrinkWithFactor(0.5, S1);
			   
	// Make the object 2 times longer on the z axis, and half on the other axis
	var S2 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    S2 = scaleAlongAxisWithFactor(0.5, 0.5, 2, S2);

	// Mirror over the z axis
	var S3 =  [1.0,	0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    S3 = mirrorOverAxis("z", S3);
			   
	// Flatten over the z axis
	var S4 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    S4 = flattenOverAxis("z", S4);
    

	// Make a shear along the Y axis, with a factor of 1 along the x axis
	var H1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    H1 = shearAlong("y", 1, 0, H1);
    console.log(H1);

	return [T1, R1, S1, S2, S3, S4, H1];
}

// Utils functions

function translateBy(x, y, z, matrix) {
    matrix[3] += x;
    matrix[7] += y;
    matrix[11] += z;
    return matrix;
}

function shrinkWithFactor(factor, matrix) {
    return scaleAlongAxisWithFactor(factor, factor, factor, matrix);
}

function scaleAlongAxisWithFactor(x_factor, y_factor, z_factor, matrix) {
    matrix[0] *= x_factor;
    matrix[5] *= y_factor;
    matrix[10] *= z_factor;
    return matrix;
}

function mirrorOverAxis(axis, matrix) {
    switch (axis) {
        case "x":
            matrix = scaleAlongAxisWithFactor(1.0, -1.0, -1.0, matrix);
        case "y":
            matrix = scaleAlongAxisWithFactor(-1.0, 1.0, -1.0, matrix);
        case "z":
            matrix = scaleAlongAxisWithFactor(-1.0, -1.0, 1.0, matrix);
    }

    return matrix;
}

function flattenOverAxis(axis, matrix) {
    switch (axis) {
        case "x":
            matrix = scaleAlongAxisWithFactor(0.0, 1.0, 1.0, matrix);
        case "y":
            matrix = scaleAlongAxisWithFactor(1.0, 0.0, 1.0, matrix);
        case "z":
            matrix = scaleAlongAxisWithFactor(1.0, 1.0, 0.0, matrix);
    }

    return matrix;
}

function rotateAroundXBy(radiants) {
    var Rx =  [1.0,		    0.0,		            0.0,		        0.0,
               0.0,		Math.cos(radiants),	   -Math.sin(radiants),		0.0,
               0.0,		Math.sin(radiants),		Math.cos(radiants),		0.0,
               0.0,		    0.0,		            0.0,		        1.0];
    
    return Rx;
}

function rotateAroundYBy(radiants, matrix) {
    var Ry =  [Math.cos(radiants),  0.0,		Math.sin(radiants),		0.0,
                    0.0,		   1.0,	         0.0,		        0.0,
               -Math.sin(radiants), 0.0,		Math.cos(radiants),		0.0,
               0.0,		    0.0,		         0.0,		        1.0];
    
    return Ry;
}

function rotateAroundZBy(radiants, matrix) {
    var Rz =  [Math.cos(radiants),  -Math.sin(radiants), 0.0,		0.0,
               Math.sin(radiants),   Math.cos(radiants), 0.0,		0.0,
               0.0,                     0.0,		   1.0,		0.0,
               0.0,		                0.0,		   0.0,		1.0];
    
    return Rz;
}

function rotateAroundAxisBy(axis, degrees, matrix) {
    radiants = degrees * Math.PI / 180;

    switch(axis) {
        case "x":
            return rotateAroundXBy(radiants);
        case "y":
            return rotateAroundYBy(radiants);
        case "z":
            return rotateAroundZBy(radiants);
    }
}

function shearAlong(axis, value_1, value_2, matrix) {
    switch (axis) {
        case "x":
            matrix[4] = value_1;
            matrix[8] = value_2;
            break;
        case "y":
            matrix[1] = value_1;
            matrix[9] = value_2;
            break;
        case "z":
            matrix[2] = value_1;
            matrix[6] = value_2;
            break;
    }

    return matrix;
}