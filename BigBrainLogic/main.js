/* 
Author : Anand Kamble

*/
import * as THREE from 'three';

import { OrbitControls } from '/file/OrbitControls.js';

import { PointerLockControls } from '/file/PointerLockControls.js'

import { GLTFLoader } from '/file/GLTFLoader.js'

import * as dat from '/file/dat.gui.module.js';

import { CheckAimingObject } from '/file/raycaster.js'

import { Radian } from '/file/degreetoradian.js'

import { Building } from '/file/builds.js'

import  Stats  from '/file/Stats.js';

import { KeyPresshandler } from '/file/keypresses.js'

import { FBXLoader } from '/file/FBXLoader.js'

import { CharacterLoader } from '/file/char_anim.js'

import { Router } from '/file/serverCom.js'


// var url = encodeURIComponent('https://www.babepedia.com/galleries/Penthouse-AmazingVioletSummersFeelsBetterWithoutHerSwimsuitOn/01.jpg');
// var url2= encodeURIComponent('https://images.pexels.com/photos/8373866/pexels-photo-8373866.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');


// Our Javascript will go here.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 100);
var aspect = window.innerWidth / window.innerHeight
var frustumSize = 600
// const camera = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
const gui = new dat.GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry( 100, 100 );
const material = new THREE.MeshBasicMaterial({color : 0x858585,side : THREE.DoubleSide});
const ground= new THREE.Mesh( geometry, material )
ground.rotateX(Radian(90));
// scene.add(ground)





camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 2;
const controls = new PointerLockControls(camera,document.body);

document.body.addEventListener('click',()=>{
    controls.lock()
})


var aimchecker = new CheckAimingObject(camera,scene)
var builder = new Building(camera,scene);
var router = new Router(window.location.href,scene,camera);
var char_1 = new CharacterLoader('Char_1','x00000001','/ass/Xbot.glb',scene,undefined,camera);
var Key_Press_handler = new KeyPresshandler(builder,char_1);

var loaded = false;
window.addEventListener('keydown', e => {
    e.preventDefault();
    if( e.key == 'b' && loaded == false){
        char_1.Load('/ass/Xbot.glb');
        loaded =true;   
    }
    if(e.key == 'c'){
        char_1.changeAnimation(6)
    }
});
window.addEventListener('load',()=>{
    char_1.Load('/ass/Xbot.glb');
        loaded =true;   
})


window.addEventListener('keydown', e => {
    e.preventDefault();
    Key_Press_handler.keyPressed(e.keyCode);
});
window.addEventListener('keyup', e => {
    e.preventDefault();
    Key_Press_handler.keyReleased(e.keyCode);
});
window.addEventListener('mousedown', e => {
    e.preventDefault();
    Key_Press_handler.mouseButtonClicked(e.button)
})

/* const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
pointer.x = 0 //( event.clientX / window.innerWidth ) * 2 - 1;
pointer.y = 0//- ( event.clientY / window.innerHeight ) * 2 + 1;
 */

const light = new THREE.AmbientLight( 0x404040 ,2); // soft white light
scene.add( light );

const pointLight = new THREE.PointLight(0x404040, 1, 1000)
pointLight.position.set(3,3,3)
scene.add(pointLight)
pointLight.castShadow = true

var playerDir = new THREE.Vector3()
var aim_result;
var uvcheck = {x_min: 0.4068554396423249, x_max: 0.7198211624441133, y_min: 0.3753723932472691, y_max: 0.5243296921549155}
var points = [];

const axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );
 const gridHelper = new THREE.GridHelper( 100, 100 );
scene.add( gridHelper ); 

 var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

// builder.init()

var speed = 2;
var rotMat,invRotMat;
var delta;
var CamWorldDir = new THREE.Vector3();
var clock = new THREE.Clock();
function animate() {
    stats.begin();
    delta = clock.getDelta()
    // console.log(Key_Press_handler._moveForward)
    if(Key_Press_handler._moveForward){controls.moveForward(speed*delta)}
    if(Key_Press_handler._moveLeft){controls.moveRight(-speed*delta)}
    if(Key_Press_handler._moveBack){controls.moveForward(-speed*delta)}
    if(Key_Press_handler._moveRight){ controls.moveRight(speed*delta)}  
    if(Key_Press_handler.q){camera.position.y += speed}
    if(Key_Press_handler.e){camera.position.y -= speed}
    if(Key_Press_handler._buildMode){builder.Build()}

    rotMat = new THREE.Matrix4().makeRotationFromEuler(camera.rotation).invert();



    // camera.getWorldDirection(CamWorldDir);

    // char_1.UpdatePosition(camera.position , rotMat);
    
    // builder.Build()

    char_1.Update(delta,rotMat,camera.position)

    stats.update();

    renderer.render( scene, camera );
    requestAnimationFrame( animate );
    stats.end();

}
 animate();

// setInterval(animate,1000/30)


function UpdateToServer () {
    router.sendUpdate({ position : camera.position, rotation : rotMat, animationKey : char_1.active_animation_key})
}

setInterval(UpdateToServer,1000/50)


var debug = document.getElementById('debug');
var start;


/* setInterval(()=>{
    // console.log(Key_Press_handler._moveForward)
    if(Key_Press_handler._moveForward){controls.moveForward(speed)}
    if(Key_Press_handler._moveLeft){controls.moveRight(-speed)}
    if(Key_Press_handler._moveBack){controls.moveForward(-speed)}
    if(Key_Press_handler._moveRight){ controls.moveRight(speed)}
    if(Key_Press_handler.q){camera.position.y += speed}
    if(Key_Press_handler.e){camera.position.y -= speed}
    
    
    builder.Build()
    
    debug.innerText = 1/clock.getDelta()
    
    renderer.render( scene, camera );
    // requestAnimationFrame( animate );


},1000/300)
 */



//https://www.babepedia.com/ajax-search.php?term=vio  SEARCH API