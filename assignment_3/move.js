function move() {
	// Rotate 45 degrees around an arbitrary axis passing through (1,0,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis, and then -60 degrees around the y-axis.
	var R1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    // Make axis pass by origin
    R1 = utils.multiplyMatrices(R1, utils.MakeTranslateMatrix(1, 0, -1))
    // Rotate to make x-axis align with arbitrary axis
    R1 = utils.multiplyMatrices(R1, utils.MakeRotateYMatrix(-60))
    // Rotate to make x-axis align with arbitrary axis
    R1 = utils.multiplyMatrices(R1, utils.MakeRotateZMatrix(30))
    // Rotate object
    R1 = utils.multiplyMatrices(R1, utils.MakeRotateXMatrix(45))
    // Inverted transformations in reverse order
    R1 = utils.multiplyMatrices(R1, utils.invertMatrix(utils.MakeRotateZMatrix(30)))
    R1 = utils.multiplyMatrices(R1, utils.invertMatrix(utils.MakeRotateYMatrix(-60)))
    R1 = utils.multiplyMatrices(R1, utils.invertMatrix(utils.MakeTranslateMatrix(1, 0, -1)))

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    
	// Half the size of an object, using as fixed point (5,0,-2)
	var S1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    // Move to fixed point
    S1 = utils.multiplyMatrices(S1, utils.MakeTranslateMatrix(5, 0, -2))
    // Scale
    S1 = utils.multiplyMatrices(S1, utils.MakeScaleMatrix(0.5))
    // Back to original point
    S1 = utils.multiplyMatrices(S1, utils.invertMatrix(utils.MakeTranslateMatrix(5, 0, -2)))
    
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	var S2 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    // Translate to point
    S2 = utils.multiplyMatrices(S2, utils.MakeTranslateMatrix(1, 1, 1))
    // Rotate by 15 degrees around x to align xz plane with the correct one
    S2 = utils.multiplyMatrices(S2, utils.MakeRotateXMatrix(15))
    // Reflect on xz plane
    S2 = utils.multiplyMatrices(S2, utils.MakeScaleNuMatrix(1.0, -1.0, 1.0))
    S2 = utils.multiplyMatrices(S2, utils.invertMatrix(utils.MakeRotateXMatrix(15)))
    S2 = utils.multiplyMatrices(S2, utils.invertMatrix(utils.MakeTranslateMatrix(1, 1, 1)))
    
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

	// Apply the inverse of the following sequence of transforms: Translation of (0, 0, 5) then rotation of 30 degree around the Y axis, and finally a uniform scaling of a factor of 3.
	var I1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
               0.0,		0.0,		0.0,		1.0];
    // In order to perdorm the transformations above you'd apply them in reverse :)
    // 1. Scale by 3
    // 2. Rotate around Y
    // 3. Translate
    // To invert those sequence you just multiply each inverted matrix of the same sequence in reverse order
    // 4. Translate INVERTED
    // 5. Rotate around Y INVERTED
    // 6. Scale by 3 INVERTED
    I1 = utils.multiplyMatrices(I1, utils.MakeTranslateMatrix(0, 0, -5))
    I1 = utils.multiplyMatrices(I1, utils.MakeRotateYMatrix(-30))
    I1 = utils.multiplyMatrices(I1, utils.MakeScaleMatrix(1/3))

	return [R1, S1, S2, I1];
}

