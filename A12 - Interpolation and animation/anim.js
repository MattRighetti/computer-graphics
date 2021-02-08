function anim() {
	let startToOne = [1,  
		[0,0,0], quaternionWithRotation(0, 0, 0),
		[6,0,0], quaternionWithRotation(0, 50, 0),
		[7,0,0], quaternionWithRotation(0, 90, 0),
		[8,0,0], quaternionWithRotation(0, 90, 0)];

	let oneToTwo = [1,  
		[8,0,0], quaternionWithRotation(0, 90, 0),
		[8,0,-6], quaternionWithRotation(0, 90, 50),
		[8,0,-7], quaternionWithRotation(0, 90, 90),
		[8,0,-8], quaternionWithRotation(0, 90, 90)]

	let twoToThree = [2,  
		[8,0,-8], quaternionWithRotation(0, 90, 90),
		[8,6,-8], quaternionWithRotation(0, 180, 90),
		[8,7,-8], quaternionWithRotation(0, 180, 0),
		[8,8,-8], quaternionWithRotation(0, 180, 0)]

	let threeToFour = [2,  
		[8,8,-8], quaternionWithRotation(0, 180, 0),
		[6,8,-8], quaternionWithRotation(0, 180, 0),
		[4,8,-8], quaternionWithRotation(0, 270, 0),
		[0,8,-8], quaternionWithRotation(0, 270, 0)]

	let fourToFive = [1,  
		[0,8,-8], quaternionWithRotation(0, 270, 0),
		[0,8,-5], quaternionWithRotation(0, 270, -60),
		[0,8,-2], quaternionWithRotation(0, 360, -90),
		[0,8,0], quaternionWithRotation(0, 360, -90)]

	let fiveToSix = [2,  
		[0,8,0], quaternionWithRotation(0, 360, -90),
		[0,5,0], quaternionWithRotation(0, 360, -65),
		[0,4,0], quaternionWithRotation(0, 360, 0),
		[0,0,0], quaternionWithRotation(0, 360, 0)]

	return [startToOne, oneToTwo, twoToThree, threeToFour, fourToFive, fiveToSix];
}

function quaternionWithRotation(x, y, z) {
	var q = Quaternion.fromAxisAngle([1,0,0],utils.degToRad(0));
	q = q.mul(Quaternion.fromAxisAngle([1,0,0],utils.degToRad(x)));
	q = q.mul(Quaternion.fromAxisAngle([0,1,0],utils.degToRad(y)));
	q = q.mul(Quaternion.fromAxisAngle([0,0,1],utils.degToRad(z)));
	return q;
}