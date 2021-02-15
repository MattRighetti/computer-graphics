function perspective(w, h, fov) {
    // Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
    let n = 1.0
    let f = 100.0
    var out = [1/(w/h * Math.tan(utils.degToRad(fov)/2)),		0.0,		0.0,		0.0,
			   0.0,		                        1/Math.tan(utils.degToRad(fov)/2),  0.0,		0.0,
			   0.0,		    0.0,		(f+n)/(n-f),		2*f*n/(n-f),
			   0.0,		    0.0,		-1.0,		0.0];

	return out;
}

