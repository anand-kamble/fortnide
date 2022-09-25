attribute float vertexPos;
attribute vec4 color;
attribute vec3 vertexColor;
uniform float time;
varying vec3 vPosition;
varying vec4 varColor;
varying vec4 vColor;
void main() {
  vec4 myPos;
  varColor = vec4(vertexColor, 1.0);
  vPosition = position;
  if(position.y > 0.0) {
    myPos = vec4(position.x, (sin(position.z + time * 4.0) + cos(position.x + time * 4.0)) * 0.05 * position.y + position.y, position.z, 1.0);
  } else {
    myPos = vec4(position.x, (sin(position.z + time * 4.0) + sin(position.x + time * 4.0)) * 0.05 * position.y + position.y, position.z, 1.0);
  };
  gl_Position = projectionMatrix * modelViewMatrix * myPos;
}