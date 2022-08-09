import * as THREE from 'three';

import { Radian } from '/file/degreetoradian.js'

import { Degree } from '/file/radianToDegree.js'

export class Building {
    constructor (camera,scene){
        this._camera = camera;
        this._scene = scene;
        this._WorldDirVector = new THREE.Vector3();
        this._material_allowed_Build = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/file/WallText.png' ), transparent: true, opacity: 1 , color: 0x00F4FF});//new THREE.MeshBasicMaterial( {color: 0x00ffff} );
        this._material_forbidden_Build = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/file/WallText.png' ), transparent: true, opacity: 1, color: 0XFF5656 }); //new THREE.MeshBasicMaterial( {color: 0xff0000} );
        this._material_placed_Build = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( '/file/WallText.png' ), transparent: true, opacity: 1 });
        this._gridSize = 10;
        this._walls = [];
        this._wallsOccupied = new Array(this._gridSize*2);         
        for(var i = 0; i < this._gridSize*2 ; i++){
            this._wallsOccupied[i] = new Array(this._gridSize*2).fill(false);
        }
        /* for(var i = 0;i<this._gridSize*2;i++){
            var array = [];
            for(var i = 0;i<this._gridSize*2;i++){
                array.push(false);
            };
            this._wallsOccupied.push(array);
        }; */
        console.log(this._wallsOccupied)
    }

    init(){
        this.geometry = new THREE.BoxGeometry( 0.1,1,1);
        // this.material = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
        // this.material.needsUpdate = true;
        this.cube = new THREE.Mesh( this.geometry, this._material_allowed_Build );
        this.cube.position.y = 0.5
        this.debug = document.getElementById('debug');
        this._scene.add( this.cube );
    }


    Build(){
        this._camera.getWorldDirection(this._WorldDirVector)
        if( this._WorldDirVector.z < -0.5 && this._WorldDirVector.x > -0.5 && this._WorldDirVector.x < 0.5 ){
            //Looking FRONT
            // console.log('Looking FRONT')
            this.cube.position.x = parseInt(this._camera.position.x) + 0.5;
            this.cube.position.z = parseInt(this._camera.position.z);
            this.cube.rotation.y = Radian(90)
            
            // console.log(  this._camera.position.z - parseInt(this._camera.position.z) )

            if(this._camera.position.z - parseInt(this._camera.position.z) < 0.3 && this._WorldDirVector.y > -0.7 ){
                // if(this._WorldDirVector.y < -0.9 > 0.9)
                this.cube.position.z -= 1;
            }
        }
        if( this._WorldDirVector.z > 0.5 && this._WorldDirVector.x > -0.5 && this._WorldDirVector.x < 0.5 ){
            //Looking BACK
            // console.log('Looking BACK')
            this.cube.position.x = parseInt(this._camera.position.x) + 0.5;
            this.cube.position.z = parseInt(this._camera.position.z) + 1;
            this.cube.rotation.y = Radian(90)
            if(this._camera.position.z - parseInt(this._camera.position.z) > 0.7 && this._WorldDirVector.y > -0.7 ){
                this.cube.position.z += 1;
            }
        }
        if( this._WorldDirVector.x > 0.5 && this._WorldDirVector.z > -0.5 && this._WorldDirVector.z < 0.5 ){
            //Looking RIGHT
            // console.log('Looking RIGH/T')
            this.cube.position.x = parseInt(this._camera.position.x) + 1;
            this.cube.position.z = parseInt(this._camera.position.z) + 0.5;
            this.cube.rotation.y = Radian(0)
            if(this._camera.position.x - parseInt(this._camera.position.x) > 0.7 && this._WorldDirVector.y > -0.7 ){
                this.cube.position.x += 1;
            }
        }
        if( this._WorldDirVector.x < 0.5 && this._WorldDirVector.z > -0.5 && this._WorldDirVector.z < 0.5 ){
            //Looking LEFT
            // console.log('Looking LEFT')
            this.cube.position.x = parseInt(this._camera.position.x);
            this.cube.position.z = parseInt(this._camera.position.z) + 0.5;
            this.cube.rotation.y = Radian(0)
            if(this._camera.position.x - parseInt(this._camera.position.x) < 0.3 && this._WorldDirVector.y > -0.7 ){
                this.cube.position.x -= 1;
            }
        };
        if(this.cube.position.x < 0 ){this.cube.position.x = 0;}
        if(this.cube.position.z < 0 ){this.cube.position.z = 0;}
        if(this.cube.position.x > this._gridSize*2 ){this.cube.position.x = this._gridSize*2;}
        if(this.cube.position.z > this._gridSize*2 ){this.cube.position.z = this._gridSize*2;}
        if(this._wallsOccupied[this.cube.position.x*2][this.cube.position.z*2] === false){
            this.cube.material = this._material_allowed_Build;
        }else{
            this.cube.material = this._material_forbidden_Build;
        }
    }

    place(){
        console.log(this.cube.position.x*2,this.cube.position.z*2,this._wallsOccupied[this.cube.position.x*2][this.cube.position.z*2])
        console.log(this._wallsOccupied)
        if(this._wallsOccupied[this.cube.position.x*2][this.cube.position.z*2] === false){
            this._wallsOccupied[this.cube.position.x*2][this.cube.position.z*2] = true;
            
            this.cube.material = this._material_placed_Build;
            this._walls.push(this.cube);

            this.init()
        }else{
            console.log('Already Placed')
        }
    }
}