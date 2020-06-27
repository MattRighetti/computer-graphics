class Model {
    constructor(url, localMatrix) {
        this.obj = null;
        this.model = null;
        this.localMatrix = localMatrix;

        this.url = url;
    }

    async initModel() {
        this.obj = await utils.get_objstr(this.url)
        this.model = new OBJ.Mesh(this.obj);
    }

    getVertices() {
        return this.model.vertices;
    }

    getVertexNormals() {
        return this.model.vertexNormals;
    }

    getIndices() {
        return this.model.indices;
    }

    getTextureCoord() {
        return this.model.textures;
    }

}