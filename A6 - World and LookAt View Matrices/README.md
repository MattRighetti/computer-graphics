# Description
In this assignment we need to create:
1. Look-at matrix that is going to follow the car
2. World matrix that's going to render the world itself

## World Matrix
### Variables needed
- `camx`
- `camy`
- `camz`
- `cardir`

|![\begin{bmatrix} 1 & 0 & 0 & carx \\ 0 & 1 & 0 & cary \\ 0 & 0 & 1 & carz \\ 0 & 0 & 0 & 1  \end{bmatrix}](https://render.githubusercontent.com/render/math?math=%5Cbegin%7Bbmatrix%7D%201%20%26%200%20%26%200%20%26%20carx%20%5C%5C%200%20%26%201%20%26%200%20%26%20cary%20%5C%5C%200%20%26%200%20%26%201%20%26%20carz%20%5C%5C%200%20%26%200%20%26%200%20%26%201%20%20%5Cend%7Bbmatrix%7D)|
|:-:|
|Translate matrix|

|![\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1  \end{bmatrix}](https://render.githubusercontent.com/render/math?math=%5Cbegin%7Bbmatrix%7D%201%20%26%200%20%26%200%20%26%200%20%5C%5C%200%20%26%201%20%26%200%20%26%200%20%5C%5C%200%20%26%200%20%26%201%20%26%200%20%5C%5C%200%20%26%200%20%26%200%20%26%201%20%20%5Cend%7Bbmatrix%7D)|
|:-:|
|Scale matrix|

|![\begin{bmatrix} cos(cardir) & 0 & sin(cardir) & 0 \\ 0 & 1 & 0 & 0 \\ -sin(cardir) & 0 & cos(cardir) & 0 \\ 0 & 0 & 0 & 1  \end{bmatrix}](https://render.githubusercontent.com/render/math?math=%5Cbegin%7Bbmatrix%7D%20cos(cardir)%20%26%200%20%26%20sin(cardir)%20%26%200%20%5C%5C%200%20%26%201%20%26%200%20%26%200%20%5C%5C%20-sin(cardir)%20%26%200%20%26%20cos(cardir)%20%26%200%20%5C%5C%200%20%26%200%20%26%200%20%26%201%20%20%5Cend%7Bbmatrix%7D)|
|:-:|
|Y Rotation matrix|

We multiply these matrices and we get the **Mw**

![M_w = T(\mathbf{carx}, \mathbf{cary}, \mathbf{carz})\cdot R_{y}(\mathbf{cardir}) \cdot R_{x}(0) \cdot R_{z}(0) \cdot S(1, 1, 1)](https://render.githubusercontent.com/render/math?math=M_w%20%3D%20T(%5Cmathbf%7Bcarx%7D%2C%20%5Cmathbf%7Bcary%7D%2C%20%5Cmathbf%7Bcarz%7D)%5Ccdot%20R_%7By%7D(%5Cmathbf%7Bcardir%7D)%20%5Ccdot%20R_%7Bx%7D(0)%20%5Ccdot%20R_%7Bz%7D(0)%20%5Ccdot%20S(1%2C%201%2C%201))

## Look-at Matrix
### Variables needed
- `camx`
- `camy`
- `camz`

![u = \[0, 1, 0\]](https://render.githubusercontent.com/render/math?math=u%20%3D%20%5B0%2C%201%2C%200%5D)

![a = \[\mathbf{carx}, \mathbf{cary}, \mathbf{carz}\]](https://render.githubusercontent.com/render/math?math=a%20%3D%20%5B%5Cmathbf%7Bcarx%7D%2C%20%5Cmathbf%7Bcary%7D%2C%20%5Cmathbf%7Bcarz%7D%5D)

![c = \[\mathbf{camx}, \mathbf{camy}, \mathbf{camz}\]](https://render.githubusercontent.com/render/math?math=c%20%3D%20%5B%5Cmathbf%7Bcamx%7D%2C%20%5Cmathbf%7Bcamy%7D%2C%20%5Cmathbf%7Bcamz%7D%5D)

![V_z = \frac{c-a}{|c-a|}](https://render.githubusercontent.com/render/math?math=V_z%20%3D%20%5Cfrac%7Bc-a%7D%7B%7Cc-a%7C%7D),
![V_x = \frac{u\times V_z}{|u\times V_z|}](https://render.githubusercontent.com/render/math?math=V_x%20%3D%20%5Cfrac%7Bu%5Ctimes%20V_z%7D%7B%7Cu%5Ctimes%20V_z%7C%7D),
![V_y = V_z \times V_x](https://render.githubusercontent.com/render/math?math=V_y%20%3D%20V_z%20%5Ctimes%20V_x)

![M_c =  \begin{pmatrix} V_x & V_y & V_z &  c \\  0 & 0 & 0 &  1 \end{pmatrix}](https://render.githubusercontent.com/render/math?math=M_c%20%3D%20%20%5Cbegin%7Bpmatrix%7D%20V_x%20%26%20V_y%20%26%20V_z%20%26%20%20c%20%5C%5C%20%200%20%26%200%20%26%200%20%26%20%201%20%5Cend%7Bpmatrix%7D)