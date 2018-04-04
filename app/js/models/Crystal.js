import * as THREE from 'three';
export default class Crystal {
    constructor() {
        const crystalGroup = new THREE.Group();

        const crystalGeo = new THREE.DodecahedronGeometry(2, 1);
        const crystalMat = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading});
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.castShadow = true;
        crystalGroup.add(crystal);

        // const wireGeo = new THREE.EdgesGeometry(crystal.geometry);
        // const wireMat = new THREE.LineBasicMaterial({color: 0x969696, linewidth: 1});
        // const wireframe = new THREE.LineSegments(wireGeo, wireMat);
        // crystal.add(wireframe);

        return crystalGroup;
    }
}