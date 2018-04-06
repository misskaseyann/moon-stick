import * as THREE from 'three';
export default class Crystal {
    constructor() {
        const crystalGroup = new THREE.Group();

        const crystalGeo = new THREE.DodecahedronGeometry(2, 1);
        const crystalMat = new THREE.MeshPhongMaterial({
            shininess: 100,
            color: 0xffffff,
            specular: 0xffffff,
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            shading: THREE.FlatShading});
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.castShadow = true;
        crystalGroup.add(crystal);

        return crystalGroup;
    }
}