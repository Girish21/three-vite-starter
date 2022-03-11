import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const canvas = document.getElementById('webGL')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera()
const controls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas })
const clock = new THREE.Clock()

controls.enableDamping = true

camera.fov = 75
camera.aspect = size.width / size.height
camera.far = 100
camera.near = 0.1
camera.position.set(1, 1, 1)

scene.add(camera)

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial()
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

cubeMaterial.color = new THREE.Color('#fa0')

scene.add(cubeMesh)

function resizeHandler() {
  size.height = window.innerHeight
  size.width = window.innerWidth

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
resizeHandler()

window.addEventListener('resize', resizeHandler)

function tick() {
  const elapsedTime = clock.getElapsedTime()

  cubeMesh.rotation.y = elapsedTime / 5.0

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
