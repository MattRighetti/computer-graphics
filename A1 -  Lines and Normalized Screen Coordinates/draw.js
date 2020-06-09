class Point {
    constructor(x_coordinate, y_coordinate) {
        this.x = x_coordinate;
        this.y = y_coordinate;
    }

    sum(point) {
        this.x += point.x;
        this.y += point.y;
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
    // line(x1, y1, x2, y2)
    // draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2
    line(point_1.x, point_1.y, point_2.x, point_2.y);
}

// First task
// Just join point to point, you're left with the first and last point join which is done after the for loop
function draw() {
    for (var i = 0; i < orderedPointsArray.length - 1; i++) {
        join(orderedPointsArray[i], orderedPointsArray[i + 1])
    }

    join(orderedPointsArray[0], orderedPointsArray[orderedPointsArray.length - 1])
}

// Fills array with angles going from initial_angle to final_angle
function fillArrayWithAnglesFrom(initial_angle, final_angle, polygon_sides_approx) {
    let total_angle = final_angle - initial_angle;
    let degree_stepper = total_angle / polygon_sides_approx;
    var init_val = initial_angle
    arrayOfAngles = [];

    arrayOfAngles.push(init_val);

    for (var i = 0; i < polygon_sides_approx; i++) {
        init_val += degree_stepper;
        arrayOfAngles.push(init_val)
    }

    return arrayOfAngles;
}

// Returns a point given an angle and a radius
function getPoint(radius, angle) {
    var x = radius * Math.cos(angle * Math.PI / 180);
    var y = radius * Math.sin(angle * Math.PI / 180);
    return new Point(x, y);
}

// Draws a circle given a center_point, radius, from_angle to_angle with an approximation of polygon_sides
function drawCircle(center_point, radius, from_angle, to_angle, polygon_sides_approx = 128) {
    // Fill array of angles of individual points in sequential order
    arrayOfAngles = fillArrayWithAnglesFrom(from_angle, to_angle, polygon_sides_approx);
    var point_1, point_2;

    for (var i = 0; i < arrayOfAngles.length - 1; i++) {
        // Retrieve point given a radius and its angle
        point_1 = getPoint(radius, arrayOfAngles[i]);
        // Translate point with respect to the center
        point_1.sum(center_point);

        // Retrieve next point given a radius and its angle
        point_2 = getPoint(radius, arrayOfAngles[i + 1]);
        // Translate next point with respect to the center
        point_2.sum(center_point);

        // Join these points
        join(point_1, point_2);
    }

    // If the angle is 0° to 360° you might want to join the latest and the first point in order
    // to avoid blank spots due to division imprecision
    if (from_angle == 0 && to_angle == 360) {
        point_1 = getPoint(radius, arrayOfAngles[0]);
        point_1.sum(center_point);
        join(point_2, point_1);
    }
}

function draw2() {
    let extra = true;

    if (!extra) {
        drawCircle(new Point(0.0, 0.0), 0.1, 0, 360);
    } else {
        drawCircle(new Point(0.0, -0.4), 0.1, 0, 360);
        drawCircle(new Point(0.0, 0.4), 0.1, 0, 360);
        drawCircle(new Point(0.0, 0.4), 0.4, -90, 90);
        drawCircle(new Point(0.0, -0.4), 0.4, 90, 270);
        drawCircle(new Point(0.0, 0.0), 0.8, 0, 360);
    }
}