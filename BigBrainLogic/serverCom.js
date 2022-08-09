import { CharacterLoader } from '/file/char_anim.js'
//new CharacterLoader('Char_1','x00000001','/ass/Xbot.glb',scene,undefined,camera)
export class Router {
    constructor(serverIP,scene,camera){
        this.scene = scene;
        this.camera = camera;
        this.socket = io();
        this.socket.connect(serverIP);
        this.socket.on('TEST',(data)=>{
            // console.log(data)
        })
        this.socket.on('newUserConnected',(id)=>{
            this.newUserConnection(id);
        })

        var thisHold = this;
        this.socket.on('UpdatePosition',(data)=>{
            thisHold.updatePosition(data)
        })
    }

    sendUpdate(data){
        // console.log('EMITING' , this.socket.connected);
        this.socket.emit("UpdatePosition",data);
    }

    newUserConnection(id){
        console.log('New CHAR aded;')
        this.NewChar = new CharacterLoader('Char_1','x00000001','/ass/Xbot.glb',this.scene,undefined,this.camera)
        this.NewChar.Load('/ass/Xbot.glb');
        this.NewChar.changeAnimation()
    }

    updatePosition(data){
        console.log('updateing',data)
        this.NewChar.UpdatePosition(data.position,data.rotation);
        this.NewChar.changeAnimation(data.animationKey)
    }
}