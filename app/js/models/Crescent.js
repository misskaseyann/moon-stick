import * as THREE from 'three';
export default class Crescent {
    constructor() {
        const crescentGroup = new THREE.Group();

        const crescentGeo = new THREE.TorusGeometry(5, 1.5, 20, 20, 3.5);
        const crescentMat = new THREE.MeshPhongMaterial({color: 0xffd54f});
        const crescent = new THREE.Mesh(crescentGeo, crescentMat);
        crescent.castShadow = true;
        crescent.rotateZ(60);
        crescentGroup.add(crescent);

        return crescentGroup;
    }
}