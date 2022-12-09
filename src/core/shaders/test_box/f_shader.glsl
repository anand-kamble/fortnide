varying vec3 vPosition;
varying vec4 varColor;
varying vec4 vColor;
uniform float time;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec4 color = vec4(vColor);
    float color_value = rand(vec2(0.0, (vPosition.x / 100000.0) * vPosition.z * vPosition.y * sin(time) * 0.0001));
    color.r = 0.2;
    color.g = abs(color_value);
    color.b = abs(color_value);
    color.a = 1.0;
    gl_FragColor = color;

}