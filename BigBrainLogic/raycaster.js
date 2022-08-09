

// update the picking ray with the camera and pointer position
//raycaster.setFromCamera( pointer, camera );

// calculate objects intersecting the picking ray

import * as THREE from 'three';
/* 
import {Radian} from './degreetoradian.js' */

export class CheckAimingObject{
    constructor( camera , scene){
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.pointer.x = 0 //( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = 0//- ( event.clientY / window.innerHeight ) * 2 + 1;
        this.camera = camera
        this.scene = scene
    }

    _checkAim(ObjectName){
        this.raycaster.setFromCamera( this.pointer, this.camera );
        const intersects = this.raycaster.intersectObjects( this.scene.children );
        if(intersects.length > 0){
            if(intersects[ 0 ].object.name === ObjectName){
                //intersects[ 0 ].object.material.color.set( 0xff0000 );
/*                 console.log("It's HERRR!!");
                console.log(intersects[ 0 ].uv); */

                return { isAiming : true, uv : intersects[ 0 ].uv }
            }else{
                return { isAiming : false, uv : null }
            }
        }else{
            return { isAiming : false, uv : null }
        }
    }
}