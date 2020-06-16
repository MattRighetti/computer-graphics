function shaders() {
// The shader can find the required informations in the following variables:

// vec3 fs_pos;			// Position of the point in 3D space
// 
// vec3 LAPos;			// Position of first (or single) light
// vec3 LADir;			// Direction of first (or single) light
// float LAConeOut;		// Outer cone (in degree) of the light (if spot)
// float LAConeIn;		// Inner cone (in percentage of the outher cone) of the light (if spot)
// float LADecay;		// Decay factor (0, 1 or 2)
// float LATarget;		// Target distance
// vec4 LAlightColor;	// color of the first light
// 		
// vec3 LBPos;			// Same as above, but for the second light
// vec3 LBDir;
// float LBConeOut;
// float LBConeIn;
// float LBDecay;
// float LBTarget;
// vec4 LBlightColor;
// 
// vec3 LCPos;			// Same as above, but for the third one
// vec3 LCDir;
// float LCConeOut;
// float LCConeIn;
// float LCDecay;
// float LCTarget;
// vec4 LClightColor;
// 
// vec4 ambientLightColor;		// Ambient light color. For hemispheric, this is the color on the top
// vec4 ambientLightLowColor;	// For hemispheric ambient, this is the bottom color
// vec3 ADir;					// For hemispheric ambient, this is the up direction
// 
// vec3 normalVec;				// direction of the normal vector to the surface
// 
// 
// Final direction and colors are returned into:
// vec3 lightDirA;
// vec3 lightDirB;
// vec3 lightDirC;
// 
// and intensity is returned into:
// 
// vec4 lightColorA;
// vec4 lightColorB;
// vec4 lightColorC;
//
// Ambient light contribution is returned into
//
// vec4 ambientColor;

// Single directional light
var S1 = `
    lightDirA = LADir;
    lightColorA = LAlightColor;
`;

// Single point light without decay
var S2 = `
	lightDirA = normalize(LAPos - fs_pos);
	lightColorA = LAlightColor;
`;

// Single directional light, constant ambient
var S3 = `
    lightDirA = LADir;
    lightColorA = LAlightColor;
    ambientColor = ambientLightColor;
`;

// Single point light with decay
var S4 = `
    // as in single point
    lightDirA = normalize(LAPos - fs_pos);

    // 1 / |p - x|
    float vecModule = distance(LAPos, fs_pos);
    // (g / |p - x|)^Beta
    float powerVec = pow(LATarget/vecModule, LADecay);
    // l * (g / |p - x|)^Beta
	lightColorA = LAlightColor * powerVec;
`;

// Single spot light (with decay)
var S5 = `
    lightDirA = normalize(LAPos - fs_pos);
    
    // DECAY

    float vecModule = distance(LAPos, fs_pos);
    float decay = pow(LATarget/vecModule, LADecay);

    // CONE

    float LAConeOutRad = radians(LAConeOut / 2.0);
    float LAConeInRad = radians((LAConeIn * LAConeOut) / 2.0);
    float outerCone = cos(LAConeOutRad);
    float innerCone = cos(LAConeInRad);
    float coneLightZone = (( dot(lightDirA, LADir) - outerCone) / (innerCone - outerCone));
    float clampedConeLightZone = clamp(coneLightZone, 0.0, 1.0);

    lightColorA = LAlightColor * decay * clampedConeLightZone;
`;

// Single directional light, hemispheric ambient 
var S6 = `
    lightDirA = LADir;
    
    float nx_dot_d = dot(normalVec, LADir);
    vec4 lu_vec = ((nx_dot_d + 1.0) / 2.0) * ambientLightColor;
    vec4 ld_vec = ((1.0 - nx_dot_d) / 2.0) * ambientLightLowColor;
    vec4 la_vec = lu_vec + ld_vec;

    lightColorA = LAlightColor;
    ambientColor = vec4(cross(la_vec.xyz, ADir), la_vec.w);
`;

// Three lights: a directional, a point and a spot
var S7 = `
    // LIGHT A
    lightDirA = LADir;
    lightColorA = LAlightColor;

    // LIGHT B
    lightDirB = normalize(LBPos - fs_pos);
    lightColorB = LBlightColor;
    
    // LIGHT C
    lightDirC = normalize(LCPos - fs_pos);
    lightColorC = 
`;

return [S1, S2, S3, S4, S5, S6, S7];
}

