function buildGeometry() {
    var i;

    // Draws a Cone --- Already done, just for inspiration
    ///// Creates vertices
    var vert1 = [
        [0.0, 1.0, 0.0]
    ];
    for (i = 0; i < 36; i++) {
        vert1[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }
    vert1[37] = [0.0, -1.0, 0.0]
    ////// Creates indices
    var ind1 = [];
    //////// Upper part
    j = 0;
    for (i = 0; i < 36; i++) {
        ind1[j++] = 0;
        ind1[j++] = i + 1;
        ind1[j++] = (i + 1) % 36 + 1;
    }
    //////// Lower part
    for (i = 0; i < 36; i++) {
        ind1[j++] = 37;
        ind1[j++] = (i + 1) % 36 + 1;
        ind1[j++] = i + 1;
    }

    var color1 = [1.0, 0.0, 0.0];
    addMesh(vert1, ind1, color1);






    // Draws a Cylinder -- To do for the assignment.
    var vert2 = [
        [0.0, 1.0, 0.0]
    ];

    // Upper vertices
    for (i = 0; i < 36; i++) {
        vert2[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }

    // Lower vertices
    for (i = 0; i < 36; i++) {
        vert2[i + 37] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }

    vert2[73] = [0.0, -1.0, 0.0];

    var ind2 = [];
    j = 0;

    // Upper part
    for (i = 0; i < 36; i++) {
        ind2[j++] = 0; // Height constant
        ind2[j++] = i + 1;
        ind2[j++] = (i + 1) % 36 + 1;
    }

    // Lower part
    for (i = 0; i < 36; i++) {
        k = i + 36
        ind2[j++] = 73; // Height constant
        ind2[j++] = (k + 1) % 71 == 1 ? 37 : k + 1 + 1;
        ind2[j++] = k + 1;
    }

    // Around part
    for (i = 0; i < 36; i++) {
        k = i + 36
        ind2[j++] = i + 1
        ind2[j++] = k
        ind2[j++] = i + 2 % 36 == 1 ? 1 : i + 2

        ind2[j++] = k
        ind2[j++] = k + 1 % 73 == 1 ? 37 : k + 1
        ind2[j++] = i + 2 % 36 == 1 ? 1 : i + 2
    }

    var color2 = [0.0, 0.0, 1.0];
    addMesh(vert2, ind2, color2);






    // Draws a Sphere --- Already done, just for inspiration
    var vert3 = [
        [0.0, 1.0, 0.0]
    ];
    ///// Creates vertices
    k = 1;
    for (j = 1; j < 18; j++) {
        for (i = 0; i < 36; i++) {
            x = Math.sin(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            y = Math.cos(j * 10.0 / 180.0 * Math.PI);
            z = Math.cos(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            vert3[k++] = [x, y, z];
        }
    }
    vert3[k++] = [0.0, -1.0, 0.0];

    ////// Creates indices
    var ind3 = [];
    k = 0;
    ///////// Lateral part
    for (i = 0; i < 36; i++) {
        for (j = 1; j < 17; j++) {
            ind3[k++] = i + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;

            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + j * 36 + 1;
        }
    }
    //////// Upper Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 0;
        ind3[k++] = i + 1;
        ind3[k++] = (i + 1) % 36 + 1;
    }
    //////// Lower Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 577;
        ind3[k++] = (i + 1) % 36 + 540;
        ind3[k++] = i + 540;
    }

    var color3 = [0.0, 1.0, 0.0];
    addMesh(vert3, ind3, color3);





    // Draws a Torus -- To do for the assignment
    var vert4 = [];

    // Torus distance from center
    let R = 1;
    // Torus radius
    let r = 0.5;

    var theta;
    var phi;

    k = 0;
    for (i = 0; i < 36; i++) {
        theta = i * 10.0 / 180.0 * Math.PI;
        for (j = 0; j < 36; j++) {
            phi = j * 10.0 / 180.0 * Math.PI;
            x = R * Math.cos(theta) + r * Math.cos(phi) * Math.cos(theta);
            y = R * Math.sin(theta) + r * Math.cos(phi) * Math.sin(theta);
            z = r * Math.sin(phi);
            vert4[k++] = [x, y, z];
        }
    }

    var ind4 = [];
    k = 0;
    for (i = 0; i < 1296; i++) {
        ind4[k++] = (i+36) % 1296;
        ind4[k++] = (i+1) % 1296;
        ind4[k++] = i;
    }

    for (j = -1; j < 1295; j++) {
        ind4[k++] = (j+36) % 1296;
        ind4[k++] = (j+36+1) % 1296;
        ind4[k++] = j+1;
    }

    var color4 = [1.0, 1.0, 0.0];
    addMesh(vert4, ind4, color4);
}