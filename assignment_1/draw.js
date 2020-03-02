class Point {
    constructor(x_coordinate, y_coordinate) {
        this.x = x_coordinate;
        this.y = y_coordinate;
    }
}

// Points are hardcoded in order
const orderedPointsArray = [
    new Point(-0.2, 0.3),
    new Point(0.3, 0.3),
    new Point(0.3, 0.1),
    new Point(0.5, 0.0),
    new Point(0.5, -0.3),
    new Point(-0.5, -0.3),
    new Point(-0.5, 0.0),
    new Point(-0.2, 0.1)
]

// Helper function to ease the process
function join(point_1, point_2) {
    // line(x1,y1, x2,y2)
	// draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2
    line(point_1.x, point_1.y, point_2.x, point_2.y);
}

// First task
// Just join point to point, you're left with the first and last point join which is done after the for loop
function draw() {
	for(var i = 0; i < orderedPointsArray.length - 1; i++) {
        join(orderedPointsArray[i], orderedPointsArray[i + 1])
    }

    join(orderedPointsArray[0], orderedPointsArray[orderedPointsArray.length - 1])
}

// Fills array with angles going from 0° to 360°
function fillArrayWithAngles(approx_num_of_poligon_sides) {
    let degree_stepper = 360 / approx_num_of_poligon_sides;
    var arrayOfAngles = [];
    var init_degree = 0;

    arrayOfAngles.push(0);

    for(var i = 0; i < approx_num_of_poligon_sides; i++) {
        init_degree += degree_stepper;
        arrayOfAngles.push(init_degree);
    }

    return arrayOfAngles;
}

function getPoint(radius, angle) {
    var x = radius * Math.cos(angle * Math.PI / 180);
    var y = radius * Math.sin(angle * Math.PI / 180);
    return new Point(x, y);
}

function drawCircle(radius, approx_polygon_sides) {
    arrayOfAngles = fillArrayWithAngles(approx_polygon_sides);
    var point_1, point_2;

    for(var i = 0; i < approx_polygon_sides - 1; i++) {
        point_1 = getPoint(radius, arrayOfAngles[i]);
        point_2 = getPoint(radius, arrayOfAngles[i + 1]);
        join(point_1, point_2);
    }

    point_1 = getPoint(radius, 0);

    join(point_2, point_1);

}

function draw2() {
	drawCircle(0.1, 128);
}