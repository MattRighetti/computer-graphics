
function view(cx, cy, cz, alpha, beta, rho) {
	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.
	var T = utils.MakeTranslateMatrix(-cx, -cy, -cz);  
    
    var RX =  utils.MakeRotateXMatrix(-beta);
    
    var RY =  utils.MakeRotateYMatrix(-alpha);

    var RZ = utils.MakeRotateZMatrix(-rho);

    out = utils.multiplyMatrices(RZ, RX);
    out = utils.multiplyMatrices(out, RY);
    out = utils.multiplyMatrices(out, T);

	return out;
}