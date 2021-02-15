# Description
In this assignment we have to: 
- Insert vertices for three different figures.

# Types of mesh encoding
- ### List
    Triangle lists do not exploit any sharing of vertices, and encode each triangle as a set of three different coordinates.

    To encode **N** triangles we have to define **3N** vertices.

- ### Strip
    Triangle strips encode a set of adjacent triangles.
    The encoding begins by considering the first two vertices. Then each new vertex is connected to the previous two. 
    
    To encode **N** triangles we have to define **2+N** vertices.

- ### Fan
    Triangle fans encode polygons where all the triangles share a common vertex.

    The first two vertices are specified independently.
    Then each new vertex connects both the previous one and the first of the list.

    To encode **N** triagles we have to define **2+N** vertices.