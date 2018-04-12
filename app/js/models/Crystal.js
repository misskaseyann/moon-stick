import * as THREE from 'three';
export default class Crystal extends THREE.Group {
    constructor() {
        super();

        const crystalGeo = new THREE.DodecahedronGeometry(1, 1);
        const crystalMat = new THREE.MeshPhongMaterial({
            shininess: 100,
            color: 0xffffff,
            specular: 0xffffff,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            shading: THREE.FlatShading
        });
        this.crystal = new THREE.Mesh(crystalGeo, crystalMat);
        this.crystal.castShadow = true;
        this.crystal.matrixAutoUpdate = false;
        this.add(this.crystal);

    }

    rotate(angle) {
        const rotz = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(angle));
        const rotx = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(angle + 1));
        this.crystal.matrix.multiply(rotz);
        this.crystal.matrix.multiply(rotx);
    }
}