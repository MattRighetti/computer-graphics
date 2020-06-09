# Description
In this assignment we need to create
1. Rotation matrix using quaternions

## Rotation matrix
### Variables needed

- `currQuaternion` : variable that stores each quaternion state of the object 
- `rvx` : angular velocity along x
- `rvy` : angular velocity along y
- `rvz` : angular velocity along z

These are the steps that are needed to create the correct rotation matrix using quaternions

1. Transform the three angular velocities into a quaternion `deltaQuaternion`

    ![a = ( cos\frac{\mathbf{rvy}}{2}\cdot cos\frac{\mathbf{rvx}}{2} \cdot cos\frac{\mathbf{rvz}}{2} - sin\frac{\mathbf{rvy}}{2}\cdot sin\frac{\mathbf{rvx}}{2} \cdot sin\frac{\mathbf{rvz}}{2} )](https://render.githubusercontent.com/render/math?math=a%20%3D%20(%20cos%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20-%20sin%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20))

    ![b = ( cos\frac{\mathbf{rvy}}{2}\cdot sin\frac{\mathbf{rvx}}{2} \cdot cos\frac{\mathbf{rvz}}{2} - sin\frac{\mathbf{rvy}}{2}\cdot cos\frac{\mathbf{rvx}}{2} \cdot sin\frac{\mathbf{rvz}}{2} )](https://render.githubusercontent.com/render/math?math=b%20%3D%20(%20cos%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20-%20sin%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20))

    ![c = ( sin\frac{\mathbf{rvy}}{2}\cdot cos\frac{\mathbf{rvx}}{2} \cdot cos\frac{\mathbf{rvz}}{2} - cos\frac{\mathbf{rvy}}{2}\cdot sin\frac{\mathbf{rvx}}{2} \cdot sin\frac{\mathbf{rvz}}{2} )](https://render.githubusercontent.com/render/math?math=c%20%3D%20(%20sin%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20-%20cos%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20))

    ![d = ( cos\frac{\mathbf{rvy}}{2}\cdot cos\frac{\mathbf{rvx}}{2} \cdot sin\frac{\mathbf{rvz}}{2} - sin\frac{\mathbf{rvy}}{2}\cdot sin\frac{\mathbf{rvx}}{2} \cdot cos\frac{\mathbf{rvz}}{2} )](https://render.githubusercontent.com/render/math?math=d%20%3D%20(%20cos%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20-%20sin%5Cfrac%7B%5Cmathbf%7Brvy%7D%7D%7B2%7D%5Ccdot%20sin%5Cfrac%7B%5Cmathbf%7Brvx%7D%7D%7B2%7D%20%5Ccdot%20cos%5Cfrac%7B%5Cmathbf%7Brvz%7D%7D%7B2%7D%20))

2. Multiply `deltaQuaternion` and `currQuaternion` to get `quaternion_1`

    ![q' = \bigtriangleup q \cdot q](https://render.githubusercontent.com/render/math?math=q'%20%3D%20%5Cbigtriangleup%20q%20%5Ccdot%20q)

    ![q_1 \cdot q_2 = (a_1a_2 - b_1b_2 - c_1c_2 -d_1d_2)+i(a_1b_2 + b_1a_2 + c_1d_2 -d_1c_2)+j(a_1c_2 + c_1a_2 + d_1b_2 -b_1d_2)+k(a_1d_2 + d_1a_2 + b_1c_2 -c_1b_2)](https://render.githubusercontent.com/render/math?math=q_1%20%5Ccdot%20q_2%20%3D%20(a_1a_2%20-%20b_1b_2%20-%20c_1c_2%20-d_1d_2)%2Bi(a_1b_2%20%2B%20b_1a_2%20%2B%20c_1d_2%20-d_1c_2)%2Bj(a_1c_2%20%2B%20c_1a_2%20%2B%20d_1b_2%20-b_1d_2)%2Bk(a_1d_2%20%2B%20d_1a_2%20%2B%20b_1c_2%20-c_1b_2))

3. Make rotation matrix from `quaternion_1`

    ![R(y)R(x)R(z) = \bigl(\begin{smallmatrix} 1-2c^2-2d^2 & 2bc - 2ad & 2bd + 2ac & 0 \\  2bc + 2ad & 1-2b^2 - 2d^2 & 2cd - 2ab & 0 \\  2bd - 2ac & 2cd + 2ab & 1-2b^2 - 2c^2 & 0 \\  0 & 0 & 0 & 1 \end{smallmatrix}\bigr)](https://render.githubusercontent.com/render/math?math=R(y)R(x)R(z)%20%3D%20%5Cbigl(%5Cbegin%7Bsmallmatrix%7D%201-2c%5E2-2d%5E2%20%26%202bc%20-%202ad%20%26%202bd%20%2B%202ac%20%26%200%20%5C%5C%20%202bc%20%2B%202ad%20%26%201-2b%5E2%20-%202d%5E2%20%26%202cd%20-%202ab%20%26%200%20%5C%5C%20%202bd%20-%202ac%20%26%202cd%20%2B%202ab%20%26%201-2b%5E2%20-%202c%5E2%20%26%200%20%5C%5C%20%200%20%26%200%20%26%200%20%26%201%20%5Cend%7Bsmallmatrix%7D%5Cbigr))

4. Set `quaternion_1` as `currQuaternion` and return it