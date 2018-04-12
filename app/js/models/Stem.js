import * as THREE from 'three';

export default class Stem extends THREE.Group {
    constructor() {
        super();
        this.stemGeo = new THREE.CylinderGeometry(0.75, 0.75, 10, 30);
        this.stemMat = new THREE.MeshPhongMaterial({
            color: 0xff3091
        });
        this.stem = new THREE.Mesh(this.stemGeo, this.stemMat);
        this.stem.castShadow = true;
        this.add(this.stem);
    }
}