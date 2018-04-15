import * as THREE from 'three';
import Crescent from "./Crescent";

export default class Locket extends THREE.Group {
    constructor() {
        super();

        this.baseGeo = new THREE.SphereBufferGeometry(5, 32, 13, 0, 6.3, 2, 1.2);
        this.baseMat = new THREE.MeshPhysicalMaterial({
            color: 0xffce23, roughness: 0.35, metalness: 0.5,
            reflectivity: 0.5
        });
        this.baseMat.side = THREE.DoubleSide;
        this.base = new THREE.Mesh(this.baseGeo, this.baseMat);
        this.base.rotateX(9.4);
        this.base.castShadow = true;
        this.base.receiveShadow = true;
        this.add(this.base);
        this.baseh = 0;

        this.crescenth = 4.5;
        this.crescent = new Crescent();
        this.crescent.position.set(2, this.crescenth, 0);
        this.crescent.scale.set(0.5,0.5,0.5);
        this.crescent.rotateX(1.6);
        this.crescent.rotateY(6.3);
        this.add(this.crescent);

        this.jewel1h = 3.6;
        this.jewel1Geo = new THREE.SphereBufferGeometry(1.5, 15, 15);
        this.jewel1Mat = new THREE.MeshPhysicalMaterial({
            color: 0xf7458e,
            roughness: 0.5,
            metalness: 0.5,
            reflectivity: 0.5
        });
        this.jewel1 = new THREE.Mesh(this.jewel1Geo, this.jewel1Mat);
        this.jewel1.position.set(-1.7, this.jewel1h, 0);
        this.add(this.jewel1);

        this.jewel2h = 3;
        this.jewel2Geo = new THREE.SphereBufferGeometry(0.5, 15, 15);
        this.jewel2Mat = new THREE.MeshPhysicalMaterial({
            color: 0xff0a0a,
            roughness: 0.5,
            metalness: 0.5,
            reflectivity: 0.5
        });
        this.jewel2 = new THREE.Mesh(this.jewel2Geo, this.jewel2Mat);
        this.jewel2.position.set(-4, this.jewel2h, 0);
        this.add(this.jewel2);

        this.jewel3Geo = new THREE.SphereBufferGeometry(0.5, 15, 15);
        this.jewel3Mat = new THREE.MeshPhysicalMaterial({
            color: 0xfaff09,
            roughness: 0.5,
            metalness: 0.5,
            reflectivity: 0.5
        });
        this.jewel3 = new THREE.Mesh(this.jewel3Geo, this.jewel3Mat);
        this.jewel3.position.set(0, this.jewel2h, -4);
        this.add(this.jewel3);

        this.jewel4Geo = new THREE.SphereBufferGeometry(0.5, 15, 15);
        this.jewel4Mat = new THREE.MeshPhysicalMaterial({
            color: 0x0033ff,
            roughness: 0.5,
            metalness: 0.5,
            reflectivity: 0.5
        });
        this.jewel4 = new THREE.Mesh(this.jewel4Geo, this.jewel4Mat);
        this.jewel4.position.set(4, this.jewel2h, 0);
        this.add(this.jewel4);

        this.jewel5Geo = new THREE.SphereBufferGeometry(0.5, 15, 15);
        this.jewel5Mat = new THREE.MeshPhysicalMaterial({
            color: 0x00f710,
            roughness: 0.5,
            metalness: 0.5,
            reflectivity: 0.5
        });
        this.jewel5 = new THREE.Mesh(this.jewel5Geo, this.jewel5Mat);
        this.jewel5.position.set(0, this.jewel2h, 4);
        this.add(this.jewel5);

        this.seq = 50;
    }

    animate(speed) {
        if (this.seq <= 50 && this.seq > 0) {
            this.baseh -= speed;
            this.base.position.set(0, this.baseh, 0);
            this.crescenth -= speed;
            this.crescent.position.set(2, this.crescenth, 0);
            this.jewel1h -= speed;
            this.jewel1.position.set(-1.7, this.jewel1h, 0);
            this.jewel2h -= speed;
            this.jewel2.position.set(-4, this.jewel2h, 0);
            this.jewel3.position.set(0, this.jewel2h, -4);
            this.jewel4.position.set(4, this.jewel2h, 0);
            this.jewel5.position.set(0, this.jewel2h, 4);
            this.seq -= 1;
        }
        else if (this.seq === 0) {
            this.seq = 100;
        }
        else {
            this.baseh += speed;
            this.base.position.set(0, this.baseh, 0);
            this.crescenth += speed;
            this.crescent.position.set(2, this.crescenth, 0);
            this.jewel1h += speed;
            this.jewel1.position.set(-1.7, this.jewel1h, 0);
            this.jewel2h += speed;
            this.jewel2.position.set(-4, this.jewel2h, 0);
            this.jewel3.position.set(0, this.jewel2h, -4);
            this.jewel4.position.set(4, this.jewel2h, 0);
            this.jewel5.position.set(0, this.jewel2h, 4);
            this.seq --;
        }
    }

    rotate(angle) {
        var rot = new THREE.Matrix4().makeRotationY(angle);
        this.matrix.multiply(rot);
    }

    move(distance) {
        var trans = new THREE.Matrix4().makeTranslation(0, 0, distance);
        this.matrix.premultiply(trans);
    }
}