import { GLTFLoader } from '/file/GLTFLoader.js'
import * as THREE from 'three';
import { Radian } from '/file/degreetoradian.js'
export class CharacterLoader {
    constructor(name,id,path,scene,gltf,camera){
        this.name = name;
        this.id = id;
        this.path = path || '';
        this.scene = scene;
        this.gltf = gltf;
        this.model;
        this.mixer = new THREE.AnimationMixer();
        this.active_animation;
        this._isModelLoaded = false;
        this._camera = camera;
        this.active_animation_key = 0;
        this.CameraDirVector = new THREE.Vector3();
        this.speed = 2;
        this.CameraRotMatrix;
        this.nextPosition = new THREE.Vector3();
        this.nextPositionAlpha = 0;
        this._hasUserUpdate = false
    }

    Load(path){
        var ClassScope = this;
        new GLTFLoader().load(path,function ( gltf ) {
            ClassScope.gltf = gltf;
            ClassScope.model = ClassScope.gltf.scene;
            ClassScope.model.children[0].scale.set(0.005,0.005,0.005);
            ClassScope.scene.add(ClassScope.model)
            ClassScope.model.traverse( function ( object ) {
                if ( object.isMesh ) object.castShadow = true;
            } );
            var skeleton = new THREE.SkeletonHelper( ClassScope.model );
            skeleton.visible = true;
            ClassScope.scene.add( skeleton );
            ClassScope.mixer = new THREE.AnimationMixer(ClassScope.model);
            ClassScope.active_animation = ClassScope.mixer.clipAction(ClassScope.gltf.animations[6])
            ClassScope.active_animation.play();
            console.log(ClassScope.gltf.animations);
            ClassScope.model.add(ClassScope._camera);
            ClassScope._isModelLoaded = true;
        })
    }

    get_info(){
        return {
            name : this.name,
            id : this.id,
            scene : this.scene,
            gltf : this.gltf
        }
    }

    changeAnimation(key){
        // 6 walk , 3 run
     /*    if(!this.active_animation){

        }else{ */
            this.active_animation_key = key;
            var clip = this.mixer.clipAction(this.gltf.animations[key]);
            this.active_animation.crossFadeTo(clip);
            this.active_animation = clip;
            this.active_animation.reset()
            .setEffectiveTimeScale( 1 )
            .setEffectiveWeight( 1 )
            .fadeIn( 0 )
            .play();
        // }
    }

    UpdatePosition(PositionVector , rotationVector){
        if(this._isModelLoaded){
            this.model.children[0].position.x = PositionVector.x;
            this.model.children[0].position.y = 0;
            this.model.children[0].position.z = PositionVector.z;
            this.model.children[0].setRotationFromMatrix(rotationVector)
        }
    }

    Update(delta,rotationCamera,cameraPosition){        
        if(this._hasUserUpdate){
            this.nextPositionAlpha += delta;
            //cameraPosition.lerp(this.nextPosition,this.nextPositionAlpha);
            this.model.children[0].position.lerp(this.nextPosition,this.nextPositionAlpha);
            cameraPosition.y = 0.5;
            this.model.children[0].position.y = 0;
            this.mixerUpdate(delta);
            this.model.children[0].setRotationFromMatrix(rotationCamera);
            if(this.nextPositionAlpha >= 1  ){
                this._hasUserUpdate = false;
                this.nextPositionAlpha = 0;
                this.changeAnimation(0)
                console.log('this.nextPosition DONE');
            };
        }else{
            this.UpdatePosition(cameraPosition,rotationCamera)
            this.mixerUpdate(delta);
            if(this._isModelLoaded){ 
                this.model.children[0].setRotationFromMatrix(rotationCamera);
                this.model.children[0].rotation.y = 0-this.model.children[0].rotation.y+Radian(180) ;
            }
                this.CameraRotMatrix = rotationCamera;
        }
    }

    mixerUpdate(delta){
        this.mixer.update(delta)
    }

    UpdateFromUser(direction){
        // this.chang/eAnimation(6);
        this._camera.getWorldDirection(this.CameraDirVector);
        switch ( direction ){
            case 'Forward':
                var vector = this.CameraDirVector.multiplyScalar(this.speed,this.speed,this.speed);
                break;
            case 'Back': 
                var vector = this.CameraDirVector.multiplyScalar(0-this.speed,0-this.speed,0-this.speed);
                break;
        }
        //this.nextPosition.x = this.model.children[0].position.x + vector.x;
        // this.nextPosition.y = this.model.children[0].position.y + vector.y;
        // this.nextPosition.z = this.model.children[0].position.z + vector.z;
        // this._hasUserUpdate = true;
        // this.nextPositionAlpha = 0;
        // this.UpdatePosition(fn,this.CameraRotMatrix)
        // console.log(this.nextPosition);
    }
}
