import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import Crystal from './models/Crystal';
import Crescent from './models/Crescent';

export default class App {
  constructor() {
    const c = document.getElementById('mycanvas');
    // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // include?
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x00aaff, 1000, 10000);

    this.camera = new THREE.PerspectiveCamera(35, 4/3, 1, 1000);
    this.camera.position.set(65, 8, -10);
    //this.camera.position.z = 100;

    this.tracker = new TrackballControls(this.camera);
    this.tracker.rotateSpeed = 2.0;
    this.tracker.noZoom = false;
    this.tracker.noPan = false;

    this.ambient = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(this.ambient);

    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.position.set(15, 40, 35);
    this.spotLight.angle = Math.PI / 4;
    this.spotLight.penumbra = 0.05;
    this.spotLight.decay = 2;
    this.spotLight.distance = 200;

    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 1024;
    this.spotLight.shadow.camera.near = 10;
    this.spotLight.shadow.camera.far = 200;

    this.scene.add(this.spotLight);

    this.groundGeo = new THREE.BoxGeometry(2000, 1, 2000);
    this.groundMat = new THREE.MeshPhongMaterial({color: 0x808080, dithering: true});
    this.ground = new THREE.Mesh(this.groundGeo, this.groundMat);
    this.ground.position.set(0, -1, 0);
    this.ground.receiveShadow = true;

    this.scene.add(this.ground);

    this.crystal = new Crystal();
    this.crystal.position.set(40, 2, 0);
    this.scene.add(this.crystal);

    this.crescent = new Crescent();
    this.crescent.position.set(30, 10, 0);
    this.scene.add(this.crescent);

    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.tracker.update();
    requestAnimationFrame(() => this.render());
  }

  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.tracker.handleResize();
  }
}