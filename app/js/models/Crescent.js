import * as THREE from 'three';
export default class Crescent {
    constructor() {
        const crescentgroup = new THREE.Object3D();
        const loader = new THREE.JSONLoader();
        loader.load('./app/blender/moon-test2.json',
            function(geometry) {
            const material = new THREE.MeshPhongMaterial({
                color: 0xffce23, diffuse: 0x050505, shininess: 83.19
            });
            const crescent = new THREE.Mesh(geometry, material);
            crescentgroup.add(crescent);
            });
        return crescentgroup;
    }
}