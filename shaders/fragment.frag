uniform float uTime;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv, sin(uTime) + 1., 1.);
}
