function parallel() {
	// Build a parallel projection matrix, for a 16/9 viewport, with halfwidt w=40, near plane n=1, and far plane f=101.
	var out_long = [1.0,		0.0,		0.0,		0.0,
			        0.0,		1.0,		0.0,		0.0,
			        0.0,		0.0,		1.0,		0.0,
                    0.0,		0.0,		0.0,		1.0];
    // Given data
    const a = 16 / 9;
    const w = 40;
    const n = 1;
    const f = 101;

    // Data
    const l = -w;
    const r = w;
    const t = w/a;
    const b = -w/a;

    // 1. Translate
    out_long_translate = utils.MakeTranslateMatrix(-(r+l)/2, -(t+b)/2, -(-f+n)/2);
    // 2. Normalization
    out_long_scale = utils.MakeScaleNuMatrix(2/(r-l), 2/(t-b), 2/(f-n));
    // 3. Convert from RHD to LHD
    out_long_mirror = utils.MakeScaleNuMatrix(1, 1, -1);

    out_long = utils.multiplyMatrices((utils.multiplyMatrices(out_long_mirror, out_long_scale)), out_long_translate);

    // Or write the simple formula
    var out_simple = [1/w,		0.0,		0.0,		0.0,
                      0.0,		a/w,		0.0,		0.0,
                      0.0,		0.0,	  -2/(f-n),	 -(f+n)/(f-n),
                      0.0,		0.0,		0.0,		1.0];

    console.log(out_long);
    console.log(out_simple);

	return 1 == 1 ? out_long : out_simple;
}

