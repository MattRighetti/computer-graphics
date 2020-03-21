function axonometry() {
    
    let w = 50
    let a = (16/9)
    let n = 1
    let f = 101

    const iso_x_angle = utils.degToRad(-35.26);
    const iso_y_angle = utils.degToRad(45.0);

    // Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
    var A1 = utils.MakeParallel(w, a, n, f);

    var RX = [1.0,	        0.0,		                0.0,		        0.0,
              0.0,		Math.cos(iso_x_angle),		Math.sin(iso_x_angle),		0.0,
              0.0,	   -Math.sin(iso_x_angle),		Math.cos(iso_x_angle),		0.0,
              0.0,		    0.0,		            0.0,		        1.0];

    var RY = [Math.cos(iso_y_angle),	0.0,		Math.sin(iso_y_angle),	0.0,
                0.0,		    1.0,		    0.0,		0.0,
             -Math.sin(iso_y_angle),	    0.0,		Math.cos(iso_y_angle),	0.0,
                0.0,		    0.0,		    0.0,		1.0];

    A1 = utils.multiplyMatrices(utils.multiplyMatrices(A1, RX), RY);
    
    // ----------------------------------------------------------------------------------------------------------

    // Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis

    var A2 = utils.MakeParallel(w, a, n, f);
    var alpha_angle = utils.degToRad(-20.0);
    
    var RX = [1.0,	        0.0,		                0.0,		        0.0,
        0.0,		Math.cos(alpha_angle),		Math.sin(alpha_angle),		0.0,
        0.0,	   -Math.sin(alpha_angle),		Math.cos(alpha_angle),		0.0,
        0.0,		    0.0,		            0.0,		        1.0];

    var RY = [Math.cos(iso_y_angle),	0.0,		Math.sin(iso_y_angle),	0.0,
                0.0,		    1.0,		    0.0,		0.0,
            -Math.sin(iso_y_angle),	    0.0,		Math.cos(iso_y_angle),	0.0,
                0.0,		    0.0,		    0.0,		1.0];
        
    A2 = utils.multiplyMatrices(utils.multiplyMatrices(A2, RX), RY);
               
    // ----------------------------------------------------------------------------------------------------------         
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 = utils.MakeParallel(w, a, n, f);
    var alpha_angle = utils.degToRad(30.0);
    var beta_angle = utils.degToRad(30.0);
    
    var RX = [1.0,	        0.0,		                0.0,		        0.0,
        0.0,		Math.cos(alpha_angle),		Math.sin(alpha_angle),		0.0,
        0.0,	   -Math.sin(alpha_angle),		Math.cos(alpha_angle),		0.0,
        0.0,		    0.0,		            0.0,		        1.0];

    var RY = [Math.cos(beta_angle),	0.0,		Math.sin(beta_angle),	0.0,
                0.0,		    1.0,		    0.0,		0.0,
            -Math.sin(beta_angle),	    0.0,		Math.cos(beta_angle),	0.0,
                0.0,		    0.0,		    0.0,		1.0];
        
    A3 = utils.multiplyMatrices(utils.multiplyMatrices(A3, RX), RY);
    
    // ----------------------------------------------------------------------------------------------------------
			   
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var O1 = utils.MakeParallel(w, a, n, f);
    var alpha_angle = utils.degToRad(45.0);
    var ro = 1;
    
    var RX = [1.0,	        0.0,	    -ro * Math.cos(alpha_angle),	    0.0,
              0.0,		    1.0,		-ro * Math.sin(alpha_angle),		0.0,
              0.0,	        0.0,		            1.0,		            0.0,
              0.0,		    0.0,		            0.0,		            1.0];
        
    O1 = utils.multiplyMatrices(O1, RX);
    
    // ----------------------------------------------------------------------------------------------------------

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var O2 = utils.MakeParallel(w, a, n, f);
    var alpha_angle = utils.degToRad(60.0);
    var ro = 0.5;
    
    var RX = [1.0,	        0.0,	    -ro * Math.cos(alpha_angle),	    0.0,
              0.0,		    1.0,		-ro * Math.sin(alpha_angle),		0.0,
              0.0,	        0.0,		            1.0,		            0.0,
              0.0,		    0.0,		            0.0,		            1.0];
        
    O2 = utils.multiplyMatrices(O2, RX);
               
    // ----------------------------------------------------------------------------------------------------------

	return [A1, A2, A3, O1, O2];
}