import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./styles.css";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("black", 1);
document.body.append(renderer.domElement);

const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 1000);
camera.position.set(2, 100, -4);
camera.lookAt(new THREE.Vector3());

const controls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();
const positions = new Float32Array(1000 * 2 * 3);

for (let lineIndex = 0; lineIndex < 1000; lineIndex += 1) {
  const zPosition = (lineIndex - 500) * 3;
  const positionIndex = lineIndex * 6;
  positions.set([-10000, 0, zPosition, 10000, 0, zPosition], positionIndex);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.LineBasicMaterial();
const lines = new THREE.LineSegments(geometry, material);
scene.add(lines);

const animationStartTime = performance.now();

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const render = (time) => {
  controls.update();
  scene.rotation.x = (time - animationStartTime) / 30000;
  renderer.render(scene, camera);
};

const cleanup = () => {
  renderer.setAnimationLoop(null);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pagehide", cleanup);
  controls.dispose();
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};

window.addEventListener("resize", resize);
window.addEventListener("pagehide", cleanup);
resize();
renderer.setAnimationLoop(render);
