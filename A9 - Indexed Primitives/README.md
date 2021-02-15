# Description
In this assignment we have to:
- Pass the correct index primitives array to the `addMesh()` method draw a **torus** and a **cone**

# Index Primitives
## Introduction
By using the three different kinds of mesh encodings there are still a lot of cases in which vertices are still repeated between encodings.

Let's condider a **sphere** which can be drawn with the following encodings:
- Upper portion: **Fan**
- Center portion: **Strips**
- Lower portion: **Fan**

The vertices in common are the ones that lay between the upper-center and lower-center portion of the sphere. These repetitions can cause a lot of memory waste if there are a lot of objects to draw.

## Solution
Indexed primitives are defined by two arrays:
- **Vertex array**: contains the definitions (the positions) of the different vertices
- **Index array**: contains indexes referring to the vertex array needed to draw a single triangle
