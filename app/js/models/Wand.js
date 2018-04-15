import * as THREE from 'three';
import Crystal from "./Crystal";
import Crescent from "./Crescent";
import Stem from "./Stem";

export default class Wand extends THREE.Group {
    constructor() {
        super();
        this.stem = new Stem();
        this.stemh = 4;
        this.stem.position.set(0, this.stemh, 0);
        this.add(this.stem);

        this.crescent = new Crescent();
        this.stem.add(this.crescent);
        this.crescenth = 5;
        this.crescent.position.set(-1, this.crescenth, 0);
        this.crescent.rotateZ(29);

        this.stem.add(this.crescent);

        this.crystal = new Crystal();
        this.crystalh = 7;
        this.crystal.position.set(1, this.crystalh, 0);
        this.stem.add(this.crystal);
        this.seq = 50;
    }

    animate(speed, rotation) {
        this.crystal.rotate(rotation);
        if (this.seq <= 50 && this.seq > 0) {
            this.crystalh += speed;
            this.crystal.position.set(1, this.crystalh, 0);
            this.crescenth += speed;
            this.crescent.position.set(-1, this.crescenth, 0);
            this.stemh += speed;
            this.stem.position.set(0, this.stemh, 0);
            this.seq -= 1;
        }
        else if (this.seq === 0) {
            this.seq = 100;
        }
        else {
            this.crystalh -= speed;
            this.crystal.position.set(1, this.crystalh, 0);
            this.crescenth -= speed;
            this.crescent.position.set(-1, this.crescenth, 0);
            this.stemh -= speed;
            this.stem.position.set(0, this.stemh, 0);
            this.seq --;
        }
    }
}