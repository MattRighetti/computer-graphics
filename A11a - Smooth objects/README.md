# Description
In this assignment we have to:
- Define vertices to draw smooth objects

# Introduction
The key factor to draw smooth objects is to use a "fake" normal vector for each vertex. This way the vertex is now defined by 6 values **(Vx, Vy, Vz, Nx, Ny, Nz)**, by storing these normal values we can later identify if there are abrupt changes in each face direction.

# Rendering Techniques
- Gouraud shading (Per-Vertex)
- Phong (Per-Pixel)

Phong calculates the interpolation equation for each pixel which is a lot more resource intensive and computationally expensive than the per-vertex approach.
