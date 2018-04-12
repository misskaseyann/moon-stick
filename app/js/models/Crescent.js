import * as THREE from 'three';
export default class Crescent {
    constructor() {
        const crescentgroup = new THREE.Object3D();
        const loader = new THREE.JSONLoader();
        loader.load('./app/blender/moon-test2.json',
            function(geometry) {
            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffce23, roughness: 0.35, metalness: 1,
                reflectivity: 0.5
            });
            const crescent = new THREE.Mesh(geometry, material);
            crescent.castShadow = true;
            crescentgroup.add(crescent);
            });
        return crescentgroup;
    }
}