import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import fragmentShader from './shader/fragment.frag?raw'
import vertexShader from './shader/vertex.vert?raw'
import GUI from 'lil-gui'

import './style.css'

class Sketch {
  private domElement: HTMLElement
  private windowSize: THREE.Vector2
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private clock: THREE.Clock
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private geometry: THREE.PlaneGeometry | null
  private material: THREE.ShaderMaterial | null
  private mesh: THREE.Mesh | null

  private gui: GUI

  config = {
    animate: true,
  }

  constructor(el: HTMLElement) {
    this.domElement = el

    this.windowSize = new THREE.Vector2(
      this.domElement.offsetWidth,
      this.domElement.offsetHeight,
    )

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.windowSize.x / this.windowSize.y,
      0.1,
      100,
    )
    this.camera.position.z = 1
    this.scene.add(this.camera)

    this.clock = new THREE.Clock()

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.domElement.append(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.geometry = null
    this.material = null
    this.mesh = null

    this.gui = new GUI()

    this.addObject()
    this.addGUI()
    this.addEventListener()
    this.resize()
    this.render()
  }

  addObject() {
    this.geometry = new THREE.PlaneGeometry(1, 1)
    this.material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      fragmentShader,
      vertexShader,
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.mesh)
  }

  addGUI() {
    this.gui.add(this.config, 'animate').name('Animate')
  }

  resize() {
    this.windowSize.set(
      this.domElement.offsetWidth,
      this.domElement.offsetHeight,
    )

    this.camera.aspect = this.windowSize.x / this.windowSize.y
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.windowSize.x, this.windowSize.y)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  }

  addEventListener() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  render() {
    const elapsedTime = this.clock.getElapsedTime()

    if (this.material && this.config.animate) {
      this.material.uniforms.uTime.value = elapsedTime
    }

    this.controls.update()

    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.render.bind(this))
  }
}

new Sketch(document.getElementById('app')!)
