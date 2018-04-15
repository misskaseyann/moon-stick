import * as THREE from 'three';
export default class Crescent extends THREE.Group {
    constructor() {
        super();
        const crescentgroup = new THREE.Object3D();
        const loader = new THREE.JSONLoader();
        loader.load('./app/blender/moon-test2.json',
            function(geometry) {
            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffce23, roughness: 0.35, metalness: 0.7,
                reflectivity: 0.5
            });
            const crescent = new THREE.Mesh(geometry, material);
            crescent.castShadow = true;
            crescent.matrixAutoUpdate = false;
            crescentgroup.add(crescent);
            });
        this.add(crescentgroup);
    }
}