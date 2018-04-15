import * as THREE from 'three';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import Wand from './models/Wand';
import Locket from './models/Locket';

export default class App {
  constructor() {
    this.animateme = true;
    this.speed = 1;
    this.spotlighttoggle = true;
    this.ambientlighttobble = true;
    const c = document.getElementById('mycanvas');
    window.addEventListener('keydown', this.onKeypress.bind(this), false);
    // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // include?
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(0x00aaff, 1000, 10000);

    //this.camera = new THREE.PerspectiveCamera(35, 4 / 3, 1, 1000);
    this.camera = new THREE.PerspectiveCamera(35, 4/3, 1, 1000);
      //this.camera.position.set(65, 50, 80);
    const eyePos = new THREE.Vector3(10, 40, -90);
    const cameraPos = new THREE.Matrix4().lookAt(eyePos, new THREE.Vector3(0, 0, -10), new THREE.Vector3(0, 1, 0));
    cameraPos.setPosition(eyePos);

    this.camRotateYPos = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(+2));
    this.camRotateYNeg = new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-2));
    this.camRotateXPos = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(+2));
    this.camRotateXNeg = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-2));
    this.camRotateZPos = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(+2));
    this.camRotateZNeg = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-2));
    this.camForward = new THREE.Matrix4().makeTranslation(0, 0, 2);
    this.camBackward = new THREE.Matrix4().makeTranslation(0, 0, -2);

    this.camera.matrixAutoUpdate = false;
    this.camera.matrixWorld.copy(cameraPos);

    this.tracker = new TrackballControls(this.camera);
    this.tracker.rotateSpeed = 2.0;
    this.tracker.noZoom = false;
    this.tracker.noPan = false;

    this.ambient = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambient);

    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.position.set(15, 40, -35);
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

    this.wand =  new Wand();
    this.scene.add(this.wand);
    this.wand.matrixAutoUpdate = false;
    this.wand.matrix.multiply(new THREE.Matrix4().makeTranslation(10, 2, 0));

    this.locket = new Locket();
    this.scene.add(this.locket);
    this.locket.matrixAutoUpdate = false;

    // moon
    this.moontex = THREE.ImageUtils.loadTexture("app/blender/moon.jpg");
    this.moonGeo = new THREE.SphereBufferGeometry(100, 100, 100);
    this.moonMat = new THREE.MeshPhongMaterial();
    this.moonMat.map = this.moontex;
    this.moon = new THREE.Mesh(this.moonGeo, this.moonMat);
    this.moon.material.map.repeat.set(1,1);
    this.moon.receiveShadow = true;
    this.moon.position.set(0, -100, 0);
    this.moon.rotateX(300);
    this.moon.material.map.wrapT = THREE.RepeatWrapping;

    this.scene.add(this.moon);

    // space background
    this.spacetex = THREE.ImageUtils.loadTexture("app/blender/space.jpg");
    this.spacesphereGeo = new THREE.SphereBufferGeometry(500, 500, 500);
    this.spacesphereMat = new THREE.MeshPhongMaterial();
    this.spacesphereMat.map = this.spacetex;
    this.spacesphere = new THREE.Mesh(this.spacesphereGeo, this.spacesphereMat);
    // space needs to be double sided as camera is within the sphere
    this.spacesphere.material.side = THREE.DoubleSide;
    this.spacesphere.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere.material.map.repeat.set(5,3);
    this.scene.add(this.spacesphere);

    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    if (this.animateme === true) {
        this.wand.animate(this.speed/100, this.speed);
        this.locket.animate(this.speed/100);
    }
    this.moon.rotateX(0.0001);
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

  onKeypress(event) {
      const key = event.keyCode || event.charCode;
      switch (key) {
          case 79:
              // o key: neg rotation Z
              var rot = new THREE.Matrix4().makeRotationZ(-0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 80:
              // p key: pos rotation Z
              var rot = new THREE.Matrix4().makeRotationZ(0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 75:
              // k key: neg rotation Y
              var rot = new THREE.Matrix4().makeRotationY(-0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 76:
              // l key: pos rotation Y
              var rot = new THREE.Matrix4().makeRotationY(0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 78:
              // n key: neg rotation X
              var rot = new THREE.Matrix4().makeRotationX(-0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 77:
              // n key: pos rotation X
              var rot = new THREE.Matrix4().makeRotationX(0.1);
              this.wand.matrix.multiply(rot);
              break;
          case 87:
              // w key: move left
              var trans = new THREE.Matrix4().makeTranslation(-0.1, 0, 0);
              this.wand.matrix.multiply(trans);
              break;
          case 83:
              // s key: move right
              var trans = new THREE.Matrix4().makeTranslation(0.1, 0, 0);
              this.wand.matrix.multiply(trans);
              break;
          case 65:
              // a key: move backward
              var trans = new THREE.Matrix4().makeTranslation(0, 0, 0.1);
              this.wand.matrix.multiply(trans);
              break;
          case 68:
              // d key: move forward
              var trans = new THREE.Matrix4().makeTranslation(0, 0, -0.1);
              this.wand.matrix.multiply(trans);
              break;
          case 81:
              // q key: move up
              var trans = new THREE.Matrix4().makeTranslation(0, 0.1, 0);
              this.wand.matrix.multiply(trans);
              break;
          case 69:
              // e key: move down
              var trans = new THREE.Matrix4().makeTranslation(0, -0.1, 0);
              this.wand.matrix.multiply(trans);
              break;
          case 32:
              // space key: animation on/off
              if (this.animateme === true) {
                  this.animateme = false;
              }
              else {
                  this.animateme = true;
              }
              break;
          case 39:
              // arrow key right: speed up
              this.speed += 1;
              break;
          case 37:
              // arrow key left: slow down
              if (this.speed > 0) {
                  this.speed -= 1;
              }
              break;
          case 38:
              // arrow key up: toggle spot light
              if (this.spotlighttoggle === true) {
                  this.spotlighttoggle = false;
                  this.scene.remove(this.spotLight);
              }
              else {
                  this.spotlighttoggle = true;
                  this.scene.add(this.spotLight);
              }
              break;
          case 40:
              // arrow key down: toggle ambient light
              if (this.ambientlighttobble === true) {
                  this.ambientlighttobble = false;
                  this.scene.remove(this.ambient);
              }
              else {
                  this.ambientlighttobble = true;
                  this.scene.add(this.ambient);
              }
              break;
          case 49:
              // 1 key: move light
              this.spotLight.position.set(5, 20, 70);
              break;
          case 50:
              // 2 key: move light
              this.spotLight.position.set(15, 2, -70);
              break;
          case 51:
              // 3 key: move light
              this.spotLight.position.set(60, 2, 0);
              break;
          case 52:
              // 4 key: move light
              this.spotLight.position.set(15, 40, -35);
              break;
          case 70:
              // f key: rotate camera pos y
              this.camera.matrixWorld.multiply(this.camRotateYPos);
              break;
          case 72:
              // h key: rotate camera neg y
              this.camera.matrixWorld.multiply(this.camRotateYNeg);
              break;
          case 82:
              // r key: rotate camera pos x
              this.camera.matrixWorld.multiply(this.camRotateXPos);
              break;
          case 89:
              // y key: rotate camera neg x
              this.camera.matrixWorld.multiply(this.camRotateXNeg);
              break;
          case 86:
              // v key: rotate camera pos z
              this.camera.matrixWorld.multiply(this.camRotateZPos);
              break;
          case 66:
              // b key: rotate camera neg z
              this.camera.matrixWorld.multiply(this.camRotateZNeg);
              break;
          case 71:
              // t key: move camera forward
              this.camera.matrixWorld.multiply(this.camForward);
              break;
          case 84:
              // g key: move camera backward
              this.camera.matrixWorld.multiply(this.camBackward);
      }
  }
}