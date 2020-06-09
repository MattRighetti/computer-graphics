// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT
var currQuaternion = [1, 0, 0, 0];
// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
function updateWorld(rvx, rvy, rvz) {

    // deltaQ values
    var deltaQuaternion = calcQuaternion(rvx, rvy, rvz);
    // q'
    var quaternion_1 = multiplyQuaternion(deltaQuaternion, currQuaternion);
    console.log("Q1 " + quaternion_1);
	// compute the rotation matrix
	var out = matrixQuaternion(quaternion_1[0], quaternion_1[1], quaternion_1[2], quaternion_1[3]);			   

    currQuaternion = quaternion_1;

    console.log("Curr " + out)

	return out;
}

function multiplyQuaternion(quaternionA, quaternionB) {
    var newQuat = [
        (quaternionA[0] * quaternionB[0]) - (quaternionA[1] * quaternionB[1]) - (quaternionA[2] * quaternionB[2]) - (quaternionA[3] * quaternionB[3]),
        (quaternionA[0] * quaternionB[1]) + (quaternionA[1] * quaternionB[0]) + (quaternionA[2] * quaternionB[3]) - (quaternionA[3] * quaternionB[2]),
        (quaternionA[0] * quaternionB[2]) + (quaternionA[2] * quaternionB[0]) + (quaternionA[3] * quaternionB[1]) - (quaternionA[1] * quaternionB[3]),
        (quaternionA[0] * quaternionB[3]) + (quaternionA[3] * quaternionB[0]) + (quaternionA[1] * quaternionB[2]) - (quaternionA[2] * quaternionB[1])
    ]

    return newQuat;
}

function matrixQuaternion(a, b, c, d) {
    out_ = [];

    out_[0] = 1 - (2 * Math.pow(c, 2)) - (2 * Math.pow(d, 2))
    out_[1] = (2 * b * c) - (2 * a * d)
    out_[2] = (2 * b * d) + (2 * a * c)
    out_[4] = (2 * b * c) + (2 * a * d)
    out_[5] = 1 - (2 * Math.pow(b, 2)) - (2 * Math.pow(d, 2))
    out_[6] = (2 * c * d) - (2 * a * b)
    out_[8] = (2 * b * d) - (2 * a * c)
    out_[9] = (2 * c * d) + (2 * a * b)
    out_[10] = 1 - (2 * Math.pow(b, 2)) - (2 * Math.pow(c, 2))
    out_[14] = out_[13] = out_[12] = out_[11] = out_[7] = out_[3] = 0
    out_[15] = 1

    return out_; 
}

function calcQuaternion(rx, ry, rz) {
    rx = rx / 60
    ry = ry / 60
    rz = rz / 60
    var a = (Math.cos(ry / 2) * Math.cos(rx / 2) * Math.cos(rz / 2)) - (Math.sin(ry / 2) * Math.sin(rx / 2) * Math.sin(rz / 2));
    var b = (Math.cos(ry / 2) * Math.sin(rx / 2) * Math.cos(rz / 2)) - (Math.sin(ry / 2) * Math.cos(rx / 2) * Math.sin(rz / 2));
    var c = (Math.sin(ry / 2) * Math.cos(rx / 2) * Math.cos(rz / 2)) - (Math.cos(ry / 2) * Math.sin(rx / 2) * Math.sin(rz / 2));
    var d = (Math.cos(ry / 2) * Math.cos(rx / 2) * Math.sin(rz / 2)) - (Math.sin(ry / 2) * Math.sin(rx / 2) * Math.cos(rz / 2));

    console.log(a + ' + i' + b + ' + j' + c + ' + k' + d);

    return [a, b, c, d];
}