function buildGeometry() {
	var i;
	
	// Draws a cube (replace the vertices)
	var vert1 = [
        [0.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [1.0, 1.0, 0.0],

        [0.0, 0.0, 0.0],
        [1.0, 0.0, 0.0],
        [1.0, 1.0, 0.0],

        [0.0, 0.0, 1.0],
        [0.0, 1.0, 1.0],
        [1.0, 1.0, 1.0],

        [0.0, 0.0, 1.0],
        [1.0, 0.0, 1.0],
        [1.0, 1.0, 1.0],

        [0.0, 0.0, 0.0],
        [1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0],

        [1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0],
        [1.0, 0.0, 1.0],

        [0.0, 1.0, 0.0],
        [1.0, 1.0, 0.0],
        [0.0, 1.0, 1.0],

        [1.0, 1.0, 0.0],
        [0.0, 1.0, 1.0],
        [1.0, 1.0, 1.0],

        [0.0, 0.0, 0.0],
        [0.0, 0.0, 1.0],
        [0.0, 1.0, 0.0],

        [0.0, 1.0, 1.0],
        [0.0, 0.0, 1.0],
        [0.0, 1.0, 0.0],

        [1.0, 0.0, 0.0],
        [1.0, 0.0, 1.0],
        [1.0, 1.0, 0.0],

        [1.0, 1.0, 1.0],
        [1.0, 0.0, 1.0],
        [1.0, 1.0, 0.0],
        
    ];

	addMesh(vert1, "L", [1.0, 0.0, 0.0]);


	// Draws a flat L-shaped pattern (replace the vertices)
	var vert2 = [
        [0.0, 3.0, 0.0],
        [1.0, 3.0, 0.0],
        [0.0, 2.0, 0.0],
        [1.0, 1.0, 0.0],
        [0.0, 0.0, 0.0],
        [2.0, 0.0, 0.0],
        [2.0, 1.0, 0.0],
        [1.0, 1.0, 0.0]
    ];

	addMesh(vert2, "S", [0.0, 0.0, 1.0]);


	// Draws a flat hexagon (replace the vertices)
	var vert3 = [
        [0.0, 0.0, 0.0],
        [-0.5, 0.0, 1.0],
        [0.5, 0.0, 1.0],
        [1.0, 0.0, 0.0],
        [0.5, 0.0, -1.0],
        [-0.5, 0.0, -1.0],
        [-1.0, 0.0, 0.0],
        [-0.5, 0.0, 1.0]
	];

	addMesh(vert3, "F", [0.0, 1.0, 0.0]);
	
}