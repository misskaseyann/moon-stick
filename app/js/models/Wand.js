import * as THREE from 'three';
import Crystal from "./Crystal";
import Crescent from "./Crescent";
import Stem from "./Stem";

export default class Wand extends THREE.Group {
    constructor() {
        super();
        this.crystal = new Crystal();
        this.crystal.position.set(32, 11, 0);
        //this.crystal.matrixAutoUpdate = false;
        this.add(this.crystal);

        this.crescent = new Crescent();
        this.crescent.position.set(29, 9.8, 0);
        this.crescent.rotateZ(29);
        this.add(this.crescent);

        this.stem = new Stem();
        this.stem.position.set(30, 4, 0);
        this.add(this.stem);
    }

    rotate(angle) {
        this.crystal.rotate(angle)
        // const rotz = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(angle));
        // this.crystal.matrix.multiply(rotz);
    }
}